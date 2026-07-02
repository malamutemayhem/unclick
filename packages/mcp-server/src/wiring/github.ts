// wiring/github.ts
// Per-app MCP wiring for the github connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { githubAction } from "../github-tool.js";

export const githubTools = [
  // ── github-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "github_action",
    description: "Interact with the GitHub REST API: search/read repos, create branches and commits, open PRs, comment, merge, and read workflow checks.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:       { type: "string", enum: ["search_repos", "get_repo", "list_issues", "create_issue", "list_prs", "get_user", "list_gists", "search_code", "create_branch", "push_files", "create_pull_request", "comment_issue_or_pr", "merge_pull_request", "close_pull_request", "list_checks"], description: "Action: search_repos, get_repo, list_issues, create_issue, list_prs, get_user, list_gists, search_code, create_branch, push_files, create_pull_request, comment_issue_or_pr, merge_pull_request, close_pull_request, list_checks." },
        access_token: { type: "string", description: "GitHub personal access token (PAT). Saved UnClick GitHub login is used when this is omitted." },
        api_key:      { type: "string", description: "GitHub token fallback. Saved UnClick GitHub login is preferred when omitted." },
        query:        { type: "string", description: "Search query string (for search_repos and search_code)." },
        owner:        { type: "string", description: "Repository owner login." },
        repo:         { type: "string", description: "Repository name." },
        title:        { type: "string", description: "Issue or pull request title." },
        body:         { type: "string", description: "Issue, pull request, or comment body text." },
        state:        { type: "string", description: "Filter by state: open, closed, all." },
        labels:       { type: "string", description: "Comma-separated label names to filter by." },
        username:     { type: "string", description: "GitHub username (for get_user and list_gists)." },
        base_branch:  { type: "string", description: "Base branch for create_branch, push_files branch creation, or pull requests." },
        branch:       { type: "string", description: "Target branch for branch creation, file pushes, pull requests, or checks." },
        new_branch:   { type: "string", description: "New branch name for create_branch." },
        head:         { type: "string", description: "Pull request head branch." },
        base:         { type: "string", description: "Pull request base branch." },
        files:        { type: "array", description: "Files for push_files: { path, content, encoding? } entries.", items: { type: "object", additionalProperties: false, properties: { path: { type: "string" }, content: { type: "string" }, encoding: { type: "string", enum: ["utf-8", "base64"] } }, required: ["path", "content"] } },
        deletions:    { type: "array", description: "File paths to delete during push_files.", items: { type: "string" } },
        message:      { type: "string", description: "Commit message for push_files." },
        expected_head_sha: { type: "string", description: "Optional safety check: fail if the branch head has moved." },
        force:        { type: "boolean", description: "Force-update the branch ref during push_files. Defaults to false." },
        draft:        { type: "boolean", description: "Create a draft pull request." },
        maintainer_can_modify: { type: "boolean", description: "Allow maintainers to modify the pull request branch. Defaults to true." },
        issue_number: { type: "number", description: "Issue number for comment_issue_or_pr." },
        pull_number:  { type: "number", description: "Pull request number for comment_issue_or_pr or merge_pull_request." },
        number:       { type: "number", description: "Issue or pull request number fallback." },
        comment:      { type: "string", description: "Comment body fallback for comment_issue_or_pr." },
        merge_method: { type: "string", description: "Merge method: merge, squash, or rebase. Defaults to squash." },
        commit_title: { type: "string", description: "Merge commit title." },
        commit_message: { type: "string", description: "Merge commit message." },
        ref:          { type: "string", description: "Commit SHA, branch, or tag for list_checks." },
        check_name:   { type: "string", description: "Filter list_checks by check name." },
        status:       { type: "string", description: "Filter list_checks by status." },
        per_page:     { type: "number", description: "Results per page (max 100)." },
        page:         { type: "number", description: "Page number." },
      },
      required: ["action"],
    },
  },
] as const;

export const githubHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // github-tool.ts
  github_action:           (args) => githubAction(String(args.action ?? ""), args),
};
