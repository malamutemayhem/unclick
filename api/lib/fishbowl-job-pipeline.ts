export interface FishbowlJobPipelineTodo {
  title?: unknown;
  description?: unknown;
  status?: unknown;
}

export type FishbowlJobProofState =
  | "live"
  | "close_eligible"
  | "partial"
  | "blocked"
  | "missing"
  | "missing_ui_proof"
  | "parked"
  | "stale"
  | "wrong_scope";

export type FishbowlJobEffectiveStatus = "open" | "in_progress" | "done" | "dropped" | "needs_proof";

export interface FishbowlJobPipelineState {
  pipeline_stage_count: number;
  pipeline_progress: number;
  pipeline_source: string;
  pipeline_evidence: string[];
  proof_state: FishbowlJobProofState;
  proof_state_reason: string;
  effective_status: FishbowlJobEffectiveStatus;
  release_blocked: boolean;
  release_block_reason: string | null;
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

const PROOF_RESET_RE = /\b(reopened|re-opened|proof\s+reset|false\s+completion|partial\s+completion)\b/i;
const PROOF_MISSING_RE =
  /\b(no|missing|needs?|needed|waiting for|without|incomplete|stale)\s+(?:live\s+)?proof\b|\bproof\s+(?:missing|needed|incomplete|stale|not available)\b/i;
const PROOF_UI_MISSING_RE =
  /\b(no|missing|needs?|needed|waiting for|without|incomplete)\s+(?:authenticated\s+)?(?:ui|screenshot|browser|live page|live product)\s+proof\b|\b(?:ui|screenshot|browser|live page|live product)\s+proof\s+(?:missing|needed|incomplete|not available)\b/i;
const PROOF_BLOCKED_RE = /\b(blocker|blocked|hold|do not merge|do not lift|cannot close|not closable)\b/i;
const PROOF_PARTIAL_RE = /\b(partial|partial\/blocker|proof ceiling|follow-?up needed|not enough to close)\b/i;
const PROOF_PARKED_RE = /\b(parked|parking|deferred|not next|scopepack needed|missing scopepack)\b/i;
const PROOF_STALE_RE = /\b(stale|old|outdated)\s+(?:receipt|proof|green chip|claim)|\bfalse[- ]done\b|\bfalse green\b/i;
const PROOF_WRONG_SCOPE_RE = /\b(wrong scope|scope mismatch|wrong surface|different scope|wrong job|not the requested surface)\b/i;

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

function canonicalStatus(status: unknown): Exclude<FishbowlJobEffectiveStatus, "needs_proof"> {
  return status === "in_progress" || status === "done" || status === "dropped" ? status : "open";
}

function withEffectiveStatus(
  status: unknown,
  state: Omit<FishbowlJobPipelineState, "effective_status" | "release_blocked" | "release_block_reason">,
): FishbowlJobPipelineState {
  const baseStatus = canonicalStatus(status);
  const effectiveStatus =
    baseStatus === "done" && state.proof_state !== "close_eligible" ? "needs_proof" : baseStatus;
  const releaseBlocked = effectiveStatus === "needs_proof";
  return {
    ...state,
    effective_status: effectiveStatus,
    release_blocked: releaseBlocked,
    release_block_reason: releaseBlocked ? state.proof_state_reason : null,
  };
}

function proofWarningForText(text: string): Pick<FishbowlJobPipelineState, "proof_state" | "proof_state_reason"> | null {
  if (PROOF_WRONG_SCOPE_RE.test(text)) {
    return {
      proof_state: "wrong_scope",
      proof_state_reason: "Proof is attached to the wrong scope.",
    };
  }
  if (PROOF_UI_MISSING_RE.test(text)) {
    return {
      proof_state: "missing_ui_proof",
      proof_state_reason: "UI or browser proof is still missing.",
    };
  }
  if (PROOF_STALE_RE.test(text) || PROOF_RESET_RE.test(text)) {
    return {
      proof_state: "stale",
      proof_state_reason: "The latest receipt is stale or reset.",
    };
  }
  if (PROOF_MISSING_RE.test(text)) {
    return {
      proof_state: "missing",
      proof_state_reason: "Proof is recorded as missing.",
    };
  }
  if (PROOF_PARKED_RE.test(text)) {
    return {
      proof_state: "parked",
      proof_state_reason: "The job is parked or waiting for scope.",
    };
  }
  if (PROOF_PARTIAL_RE.test(text)) {
    return {
      proof_state: "partial",
      proof_state_reason: "Only partial proof is recorded.",
    };
  }
  if (PROOF_BLOCKED_RE.test(text)) {
    return {
      proof_state: "blocked",
      proof_state_reason: "A blocker or hold is recorded after the latest proof.",
    };
  }
  return null;
}

function proofStateFromWarning(
  activeSegments: string[],
  latestProgressIndex: number,
  fallback: Pick<FishbowlJobPipelineState, "proof_state" | "proof_state_reason">,
): Pick<FishbowlJobPipelineState, "proof_state" | "proof_state_reason"> {
  const latestWarning = activeSegments.reduce<
    (Pick<FishbowlJobPipelineState, "proof_state" | "proof_state_reason"> & { index: number }) | null
  >((latest, segment, index) => {
    const warning = proofWarningForText(segment);
    return warning ? { ...warning, index } : latest;
  }, null);

  if (latestWarning && latestWarning.index >= latestProgressIndex) {
    const { index: _index, ...warning } = latestWarning;
    return warning;
  }

  return fallback;
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
    const warning = proofWarningForText(latestResetText) ?? {
      proof_state: resetHit ? "stale" : "missing",
      proof_state_reason: resetHit ? "The latest receipt is stale or reset." : "Proof is recorded as missing.",
    };
    return withEffectiveStatus(status, {
      pipeline_stage_count: stageRank.brief,
      pipeline_progress: stageProgress[stageRank.brief],
      pipeline_source: resetHit ? "reopened: proof reset" : "proof: missing",
      pipeline_evidence: resetHit ? ["reopened", "proof_missing"] : ["proof_missing"],
      ...warning,
    });
  }

