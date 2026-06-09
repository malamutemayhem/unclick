# Anti-AI-Slop Research Corpus

**Source:** Operator research uploads, 2026-05-19

**Purpose:** Feeder corpus for the new `JS-AIDETECT-31+` rule family in the JobSmith universal rules pack. Specifically supports rule-pack writer work on:

- Perplexity signals
- Burstiness signals
- Banned-vocab cluster expansion
- Opener and closer pattern detection
- Sentence-rhythm / sentence-shape detection
- Detector-specific signal lists (Pangram, GPTZero, Turnitin, Originality, Copyleaks)

## Contents

- `anti-ai-slop_1_2.md`: Master List: vocabulary, phrase, sentence-shape, opener/closer, structural, punctuation, logic, tone, Claude-specific, CV-specific tells, humaniser prompts, workflow fixes, detector behaviour.
- `anti-ai-slop_2_2.md`: Megalist: current research signals, ethical detector-risk rules, evidence and provenance fixes, specificity fixes, voice fixes, structure fixes, sentence-level fixes, AI vocabulary watchlist, 2025-2026 tells, humanizer-tool residue, humanizer prompt families, safer humanizer prompts, prompts to avoid, do-not-use fixes, fast anti-slop workflow.

## Related Work

- **Boardroom todo:** `55766d56-ac36-476b-a6e3-81202dc5f501` (JobSmith Application Manager)
- **Boardroom gap report comments:**
  - `42d596a6`: round 1 gap report
  - `db7fbc35`: round 2 gap report
- **Why this matters:** real-world dogfood found GPTZero scoring 100% AI on text that already passed the JobSmith engine. These docs are the curated research the `JS-AIDETECT` rule family should absorb to close that gap.

## Next Step (for the rule-pack writer)

Extract from these documents into new rules in `apps/jobsmith/rules/jobsmith-universal-rules-v1.yaml` under category `AIDETECT`:

1. Banned-vocab cluster expansions (sections A1-A10 and the AI Vocabulary Watchlist).
2. Opener patterns (sections D1-D6, plus structure-fix opener bans).
3. Closer patterns (sections D3, D5, plus structure-fix closer bans).
4. Sentence-rhythm rules (section C8, C9 burstiness; sentence-level fixes for length and shape).
5. Detector-specific signal lists (section M for false-positive context and detector signatures).
6. Cluster-trigger rules (paragraphs with 3+ banned-vocab items, low burstiness, negative parallelism, "Bold term: explanation" lists, em-dash counts).
