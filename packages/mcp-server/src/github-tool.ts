// ── GitHub REST API tool ────────────────────────────────────────────────────
// Wraps the GitHub REST API (https://api.github.com) via fetch.
// Auth: saved UnClick GitHub login, or a personal access token (PAT) passed as
// access_token/api_key.
// No external dependencies.

import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";

const GITHUB_API = "https://api.github.com";

type GitHubAuth = {
  token: string;
  shouldMarkProof: boolean;
  setupError?: Record<string, unknown>;
};

function tokenFromArgs(args: Record<string, unknown>): string {
  return String(args.access_token ?? args.api_key ?? "").trim();
}

function isAuthenticatedAction(action: string, args: Record<string, unknown>): boolean {
  if (
    [
      "create_issue",
      "create_branch",
      "push_files",
      "create_pull_request",
      "comment_issue_or_pr",
      "merge_pull_request",
      "list_checks",
    ].includes(action)
  ) return true;
  if (action === "get_user") return !String(args.username ?? "").trim();
  if (action === "list_gists") return !String(args.username ?? "").trim();
  return false;
}

function providerCallFailed(result: unknown): boolean {
  return Boolean(
    result &&
    typeof result === "object" &&
    "error" in (result as Record<string, unknown>)
  );
}

async function resolveGitHubAuth(args: Record<string, unknown>): Promise<GitHubAuth> {
  const inlineToken = tokenFromArgs(args);
  if (inlineToken) return { token: inlineToken, shouldMarkProof: false };

  const resolved = await resolveCredentials("github", { ...args });
  if ("error" in resolved) {
    return { token: "", shouldMarkProof: false, setupError: resolved };
  }

  return {
    token: tokenFromArgs(resolved),
    shouldMarkProof: credentialResolvedFromUnClick(resolved),
  };
}

// ── Fetch helper ───────────────────────────────────────────────────────────────

async function githubFetch(
  token: string,
  method: "GET" | "POST" | "PATCH" | "PUT",
  path: string,
  body?: unknown,
  query?: Record<string, string | number | undefined>
): Promise<unknown> {
  const url = new URL(`${GITHUB_API}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {
    Accept:        "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent":  "UnClick-MCP/1.0",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const GITHUB_TIMEOUT_MS = Number(process.env.GITHUB_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GITHUB_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: `GitHub API request timed out after ${GITHUB_TIMEOUT_MS}ms.` };
    }
    return { error: `Network error reaching GitHub API: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) return { error: "GitHub rate limit exceeded. Please wait and retry.", status: 429 };

  const text = await response.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (response.status === 401) return { error: "GitHub access token is invalid or expired. Check your access_token.", status: 401 };
  if (response.status === 403) return { error: "GitHub rate limit exceeded or insufficient permissions.", status: 403 };
  if (response.status === 404) return { error: "Resource not found. Check the owner, repo, or resource ID.", status: 404 };
  if (response.status === 422) return { error: `GitHub validation error: ${(data as Record<string, unknown>)?.message ?? text}`, status: 422 };

  if (!response.ok) {
    const detail = (data as Record<string, unknown>)?.message ?? text;
    return { error: `GitHub API error ${response.status}: ${detail}`, status: response.status };
  }

  return data;
}

// ── Action implementations ─────────────────────────────────────────────────────

async function searchRepos(token: string, args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.query ?? "").trim();
  if (!q) return { error: "query is required." };
  return githubFetch(token, "GET", "/search/repositories", undefined, {
    q,
    sort:     args.sort     ? String(args.sort)     : undefined,
    order:    args.order    ? String(args.order)    : undefined,
    per_page: args.per_page ? Number(args.per_page) : 10,
    page:     args.page     ? Number(args.page)     : undefined,
  });
}

