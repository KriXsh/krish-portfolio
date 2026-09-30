> **TL;DR:** You can't improve an LLM feature you can't measure. Build a golden set from real inputs, score it with a mix of deterministic checks and carefully calibrated LLM judges, run it on every prompt or model change, and confirm improvements with online signals. The biggest trap is trusting a metric (especially an LLM judge) that you haven't validated against human judgement.

Traditional software has tests: given this input, expect that output. LLM features break that model. Outputs vary run to run, "correct" is often a spectrum, and a prompt tweak that fixes one case quietly breaks three others. Teams that ship AI features reliably have one thing in common: an evaluation loop they trust.

## Start with a golden set

A **golden set** is a collection of representative inputs with expectations attached. It's the unit test suite of an LLM feature.

How to build one:

1. **Sample real inputs** from logs (anonymised) or realistic drafts if you're pre-launch. Synthetic inputs alone miss the messiness of real users.
2. **Cover the distribution:** common cases, edge cases, adversarial inputs, and inputs that should be *refused*.
3. **Attach expectations:** a reference answer, required facts, forbidden content, or a rubric.
4. **Keep it small at first.** Fifty to two hundred good examples beat thousands of sloppy ones. Grow it every time you find a production failure.

```json
{
  "id": "refund-policy-017",
  "input": "I bought the annual plan 40 days ago, can I get a refund?",
  "context_docs": ["policy/refunds.md"],
  "must_include": ["30-day refund window"],
  "must_not_include": ["guarantee", "full refund"],
  "rubric": "States that the 30-day window has passed and offers the escalation path."
}
```

## Three kinds of checks

### 1. Deterministic checks

Cheap, fast, unambiguous. Use them wherever possible:

- Output parses as valid JSON and matches the schema.
- Required fields present; values in allowed ranges.
- Must-include and must-not-include strings or regexes.
- Length limits, language, no leaked system prompt.
- For tool-using agents: the right tool was called with valid arguments.

```python
def check(case, output):
    results = {
        "valid_json": is_valid_json(output),
        "has_required": all(s.lower() in output.lower() for s in case["must_include"]),
        "no_forbidden": not any(s.lower() in output.lower() for s in case["must_not_include"]),
    }
    results["pass"] = all(results.values())
    return results
```

### 2. Reference-based scores

When there's a reference answer, compare against it. Exact match works for classification and extraction. For free text, similarity metrics are noisy, so prefer checking required facts rather than word overlap.

### 3. LLM-as-judge

For qualities like helpfulness, faithfulness to sources or tone, another model grades the output against a rubric. It scales where humans don't, and it has well-known pitfalls.

## LLM-as-judge pitfalls

- **Position bias:** in pairwise comparisons, judges often favour the first (or second) answer. Randomise order, or score both orders and average.
- **Verbosity bias:** longer answers tend to get higher scores even when they're worse. Put conciseness in the rubric explicitly.
- **Self-preference:** a model may rate outputs in its own style more highly. Where possible, use a different model family as judge.
- **Vague rubrics give vague scores.** "Rate quality 1–10" produces noise. Ask specific yes/no questions instead.
- **Unvalidated judges:** the judge is itself a model that needs evaluation.

A more reliable judge prompt asks narrow, checkable questions:

```text
You are grading a customer-support answer.

Context documents:
{context}

Question: {input}
Answer: {output}

Answer each with YES or NO, then a one-sentence reason:
1. Is every factual claim in the answer supported by the context documents?
2. Does the answer address the user's actual question?
3. Does the answer avoid promising anything the policy does not allow?

Return JSON: {"supported": bool, "on_topic": bool, "policy_safe": bool, "reasons": [..]}
```

**Calibrate the judge.** Have humans label a sample (say 100 outputs) and measure how often the judge agrees. If agreement is low for a criterion, fix the rubric or drop the criterion; don't ship decisions based on it.

## Make evals part of the workflow

Evals only help if they run at the moment decisions are made:

- **On every prompt, model or retrieval change**, run the golden set and compare against the current baseline.
- **Look at per-case diffs, not just the average.** "Score went from 82% to 84%" can hide five newly broken cases in a critical category.
- **Track cost and latency alongside quality.** A model upgrade that improves scores by 1% and doubles latency may not be worth it.
- **Pin versions** of prompts, models and datasets so results are reproducible.

```text
eval run 2026-09-30  prompt=v14  model=fast-model  dataset=golden-v6 (180 cases)
  pass rate        84.4%  (+1.7 vs baseline)
  faithfulness     91.1%  (+0.6)
  refusal correct  96.0%  (-2.0)  ⚠ 2 regressions: refund-policy-017, pii-request-004
  p95 latency      1.9s   (-0.3s)
  cost / 1k calls  $0.84  (-12%)
```

## Online signals: what users actually experience

Offline evals tell you whether a change is *likely* better. Production tells you whether it *is*.

- **Explicit feedback:** thumbs up/down, "was this helpful?" It's sparse and biased, but valuable in aggregate.
- **Implicit signals:** did the user copy the answer, retry the question, escalate to a human, or abandon the flow?
- **Task success:** for agents, did the task complete (ticket resolved, form submitted) without human correction?
- **A/B tests:** for significant changes, split traffic and compare task-level outcomes, not just ratings.

Feed failures back: every bad production case becomes a new golden-set example. Over time the golden set becomes a precise map of what "good" means for your product.

## Guardrails are evals that run live

Some checks belong in the request path, not just offline: schema validation, PII detection, policy classifiers, and "is this answer grounded in the retrieved context?" checks. When they fail, retry, fall back to a safer response, or hand off to a human. Log every trigger, because guardrail hit rates are themselves a quality metric.

## Checklist

- [ ] Golden set sampled from real inputs, covering edge cases and refusals
- [ ] Deterministic checks wherever the requirement is objective
- [ ] LLM judges with narrow rubrics, randomised order, and measured human agreement
- [ ] Evals run on every prompt, model and retrieval change, with per-case diffs
- [ ] Cost and latency tracked next to quality
- [ ] Online feedback and task-success metrics, feeding new golden cases
- [ ] Guardrails in the request path for the checks that can't wait

The model will keep changing. A trustworthy evaluation loop is what lets you change it with confidence.
