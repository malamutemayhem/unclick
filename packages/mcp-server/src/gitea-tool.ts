import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";

type GiteaAuth = { baseUrl: string; token: string; shouldMarkProof: boolean };

function isGiteaAuth(value: GiteaAuth | Record<string, unknown>): value is GiteaAuth {
  return typeof (value as GiteaAuth).baseUrl === "string" && typeof (value as GiteaAuth).token === "string";
}

function value(args: Record<string, unknown>, key: string): string {
  return String(args[key] ?? "").trim();
}

async function resolveAuth(args: Record<string, unknown>): Promise<GiteaAuth | Record<string, unknown>> {
  const resolved = await resolveCredentials("gitea", args);
  if ("error" in resolved) return resolved;
  const baseUrl = value(resolved, "base_url").replace(/\/+$/, "");
  const token = value(resolved, "access_token") || value(resolved, "api_key");
  if (!baseUrl) return { error: "Gitea base_url is required." };
  if (!token) return { error: "Gitea access_token is required." };
  return { baseUrl, token, shouldMarkProof: credentialResolvedFromUnClick(resolved) };
}

async function request(
  auth: GiteaAuth,
  method: "GET" | "POST" | "PUT" | "PATCH",
  path: string,
  body?: unknown,
  query?: Record<string, string | undefined>,
): Promise<unknown> {
  const url = new URL(`/api/v1${path}`, `${auth.baseUrl}/`);
  for (const [key, candidate] of Object.entries(query ?? {})) {
    if (candidate) url.searchParams.set(key, candidate);
  }
  const timeout = Number(process.env.GITEA_TIMEOUT_MS) || 15_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `token ${auth.token}`,
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await response.text();
    let data: unknown = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
    if (!response.ok) {
      const detail = data && typeof data === "object" ? String((data as Record<string, unknown>).message ?? text) : text;
      return { error: `Gitea API ${response.status}: ${detail || response.statusText}`, status: response.status };
    }
    return data;
  } catch (error) {
    return { error: error instanceof Error && error.name === "AbortError" ? "Gitea request timed out." : "Gitea request failed." };
  } finally {
    clearTimeout(timer);
  }
}

function repository(args: Record<string, unknown>): { owner: string; repo: string } | Record<string, unknown> {
  const owner = value(args, "owner");
  const repo = value(args, "repo");
  return owner && repo ? { owner, repo } : { error: "owner and repo are required." };
}

function isRepository(value: unknown): value is { owner: string; repo: string } {
  return Boolean(value && typeof value === "object" && "owner" in value && "repo" in value);
}

export async function giteaAction(action: string, args: Record<string, unknown>): Promise<unknown> {
  const auth = await resolveAuth(args);
  if (!isGiteaAuth(auth)) return auth;
  const repo = repository(args);
  const invoke = async (method: "GET" | "POST" | "PUT" | "PATCH", path: string, body?: unknown, query?: Record<string, string | undefined>) =>
    request(auth, method, path, body, query);
  let result: unknown;

  switch (action) {
    case "get_user":
      result = invoke("GET", value(args, "username") ? `/users/${encodeURIComponent(value(args, "username"))}` : "/user");
      break;
    case "search_repos":
      if (!value(args, "query")) return { error: "query is required." };
      result = invoke("GET", "/repos/search", undefined, { q: value(args, "query"), limit: value(args, "per_page") || "30" });
      break;
    case "get_repo":
      if (!isRepository(repo)) return repo;
      result = invoke("GET", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}`);
      break;
    case "list_branches":
      if (!isRepository(repo)) return repo;
      result = invoke("GET", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/branches`);
      break;
    case "create_branch": {
      if (!isRepository(repo)) return repo;
      const branch = value(args, "new_branch") || value(args, "branch");
      if (!branch) return { error: "new_branch is required." };
      result = invoke("POST", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/branches`, {
        new_branch_name: branch,
        old_ref_name: value(args, "base_branch") || "main",
      });
      break;
    }
    case "get_file": {
      if (!isRepository(repo)) return repo;
      const path = value(args, "path").replace(/^\/+/, "");
      if (!path) return { error: "path is required." };
      result = invoke("GET", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/contents/${path.split("/").map(encodeURIComponent).join("/")}`, undefined, { ref: value(args, "ref") || undefined });
      break;
    }
    case "get_commit_status": {
      if (!isRepository(repo)) return repo;
      const ref = value(args, "ref");
      if (!ref) return { error: "ref is required." };
      result = invoke("GET", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/commits/${encodeURIComponent(ref)}/status`);
      break;
    }
    case "list_prs":
      if (!isRepository(repo)) return repo;
      result = invoke("GET", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/pulls`, undefined, { state: value(args, "state") || "open" });
      break;
    case "create_pull_request": {
      if (!isRepository(repo)) return repo;
      const title = value(args, "title");
      const head = value(args, "head") || value(args, "branch");
      if (!title || !head) return { error: "title and head are required." };
      result = invoke("POST", `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/pulls`, {
        title,
        head,
        base: value(args, "base") || value(args, "base_branch") || "main",
        body: value(args, "body") || undefined,
      });
      break;
    }
    default:
      return { error: "Unknown Gitea action. Use get_user, search_repos, get_repo, list_branches, create_branch, get_file, get_commit_status, list_prs, or create_pull_request." };
  }

  const awaited = await result;
  if (!(awaited && typeof awaited === "object" && "error" in (awaited as Record<string, unknown>)) && auth.shouldMarkProof) {
    await markCredentialLiveTested("gitea");
  }
  return awaited;
}