async function getRepo(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo  = String(args.repo  ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  return githubFetch(token, "GET", `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
}

async function listIssues(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo  = String(args.repo  ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  return githubFetch(token, "GET", `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`, undefined, {
    state:    args.state    ? String(args.state)    : "open",
    labels:   args.labels   ? String(args.labels)   : undefined,
    per_page: args.per_page ? Number(args.per_page) : 30,
    page:     args.page     ? Number(args.page)     : undefined,
  });
}

async function createIssue(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo  = String(args.repo  ?? "").trim();
  const title = String(args.title ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!title)          return { error: "title is required." };

  const body: Record<string, unknown> = { title };
  if (args.body)      body.body      = String(args.body);
  if (args.assignees) body.assignees = args.assignees;
  if (args.labels)    body.labels    = args.labels;
  if (args.milestone) body.milestone = Number(args.milestone);

  return githubFetch(token, "POST", `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`, body);
}

async function listPRs(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo  = String(args.repo  ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  return githubFetch(token, "GET", `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls`, undefined, {
    state:    args.state    ? String(args.state)    : "open",
    per_page: args.per_page ? Number(args.per_page) : 30,
    page:     args.page     ? Number(args.page)     : undefined,
  });
}

async function getUser(token: string, args: Record<string, unknown>): Promise<unknown> {
  const username = String(args.username ?? "").trim();
  if (username) return githubFetch(token, "GET", `/users/${encodeURIComponent(username)}`);
  return githubFetch(token, "GET", "/user");
}

async function listGists(token: string, args: Record<string, unknown>): Promise<unknown> {
  const username = String(args.username ?? "").trim();
  const path = username ? `/users/${encodeURIComponent(username)}/gists` : "/gists";
  return githubFetch(token, "GET", path, undefined, {
    per_page: args.per_page ? Number(args.per_page) : 30,
  });
}

async function searchCode(token: string, args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.query ?? "").trim();
  if (!q) return { error: "query is required." };
  return githubFetch(token, "GET", "/search/code", undefined, {
    q,
    per_page: args.per_page ? Number(args.per_page) : 10,
    page:     args.page     ? Number(args.page)     : undefined,
  });
}

function repoPath(owner: string, repo: string): string {
  return `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
}

function githubResultError(result: unknown): Record<string, unknown> | null {
  if (result && typeof result === "object" && "error" in (result as Record<string, unknown>)) {
    return result as Record<string, unknown>;
  }
  return null;
}

function objectSha(result: unknown, label: string): string | Record<string, unknown> {
  if (!result || typeof result !== "object") return { error: `GitHub ${label} response did not include a SHA.` };
  const record = result as Record<string, unknown>;
  if (typeof record.sha === "string" && record.sha) return record.sha;
  const nested = record.object;
  if (nested && typeof nested === "object" && typeof (nested as Record<string, unknown>).sha === "string") {
    return String((nested as Record<string, unknown>).sha);
  }
  return { error: `GitHub ${label} response did not include a SHA.` };
}

function commitTreeSha(result: unknown): string | Record<string, unknown> {
  if (!result || typeof result !== "object") return { error: "GitHub commit response did not include a tree SHA." };
  const tree = (result as Record<string, unknown>).tree;
  if (tree && typeof tree === "object" && typeof (tree as Record<string, unknown>).sha === "string") {
    return String((tree as Record<string, unknown>).sha);
  }
  return { error: "GitHub commit response did not include a tree SHA." };
}

function isErrorRecord(value: string | Record<string, unknown>): value is Record<string, unknown> {
  return typeof value !== "string";
}

type GitHubFileChange = {
  path: string;
  content: string;
  encoding?: "utf-8" | "base64";
};

function readFileChanges(input: unknown): GitHubFileChange[] | Record<string, unknown> {
  if (!Array.isArray(input)) return { error: "files must be an array of { path, content, encoding? } objects." };
  const changes: GitHubFileChange[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return { error: "Each file entry must be an object." };
    const record = item as Record<string, unknown>;
    const path = String(record.path ?? "").trim().replace(/^\/+/, "");
    if (!path) return { error: "Each file entry needs a path." };
    if (record.content === undefined || record.content === null) return { error: `File ${path} needs content.` };
    const encoding = String(record.encoding ?? "utf-8");
    if (encoding !== "utf-8" && encoding !== "base64") return { error: `File ${path} has unsupported encoding ${encoding}.` };
    changes.push({ path, content: String(record.content), encoding });
  }
  return changes;
}

function readDeletionPaths(input: unknown): string[] | Record<string, unknown> {
  if (input === undefined || input === null) return [];
  if (!Array.isArray(input)) return { error: "deletions must be an array of file paths." };
  const paths = input.map((path) => String(path ?? "").trim().replace(/^\/+/, "")).filter(Boolean);
  if (paths.length !== input.length) return { error: "Each deletion entry must be a non-empty file path." };
  return paths;
}

async function createBranch(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  const newBranch = String(args.new_branch ?? args.branch ?? "").trim();
  const baseBranch = String(args.base_branch ?? "main").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!newBranch) return { error: "new_branch is required." };
  if (!baseBranch) return { error: "base_branch is required." };

  const baseRef = await githubFetch(token, "GET", `${repoPath(owner, repo)}/git/ref/heads/${encodeURIComponent(baseBranch)}`);
  const baseError = githubResultError(baseRef);
  if (baseError) return baseError;
  const baseSha = objectSha(baseRef, "base branch");
  if (isErrorRecord(baseSha)) return baseSha;

  return githubFetch(token, "POST", `${repoPath(owner, repo)}/git/refs`, {
    ref: `refs/heads/${newBranch}`,
    sha: baseSha,
  });
}

async function pushFiles(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  const branch = String(args.branch ?? "").trim();
  const message = String(args.message ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!branch) return { error: "branch is required." };
  if (!message) return { error: "message is required." };

  const files = readFileChanges(args.files);
  if (!Array.isArray(files)) return files;
  const deletions = readDeletionPaths(args.deletions);
  if (!Array.isArray(deletions)) return deletions;
  if (files.length === 0 && deletions.length === 0) return { error: "push_files needs at least one file change or deletion." };

  let ref = await githubFetch(token, "GET", `${repoPath(owner, repo)}/git/ref/heads/${encodeURIComponent(branch)}`);
  if (githubResultError(ref)?.status === 404 && args.base_branch) {
    const created = await createBranch(token, { ...args, new_branch: branch });
    const createError = githubResultError(created);
    if (createError) return createError;
    ref = created;
  }
  const refError = githubResultError(ref);
  if (refError) return refError;

  const headSha = objectSha(ref, "branch ref");
  if (isErrorRecord(headSha)) return headSha;
  const expectedHeadSha = String(args.expected_head_sha ?? "").trim();
  if (expectedHeadSha && expectedHeadSha !== headSha) {
    return { error: `Branch ${branch} moved. Expected ${expectedHeadSha}, found ${headSha}.` };
  }

  const headCommit = await githubFetch(token, "GET", `${repoPath(owner, repo)}/git/commits/${encodeURIComponent(headSha)}`);
  const commitError = githubResultError(headCommit);
  if (commitError) return commitError;
  const baseTreeSha = commitTreeSha(headCommit);
  if (isErrorRecord(baseTreeSha)) return baseTreeSha;

  const treeEntries: Array<Record<string, unknown>> = [];
  for (const file of files) {
    const blob = await githubFetch(token, "POST", `${repoPath(owner, repo)}/git/blobs`, {
      content: file.content,
      encoding: file.encoding ?? "utf-8",
    });
    const blobError = githubResultError(blob);
    if (blobError) return blobError;
    const blobSha = objectSha(blob, `blob for ${file.path}`);
    if (isErrorRecord(blobSha)) return blobSha;
    treeEntries.push({ path: file.path, mode: "100644", type: "blob", sha: blobSha });
  }
  for (const path of deletions) {
    treeEntries.push({ path, mode: "100644", type: "blob", sha: null });
  }

  const tree = await githubFetch(token, "POST", `${repoPath(owner, repo)}/git/trees`, {
    base_tree: baseTreeSha,
    tree: treeEntries,
  });
  const treeError = githubResultError(tree);
  if (treeError) return treeError;
  const newTreeSha = objectSha(tree, "tree");
  if (isErrorRecord(newTreeSha)) return newTreeSha;

  const commit = await githubFetch(token, "POST", `${repoPath(owner, repo)}/git/commits`, {
    message,
    tree: newTreeSha,
    parents: [headSha],
  });
  const newCommitError = githubResultError(commit);
  if (newCommitError) return newCommitError;
  const newCommitSha = objectSha(commit, "commit");
  if (isErrorRecord(newCommitSha)) return newCommitSha;

  const updatedRef = await githubFetch(token, "PATCH", `${repoPath(owner, repo)}/git/refs/heads/${encodeURIComponent(branch)}`, {
    sha: newCommitSha,
    force: args.force === true,
  });
  const updateError = githubResultError(updatedRef);
  if (updateError) return updateError;

  return {
    owner,
    repo,
    branch,
    base_sha: headSha,
    commit_sha: newCommitSha,
    tree_sha: newTreeSha,
    files: files.length,
    deletions: deletions.length,
    html_url: `https://github.com/${owner}/${repo}/commit/${newCommitSha}`,
  };
}

async function createPullRequest(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  const title = String(args.title ?? "").trim();
  const head = String(args.head ?? args.branch ?? "").trim();
  const base = String(args.base ?? args.base_branch ?? "main").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!title) return { error: "title is required." };
  if (!head) return { error: "head or branch is required." };
  if (!base) return { error: "base is required." };

  return githubFetch(token, "POST", `${repoPath(owner, repo)}/pulls`, {
    title,
    head,
    base,
    body: args.body ? String(args.body) : undefined,
    draft: args.draft === true,
    maintainer_can_modify: args.maintainer_can_modify !== false,
  });
}

