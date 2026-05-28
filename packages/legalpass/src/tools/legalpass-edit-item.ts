import type { ToolDescriptor } from "./index.js";
import { assertVerdictText } from "../passguard/verdict-linter.js";
import type {
  LegalPassAuditEntry,
  PackItemResult,
  Verdict,
  VerdictSummary,
} from "../types.js";
import { getRun, updateRun } from "./store.js";

const VALID_VERDICTS = new Set<Verdict>(["check", "na", "fail", "other", "pending"]);

export interface LegalpassEditItemArgs {
  run_id: string;
  item_id: string;
  verdict?: Verdict;
  finding?: string;
  on_fail_comment?: string;
  reviewer_note?: string;
  actor_user_id?: string;
}

export interface LegalpassEditItemResult {
  run_id: string;
  item_id: string;
  updated: boolean;
  summary: VerdictSummary;
  audit_entry: LegalpassEditItemAuditEntry;
}

export interface LegalpassEditItemAuditEntry extends LegalPassAuditEntry {
  event: "legalpass_item_edit";
  run_id: string;
  item_id: string;
  actor_user_id: string;
  edited_at: string;
  before: Pick<PackItemResult, "verdict" | "finding" | "on_fail_comment">;
  after: Pick<PackItemResult, "verdict" | "finding" | "on_fail_comment">;
  reviewer_note?: string;
}

export const legalpassEditItemTool: ToolDescriptor<
  LegalpassEditItemArgs,
  LegalpassEditItemResult
> = {
  name: "legalpass_edit_item",
  description:
    "Edit a single item on a LegalPass run (verdict, finding text, " +
    "on-fail comment). Finding text is linted by PassGuard before save.",
  inputSchema: {
    type: "object",
    required: ["run_id", "item_id"],
    properties: {
      run_id: { type: "string", minLength: 1 },
      item_id: { type: "string", minLength: 1 },
      verdict: {
        type: "string",
        enum: ["check", "na", "fail", "other", "pending"],
      },
      finding: { type: "string" },
      on_fail_comment: { type: "string" },
      reviewer_note: {
        type: "string",
        description: "Human reviewer note for the LegalPass audit trail.",
      },
      actor_user_id: {
        type: "string",
        description: "Optional actor id for the override audit entry.",
      },
    },
  },
  handler: async (args) => {
    const runId = parseRequiredNonBlankText(args.run_id, "run_id");
    const itemId = parseRequiredNonBlankText(args.item_id, "item_id");
    const verdict = parseOptionalVerdict(args.verdict);
    const finding = parseOptionalNonBlankText(args.finding, "finding");
    const onFailComment = parseOptionalNonBlankText(
      args.on_fail_comment,
      "on_fail_comment",
    );
    const reviewerNote = parseOptionalNonBlankText(
      args.reviewer_note,
      "reviewer_note",
    );

    if (!verdict && !finding && !onFailComment && !reviewerNote) {
      throw new Error(
        "legalpass_edit_item: provide verdict, finding, on_fail_comment, or reviewer_note",
      );
    }

    if (finding) {
      assertVerdictText(finding, `${itemId}.finding`);
    }
    if (onFailComment) {
      assertVerdictText(onFailComment, `${itemId}.on_fail_comment`);
    }
    if (reviewerNote) {
      assertVerdictText(reviewerNote, `${itemId}.reviewer_note`);
    }

    const run = getRun(runId);
    if (!run) {
      throw new Error(`legalpass_edit_item: run '${runId}' was not found`);
    }

    const item = run.items.find((candidate) => candidate.item_id === itemId);
    if (!item) {
      throw new Error(
        `legalpass_edit_item: item '${itemId}' was not found on run '${runId}'`,
      );
    }

    const before = snapshotItem(item);
    if (verdict) item.verdict = verdict;
    if (finding) item.finding = finding;
    if (onFailComment) item.on_fail_comment = onFailComment;

    run.summary = summarize(run.items);
    const audit_entry: LegalpassEditItemAuditEntry = {
      event: "legalpass_item_edit",
      run_id: runId,
      item_id: itemId,
      actor_user_id: args.actor_user_id?.trim() || "unknown",
      edited_at: new Date().toISOString(),
      before,
      after: snapshotItem(item),
      ...(reviewerNote ? { reviewer_note: reviewerNote } : {}),
    };
    run.audit_log.push(audit_entry);
    updateRun(run);

    return {
      run_id: runId,
      item_id: itemId,
      updated: true,
      summary: run.summary,
      audit_entry,
    };
  },
};

function parseOptionalVerdict(value: Verdict | undefined): Verdict | undefined {
  if (value === undefined) return undefined;
  if (!VALID_VERDICTS.has(value)) {
    throw new Error("legalpass_edit_item: verdict must be check|fail|na|other|pending");
  }
  return value;
}

function parseRequiredNonBlankText(value: string, fieldName: string): string {
  if (typeof value !== "string") {
    throw new Error(`legalpass_edit_item: ${fieldName} must be a string`);
  }
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`legalpass_edit_item: ${fieldName} must not be blank`);
  }
  return trimmed;
}

function parseOptionalNonBlankText(
  value: string | undefined,
  fieldName: string,
): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    throw new Error(`legalpass_edit_item: ${fieldName} must be a string`);
  }
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`legalpass_edit_item: ${fieldName} must not be blank`);
  }
  return trimmed;
}

function snapshotItem(
  item: PackItemResult,
): Pick<PackItemResult, "verdict" | "finding" | "on_fail_comment"> {
  return {
    verdict: item.verdict,
    finding: item.finding,
    on_fail_comment: item.on_fail_comment,
  };
}

function summarize(items: PackItemResult[]): VerdictSummary {
  const summary: VerdictSummary = {
    total: items.length,
    check: 0,
    na: 0,
    fail: 0,
    other: 0,
    pending: 0,
    pass_rate: 0,
  };

  for (const item of items) {
    summary[item.verdict] += 1;
  }

  summary.pass_rate = summary.total === 0
    ? 0
    : Math.round((summary.check / summary.total) * 100);
  return summary;
}
