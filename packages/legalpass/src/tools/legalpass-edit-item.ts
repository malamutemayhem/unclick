import type { ToolDescriptor } from "./index.js";
import { assertVerdictText } from "../passguard/verdict-linter.js";
import type { PackItemResult, Verdict, VerdictSummary } from "../types.js";
import { getRun, updateRun } from "./store.js";

export interface LegalpassEditItemArgs {
  run_id: string;
  item_id: string;
  verdict?: Verdict;
  finding?: string;
  on_fail_comment?: string;
}

export interface LegalpassEditItemResult {
  run_id: string;
  item_id: string;
  updated: boolean;
  summary: VerdictSummary;
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
    },
  },
  handler: async (args) => {
    if (!args.verdict && !args.finding && !args.on_fail_comment) {
      throw new Error("legalpass_edit_item: provide verdict, finding, or on_fail_comment");
    }

    if (args.finding) {
      assertVerdictText(args.finding, `${args.item_id}.finding`);
    }
    if (args.on_fail_comment) {
      assertVerdictText(args.on_fail_comment, `${args.item_id}.on_fail_comment`);
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

    if (args.verdict) item.verdict = args.verdict;
    if (args.finding) item.finding = args.finding;
    if (args.on_fail_comment) item.on_fail_comment = args.on_fail_comment;

    run.summary = summarize(run.items);
    updateRun(run);

    return {
      run_id: args.run_id,
      item_id: args.item_id,
      updated: true,
      summary: run.summary,
    };
  },
};

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
