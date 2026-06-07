export type ControlTowerLaneStatus = "waiting" | "claimed" | "in_progress" | "blocked" | "done" | "stale";

export type ControlTowerLaneRole =
  | "intake"
  | "builder"
  | "uiux"
  | "xpass"
  | "crews"
  | "integrator"
  | "reviewer"
  | "helper";

export interface ControlTowerJobBoardItem {
  id: string;
  title: string;
  description?: string | null;
  status: "open" | "in_progress" | "done" | "dropped";
  priority?: "low" | "normal" | "high" | "urgent";
  assignedTo?: string | null;
  updatedAt?: string | null;
  proofState?: string | null;
  releaseBlocked?: boolean | null;
}

export interface ControlTowerPasteIntake {
  rawItems: number;
  usefulItems: number;
  duplicatesIgnored: number;
  redactedItems: number;
  tasks: string[];
  decisions: string[];
  blockers: string[];
  proofRefs: string[];
  usefulLines: string[];
}

export interface ControlTowerLane {
  id: string;
  title: string;
  summary: string;
  status: ControlTowerLaneStatus;
  role: ControlTowerLaneRole;
  source: "default" | "job_board" | "paste_intake";
  sourceJobId?: string;
  assignedWorkerId?: string | null;
  workerLabel?: string | null;
  updatedAt?: string | null;
  proofNeeded: string;
}

export interface ControlTowerWorkerCounts {
  totalLanes: number;
  activeSlots: number;
  activeWorkers: number;
  waiting: number;
  blocked: number;
  done: number;
  stale: number;
  helperSlots: number;
}

export interface ControlTowerPlan {
  id: string;
  title: string;
  triggered: boolean;
  triggerReasons: string[];
  sourceOfTruth: string;
  maxActiveWorkers: number;
  workerCounts: ControlTowerWorkerCounts;
  intake: ControlTowerPasteIntake;
  lanes: ControlTowerLane[];
  masterCopyBox: string;
  xgateStatus: "preflight_required" | "clear_for_readonly_planning";
  xpassChecklist: string[];
  crewsMode: "lite" | "council";
  resumeHint: string;
}

export interface CreateControlTowerPlanInput {
  prompt: string;
  pastes?: string[];
  jobBoardItems?: ControlTowerJobBoardItem[];
  maxActiveWorkers?: number;
  now?: Date | string;
}

export interface ClaimControlTowerLaneInput {
  workerId?: string;
  now?: Date | string;
}

export interface ControlTowerClaim {
  claimType: "lane" | "stale_takeover" | "helper" | "done";
  lane?: ControlTowerLane;
  workerNumber: number;
  workerTotal: number;
  helperRole?: "Scout" | "Reviewer" | "Proof Checker";
  message: string;
}

const DEFAULT_MAX_ACTIVE_WORKERS = 4;
const DEFAULT_TOTAL_LANES = 7;
const STALE_AFTER_MS = 8 * 60 * 60 * 1000;

const BIG_JOB_RULES: Array<[RegExp, string]> = [
  [/\b(control\s*tower|controltower|master copy box|worker lane|worker lanes|worker\s+\d+\s+of\s+\d+)\b/i, "Control Tower language"],
  [/\b(big job|large job|whole|entire|everything|site-wide|platform-wide|all of|full pass|full sweep)\b/i, "big or broad job"],
  [/\b(complete|finish|100%|perfect|launch|ship|go live|dogfood|dogtest|dogtesting)\b/i, "finish or launch standard"],
  [/\b(scopepack|boardroom jobs|job board|workers|new chats|worker chats|handover|copybox)\b/i, "multi-worker coordination"],
  [/\b(xpass|uipass|uxpass|testpass|copypass|sloppass|commonsensepass|crews|council|xgate)\b/i, "XGate/XPass/Crews proof path"],
  [/\b(continue working on any controltower jobs|continue controltower|active controltower jobs)\b/i, "forgotten copy box recovery"],
];

