import { giteaAction } from "./gitea-tool.js";
import type { AdditionalTool } from "./additional-tools.js";

export const GITEA_TOOLS: readonly AdditionalTool[] = [{
  name: "gitea_action",
  description: "Use the project Gitea forge for approved UnClick maintenance. A Superuser receives the server-held project credential automatically when no personal credential is supplied.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["action"],
    properties: {
      action: { type: "string", enum: ["get_user", "search_repos", "get_repo", "list_branches", "create_branch", "get_file", "get_commit_status", "list_prs", "create_pull_request"] },
      owner: { type: "string" }, repo: { type: "string" }, query: { type: "string" }, username: { type: "string" },
      base_url: { type: "string" }, access_token: { type: "string" }, api_key: { type: "string" },
      new_branch: { type: "string" }, branch: { type: "string" }, base_branch: { type: "string" },
      path: { type: "string" }, ref: { type: "string" }, state: { type: "string" }, per_page: { type: "number" },
      title: { type: "string" }, head: { type: "string" }, base: { type: "string" }, body: { type: "string" },
    },
  },
}];

export const GITEA_HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  gitea_action: (args) => giteaAction(String(args.action ?? ""), args),
};
