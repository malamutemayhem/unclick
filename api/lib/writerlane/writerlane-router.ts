import {
  FIXTURE_BACKEND_KIND,
  type WriterLaneInput,
} from "./writerlane-types.js";

export type WriterLaneBackendCost =
  | "free"
  | "paid"
  | "subscription"
  | "fixture";

export type WriterLaneBackendStatus =
  | "available"
  | "disabled"
  | "unconfigured";

export type WriterLaneTaskKind =
  | "docs"
  | "tests"
  | "backend"
  | "frontend"
  | "script"
  | "config"
  | "mixed"
  | "unknown";

// Small, pure routing metadata. The real backend object still lives elsewhere;
// this profile lets the lane choose among free writers before execution.
export interface WriterLaneBackendProfile {
  readonly kind: string;
  readonly cost: WriterLaneBackendCost;
  readonly status: WriterLaneBackendStatus;
  readonly strengths: WriterLaneTaskKind[];
  readonly supportsAutonomyProof: boolean;
  readonly maxOwnedFiles?: number;
  readonly requiresWarmSeat?: boolean;
  readonly priority?: number;
  readonly notes?: string;
}

export interface WriterLaneSelectionPolicy {
  readonly allowPaid?: boolean;
  readonly allowSubscription?: boolean;
  readonly allowFixture?: boolean;
  readonly preferFree?: boolean;
  readonly warmSeatAvailable?: boolean;
  readonly preferredKinds?: string[];
}

export interface WriterLaneCandidateScore {
  readonly kind: string;
  readonly score: number;
  readonly eligible: boolean;
  readonly reasons: string[];
}

export interface WriterLaneSelectionSuccess {
  readonly ok: true;
  readonly selected: WriterLaneBackendProfile;
  readonly taskKind: WriterLaneTaskKind;
  readonly candidates: WriterLaneCandidateScore[];
}

export interface WriterLaneSelectionFailure {
  readonly ok: false;
  readonly reason: string;
  readonly taskKind: WriterLaneTaskKind;
  readonly candidates: WriterLaneCandidateScore[];
}

export type WriterLaneSelection =
  | WriterLaneSelectionSuccess
  | WriterLaneSelectionFailure;

export function chooseWriterLaneBackend(
  input: WriterLaneInput,
  profiles: WriterLaneBackendProfile[],
  policy: WriterLaneSelectionPolicy = {},
): WriterLaneSelection {
  const taskKind = inferWriterLaneTaskKind(input);
  const candidates = profiles
    .map((profile) => scoreProfile(profile, input, taskKind, policy))
    .sort(compareCandidates);

  const selected = candidates.find((candidate) => candidate.eligible);
  if (!selected) {
    return {
      ok: false,
      reason: "writerlane_no_eligible_backend",
      taskKind,
      candidates,
    };
  }

  const selectedProfile = profiles.find(
    (profile) => profile.kind === selected.kind,
  );
  if (!selectedProfile) {
    return {
      ok: false,
      reason: "writerlane_selected_backend_missing",
      taskKind,
      candidates,
    };
  }

  return {
    ok: true,
    selected: selectedProfile,
    taskKind,
    candidates,
  };
}

export function inferWriterLaneTaskKind(
  input: Pick<WriterLaneInput, "scopePack">,
): WriterLaneTaskKind {
  const files = input.scopePack.ownedFiles.map((file) =>
    file.replace(/\\/g, "/").toLowerCase(),
  );
  if (files.length === 0) return "unknown";

  const kinds = new Set(files.map(kindForPath));
  const singleKind = kinds.size === 1 ? [...kinds][0] : null;
  if (singleKind && singleKind !== "unknown") return singleKind;
  if (allDocs(files)) return "docs";
  if (allTests(files)) return "tests";

  const intent = input.scopePack.changeIntent.toLowerCase();
  if (/\b(doc|copy|readme|markdown)\b/.test(intent)) return "docs";
  if (/\b(test|spec|coverage|vitest|playwright)\b/.test(intent)) {
    return "tests";
  }
  if (/\b(api|backend|server|runner|worker|mcp)\b/.test(intent)) {
    return "backend";
  }
  if (/\b(ui|frontend|component|page|tsx|react)\b/.test(intent)) {
    return "frontend";
  }

  return singleKind ?? "mixed";
}

