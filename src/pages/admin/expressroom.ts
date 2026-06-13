export type ExpressRoomDraftStatus = "draft" | "inserted" | "archived";
export type ExpressRoomCodeStatus = "not_supplied" | "partial" | "complete" | "unknown";

export interface ExpressRoomDraft {
  id: string;
  job_name_mirror: string;
  official_todo_id: string | null;
  short_description: string;
  brief_markdown: string;
  supplied_code: string;
  supplied_code_status: ExpressRoomCodeStatus;
  express_status: ExpressRoomDraftStatus;
  created_by_agent_id: string;
  source_chat_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpressRoomDraftInput {
  job_name_mirror: string;
  official_todo_id?: string | null;
  short_description: string;
  brief_markdown: string;
  supplied_code?: string;
  supplied_code_status?: ExpressRoomCodeStatus;
  source_chat_session_id?: string | null;
}

export const EXPRESSROOM_INDUCTION_TEXT = [
  "DraftRoom is the Manual front-of-line drafting room and first station in the UnClick build line.",
  "Warm smart-seat rule: when a capable subscription chat seat has fresh context, build or fit the smallest safe draft immediately.",
  "Do not park fresh build context for a low-capacity unattended runner unless the exact blocker and next build step are written down.",
  "When a user is actively explaining a feature, create a visible first draft while the context is fresh: code sketch, patch, UI fragment, test outline, ScopePack, or implementation notes.",
  "Store the detailed brief, the job name mirror, the short description, and any supplied code here.",
  "Treat every item as Manual draft input until it is inserted into the official Jobs Board and checked through the normal UnClick conveyor belt.",
  "Do not claim DONE from DraftRoom. Use it to build early momentum, then hand the draft to the proper integration, test, review, and proof path.",
  "Alarm bell: supplied code is untrusted draft material until a normal UnClick worker fits it, tests it, reviews it, and records proof.",
].join(" ");

export const EXPRESSROOM_GUARDRAILS = [
  "Manual draft only. Never treat DraftRoom as source-of-truth completion.",
  "Warm smart-seat rule: build or fit the smallest safe draft while context is fresh.",
  "Safe jobs may get code drafts while risky jobs get pseudocode, tests, ScopePacks, or risk maps first.",
  "If no code, patch, test outline, or ScopePack is supplied, the draft must say the exact blocker and next build step.",
  "Supplied code is untrusted until integrated through repo tests and review.",
  "Inserted Jobs Board cards must say Manual DraftRoom import and must not be marked done from draft code alone.",
  "Official completion still requires PR, commit, test, deploy, screenshot, or explicit no-code proof.",
  "If the mirror job name is unclear, stop and ask for a smaller official job before promotion.",
] as const;

export const EXPRESSROOM_REQUIRED_FIELDS = [
  "Visible draft or Brief MD",
  "Job name mirror",
  "Short description",
  "Supplied code field and code state",
] as const;

export const EXPRESSROOM_CODE_STATUS_LABELS: Record<ExpressRoomCodeStatus, string> = {
  not_supplied: "Not supplied",
  partial: "Partial",
  complete: "Complete",
  unknown: "Unknown",
};

export const EXPRESSROOM_DRAFT_STATUS_LABELS: Record<ExpressRoomDraftStatus, string> = {
  draft: "Manual draft",
  inserted: "Inserted into Jobs",
  archived: "Archived",
};

export const DEFAULT_EXPRESSROOM_DRAFT_INPUT: ExpressRoomDraftInput = {
  job_name_mirror: "",
  official_todo_id: null,
  short_description: "",
  brief_markdown: "",
  supplied_code: "",
  supplied_code_status: "not_supplied",
  source_chat_session_id: null,
};

export function isExpressRoomCodeStatus(value: string): value is ExpressRoomCodeStatus {
  return ["not_supplied", "partial", "complete", "unknown"].includes(value);
}

export function isExpressRoomDraftStatus(value: string): value is ExpressRoomDraftStatus {
  return ["draft", "inserted", "archived"].includes(value);
}

export function countReadyExpressRoomFields(input: ExpressRoomDraftInput): number {
  const checks = [
    input.brief_markdown.trim().length > 0,
    input.job_name_mirror.trim().length > 0,
    input.short_description.trim().length > 0,
    Boolean(input.supplied_code?.trim()) || input.supplied_code_status === "not_supplied",
  ];
  return checks.filter(Boolean).length;
}

export function buildExpressRoomOfficialJobDescription(draft: ExpressRoomDraft): string {
  const codePreview = draft.supplied_code.trim()
    ? draft.supplied_code.trim().slice(0, 1600)
    : "No code supplied yet.";

  return [
    "Manual DraftRoom import.",
    "",
    `DraftRoom draft: ${draft.id}`,
    `Draft status: ${EXPRESSROOM_DRAFT_STATUS_LABELS[draft.express_status]}`,
    `Supplied code status: ${EXPRESSROOM_CODE_STATUS_LABELS[draft.supplied_code_status]}`,
    "",
    "Short description:",
    draft.short_description.trim(),
    "",
    "Detailed brief MD:",
    draft.brief_markdown.trim(),
    "",
    "Supplied code preview:",
    codePreview,
    "",
    "Insertion rule:",
    "This is a Manual draft, not finished work. Fit it into the repo, run checks, create PR or commit proof, then use the normal UnClick review and proof gates before any DONE claim.",
    "Warm smart-seat rule: if the source chat seat had fresh build context, the official job should preserve the smallest safe draft or the exact blocker and next build step.",
    "",
    "Alarm bells:",
    "- Manual DraftRoom code is untrusted until fitted into the repo.",
    "- Do not mark this official job done from the draft alone.",
    "- Require normal tests, PR or commit proof, review, and product proof where relevant.",
  ].join("\n");
}
