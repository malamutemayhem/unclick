import type { ToolDescriptor } from "./index.js";
import type { RunResult } from "../types.js";
import { getRun } from "./store.js";

export interface LegalpassStatusArgs {
  run_id: string;
}

export const legalpassStatusTool: ToolDescriptor<LegalpassStatusArgs, RunResult> = {
  name: "legalpass_status",
  description:
    "Get the current status and verdict summary for a LegalPass run. " +
    "Returns issue-spotter findings only.",
  inputSchema: {
    type: "object",
    required: ["run_id"],
    properties: {
      run_id: { type: "string", minLength: 1 },
    },
  },
  handler: async (args) => {
    const result = getRun(args.run_id);
    if (!result) {
      throw new Error(`legalpass_status: run '${args.run_id}' was not found`);
    }

    return result;
  },
};
