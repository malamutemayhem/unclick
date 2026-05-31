# Path A: Learning, Evolving, and Agentic Autonomy

Status: design discussion. Companion to the build plan, audit, and eval spec.
This doc goes deep on the part the others compressed: what "reinforcement
learning," "evolving," and "agentic" can actually mean for a harness that does
NOT own model weights, and which UnClick primitives already exist for each.

## The disaggregation (the whole point)

These three words get used interchangeably and they are not the same thing. They
have very different reality levels and very different risk. Naming them apart is
the single most clarifying move.

1. **Reinforcement / learning** = the system gets better at choosing actions
   from an outcome signal. For a harness this is gradient-free policy learning,
   not weight training.
2. **Evolving** = the system's artifacts (prompts, skills, routing tables,
   fixture set, memory) change over time and are selected for fitness.
3. **Agentic** = the system acts with increasing autonomy (responds, then
   self-initiates, then self-schedules, then coordinates others).

You can have any one without the others. A system can be highly agentic and
learn nothing (acts on its own but never improves). It can learn without being
agentic (offline batch policy tuning, human-triggered). Conflating them is how
roadmaps drift into "it becomes alive." Keep them separate.

## Part 1: Reinforcement without weights

True RL updates model weights. That is the lab game and it is off the table for
UnClick (covered in the build plan). What IS available is a family of
gradient-free methods that optimize the apparatus around a fixed model. Ranked
by reality and by fit to UnClick:

### a) Contextual bandits for routing (highest reality, build first)

The simplest real "reinforcement." Treat each choice (which model, which seat,
which tool, which prompt variant) as a bandit arm. Reward = proof-yield (from
`scoreTrace`), minus cost, minus latency. Use epsilon-greedy first (explore a
little, exploit the winner), upgrade to UCB/Thompson later. This is where the
dead `writerlane-router` scoring code gets revived behind a real reward. Cheap,
online-safe, proven. No model training, no gradients.

### b) Evolutionary / population prompt search (high reality, batch)

Instead of hand-tuning prompts and policies, keep a POPULATION of variants, score
each against the frozen fixture set, keep the winners, mutate/recombine, repeat.
This is the DSPy/GEPA-style approach and it has named lift in the literature
(10-40% on structured tasks; GEPA beating heavier methods with far fewer
rollouts). It is offline and batch, so it is safe: nothing changes in production
until a variant beats baseline on held-out fixtures. This is the literal
mechanism behind the word "evolving" done honestly.

### c) Skill / playbook distillation (medium reality, bounded)

Successful trajectories get consolidated into reusable SKILL-style procedures.
The system "learns" a routine for a recurring job. Real, but two hard limits:
(1) quality is bounded by the base model's reasoning — a distilled skill cannot
exceed what the model could already do, it just makes it reliable and cheap to
repeat; (2) naive per-trajectory capture produces an overfit mess. The discipline
is consolidation ACROSS many runs, not saving every success as a rule.

### d) Memory-as-learning (real, but it is storage not capability)

When UnClick saves a fact, a preference, a "this fix solved this error," the
system behaves smarter next time. This is genuine and it is most of the felt
improvement for a user. But be precise: this is the system knowing MORE, not
reasoning BETTER. It is a better-stocked library, not a smarter librarian. Both
matter; do not market the first as the second.

### The non-negotiable that makes any of this "learning" and not drift

A change counts as improvement ONLY if it beats the prior baseline on a frozen
fixture set (see eval spec). Without that gate, "the system is evolving" is
indistinguishable from "the system is changing randomly and we are narrating the
wins." The gate is what separates reinforcement from wishful thinking.

## Part 2: What can actually "evolve," ranked

Concretely, here is everything in UnClick that can change over time and be
selected for fitness, from most to least real:

- **Routing tables** (which arm wins per task type) — evolves fast, low risk.
- **Prompts / instructions** (population search) — evolves in batch, gated.
- **Skill / playbook library** (distilled routines) — grows with use, bounded.
- **Memory** (facts, preferences, troubleshooting) — grows continuously.
- **Fixture set** (every incident becomes a frozen test) — grows; this is the
  system's accumulating "experience" and the moat that compounds.
