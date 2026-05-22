export interface FishbowlJobPipelineTodo {
  title?: unknown;
  description?: unknown;
  status?: unknown;
}

export interface FishbowlJobPipelineState {
  pipeline_stage_count: number;
  pipeline_progress: number;
  pipeline_source: string;
  pipeline_evidence: string[];
  proof_state: FishbowlProofState;
  proof_state_label: string;
  proof_state_detail: string;
  proof_state_closable: boolean;
}

export type FishbowlJobPipelineComment =
  | string
  | {
      text?: unknown;
      created_at?: unknown;
    };

const stageRank = {
  brief: 1,
  build: 2,
  proof: 3,
  review: 4,
  ship: 5,
} as const;

const stageProgress: Record<number, number> = {
  1: 10,
  2: 55,
  3: 70,
  4: 85,
  5: 100,
};

export type FishbowlProofState =
  | "LIVE"
  | "PARTIAL"
  | "BLOCKED"
  | "MISSING_UI_PROOF"
  | "PARKED"
  | "STALE"
  | "WRONG_SCOPE"
  | "CLOSE_ELIGIBLE"
  | "MISSING";

const PROOF_STATE_COPY: Record<
  FishbowlProofState,
  {
    label: string;
    detail: string;
    closable: boolean;
  }
> = {
  LIVE: {
    label: "Live proof",
    detail: "Current proof is present for this job.",
    closable: true,
  },
  CLOSE_ELIGIBLE: {
    label: "Close eligible",
    detail: "Current proof looks complete enough for a closer to review.",
    closable: true,
  },
  PARTIAL: {
    label: "Partial proof",
    detail: "Some real proof exists, but it does not satisfy the full job scope.",
    closable: false,
  },
  BLOCKED: {
    label: "Proof blocked",
    detail: "The latest proof says this job is blocked or waiting on required evidence.",
    closable: false,
  },
  MISSING_UI_PROOF: {
    label: "Missing UI proof",
    detail: "This visual or admin-surface job needs screenshot or browser proof.",
    closable: false,
  },
  PARKED: {
    label: "Parked",
    detail: "This job has a parking or scoping decision, not completion proof.",
    closable: false,
  },
  STALE: {
    label: "Stale proof",
    detail: "Older proof is present, but later evidence says it is stale or reset.",
    closable: false,
  },
  WRONG_SCOPE: {
    label: "Wrong scope",
    detail: "Linked proof appears to cover a narrower or different scope.",
    closable: false,
  },
  MISSING: {
    label: "Proof missing",
    detail: "Required outcome proof is missing.",
    closable: false,
  },
};

const PROOF_RESET_RE = /\b(reopened|re-opened|proof\s+reset|false\s+completion|partial\s+completion)\b/i;
const PROOF_MISSING_RE =
  /\b(no|missing|needs?|needed|waiting for|without|incomplete|stale)\s+(?:live\s+)?proof\b|\bproof\s+(?:missing|needed|incomplete|stale|not available)\b/i;
const PROOF_UI_MISSING_RE =
  /\b(missing|needs?|needed|without|lacks?)\b.{0,80}\b(authenticated\s+)?(screenshot|browser|ui|admin\s+screen|\/admin)\b|\b(screenshot|browser|ui)\b.{0,80}\b(missing|needed|required)\b/i;
const PROOF_WRONG_SCOPE_RE =
  /\bwrong[-_\s]?scope\b|\bbroad(?:er)?\s+(?:parent|scope)\b|\bnarrower\s+(?:slice|scope)\b|\bnot\s+(?:the\s+)?whole\b|\bfull\s+acceptance\b/i;
const PROOF_BLOCKED_RE =
  /\b(blocker|blocked|hold|do not merge|do not lift|waiting on|pending owner|owner lift|safe fail-fast|missing configured)\b/i;
const PROOF_PARKED_RE = /\bparked\b|\bkeep\s+(?:it\s+)?parked\b|\bparking decision\b/i;
const PROOF_PARTIAL_RE = /\bpartial\b|\bfirst[-\s]?slice\b|\breal\s+first\s+slice\b|\bnot\s+completion\s+proof\b/i;

function positiveStageHit(text: string, positive: RegExp, negative?: RegExp): boolean {
  if (!positive.test(text)) return false;
  return negative ? !negative.test(text) : true;
}

function commentText(comment: FishbowlJobPipelineComment): string {
  if (typeof comment === "string") return comment;
  return typeof comment.text === "string" ? comment.text : "";
}

function buildSegments(todo: FishbowlJobPipelineTodo, comments: FishbowlJobPipelineComment[]): string[] {
  const commentSegments = [...comments].sort((a, b) => {
    if (typeof a === "string" || typeof b === "string") return 0;
    const aTime = typeof a.created_at === "string" ? Date.parse(a.created_at) : Number.NaN;
    const bTime = typeof b.created_at === "string" ? Date.parse(b.created_at) : Number.NaN;
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return aTime - bTime;
  });
  return [todo.title, todo.description, ...commentSegments.map(commentText)]
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .map((value) => value.toLowerCase());
}

function proofStateFromText(text: string): FishbowlProofState | null {
  if (PROOF_PARKED_RE.test(text)) return "PARKED";
  if (PROOF_UI_MISSING_RE.test(text)) return "MISSING_UI_PROOF";
  if (PROOF_WRONG_SCOPE_RE.test(text)) return "WRONG_SCOPE";
  if (PROOF_BLOCKED_RE.test(text)) return "BLOCKED";
  if (PROOF_RESET_RE.test(text) || /\bstale\s+proof\b/i.test(text)) return "STALE";
  if (PROOF_PARTIAL_RE.test(text)) return "PARTIAL";
  if (PROOF_MISSING_RE.test(text)) return "MISSING";
  return null;
}

