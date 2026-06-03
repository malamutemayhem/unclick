# Deep Research Brief: TrendSlopGate, AI Sycophancy, and UnClick Accountability

## Research Goal

Research how UnClick should combat "trendslop", AI sycophancy, over-agreeable responses, generic fashionable advice, and AI outputs that sound polished but push the user in the wrong direction.

The output should help UnClick harden Launchpad, XGate, AnswerPass receipts, MCP behavior, Boardroom worker instructions, and agent conditioning so AI assistants are less likely to:

- agree with weak, false, risky, or untested premises
- give generic "best practice" advice without context
- recommend fashionable AI, business, or product trends because they sound current
- flatter, validate, or encourage the wrong direction
- produce workslop: polished output that lacks substance
- hide uncertainty behind confident language
- avoid useful friction because agreement feels nicer

## UnClick Context

UnClick is the identity, memory, credentials, receipt, and accountability layer underneath AI clients and agents. It is not trying to replace ChatGPT, Claude, Cursor, Gemini, or other harnesses. It sits behind them as durable infrastructure.

Key UnClick concepts:

- **Memory**: persistent cross-session memory across AI clients and devices.
- **MCP tools**: UnClick exposes tools to AI clients through MCP.
- **Boardroom**: UnClick's coordination space for jobs, workers, decisions, and receipts.
- **XPass**: after-action proof and quality checks.
- **XGate**: before-action control gates that allow, watch, rewrite, ask, or block.
- **AnswerPass**: answer accountability receipts that show verified, inferred, unverified, contradicted, and not-checked claims.
- **Launchpad**: the operator-facing dispatch surface where workers and safety posture should be conditioned.
- **Receipts**: structured proof with status, evidence, rule IDs, and action needed.
- **Reality Graph**: claims, support, contradiction, stale state, proof strength, and correction history.

UnClick's posture should be:

> Not "AI is always correct", but "UnClick can show what was checked, what was not checked, and why the system allowed, watched, rewrote, asked, or blocked an answer."

## Existing Direction

UnClick is already adding AnswerPass and XGate. The current direction is:

- AnswerPass inspects AI answers and creates receipts.
- XGate enforces whether an output or action is allowed.
- TrendSlopGate should become a named XGate product/gate.
- TrendSlopGate should work alongside CommandGate, GitGate, DataGate, SecretGate, ScopeGate, SpendGate, ShipGate, KillGate, and other XGate products.
- Each XGate product should support modes:
  - **Off**: Dormant. No checks, no warnings, no notes.
  - **Watch**: Watches everything and logs it. Never blocks.
  - **Block**: Enforces the gate before risky work or weak answers leave UnClick.
- The master XGate control should remain nearby:
  - Master Off sets all gates Off.
  - Master Watch sets all gates Watch.
  - Master Block sets all gates Block.
  - If individual gates differ, the master state becomes Custom.
  - If the master is Custom and a user clicks Off, Watch, or Block, that master choice overrides all individual gates.
- TrendSlopGate does not have to be compulsory, but Launchpad and XGate defaults should strongly condition agents toward anti-trendslop and anti-sycophancy behavior.

## Research Questions

1. What exactly is trendslop?
   - Define it clearly.
   - Separate it from hallucination, workslop, bias, sycophancy, and generic poor reasoning.
   - Explain why it is dangerous even when the answer is not factually false.

2. What has already been discovered?
   - Research HBR's trendslop article and any underlying study.
   - Research workslop and its impact on workplace trust and productivity.
   - Research sycophancy in LLMs, including Anthropic research and OpenAI's GPT-4o rollback/postmortem.
   - Research newer papers on LLM sycophancy, agreement bias, over-validation, and models shifting under user pressure.
   - Include concrete findings, dates, source links, and confidence levels.

3. What failure modes should UnClick care about?
   - AI agreeing with false or risky user premises.
   - AI recommending trendy frameworks without local context.
   - AI choosing the fashionable option over the right option.
   - AI failing to ask for missing context before strategic advice.
   - AI presenting generic advice as tailored.
   - AI providing polished but low-substance output.
   - AI refusing to dissent because dissent feels less helpful.
   - AI laundering uncertainty through confident tone.

4. How should TrendSlopGate work?
   - Define gate inputs, outputs, statuses, and rule IDs.
   - Suggest deterministic heuristics and model-assisted checks.
   - Suggest scoring dimensions: context specificity, evidence grounding, buzzword density, assumption checking, alternatives considered, counterpoint present, tradeoff quality, unsupported agreement, user premise validation risk, and decision-direction risk.
   - Define when the gate should Allow, Watch, Rewrite, Ask, or Deny.

5. How should TrendSlopGate interact with AnswerPass?
   - What should live in AnswerPass receipts?
   - What should live in XGate enforcement?
   - Should TrendSlopGate attach an `answer_quality_risks` section to `answer_receipt_v1`?
   - What schema fields should be added?
   - How should receipts explain "not enough context" or "too agreeable"?

6. How should TrendSlopGate interact with XGate modes?
   - Recommend Off, Watch, and Block behavior.
   - Recommend master mode behavior when individual gates are mixed.
   - Recommend launch defaults for normal users versus advanced users.
   - Recommend safe UX copy that is clear but not scary.

7. How should this be conditioned into UnClick agents?
   - Prompt rules for agents.
   - Launchpad default instructions.
   - MCP tool descriptions.
   - Boardroom worker instructions.
   - Eval fixtures.
   - Regression tests.
   - Failure examples and expected rewrites.
   - How to keep the model warm and useful without becoming agreeable mush.

8. What should the MVP be?
   - What can be shipped first with deterministic checks?
   - What needs model-assisted checking later?
   - What should be logged but not blocked at first?
   - What should be rewritten or escalated from day one?
   - What should be excluded from v1 to avoid overclaiming?

## Suggested Deliverables

Please produce separate markdown files:

1. `01-trendslop-definition-and-landscape.md`
2. `02-research-findings-and-source-map.md`
3. `03-unclick-product-strategy.md`
4. `04-trendslopgate-architecture.md`
5. `05-answerpass-and-receipt-schema.md`
6. `06-xgate-modes-and-admin-ux.md`
7. `07-agent-conditioning-and-launchpad-rules.md`
8. `08-mvp-roadmap-tests-and-fixtures.md`

Each file should include:

- concrete recommendations
- risks and tradeoffs
- source links
- confidence level
- what UnClick should do now
- what UnClick should defer

## Starter Sources

- HBR: https://hbr.org/2026/03/researchers-asked-llms-for-strategic-advice-they-got-trendslop-in-return
- HBR workslop: https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity
- BetterUp workslop study page: https://www.betterup.com/workslop
- Anthropic sycophancy research: https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models
- OpenAI sycophancy rollback: https://openai.com/index/sycophancy-in-gpt-4o/

## Product Principle

Do not frame this as "the AI will always be right."

Frame it as:

> UnClick adds friction when an answer is too agreeable, too generic, too trendy, too unsupported, or too confident for the evidence available.

The goal is to make UnClick feel like a useful second brain with backbone: helpful, warm, and practical, but willing to challenge the user when the direction looks weak.
