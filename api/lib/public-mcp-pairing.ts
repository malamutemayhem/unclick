import * as crypto from "crypto";

export const PUBLIC_MCP_PAIR_COOKIE = "unclick_mcp_pair";
export const PUBLIC_MCP_PAIR_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const PUBLIC_MCP_PAIR_ID_RE = /^[A-Za-z0-9_-]{32,96}$/;

export function createPublicMcpPairId(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function isValidPublicMcpPairId(value: unknown): value is string {
  return typeof value === "string" && PUBLIC_MCP_PAIR_ID_RE.test(value.trim());
}

export function publicMcpPairDeviceId(pairId: string): string {
  const trimmed = pairId.trim();
  if (!isValidPublicMcpPairId(trimmed)) {
    throw new Error("Invalid public MCP pair id");
  }
  const digest = crypto.createHash("sha256").update(trimmed).digest("hex");
  return `public-mcp:${digest}`;
}

export function buildPublicMcpPairCookie(pairId: string): string {
  const trimmed = pairId.trim();
  if (!isValidPublicMcpPairId(trimmed)) {
    throw new Error("Invalid public MCP pair id");
  }
  return [
    `${PUBLIC_MCP_PAIR_COOKIE}=${trimmed}`,
    "Path=/api/mcp",
    `Max-Age=${PUBLIC_MCP_PAIR_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=None",
  ].join("; ");
}
