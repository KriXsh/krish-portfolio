> **TL;DR:** Classic RAG (chunk → embed → vector search → prompt) is still the right default for large, fast-changing corpora and strict cost budgets. "RAG-less" approaches, meaning long-context prompting or letting an agent search with tools, win when the knowledge fits in the window, when answers need whole-document reasoning, or when relevance is better expressed as a query than as a vector. Most production systems end up hybrid.

For a while, "build an LLM feature" meant "build a RAG pipeline". Split documents into chunks, embed them, store the vectors, retrieve the top-k at query time and paste them into the prompt. It worked well enough that it became the default answer to almost every knowledge problem.

Two things changed that default. Context windows grew from a few thousand tokens to hundreds of thousands, and in some models to a million or more. And models got good at *using tools*: calling a search API, reading a file, running SQL, then deciding what to read next. Suddenly there are three real options on the table, not one.

## The three shapes of retrieval

### 1. Classic RAG

```text
query ──▶ embed ──▶ vector search (top-k chunks) ──▶ prompt ──▶ LLM ──▶ answer
```

Retrieval happens once, up front, by similarity. The model only sees what the retriever chose.

### 2. Long-context ("stuff it in")

```text
query + entire document set (or a large filtered slice) ──▶ LLM ──▶ answer
```

No retriever at all, or only a coarse filter (by customer, by project, by date). The model reads everything relevant and does the "retrieval" itself, with attention.

### 3. Agentic retrieval

```text
query ──▶ LLM ──▶ tool call (search / grep / SQL / read_file) ──▶ observe ──▶ … ──▶ answer
```

The model plans its own lookups, iterates, and stops when it has enough. Retrieval becomes a loop, not a step.

## Where classic RAG still wins

**Corpus size.** If your knowledge base is millions of documents, nothing fits in a context window, and you need an index. Vector search (usually combined with keyword search) is fast, cheap per query and scales horizontally.

**Cost and latency at volume.** Every token you send is paid for and processed. Sending 200k tokens per request is dramatically more expensive and slower than sending 4k tokens of well-chosen chunks. For a high-traffic support bot, that difference decides whether the feature is viable.

**Freshness and access control.** An index can be updated incrementally, and filtered per user at query time. That makes it natural to enforce "this user may only see documents from their workspace", something that is much harder to guarantee when you hand the model a huge blob.

**Auditable grounding.** Top-k chunks with IDs make citations easy: every claim in the answer can point at a specific passage.

## Where RAG-less wins

**Whole-document reasoning.** Questions like "What changed between these two contracts?" or "Summarise the risks across this whole report" need global context. Chunking destroys it. The answer depends on how sections relate, and a top-k retriever will happily return five chunks from the same section and miss the one that matters.

**Small, bounded knowledge.** A product's docs, a single codebase module, one customer's history: if it fits comfortably in the window, a retrieval pipeline adds moving parts (chunking strategy, embedding model, index, reranker) without adding accuracy.

**Relevance that isn't semantic similarity.** Embeddings measure "sounds similar". But many real questions are structural: *the latest* invoice, *all* tickets tagged P1 last week, the function that *calls* `processPayment`. An agent that can run `grep`, SQL or a filtered search expresses those precisely. A vector index can't.

**Multi-hop questions.** "Which service owns the queue that the billing job writes to?" requires following a chain. Agentic retrieval handles this naturally: find the billing job, read its config, find the queue, look up the owner.

## The failure modes nobody puts on the slide

**Classic RAG:**

- *Chunk boundaries cut answers in half.* A table split across two chunks, a definition in one chunk and its exception in the next.
- *Similarity is not relevance.* The retriever returns passages that share vocabulary with the question but don't answer it.
- *Silent misses.* When retrieval fails, the model often answers anyway, confidently, from its own weights.

**Long context:**

- *Lost in the middle.* Models attend unevenly across very long inputs. Facts buried in the middle can be under-weighted.
- *Cost creep.* The approach that was cheap with 20 documents gets expensive with 2,000.
- *Distractors.* More irrelevant text in the window can reduce accuracy, not just waste tokens.

**Agentic retrieval:**

- *Latency and unpredictability.* Each tool call is a round trip. Five iterations can mean several seconds.
- *Loops and dead ends.* Without limits, agents re-search the same thing or wander.
- *Harder evaluation.* The path to an answer varies run to run.

## A decision framework

Here's the order of questions I work through:

1. **Does the relevant knowledge fit in the window with room to spare?** If a coarse filter (tenant, project, date range) gets you under roughly a quarter of the context limit, try long-context first. It's the simplest system that could work.
2. **Is relevance semantic or structural?** Semantic ("docs about refunds") favours embeddings. Structural ("the newest", "all of", "who calls") favours tools: search with filters, SQL, code search.
3. **What are the latency and cost budgets per request?** A 300 ms autocomplete and a 30-second research assistant want completely different architectures.
4. **How strict are access control and citations?** Per-user filtering and passage-level citations push towards an index you control.

## Hybrids are the real answer

In practice the best systems mix the patterns:

- **Retrieve, then expand.** Use vector search to find the right *documents*, then give the model the *whole* documents rather than isolated chunks. You keep the scale of an index and regain whole-document context.
- **Hybrid search + rerank.** Combine keyword (BM25) and vector results, then rerank with a cross-encoder. Keyword search rescues exact identifiers, error codes and names that embeddings blur.
- **Agent with a RAG tool.** Give an agent a `search_knowledge_base` tool backed by your index, alongside `grep`, `sql` and `read_file`. The agent decides which lookup fits the question.
- **Prompt caching for the stable part.** If the same large context (a manual, a codebase summary) is reused across requests, provider-side prompt caching makes long-context far cheaper than its raw token count suggests.

A retrieve-then-expand step can be only a few lines:

```python
def build_context(query: str, max_tokens: int = 60_000) -> str:
    hits = hybrid_search(query, k=20)               # BM25 + vectors, reranked
    doc_ids = list(dict.fromkeys(h.doc_id for h in hits))  # keep rank order, dedupe

    parts, used = [], 0
    for doc_id in doc_ids:
        doc = load_document(doc_id)
        if used + doc.tokens > max_tokens:
            break
        parts.append(f"<doc id='{doc_id}' title='{doc.title}'>\n{doc.text}\n</doc>")
        used += doc.tokens
    return "\n\n".join(parts)
```

## Measure, don't guess

Whichever shape you pick, build a small evaluation set before you optimise: 50–200 real questions with known good answers and the documents that support them. Track three things separately:

- **Retrieval recall:** did the right source make it into context at all?
- **Answer faithfulness:** does the answer stick to the provided context?
- **Answer correctness:** is it actually right?

Separating them tells you *where* to fix things. Low recall means improve retrieval (hybrid search, better chunking, expand to full documents). High recall but wrong answers means a prompt or model problem, and no amount of vector tuning will fix it.

## Closing thought

RAG isn't dead, and "just use a long context" isn't a strategy. Retrieval is a design space: *how much* to show the model, *how* to choose it, and *who* does the choosing, a retriever or the model itself. Start with the simplest shape that fits your corpus and budget, measure it honestly, and add machinery only where the evaluation says you need it.
