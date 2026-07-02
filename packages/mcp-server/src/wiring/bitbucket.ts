// wiring/bitbucket.ts
// Per-app MCP wiring for the bitbucket connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { bitbucketListRepos, bitbucketGetRepo, bitbucketListPullRequests } from "../bitbucket-tool.js";

export const bitbucketHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bitbucket-tool.ts
  bitbucket_list_repos:         (args) => bitbucketListRepos(args),
  bitbucket_get_repo:           (args) => bitbucketGetRepo(args),
  bitbucket_list_pull_requests: (args) => bitbucketListPullRequests(args),
};