async function commentIssueOrPr(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  const issueNumber = Number(args.issue_number ?? args.pull_number ?? args.number);
  const body = String(args.body ?? args.comment ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!Number.isInteger(issueNumber) || issueNumber <= 0) return { error: "issue_number or pull_number is required." };
  if (!body) return { error: "body is required." };

  return githubFetch(token, "POST", `${repoPath(owner, repo)}/issues/${issueNumber}/comments`, { body });
}

async function mergePullRequest(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  const pullNumber = Number(args.pull_number ?? args.number);
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!Number.isInteger(pullNumber) || pullNumber <= 0) return { error: "pull_number is required." };

  return githubFetch(token, "PUT", `${repoPath(owner, repo)}/pulls/${pullNumber}/merge`, {
    commit_title: args.commit_title ? String(args.commit_title) : undefined,
    commit_message: args.commit_message ? String(args.commit_message) : undefined,
    sha: args.expected_head_sha ? String(args.expected_head_sha) : undefined,
    merge_method: args.merge_method ? String(args.merge_method) : "squash",
  });
}

async function listChecks(token: string, args: Record<string, unknown>): Promise<unknown> {
  const owner = String(args.owner ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  const ref = String(args.ref ?? args.branch ?? "").trim();
  if (!owner || !repo) return { error: "owner and repo are required." };
  if (!ref) return { error: "ref or branch is required." };

  return githubFetch(token, "GET", `${repoPath(owner, repo)}/commits/${encodeURIComponent(ref)}/check-runs`, undefined, {
    check_name: args.check_name ? String(args.check_name) : undefined,
    status: args.status ? String(args.status) : undefined,
    per_page: args.per_page ? Number(args.per_page) : 30,
    page: args.page ? Number(args.page) : undefined,
  });
}

// ── Public dispatcher ──────────────────────────────────────────────────────────

export async function githubAction(
  action: string,
  args:   Record<string, unknown>
): Promise<unknown> {
  try {
    const auth = await resolveGitHubAuth(args);
    if (!auth.token && auth.setupError && isAuthenticatedAction(action, args)) {
      return auth.setupError;
    }

    const token = auth.token;
    let result: unknown;
    switch (action) {
      case "search_repos":  result = await searchRepos(token, args); break;
      case "get_repo":      result = await getRepo(token, args); break;
      case "list_issues":   result = await listIssues(token, args); break;
      case "create_issue":  result = await createIssue(token, args); break;
      case "list_prs":      result = await listPRs(token, args); break;
      case "get_user":      result = await getUser(token, args); break;
      case "list_gists":    result = await listGists(token, args); break;
      case "search_code":   result = await searchCode(token, args); break;
      case "create_branch": result = await createBranch(token, args); break;
      case "push_files":    result = await pushFiles(token, args); break;
      case "create_pull_request": result = await createPullRequest(token, args); break;
      case "comment_issue_or_pr": result = await commentIssueOrPr(token, args); break;
      case "merge_pull_request":  result = await mergePullRequest(token, args); break;
      case "list_checks":         result = await listChecks(token, args); break;
      default:
        return {
          error: `Unknown GitHub action: "${action}". Valid actions: search_repos, get_repo, list_issues, create_issue, list_prs, get_user, list_gists, search_code, create_branch, push_files, create_pull_request, comment_issue_or_pr, merge_pull_request, list_checks.`,
        };
    }

    if (auth.shouldMarkProof && !providerCallFailed(result)) {
      await markCredentialLiveTested("github");
    }

    return result;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
