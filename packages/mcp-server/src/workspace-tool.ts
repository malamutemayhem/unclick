// File Workspace ("Large-PR Room") MCP tool surface.
//
// A thin, dependency-free proxy to the deployed /api/workspace endpoint so
// agents can stage a large file as many small chunks and then push it to git BY
// REFERENCE, without ever emitting the whole file in one model response (the
// ~600KB inline-push wall). The endpoint resolves the caller's stored GitHub
// credential from their UnClick key, so there are no keys at the user's end.
// See docs/prd/unclick-file-workspace.md and api/workspace.ts.
//
// Hardening: every call is bounded by an AbortController timeout so a hung
// /api/workspace (the push step does git blob/tree/commit work and can stall
// on a large tree) can never hang the agent. Aborts surface as a clean error.

type ToolResult = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

// Per-call timeouts. push does real git Data API work (blobs, tree, commit,
// ref) and is allowed longer; put/list are cheap.
const PUT_LIST_TIMEOUT_MS = 30_000;
const PUSH_TIMEOUT_MS = 120_000;

function workspaceBase(): string {
  return (
    process.env.UNCLICK_SITE_URL ||
    process.env.UNCLICK_MEMORY_BASE_URL ||
    "https://unclick.world"
  ).replace(/\/$/, "");
}

/**
 * fetch with an AbortController deadline. Clears the timer on settle so a fast
 * response never leaves a dangling timeout. Throws an AbortError on timeout,
 * which handleWorkspaceTool turns into a readable message.
 */
async function fetchWithTimeout(
  url: string,
  init: { method: string; headers: Record<string, string>; body?: string },
  ms: number,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export const WORKSPACE_VISIBLE_TOOLS = [
  {
    name: "workspace_put",
    title: "Stage a file chunk (Large-PR Room)",
    description:
      "Append one chunk of a file into the server-side File Workspace. Use this to push files too big to emit in one response: call it repeatedly with small chunks of the same file (and other files), then call workspace_push once. " +
      "Omit workspace_id on the very first chunk to get a fresh id back, then reuse that id for every chunk and every file in the push.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        path: { type: "string", description: "Repo-relative file path this chunk belongs to." },
        content: { type: "string", description: "One chunk of the file's UTF-8 content." },
        workspace_id: {
          type: "string",
          description: "Omit on the first chunk to receive a fresh id; reuse it for all chunks and files in one push.",
        },
        seq: { type: "number", description: "Optional explicit chunk order. Defaults to append order." },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "workspace_push",
    title: "Push staged files to git by reference (Large-PR Room)",
    description:
      "Assemble every file staged in the workspace and write them to a branch via the GitHub Git Data API (blobs, tree, commit, ref). Any file size. Creates the branch off base_branch (or the default branch) when it does not exist. Staged rows are kept after the push (retention), never deleted.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "string", description: "The id returned by workspace_put." },
        owner: { type: "string", description: "GitHub repo owner." },
        repo: { type: "string", description: "GitHub repo name." },
        branch: { type: "string", description: "Target branch to write the files to." },
        base_branch: { type: "string", description: "Branch to create from when the target does not exist." },
        message: { type: "string", description: "Commit message." },
      },
      required: ["workspace_id", "owner", "repo", "branch"],
    },
  },
  {
    name: "workspace_list",
    title: "List staged files (Large-PR Room)",
    description: "List the files currently staged in a workspace, with byte sizes and the retention horizon.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "string", description: "The workspace id to inspect." },
      },
      required: ["workspace_id"],
    },
  },
];

const WORKSPACE_TOOL_NAMES = new Set(WORKSPACE_VISIBLE_TOOLS.map((t) => t.name));

/** Whether a tool name belongs to the workspace surface. */
export function isWorkspaceTool(name: string): boolean {
  return WORKSPACE_TOOL_NAMES.has(name);
}

function result(body: unknown, isError = false): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(body, null, 2) }], isError };
}

/**
 * Handle a workspace_* tool call by proxying to /api/workspace with the
 * session's UnClick key. Returns null for any non-workspace tool so the caller
 * can fall through to its normal dispatch.
 */
export async function handleWorkspaceTool(
  name: string,
  args: Record<string, unknown>,
): Promise<ToolResult | null> {
  if (!isWorkspaceTool(name)) return null;

  const apiKey = process.env.UNCLICK_API_KEY;
  if (!apiKey) {
    return result(
      { error: "No UnClick API key in this session. The File Workspace needs your key to stage and push." },
      true,
    );
  }

  const base = workspaceBase();
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  try {
    if (name === "workspace_list") {
      const wid = encodeURIComponent(String(args.workspace_id ?? ""));
      const resp = await fetchWithTimeout(
        `${base}/api/workspace?workspace_id=${wid}`,
        { method: "GET", headers },
        PUT_LIST_TIMEOUT_MS,
      );
      return result(await resp.json().catch(() => ({})), !resp.ok);
    }

    const action = name === "workspace_put" ? "put" : "push";
    const resp = await fetchWithTimeout(
      `${base}/api/workspace?action=${action}`,
      { method: "POST", headers, body: JSON.stringify(args) },
      action === "push" ? PUSH_TIMEOUT_MS : PUT_LIST_TIMEOUT_MS,
    );
    return result(await resp.json().catch(() => ({})), !resp.ok);
  } catch (e) {
    const msg =
      e instanceof Error && e.name === "AbortError"
        ? `Workspace ${name} timed out. The endpoint may be slow or the file very large; retry, or split into more chunks.`
        : e instanceof Error
          ? e.message
          : "workspace call failed";
    return result({ error: msg }, true);
  }
}
