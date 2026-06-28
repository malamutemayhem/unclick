// ── UnClick File Workspace ("Large-PR Room") tool ────────────────────────────
// Push files of ANY size to GitHub through UnClick's server-side workspace
// (api/workspace.ts), bypassing the inline tool-argument size limit. Stage each
// file as one or more put chunks under the same workspace_id, then push to commit
// by reference using the caller's saved UnClick GitHub login. No external deps.

const WORKSPACE_BASE =
  (process.env.UNCLICK_SITE_URL || "https://unclick.world").replace(/\/+$/, "") +
  "/api/workspace";

function workspaceKey(args: Record<string, unknown>): string {
  return String(args.api_key ?? process.env.UNCLICK_API_KEY ?? "").trim();
}

async function callWorkspace(
  method: string,
  search: string,
  apiKey: string,
  body: Record<string, unknown> | null,
): Promise<unknown> {
  const headers: Record<string, string> = { Authorization: "Bearer " + apiKey };
  if (body) headers["content-type"] = "application/json";
  const res = await fetch(WORKSPACE_BASE + search, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json: unknown = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }
  if (!res.ok) {
    return {
      error: "Workspace " + method + " " + search + " failed (HTTP " + res.status + ").",
      status: res.status,
      detail: json,
    };
  }
  return json;
}

export async function workspaceTool(
  action: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  const apiKey = workspaceKey(args);
  if (!apiKey) {
    return { error: "No UnClick API key. Connect UnClick (or pass api_key) so the room can use your saved GitHub login." };
  }
  switch (action) {
    case "put": {
      if (!args.path || args.content === undefined) {
        return { error: "put requires path and content. Send a big file as several small put calls (reuse workspace_id), then push once." };
      }
      const body: Record<string, unknown> = { action: "put", path: String(args.path), content: String(args.content) };
      if (args.workspace_id !== undefined) body.workspace_id = args.workspace_id;
      if (args.seq !== undefined) body.seq = Number(args.seq);
      return callWorkspace("POST", "?action=put", apiKey, body);
    }
    case "list": {
      if (!args.workspace_id) return { error: "list requires workspace_id." };
      return callWorkspace("GET", "?workspace_id=" + encodeURIComponent(String(args.workspace_id)), apiKey, null);
    }
    case "push": {
      for (const f of ["workspace_id", "owner", "repo", "branch"]) {
        if (!args[f]) return { error: "push requires " + f + "." };
      }
      const body: Record<string, unknown> = {
        action: "push", workspace_id: args.workspace_id,
        owner: String(args.owner), repo: String(args.repo), branch: String(args.branch),
      };
      if (args.base_branch) body.base_branch = String(args.base_branch);
      if (args.message) body.message = String(args.message);
      return callWorkspace("POST", "?action=push", apiKey, body);
    }
    case "prune":
      return callWorkspace("POST", "?action=prune", apiKey, { action: "prune" });
    default:
      return { error: 'Unknown push_workspace action "' + action + '". Use: put, list, push, prune.' };
  }
}