- **Receipt-acceptance / completion policy thresholds** — tunable, gated.

What does NOT evolve, no matter how much of the above you build:

- Base-model reasoning ability. Fixed at the API ceiling.
- Anything resembling goals-of-its-own or inner life. Adding loops does not
  cross that line; it makes a more capable instrument, not a self. (This is the
  same honest line from the earlier sentience discussion, restated because the
  word "evolving" tends to smuggle it back in.)

## Part 3: The agentic autonomy ladder

"Agentic" is really a ladder of autonomy. UnClick already stands on the lower
rungs. Each higher rung is more powerful and more dangerous, and each needs an
explicit budget/guardrail before it ships.

- **L0 React.** Acts only when prompted. (Trivially present.)
- **L1 Act on signal.** Wakes and acts when a condition fires. PRESENT:
  `check_signals`, `signals/`, `pushonly-tool`. The wake machinery exists.
- **L2 Self-initiate from goals.** Given a standing objective, decides what to
  do next without a per-task prompt. PARTIAL: `orchestrator-context` +
  completion policy give it the inputs; the "pick the next best action" loop is
  the continuity-kernel work in the build plan.
- **L3 Self-schedule recurring work.** Runs itself on a cadence. PRESENT in
  primitive form: `heartbeat-protocol`, cron/wake worker templates.
- **L4 Coordinate other agents.** Spawns/dispatches/verifies other seats.
  PARTIAL: Fishbowl/Boardroom fleet + `route-packet-dispatch` + the
  independent-verifier rule already do multi-agent coordination and recovery.

So UnClick is NOT a chatbot waiting for input. It already has L1 and L3, and
partial L2/L4. The agentic build is mostly about making L2 (self-initiate toward
a goal) reliable and SAFE, not inventing autonomy from scratch.

### The danger rung and the guardrail

Autonomy without a verified outcome signal is the dangerous combination: a system
that acts on its own, learns from its own self-reports, and updates its own
policies can confidently drift (reward hacking, error compounding across a
chain — five 95% steps is ~77% end to end). The guardrails, all already implied
by existing code:

- **Proof-derived reward only.** Never let the agent grade itself; reward comes
  from receipts + git/CI, not self-report. (Completion policy already refuses
  self-closed jobs.)
- **Autonomy budget.** Explicit ceiling on what the system may do without a
  human: which actions, how many, how much spend. Spend guards already exist per
  provider; generalize them into an autonomy budget.
- **Gated self-modification.** If the system edits its own prompts/policies, the
  edit ships only after beating frozen fixtures. Self-modification behind the
  eval gate is "evolution"; self-modification without it is "drift."
- **Destructive/irreversible actions escalate, never auto-retry.**

## Part 4: The honest ceiling on "evolving agentic AI"

Put together, UnClick can become a system that: acts on its own (agentic),
chooses better actions from proof outcomes (reinforcement), and accumulates
routing tables, skills, memory, and fixtures that get selected for fitness
(evolving). That is a genuinely advanced, self-improving OPERATOR.

What it asymptotes toward is "uses a fixed frontier brain superbly, autonomously,
and accountably, getting more reliable every week on its own outcome data." That
is a real, defensible, hard-to-copy thing. What it does NOT asymptote toward is
greater-than-the-base-model intelligence or a self. The compounding is real and
valuable; the ceiling is also real. Both statements are true at once, and the
plan only works if we hold both.

## Where this fits the build order

Reinforcement/evolving/agentic are NOT a separate phase. They are layered onto
the same spine:

1. Truth Kernel + Stale Recovery (gives the agentic L2/L4 substrate).
2. `scoreTrace` + frozen fixtures (gives the reward signal).
3. Bandit router (first real reinforcement).
4. Population prompt search + skill distillation (first real evolving), gated.
5. Autonomy budget (makes higher agentic rungs safe to enable).

Each step is independently shippable and independently measurable. None of them
requires touching model weights, and every one is guarded by the same rule:
ship only what beats baseline on frozen fixtures.