function proofStateFields(state: FishbowlProofState): Pick<
  FishbowlJobPipelineState,
  "proof_state" | "proof_state_label" | "proof_state_detail" | "proof_state_closable"
> {
  const copy = PROOF_STATE_COPY[state];
  return {
    proof_state: state,
    proof_state_label: copy.label,
    proof_state_detail: copy.detail,
    proof_state_closable: copy.closable,
  };
}

function inferProofState(
  segments: string[],
  latestProgressIndex: number,
  status: string,
  activeCount: number,
  evidence: string[],
): FishbowlProofState {
  const latestIssue = segments.reduce<{ index: number; state: FishbowlProofState | null }>(
    (latest, segment, index) => {
      const state = proofStateFromText(segment);
      return state ? { index, state } : latest;
    },
    { index: -1, state: null },
  );
  if (latestIssue.state && latestIssue.index >= latestProgressIndex) return latestIssue.state;
  if (activeCount >= stageRank.ship && evidence.includes("proof")) return "CLOSE_ELIGIBLE";
  if (evidence.includes("proof")) return "LIVE";
  if (status === "done") return "MISSING";
  return "MISSING";
}

export function inferFishbowlJobPipeline(
  todo: FishbowlJobPipelineTodo,
  comments: FishbowlJobPipelineComment[] = [],
): FishbowlJobPipelineState {
  const segments = buildSegments(todo, comments);
  const latestResetIndex = segments.reduce((latest, segment, index) => {
    return PROOF_RESET_RE.test(segment) || PROOF_MISSING_RE.test(segment) ? index : latest;
  }, -1);
  const latestProgressIndex = segments.reduce((latest, segment, index) => {
    return positiveStageHit(
      segment,
      /\b(implemented|built|build complete|patch applied|changes applied|pr\s*#?\d+|branch ready|commit(?:ted)?|ready for proof|build passed|checks? (?:passed|green)|tests? passed|proof (?:passed|complete|attached|submitted|recorded|current|clean)|verification (?:passed|complete)|ci passed|npm run build passed|qc pass|review(?:ed)?|reviewer pass|gatekeeper pass|safety pass|approved|ack:\s*pass|pass on #\d+|ready for review|pr\s*#?\d+\s+merged|merged\s+#?\d+|merged into main|deployed|published|shipped|live on production|production live)\b/i,
      /\b(blocker|hold|do not merge|do not lift)\b/i,
    )
      ? index
      : latest;
  }, -1);

  const status = String(todo.status ?? "");
  if (latestResetIndex >= 0 && latestResetIndex > latestProgressIndex) {
    const latestResetText = segments[latestResetIndex] ?? "";
    const resetHit = PROOF_RESET_RE.test(latestResetText);
    return {
      pipeline_stage_count: stageRank.brief,
      pipeline_progress: stageProgress[stageRank.brief],
      pipeline_source: resetHit ? "reopened: proof reset" : "proof: missing",
      pipeline_evidence: resetHit ? ["reopened", "proof_missing"] : ["proof_missing"],
      ...proofStateFields(resetHit ? "STALE" : "MISSING"),
    };
  }

  const activeSegments = latestResetIndex >= 0 ? segments.slice(latestResetIndex + 1) : segments;
  const corpus = activeSegments.join("\n");
  let activeCount = status === "done" ? stageRank.ship : status === "in_progress" ? stageRank.build : stageRank.brief;
  let source = status === "done" ? "status: done" : status === "in_progress" ? "status: active" : "status: open";
  const evidence: string[] = [];

  if (
    positiveStageHit(
      corpus,
      /\b(implemented|built|build complete|patch applied|changes applied|pr\s*#?\d+|branch ready|commit(?:ted)?|ready for proof)\b/i,
    )
  ) {
    activeCount = Math.max(activeCount, stageRank.build);
    evidence.push("build");
    source = "receipt: build";
  }

  if (
    positiveStageHit(
      corpus,
      /\b(build passed|checks? (?:passed|green)|tests? passed|proof (?:passed|complete|attached|submitted|recorded|current|clean)|verification (?:passed|complete)|ci passed|npm run build passed)\b/i,
      PROOF_MISSING_RE,
    )
  ) {
    activeCount = Math.max(activeCount, stageRank.proof);
    evidence.push("proof");
    source = "receipt: proof";
  }

  if (
    positiveStageHit(
      corpus,
      /\b(qc pass|review(?:ed)?|reviewer pass|gatekeeper pass|safety pass|approved|ack:\s*pass|pass on #\d+|ready for review)\b/i,
      /\b(no|missing|needs?|needed|waiting for|without|incomplete)\s+(?:qc|review|pass)\b|\b(blocker|hold|do not merge|do not lift)\b/i,
    )
  ) {
    activeCount = Math.max(activeCount, stageRank.review);
    evidence.push("review");
    source = "receipt: review";
  }

  if (
    positiveStageHit(
      corpus,
      /\b(pr\s*#?\d+\s+merged|merged\s+#?\d+|merged into main|deployed|published|shipped|live on production|production live)\b/i,
      /\b(not merged|unmerged|do not merge|blocked from merge|merge blocked)\b/i,
    )
  ) {
    activeCount = Math.max(activeCount, stageRank.ship);
    evidence.push("ship");
    source = "receipt: ship";
  }

  const proofState = inferProofState(segments, latestProgressIndex, status, activeCount, evidence);

  return {
    pipeline_stage_count: activeCount,
    pipeline_progress: stageProgress[activeCount] ?? stageProgress[stageRank.brief],
    pipeline_source: source,
    pipeline_evidence: evidence,
    ...proofStateFields(proofState),
  };
}