function scoreProfile(
  profile: WriterLaneBackendProfile,
  input: WriterLaneInput,
  taskKind: WriterLaneTaskKind,
  policy: WriterLaneSelectionPolicy,
): WriterLaneCandidateScore {
  const reasons: string[] = [];
  let eligible = true;
  let score = profile.priority ?? 0;
  const preferFree = policy.preferFree ?? true;

  if (profile.status !== "available") {
    eligible = false;
    reasons.push(`status:${profile.status}`);
  }

  if (input.proofMode === "autonomy" && !profile.supportsAutonomyProof) {
    eligible = false;
    reasons.push("no_autonomy_proof");
  }

  if (profile.cost === "paid" && !policy.allowPaid) {
    eligible = false;
    reasons.push("paid_not_allowed");
  }

  if (profile.cost === "subscription" && !policy.allowSubscription) {
    eligible = false;
    reasons.push("subscription_not_allowed");
  }

  if (profile.requiresWarmSeat && !policy.warmSeatAvailable) {
    eligible = false;
    reasons.push("warm_seat_missing");
  }

  if (profile.cost === "fixture" && !policy.allowFixture) {
    eligible = false;
    reasons.push("fixture_not_allowed");
  }

  if (
    profile.kind === FIXTURE_BACKEND_KIND &&
    input.proofMode === "autonomy"
  ) {
    eligible = false;
    reasons.push("fixture_never_autonomy");
  }

  if (
    typeof profile.maxOwnedFiles === "number" &&
    input.scopePack.ownedFiles.length > profile.maxOwnedFiles
  ) {
    eligible = false;
    reasons.push("too_many_owned_files");
  }

  if (policy.preferredKinds?.includes(profile.kind)) {
    score += 100;
    reasons.push("preferred");
  }

  if (profile.strengths.includes(taskKind)) {
    score += 50;
    reasons.push(`strong:${taskKind}`);
  } else if (profile.strengths.includes("mixed")) {
    score += 15;
    reasons.push("generalist");
  }

  if (profile.cost === "free" && preferFree) {
    score += 30;
    reasons.push("free_first");
  }

  if (profile.cost === "paid") {
    score -= 30;
  }

  if (profile.cost === "fixture") {
    score -= 100;
  }

  return {
    kind: profile.kind,
    score: eligible ? score : Number.NEGATIVE_INFINITY,
    eligible,
    reasons,
  };
}

function compareCandidates(
  left: WriterLaneCandidateScore,
  right: WriterLaneCandidateScore,
): number {
  if (left.eligible !== right.eligible) return left.eligible ? -1 : 1;
  if (left.score !== right.score) return right.score - left.score;
  return left.kind.localeCompare(right.kind);
}

function kindForPath(file: string): WriterLaneTaskKind {
  if (isDoc(file)) return "docs";
  if (isTest(file)) return "tests";
  if (file.startsWith("api/") || file.startsWith("packages/")) {
    return "backend";
  }
  if (
    file.startsWith("src/") ||
    file.endsWith(".tsx") ||
    file.endsWith(".jsx") ||
    file.endsWith(".css")
  ) {
    return "frontend";
  }
  if (file.startsWith("scripts/")) return "script";
  if (
    file.startsWith(".github/") ||
    file.endsWith(".json") ||
    file.endsWith(".yml") ||
    file.endsWith(".yaml") ||
    file.endsWith(".toml")
  ) {
    return "config";
  }
  return "unknown";
}

function allDocs(files: string[]): boolean {
  return files.every(isDoc);
}

function allTests(files: string[]): boolean {
  return files.every(isTest);
}

function isDoc(file: string): boolean {
  return (
    file.startsWith("docs/") ||
    file.endsWith(".md") ||
    file.endsWith(".mdx") ||
    file.endsWith(".txt")
  );
}

function isTest(file: string): boolean {
  return (
    file.includes(".test.") ||
    file.includes(".spec.") ||
    file.startsWith("tests/")
  );
}
