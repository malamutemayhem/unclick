// wiring/bitbucket.ts
// Per-app MCP wiring for the bitbucket connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { bitbucketListRepos, bitbucketGetRepo, bitbucketListPullRequests } from "../bitbucket-tool.js";

export const bitbucketTools = [
  // ── bitbucket-tool.ts ─────────────────────────────────────────────────────────
  { name: "bitbucket_list_repos", description: "List Bitbucket repositories in a workspace.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    username: { type: "string", description: "Bitbucket username" },
    app_password: { type: "string", description: "Bitbucket app password" },
    workspace: { type: "string", description: "Workspace id" },
    limit: { type: "number", description: "Repos to return (max 100, default 25)" },
  }, required: ["username", "app_password", "workspace"] } },
  { name: "bitbucket_get_repo", description: "Get a single Bitbucket repository.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    username: { type: "string", description: "Bitbucket username" },
    app_password: { type: "string", description: "Bitbucket app password" },
    workspace: { type: "string", description: "Workspace id" },
    repo: { type: "string", description: "Repository slug" },
  }, required: ["username", "app_password", "workspace", "repo"] } },
  { name: "bitbucket_list_pull_requests", description: "List pull requests for a Bitbucket repository.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    username: { type: "string", description: "Bitbucket username" },
    app_password: { type: "string", description: "Bitbucket app password" },
    workspace: { type: "string", description: "Workspace id" },
    repo: { type: "string", description: "Repository slug" },
    state: { type: "string", enum: ["OPEN", "MERGED", "DECLINED", "SUPERSEDED"], description: "Filter by PR state" },
    limit: { type: "number", description: "PRs to return (max 50, default 25)" },
  }, required: ["username", "app_password", "workspace", "repo"] } },
] as const;

export const bitbucketHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bitbucket-tool.ts
  bitbucket_list_repos:         (args) => bitbucketListRepos(args),
  bitbucket_get_repo:           (args) => bitbucketGetRepo(args),
  bitbucket_list_pull_requests: (args) => bitbucketListPullRequests(args),
};
