export interface FishbowlMergedPullRequest {
  number: number | null;
  url: string | null;
  title: string | null;
  body: string | null;
  merged: boolean;
  mergedAt: string | null;
  mergeCommitSha: string | null;
  repositoryFullName: string | null;
  comments: string[];
  linkedTodoIds: string[];
}

export interface FishbowlPrMergeParseResult {
  pr: FishbowlMergedPullRequest | null;
  error?: string;
}

export interface FishbowlPrMergeProofInput {
  pr: FishbowlMergedPullRequest;
  todoId: string;
}

const UUID_SOURCE = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
const TODO_ID_RE = new RegExp(`^${UUID_SOURCE}$`, "i");
const ADMIN_TODO_LINK_RE = new RegExp(`(?:/admin/jobs#todo-|#todo-)(${UUID_SOURCE})`, "gi");
const CLOSE_TODO_RE = new RegExp(
  `\\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\\s+(?:boardroom\\s+|fishbowl\\s+|todo\\s+|job\\s+)?(${UUID_SOURCE})\\b`,
  "gi",
);
const NAMED_TODO_RE = new RegExp(
  `\\b(?:boardroom\\s+todo|fishbowl\\s+todo|todo|job)\\s*[:#-]?\\s*(${UUID_SOURCE})\\b`,
  "gi",
);
const SHA_RE = /^[a-f0-9]{7,40}$/i;

function readObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value.trim())) return Number(value.trim());
  return null;
}

function readCommentTexts(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      const row = readObject(item);
      return readString(row?.body) ?? readString(row?.text) ?? "";
    })
    .filter(Boolean);
}

function uniqueTodoIds(ids: string[]): string[] {
  return [...new Set(ids.map((id) => id.toLowerCase()).filter((id) => TODO_ID_RE.test(id)))];
}

export function extractFishbowlTodoIdsFromText(text: string): string[] {
  const ids: string[] = [];
  for (const pattern of [ADMIN_TODO_LINK_RE, CLOSE_TODO_RE, NAMED_TODO_RE]) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      ids.push(match[1]);
    }
  }
  return uniqueTodoIds(ids);
}

export function parseFishbowlMergedPullRequest(rawBody: Record<string, unknown>): FishbowlPrMergeParseResult {
  const pullRequest = readObject(rawBody.pull_request) ?? readObject(rawBody.pr) ?? rawBody;
  const repository = readObject(rawBody.repository);
  const repositoryFullName =
    readString(repository?.full_name) ??
    readString(rawBody.repository_full_name) ??
    readString(rawBody.repo) ??
    null;
  const comments = [
    ...readCommentTexts(rawBody.comments),
    ...readCommentTexts(rawBody.issue_comments),
    ...readCommentTexts(rawBody.review_comments),
  ];
  const explicitLinkedTodoIds = Array.isArray(rawBody.linked_todo_ids)
    ? rawBody.linked_todo_ids.map((id) => readString(id)).filter(Boolean) as string[]
    : [];

  const mergeCommitSha =
    readString(pullRequest.merge_commit_sha) ??
    readString(rawBody.merge_commit_sha) ??
    readString(rawBody.merge_commit) ??
    null;
  const mergedAt = readString(pullRequest.merged_at) ?? readString(rawBody.merged_at) ?? null;
  const merged = pullRequest.merged === true || rawBody.merged === true || Boolean(mergedAt);

  const pr: FishbowlMergedPullRequest = {
    number: readNumber(pullRequest.number) ?? readNumber(rawBody.pr_number) ?? null,
    url: readString(pullRequest.html_url) ?? readString(rawBody.pr_url) ?? readString(rawBody.html_url) ?? null,
    title: readString(pullRequest.title) ?? readString(rawBody.title) ?? null,
    body: readString(pullRequest.body) ?? readString(rawBody.body) ?? null,
    merged,
    mergedAt,
    mergeCommitSha: mergeCommitSha && SHA_RE.test(mergeCommitSha) ? mergeCommitSha : null,
    repositoryFullName,
    comments,
    linkedTodoIds: [],
  };

  const linkedText = [pr.title, pr.body, ...comments].filter(Boolean).join("\n");
  pr.linkedTodoIds = uniqueTodoIds([
    ...extractFishbowlTodoIdsFromText(linkedText),
    ...explicitLinkedTodoIds,
  ]);

  if (!pr.number && !pr.url) {
    return { pr: null, error: "pull_request number or url required" };
  }
  return { pr };
}

export function buildFishbowlPrMergeVerifierAgentId(agentId: string): string {
  const suffix = "-github-merge-proof";
  const base = agentId.trim() || "github-action-fishbowl-autoclose";
  if (base.length + suffix.length <= 128) return `${base}${suffix}`;
  return `${base.slice(0, 128 - suffix.length)}${suffix}`;
}

export function buildFishbowlPrMergeProofComment(input: FishbowlPrMergeProofInput): string {
  const prLabel = input.pr.number ? `PR #${input.pr.number}` : "GitHub PR";
  const proofLines = [
    `PASS: ${prLabel} merged and links to Boardroom todo ${input.todoId}.`,
    input.pr.url ? `proof: ${input.pr.url}` : null,
    input.pr.mergeCommitSha ? `merge commit ${input.pr.mergeCommitSha}` : null,
    input.pr.repositoryFullName ? `repository: ${input.pr.repositoryFullName}` : null,
    input.pr.mergedAt ? `merged_at: ${input.pr.mergedAt}` : null,
    "source: fishbowl-pr-merge-reconcile",
  ];
  return proofLines.filter(Boolean).join("\n");
}

export function hasFishbowlPrMergeProofComment(
  comments: Array<{ text?: string | null }>,
  pr: FishbowlMergedPullRequest,
): boolean {
  const prUrl = pr.url?.toLowerCase() ?? "";
  const sha = pr.mergeCommitSha?.toLowerCase() ?? "";
  return comments.some((comment) => {
    const text = String(comment.text ?? "").toLowerCase();
    if (!text.includes("source: fishbowl-pr-merge-reconcile")) return false;
    if (prUrl && text.includes(prUrl)) return true;
    if (sha && text.includes(sha)) return true;
    return false;
  });
}