const TASK_RULE = /\b(todo|fix|build|add|make|finish|complete|need|needs|should|must|please|implement|wire|test|verify|dogtest|dogfood)\b/i;
const DECISION_RULE = /\b(decision|decided|approved|greenlit|we will|we should|must use|source of truth|do not|always|never)\b/i;
const BLOCKER_RULE = /\b(blocker|blocked|stuck|cannot|can't|missing|waiting|fails|failing|not ready|risk|problem)\b/i;
const PROOF_RULE = /\b(pr\s*#?\d+|pull request|commit|sha|screenshot|test|build|ci|vercel|github actions|proof|receipt|http:\/\/|https:\/\/)\b/i;

const SECRET_RULES = [
  /\b(?:api[_-]?key|token|secret|password|bearer)\b\s*[:=]\s*\S+/i,
  /\bsk-[A-Za-z0-9_-]{16,}\b/,
  /\bghp_[A-Za-z0-9_]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
];

function asDate(value: Date | string | undefined): Date {
  if (value instanceof Date) return value;
  if (value) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

function cleanLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function compactText(value: string, max = 120): string {
  const cleaned = cleanLine(value);
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 3).trimEnd()}...`;
}

function normalizeForDedupe(value: string): string {
  return cleanLine(value)
    .toLowerCase()
    .replace(/^[-*#>\s]+/, "")
    .replace(/[^\w\s/:#.-]/g, "")
    .trim();
}

function redactSecretLine(line: string): { text: string; redacted: boolean } {
  if (!SECRET_RULES.some((rule) => rule.test(line))) return { text: line, redacted: false };
  return { text: "[redacted secret-like text]", redacted: true };
}

export function shouldTriggerControlTower(prompt: string): { triggered: boolean; reasons: string[] } {
  const text = cleanLine(prompt);
  const reasons = BIG_JOB_RULES.filter(([rule]) => rule.test(text)).map(([, reason]) => reason);
  const score = reasons.length;

  return {
    triggered: score >= 2 || /\b(control\s*tower|controltower|continue controltower)\b/i.test(text),
    reasons,
  };
}

export function analyzePasteIntake(pastes: string[] = []): ControlTowerPasteIntake {
  const seen = new Set<string>();
  const tasks: string[] = [];
  const decisions: string[] = [];
  const blockers: string[] = [];
  const proofRefs: string[] = [];
  const usefulLines: string[] = [];
  let rawItems = 0;
  let duplicatesIgnored = 0;
  let redactedItems = 0;

  for (const paste of pastes) {
    for (const rawLine of paste.split(/\r?\n/)) {
      const cleaned = cleanLine(rawLine.replace(/^[-*#>\s]+/, ""));
      if (!cleaned) continue;
      rawItems += 1;

      const { text, redacted } = redactSecretLine(cleaned);
      if (redacted) redactedItems += 1;
      const normalized = normalizeForDedupe(text);
      if (!normalized) continue;
      if (seen.has(normalized)) {
        duplicatesIgnored += 1;
        continue;
      }
      seen.add(normalized);
      usefulLines.push(text);

      const short = compactText(text, 140);
      if (TASK_RULE.test(text)) tasks.push(short);
      if (DECISION_RULE.test(text)) decisions.push(short);
      if (BLOCKER_RULE.test(text)) blockers.push(short);
      if (PROOF_RULE.test(text)) proofRefs.push(short);
    }
  }

  return {
    rawItems,
    usefulItems: usefulLines.length,
    duplicatesIgnored,
    redactedItems,
    tasks: tasks.slice(0, 12),
    decisions: decisions.slice(0, 12),
    blockers: blockers.slice(0, 12),
    proofRefs: proofRefs.slice(0, 12),
    usefulLines: usefulLines.slice(0, 40),
  };
}

function titleFromPrompt(prompt: string): string {
  const firstLine = prompt.split(/\r?\n/).map(cleanLine).find(Boolean);
  if (!firstLine) return "Untitled Control Tower job";
  return compactText(firstLine.replace(/^control\s*tower\s*[:=-]?\s*/i, ""), 78);
}

function planIdFromTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 44);
  return `controltower-${slug || "job"}`;
}

function statusFromJob(item: ControlTowerJobBoardItem, now: Date): ControlTowerLaneStatus {
  if (item.status === "done") return "done";
  if (item.status === "dropped") return "blocked";
  if (item.releaseBlocked) return "blocked";
  if (item.status === "in_progress") {
    const updated = item.updatedAt ? new Date(item.updatedAt) : null;
    if (updated && !Number.isNaN(updated.getTime()) && now.getTime() - updated.getTime() > STALE_AFTER_MS) {
      return "stale";
    }
    return item.assignedTo ? "claimed" : "in_progress";
  }
  return "waiting";
}

function priorityRank(item: ControlTowerJobBoardItem): number {
  if (item.priority === "urgent") return 4;
  if (item.priority === "high") return 3;
  if (item.priority === "normal") return 2;
  return 1;
}

function laneFromJob(item: ControlTowerJobBoardItem, index: number, now: Date): ControlTowerLane {
  const status = statusFromJob(item, now);
  return {
    id: `job-${index + 1}-${item.id}`,
    title: compactText(item.title, 80),
    summary: compactText(item.description || item.title, 150),
    status,
    role: status === "blocked" || status === "done" ? "reviewer" : "builder",
    source: "job_board",
    sourceJobId: item.id,
    assignedWorkerId: item.assignedTo ?? null,
    workerLabel: item.assignedTo ? compactText(item.assignedTo, 42) : null,
    updatedAt: item.updatedAt ?? null,
    proofNeeded: item.proofState === "green" ? "Keep proof linked to the Boardroom job." : "Post commit, PR, test, screenshot, or explicit blocker proof back to Boardroom Jobs.",
  };
}

function defaultLanes(intake: ControlTowerPasteIntake): ControlTowerLane[] {
  const pasteLaneStatus: ControlTowerLaneStatus = intake.usefulItems > 0 ? "waiting" : "waiting";

  return [
    {
      id: "intake-scopepack",
      title: "Intake and ScopePack",
      summary: "Clean the big prompt and pasted context into one small source-of-truth packet.",
      status: pasteLaneStatus,
      role: "intake",
      source: intake.usefulItems > 0 ? "paste_intake" : "default",
      proofNeeded: "Post the final ScopePack and note which duplicate or risky paste was ignored.",
    },
    {
      id: "boardroom-jobs",
      title: "Boardroom Jobs alignment",
      summary: "Match the job to existing Boardroom Jobs so workers do not invent a second queue.",
      status: "waiting",
      role: "reviewer",
      source: "default",
      proofNeeded: "Link the Boardroom job ids or say NO_EXISTING_JOB_FOUND.",
    },
    {
      id: "build-lane",
      title: "Build lane",
      summary: "Make the narrow code or content change for the assigned slice only.",
      status: "waiting",
      role: "builder",
      source: "default",
      proofNeeded: "Post changed files, commit or PR, and focused test proof.",
    },
    {
      id: "uiux-lane",
      title: "UI/UX lane",
      summary: "Use UIPass and UXPass thinking to check layout, clarity, and non-generic product feel.",
      status: "waiting",
      role: "uiux",
      source: "default",
      proofNeeded: "Post screenshot or browser proof plus the UX judgment.",
    },
    {
      id: "xpass-proof",
      title: "XPass proof lane",
      summary: "Run the relevant pass checks and keep missing proof visible.",
      status: "waiting",
      role: "xpass",
      source: "default",
      proofNeeded: "Post TestPass, UIPass, UXPass, CopyPass, SlopPass, or other relevant receipt.",
    },
    {
      id: "crews-council",
      title: "Crews Council lane",
      summary: "Use Council Lite when there is judgment, taste, risk, conflict, or over-agreement risk.",
      status: "waiting",
      role: "crews",
      source: "default",
      proofNeeded: "Post the objections, missing evidence, dissent, and smallest proof needed.",
    },
    {
      id: "integrate-closeout",
      title: "Integration and closeout",
      summary: "Merge the lane reports into one final answer without pretending gaps are done.",
      status: "waiting",
      role: "integrator",
      source: "default",
      proofNeeded: "Post final status with shipped work, open gaps, cloud checks, and next action.",
    },
  ];
}

function buildLanes(input: CreateControlTowerPlanInput, intake: ControlTowerPasteIntake, now: Date): ControlTowerLane[] {
  const activeJobs = [...(input.jobBoardItems ?? [])]
    .filter((item) => item.status !== "done" && item.status !== "dropped")
    .sort((a, b) => priorityRank(b) - priorityRank(a))
    .slice(0, 4)
    .map((item, index) => laneFromJob(item, index, now));

  if (activeJobs.length === 0) return defaultLanes(intake);

  const fallback = defaultLanes(intake);
  const laneIds = new Set(activeJobs.map((lane) => lane.id));
  const merged = [
    fallback[0],
    ...activeJobs,
    fallback.find((lane) => lane.id === "xpass-proof"),
    fallback.find((lane) => lane.id === "crews-council"),
    fallback.find((lane) => lane.id === "integrate-closeout"),
  ].filter((lane): lane is ControlTowerLane => Boolean(lane));

  for (const lane of fallback) {
    if (merged.length >= DEFAULT_TOTAL_LANES) break;
    if (!laneIds.has(lane.id) && !merged.some((existing) => existing.id === lane.id)) merged.push(lane);
  }

  return merged.slice(0, DEFAULT_TOTAL_LANES);
}

function workerCounts(lanes: ControlTowerLane[], maxActiveWorkers: number): ControlTowerWorkerCounts {
  const activeWorkers = lanes.filter((lane) => lane.status === "claimed" || lane.status === "in_progress").length;
  const waiting = lanes.filter((lane) => lane.status === "waiting").length;
  const blocked = lanes.filter((lane) => lane.status === "blocked").length;
  const done = lanes.filter((lane) => lane.status === "done").length;
  const stale = lanes.filter((lane) => lane.status === "stale").length;

  return {
    totalLanes: lanes.length,
    activeSlots: Math.min(maxActiveWorkers, lanes.length),
    activeWorkers,
    waiting,
    blocked,
    done,
    stale,
    helperSlots: Math.max(0, lanes.length - maxActiveWorkers),
  };
}

function buildMasterCopyBox(plan: Omit<ControlTowerPlan, "masterCopyBox">): string {
  const firstOpenLane = plan.lanes.find((lane) => lane.status === "waiting" || lane.status === "stale");
  const firstLaneText = firstOpenLane ? `${firstOpenLane.title} (${firstOpenLane.id})` : "Ask Control Tower for a helper role";

  return [
    "CONTROL TOWER JOB",
    `Job: ${plan.title}`,
    `Source of truth: ${plan.sourceOfTruth}`,
    `Workers: ${plan.workerCounts.activeWorkers}/${plan.workerCounts.activeSlots} active, ${plan.workerCounts.waiting} waiting, ${plan.workerCounts.stale} stale, ${plan.workerCounts.blocked} blocked.`,
    "",
    "I am a new worker chat.",
    "1. Load active ControlTower jobs, Boardroom Jobs, and the latest ScopePack before acting.",
    "2. Claim one waiting or stale lane only. Say: I am Worker X of Y for <lane>.",
    "3. Work only that lane. Do not start random extra work.",
    "4. Report proof back to the lane: files, PR, tests, screenshot, receipt, or exact blocker.",
    "5. If all worker slots are full, become a Scout, Reviewer, or Proof Checker.",
    "6. If the user only says continue ControlTower jobs, find the active ControlTower job and claim the next open or stale lane.",
    "",
    `Suggested first lane: ${firstLaneText}`,
    `XGate: ${plan.xgateStatus}`,
    `Crews: ${plan.crewsMode === "council" ? "Council Lite required for dissent and judgment" : "Lite check only unless risk rises"}`,
  ].join("\n");
}

export function createControlTowerPlan(input: CreateControlTowerPlanInput): ControlTowerPlan {
  const now = asDate(input.now);
  const maxActiveWorkers = Math.max(1, Math.min(12, input.maxActiveWorkers ?? DEFAULT_MAX_ACTIVE_WORKERS));
  const title = titleFromPrompt(input.prompt);
  const trigger = shouldTriggerControlTower(input.prompt);
  const intake = analyzePasteIntake(input.pastes);
  const lanes = buildLanes(input, intake, now);
  const counts = workerCounts(lanes, maxActiveWorkers);
  const hasRisk = intake.blockers.length > 0 || /\b(launch|ship|legal|security|delete|merge|deploy|production|pricing|claim|public)\b/i.test(input.prompt);

  const withoutCopyBox: Omit<ControlTowerPlan, "masterCopyBox"> = {
    id: planIdFromTitle(title),
    title,
    triggered: trigger.triggered,
    triggerReasons: trigger.reasons,
    sourceOfTruth: "Boardroom Jobs + Boardroom + latest ScopePack",
    maxActiveWorkers,
    workerCounts: counts,
    intake,
    lanes,
    xgateStatus: hasRisk ? "preflight_required" : "clear_for_readonly_planning",
    xpassChecklist: [
      "TestPass for changed code",
      "UIPass and UXPass for visible UI",
      "CopyPass for copied source text or labels",
      "SlopPass and CommonSensePass for generic or over-agreeable output",
      "Crews Council Lite when judgment, taste, risk, conflict, or launch decisions appear",
      "Boardroom proof receipt before any done claim",
    ],
    crewsMode: hasRisk || trigger.reasons.includes("XGate/XPass/Crews proof path") ? "council" : "lite",
    resumeHint:
      "If a worker chat starts without the copy box, it should ask Control Tower for active jobs, read Boardroom Jobs, claim one open or stale lane, and report Worker X of Y.",
  };

  return {
    ...withoutCopyBox,
    masterCopyBox: buildMasterCopyBox(withoutCopyBox),
  };
}

export function claimControlTowerLane(plan: ControlTowerPlan, input: ClaimControlTowerLaneInput = {}): ControlTowerClaim {
  const now = asDate(input.now);
  const activeWorkers = plan.lanes.filter((lane) => lane.status === "claimed" || lane.status === "in_progress").length;
  const workerTotal = plan.workerCounts.totalLanes;
  const workerNumber = Math.min(activeWorkers + 1, workerTotal || 1);
  const helperRoles: Array<"Scout" | "Reviewer" | "Proof Checker"> = ["Scout", "Reviewer", "Proof Checker"];

  if (activeWorkers >= plan.maxActiveWorkers) {
    const role = helperRoles[activeWorkers % helperRoles.length];
    return {
      claimType: "helper",
      workerNumber,
      workerTotal,
      helperRole: role,
      message: `All ${plan.maxActiveWorkers} active worker slots are full. I am a ${role} for Worker ${workerNumber} of ${workerTotal}; I will review, scout, or verify proof without starting random work.`,
    };
  }

  const lane = plan.lanes.find((candidate) => candidate.status === "stale") ?? plan.lanes.find((candidate) => candidate.status === "waiting");
  if (!lane) {
    return {
      claimType: "done",
      workerNumber,
      workerTotal,
      message: `All ${workerTotal} Control Tower lanes are already closed or blocked. I will report status instead of starting extra work.`,
    };
  }

  const staleUpdated = lane.status === "stale" && lane.updatedAt ? new Date(lane.updatedAt) : null;
  const staleHours =
    staleUpdated && !Number.isNaN(staleUpdated.getTime())
      ? Math.max(1, Math.round((now.getTime() - staleUpdated.getTime()) / (60 * 60 * 1000)))
      : null;
  const staleNote = staleHours ? ` It was stale for about ${staleHours} hours.` : "";

  return {
    claimType: lane.status === "stale" ? "stale_takeover" : "lane",
    lane,
    workerNumber,
    workerTotal,
    message: `I am Worker ${workerNumber} of ${workerTotal} for ${lane.title}.${staleNote} I will work only this lane and report proof back to Boardroom Jobs.`,
  };
}
