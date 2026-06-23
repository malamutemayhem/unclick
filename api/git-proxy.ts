import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  githubBasicAuthHeader,
  githubRemoteUrl,
  gitProxyPathSegments,
  repoAllowed,
  repoFromGitProxySegments,
  unclickApiKeyFromAuth,
  validateGitProxyPath,
} from "./lib/git-proxy.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req: VercelRequest): Promise<Buffer | undefined> {
  if (req.method !== "POST") return undefined;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  const bytes = new Uint8Array(buffer.byteLength);
  bytes.set(buffer);
  return bytes.buffer;
}

function originForRequest(req: VercelRequest): string {
  const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "unclick.world");
  const proto = String(req.headers["x-forwarded-proto"] ?? (host.includes("localhost") ? "http" : "https"));
  return `${proto}://${host}`;
}

function segmentsFromRequest(req: VercelRequest): string[] {
  const fromRewrite = gitProxyPathSegments(req.query.path);
  if (fromRewrite.length) return fromRewrite;

  const pathname = new URL(String(req.url ?? ""), originForRequest(req)).pathname;
  const prefix = "/api/git-proxy/";
  if (!pathname.startsWith(prefix)) return [];
  return gitProxyPathSegments(pathname.slice(prefix.length));
}

async function savedGitHubToken(req: VercelRequest, apiKey: string): Promise<string | null> {
  const credentialsUrl = new URL("/api/credentials", originForRequest(req));
  credentialsUrl.searchParams.set("platform", "github");
  credentialsUrl.searchParams.set("force_refresh", "1");

  const response = await fetch(credentialsUrl.toString(), {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) return null;
  const data = await response.json() as Record<string, unknown>;
  const token = String(data.access_token ?? data.api_key ?? "").trim();
  return token || null;
}

function forwardableHeaders(req: VercelRequest, githubToken: string): Headers {
  const headers = new Headers();
  const accept = req.headers.accept;
  const contentType = req.headers["content-type"];
  const userAgent = req.headers["user-agent"];
  if (typeof accept === "string") headers.set("Accept", accept);
  if (typeof contentType === "string") headers.set("Content-Type", contentType);
  if (typeof userAgent === "string") headers.set("User-Agent", userAgent);
  headers.set("Authorization", githubBasicAuthHeader(githubToken));
  return headers;
}

function copyGitResponseHeaders(upstream: Response, res: VercelResponse): void {
  const safeHeaders = [
    "content-type",
    "content-length",
    "cache-control",
    "expires",
    "pragma",
    "www-authenticate",
  ];
  for (const header of safeHeaders) {
    const value = upstream.headers.get(header);
    if (value) res.setHeader(header, value);
  }
  res.setHeader("Cache-Control", "private, no-store, max-age=0, must-revalidate");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "private, no-store, max-age=0, must-revalidate");

  if (req.method === "OPTIONS") return res.status(204).end();

  const apiKey = unclickApiKeyFromAuth({
    authorization: req.headers.authorization,
    queryKey: req.query.key,
  });
  if (!apiKey) {
    res.setHeader("WWW-Authenticate", 'Basic realm="UnClick git proxy"');
    return res.status(401).send("UnClick API key required.");
  }

  const segments = segmentsFromRequest(req);
  const pathCheck = validateGitProxyPath(req.method, segments, req.query);
  if (!pathCheck.ok) return res.status(400).send(pathCheck.reason ?? "Invalid git proxy path.");

  const repo = repoFromGitProxySegments(segments);
  if (!repoAllowed(repo, process.env.UNCLICK_GIT_PROXY_REPOS)) {
    return res.status(403).send("Repository is not allowed by this UnClick git proxy.");
  }

  const githubToken = await savedGitHubToken(req, apiKey);
  if (!githubToken) {
    return res.status(401).send("Saved UnClick GitHub login is missing or cannot be decrypted with this API key.");
  }

  const upstreamUrl = githubRemoteUrl(segments, req.query);
  const body = await readRawBody(req);
  const upstream = await fetch(upstreamUrl, {
    method: req.method,
    headers: forwardableHeaders(req, githubToken),
    body: body ? toArrayBuffer(body) : undefined,
  });

  copyGitResponseHeaders(upstream, res);
  const responseBody = Buffer.from(await upstream.arrayBuffer());
  return res.status(upstream.status).send(responseBody);
}
