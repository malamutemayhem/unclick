export interface GitProxyPathCheck {
  ok: boolean;
  reason?: string;
}

export function parseBasicAuth(header: string | undefined): { username: string; password: string } | null {
  const value = String(header ?? "").trim();
  if (!value.toLowerCase().startsWith("basic ")) return null;
  try {
    const decoded = Buffer.from(value.slice(6).trim(), "base64").toString("utf8");
    const splitAt = decoded.indexOf(":");
    if (splitAt === -1) return null;
    return {
      username: decoded.slice(0, splitAt),
      password: decoded.slice(splitAt + 1),
    };
  } catch {
    return null;
  }
}

export function unclickApiKeyFromAuth(params: {
  authorization?: string | string[];
  queryKey?: string | string[];
}): string {
  const auth = Array.isArray(params.authorization) ? params.authorization[0] : params.authorization;
  const bearer = String(auth ?? "").replace(/^Bearer\s+/i, "").trim();
  if (bearer.startsWith("uc_") || bearer.startsWith("agt_")) return bearer;

  const basic = parseBasicAuth(auth);
  if (basic?.password?.startsWith("uc_") || basic?.password?.startsWith("agt_")) {
    return basic.password.trim();
  }

  const queryKey = Array.isArray(params.queryKey) ? params.queryKey[0] : params.queryKey;
  const key = String(queryKey ?? "").trim();
  return key.startsWith("uc_") || key.startsWith("agt_") ? key : "";
}

export function gitProxyPathSegments(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((part) => String(part ?? "").trim()).filter(Boolean);
  if (typeof raw === "string" && raw.trim()) return raw.split("/").map((part) => part.trim()).filter(Boolean);
  return [];
}

export function repoFromGitProxySegments(segments: string[]): string {
  if (segments.length < 2) return "";
  const repo = segments[1].replace(/\.git$/i, "");
  return `${segments[0]}/${repo}`;
}

export function validateGitProxyPath(
  method: string | undefined,
  segments: string[],
  query: Record<string, unknown>,
): GitProxyPathCheck {
  const verb = String(method ?? "").toUpperCase();
  if (verb !== "GET" && verb !== "POST") return { ok: false, reason: "Only GET and POST are supported." };
  if (segments.length < 3) return { ok: false, reason: "Expected /owner/repo.git/git-endpoint." };
  if (segments.some((part) => part === "." || part === ".." || part.includes("\\"))) {
    return { ok: false, reason: "Invalid git path segment." };
  }
  if (!/^[A-Za-z0-9_.-]+$/.test(segments[0])) return { ok: false, reason: "Invalid GitHub owner." };
  if (!/^[A-Za-z0-9_.-]+\.git$/i.test(segments[1])) return { ok: false, reason: "Repository segment must end with .git." };

  const tail = segments.slice(2).join("/");
  if (verb === "GET") {
    const service = String(query.service ?? "");
    const validService = service === "git-upload-pack" || service === "git-receive-pack";
    if (tail === "info/refs" && validService) return { ok: true };
    return { ok: false, reason: "Only info/refs discovery is supported for GET." };
  }

  if (tail === "git-upload-pack" || tail === "git-receive-pack") return { ok: true };
  return { ok: false, reason: "Only git-upload-pack and git-receive-pack are supported for POST." };
}

export function githubRemoteUrl(segments: string[], query: Record<string, unknown>): string {
  const url = new URL(`https://github.com/${segments.map((part) => encodeURIComponent(part)).join("/")}`);
  for (const [key, value] of Object.entries(query)) {
    if (key === "path" || key === "key") continue;
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(key, String(item));
    } else if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export function githubBasicAuthHeader(githubToken: string): string {
  return `Basic ${Buffer.from(`x-access-token:${githubToken}`).toString("base64")}`;
}

export function repoAllowed(repo: string, allowlist: string | undefined): boolean {
  const normalized = repo.toLowerCase();
  const entries = String(allowlist ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return entries.length === 0 || entries.includes(normalized);
}

// Request headers we forward to GitHub. Strict default-deny allowlist: only
// these are copied from the incoming request. Content-Encoding MUST be
// forwarded because git gzips the buffered upload-pack/receive-pack POST body
// by default; dropping it makes GitHub read gzip magic bytes as pkt-lines and
// return 400. Git-Protocol enables protocol v2. We deliberately do NOT forward
// Content-Length or Transfer-Encoding (the HTTP transport recomputes framing
// from the fully buffered body), nor Accept-Encoding (the fetch runtime
// negotiates and transparently decompresses responses itself).
export const FORWARDED_GIT_REQUEST_HEADERS = [
  "accept",
  "content-type",
  "content-encoding",
  "user-agent",
  "git-protocol",
] as const;

// Response headers safe to copy back to the git client. content-length and
// content-encoding are intentionally EXCLUDED: the fetch runtime auto
// decompresses the upstream body, so the bytes we send are already decoded.
// Copying the upstream (compressed) content-length or content-encoding would
// mis-describe the body and corrupt the git stream. The transport recomputes
// content-length from the bytes actually sent.
export const COPIED_GIT_RESPONSE_HEADERS = [
  "content-type",
  "cache-control",
  "expires",
  "pragma",
  "www-authenticate",
] as const;

// Builds the headers forwarded to GitHub from an incoming request. Authorization
// is always hard-set to the GitHub token AFTER the allowlist copy, so the
// caller's UnClick key (or any client Authorization/Cookie) can never reach
// github.com. Header names are matched lowercase (Node lowercases incoming
// header names); array-valued headers collapse to the first value.
export function buildForwardHeaders(
  incoming: Record<string, string | string[] | undefined>,
  githubToken: string,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const name of FORWARDED_GIT_REQUEST_HEADERS) {
    const raw = incoming[name];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (typeof value === "string" && value) out[name] = value;
  }
  out.authorization = githubBasicAuthHeader(githubToken);
  return out;
}