  const activeSegments = latestResetIndex >= 0 ? segments.slice(latestResetIndex + 1) : segments;
  const corpus = activeSegments.join("\n");
  const latestActiveProgressIndex = activeSegments.reduce((latest, segment, index) => {
    return positiveStageHit(
      segment,
      /\b(implemented|built|build complete|patch applied|changes applied|pr\s*#?\d+|branch ready|commit(?:ted)?|ready for proof|build passed|checks? (?:passed|green)|tests? passed|proof (?:passed|complete|attached|submitted|recorded|current|clean)|verification (?:passed|complete)|ci passed|npm run build passed|qc pass|review(?:ed)?|reviewer pass|gatekeeper pass|safety pass|approved|ack:\s*pass|pass on #\d+|ready for review|pr\s*#?\d+\s+merged|merged\s+#?\d+|merged into main|deployed|published|shipped|live on production|production live)\b/i,
      /\b(blocker|hold|do not merge|do not lift)\b/i,
    )
      ? index
      : latest;
  }, -1);
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

  return withEffectiveStatus(status, {
    pipeline_stage_count: activeCount,
    pipeline_progress: stageProgress[activeCount] ?? stageProgress[stageRank.brief],
    pipeline_source: source,
    pipeline_evidence: evidence,
    ...proofStateFromWarning(activeSegments, latestActiveProgressIndex, {
      proof_state:
        activeCount >= stageRank.ship && evidence.length > 0 ? "close_eligible" : status === "done" ? "missing" : "live",
      proof_state_reason:
        activeCount >= stageRank.ship && evidence.length > 0
          ? "Ship proof is linked with no newer proof warning."
          : status === "done"
            ? "Completed job needs observable proof."
          : "No newer proof warning is recorded.",
    }),
  });
}
