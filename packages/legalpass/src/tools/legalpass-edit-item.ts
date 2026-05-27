import type { ToolDescriptor } from "./index.js";
import { assertVerdictText } from "../passguard/verdict-linter.js";
import type {
  LegalPassAuditEntry,
  PackItemResult,
  Verdict,
  VerdictSummary,
} from "../types.js";
import { getRun, updateRun } from "./store.js";

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
    if (!args.verdict && !args.finding && !args.on_fail_comment && !args.reviewer_note) {
      throw new Error(
        "legalpass_edit_item: provide verdict, finding, on_fail_comment, or reviewer_note",
      );
    }

    if (args.finding) {
      assertVerdictText(args.finding, `${args.item_id}.finding`);
    }
    if (args.on_fail_comment) {
      assertVerdictText(args.on_fail_comment, `${args.item_id}.on_fail_comment`);
    }
    if (args.reviewer_note) {
      assertVerdictText(args.reviewer_note, `${args.item_id}.reviewer_note`);
    }

    const run = getRun(args.run_id);
    if (!run) {
      throw new Error(`legalpass_edit_item: run '${args.run_id}' was not found`);
    }

    const item = run.items.find((candidate) => candidate.item_id === args.item_id);
    if (!item) {
      throw new Error(
        `legalpass_edit_item: item '${args.item_id}' was not found on run '${args.run_id}'`,
      );
    }

    const before = snapshotItem(item);
    if (args.verdict) item.verdict = args.verdict;
    if (args.finding) item.finding = args.finding;
    if (args.on_fail_comment) item.on_fail_comment = args.on_fail_comment;

    run.summary = summarize(run.items);
    const audit_entry: LegalpassEditItemAuditEntry = {
      event: "legalpass_item_edit",
      run_id: args.run_id,
      item_id: args.item_id,
      actor_user_id: args.actor_user_id?.trim() || "unknown",
      edited_at: new Date().toISOString(),
      before,
      after: snapshotItem(item),
      ...(args.reviewer_note ? { reviewer_note: args.reviewer_note } : {}),
    };
    run.audit_log.push(audit_entry);
    updateRun(run);

    return {
      run_id: args.run_id,
      item_id: args.item_id,
      updated: true,
      summary: run.summary,
      audit_entry,
    };
  },
};

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
