> **TL;DR:** A voice agent feels natural when it starts speaking within about a second of the user finishing. You get there by streaming every stage (speech-to-text, the LLM and text-to-speech) instead of running them one after another, detecting end-of-turn quickly, starting TTS on the first sentence, and supporting barge-in so users can interrupt. Budget latency per stage and measure it on every turn.

Text chat is forgiving: a two-second wait before a reply appears is fine. In a voice conversation, the same pause feels broken. People expect turn-taking at the rhythm of human speech, where gaps between turns are typically a few hundred milliseconds. So the engineering problem of a voice agent is mostly a **latency** problem wrapped around a normal LLM application.

## The pipeline

```text
mic ─▶ VAD ─▶ STT (streaming) ─▶ end-of-turn ─▶ LLM (streaming) ─▶ sentence chunker ─▶ TTS (streaming) ─▶ speaker
                                                     ▲                                               │
                                                     └──────────── barge-in / interruption ◀─────────┘
```

- **VAD (voice activity detection)** decides when the user is speaking.
- **STT (speech-to-text)** turns audio into text, ideally with partial results as the user talks.
- **End-of-turn detection** decides the user has *finished* and it's the agent's turn.
- **LLM** generates the reply, streamed token by token.
- **TTS (text-to-speech)** turns text into audio, also streamed.

## Where the time goes

The latency that matters is **mouth-to-ear**: from the moment the user stops speaking to the moment they hear the first syllable of the reply. Roughly:

```text
end-of-turn detection   ████████            (silence threshold)
final STT result        ███
LLM time-to-first-token ██████
first sentence complete ████
TTS time-to-first-audio █████
network + playback      ███
```

The exact numbers depend on your providers, models and network, which is why you should measure your own. The structural point is that these stages **add up** if they run sequentially, and overlap if they stream.

## 1. Stream everything

The single biggest win is refusing to wait for any stage to finish:

- **STT:** use a streaming recogniser that emits partial transcripts while the user is still speaking. By the time they stop, most of the text is already known.
- **LLM:** stream tokens. Never wait for the full completion.
- **TTS:** send text to TTS as soon as you have a speakable unit, usually the first sentence or clause, and stream the audio back.

A minimal sentence chunker between the LLM and TTS:

```ts
async function* sentences(tokens: AsyncIterable<string>) {
  let buffer = "";
  for await (const t of tokens) {
    buffer += t;
    // Flush on sentence end (or a long clause) so TTS can start early.
    const match = buffer.match(/^(.+?[.!?])(\s|$)/s) ?? (buffer.length > 120 ? buffer.match(/^(.+?[,;:])\s/s) : null);
    if (match) {
      yield match[1].trim();
      buffer = buffer.slice(match[0].length);
    }
  }
  if (buffer.trim()) yield buffer.trim();
}

for await (const sentence of sentences(llm.stream(prompt))) {
  tts.enqueue(sentence); // audio for sentence 1 plays while the LLM writes sentence 2
}
```

## 2. Detect end-of-turn fast (but not too fast)

The simplest end-of-turn rule is "the user was silent for N milliseconds". A long threshold feels sluggish; a short one makes the agent interrupt people who pause mid-thought.

Better approaches combine signals:

- **Adaptive silence thresholds:** shorter after a complete-sounding sentence, longer after "um", "and", or a trailing clause.
- **Semantic end-of-turn models** that look at the partial transcript and predict whether the utterance is complete.
- **Speculative generation:** start the LLM on the partial transcript during the pause, and discard the result if the user keeps talking.

## 3. Make the LLM fast to first token

- **Keep prompts lean.** Every token in the system prompt and history adds processing time before the first output token. Summarise old turns instead of sending the whole transcript.
- **Pick a model for the job.** A smaller, faster model often beats a bigger one for conversational turns; escalate to a larger model only for complex requests.
- **Write for speech.** Ask for short sentences, no markdown, no lists, and numbers written the way they're spoken. The first sentence should carry the answer so TTS can start immediately.
- **Handle tools carefully.** If a tool call is needed (look up an order, check a calendar), say a short filler line ("Let me check that…") while the call runs, so the silence doesn't feel like a failure.

## 4. Barge-in: let users interrupt

Humans interrupt, and a good agent stops talking when they do. That requires:

1. **Keep listening while speaking.** Run VAD on the input stream even during playback, with **echo cancellation** so the agent doesn't hear itself.
2. **On detected user speech:** stop audio playback immediately, cancel in-flight TTS requests, and abort the LLM stream.
3. **Keep the conversation state honest:** record only the part of the reply that was actually *spoken* before the interruption, so the next turn doesn't assume the user heard everything.

```ts
vad.on("speechStart", () => {
  if (agent.isSpeaking) {
    player.stop();
    tts.cancelAll();
    llmAbort.abort();
    history.markAssistantTurnTruncated(player.playedText());
  }
});
```

## 5. Transport and audio details

- **Use a streaming transport** such as WebSockets or WebRTC. WebRTC gives you jitter buffering and echo cancellation in the browser, and handles poor networks better.
- **Keep audio chunks small** (tens of milliseconds) so each stage can start work sooner.
- **Co-locate services.** STT, LLM and TTS calls that cross continents add round-trip time on every turn.
- **Reuse connections.** Opening a new TLS connection per request adds avoidable latency; keep persistent streams open.

## Measure every turn

Instrument each stage with timestamps and log them per turn:

```json
{
  "turnId": "t-0192",
  "userStoppedAt": 0,
  "sttFinalMs": 180,
  "llmFirstTokenMs": 520,
  "ttsFirstAudioMs": 810,
  "firstAudioPlayedMs": 870,
  "interrupted": false
}
```

Track percentiles, not averages. A p50 of 800 ms with a p95 of 3 s means one turn in twenty feels broken. Also track **false barge-ins** (the agent stopped for background noise) and **cut-offs** (the agent started talking while the user was still mid-sentence), because both destroy trust quickly.

## Quality beyond latency

Fast but wrong is still wrong. Voice-specific quality issues to test for:

- **Transcription errors** on names, numbers, emails and domain terms. Use STT vocabulary hints or custom models, and confirm critical values back to the user.
- **Pronunciation:** TTS may mispronounce product names or acronyms; use SSML or phonetic hints where supported.
- **Tone and length:** replies that read well can sound long-winded when spoken. Keep them short.

## Closing thought

A great voice agent is less about any single model and more about **overlap**: every stage starts before the previous one finishes, the system listens while it speaks, and every turn is measured. Get the pipeline right, and the models you plug into it can change freely as better ones arrive.
