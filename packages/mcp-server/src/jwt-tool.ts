import { stampMeta } from "./connector-meta.js";

export async function jwtDecode(args: Record<string, unknown>) {
  const token = String(args.token ?? "").trim();
  if (!token) return { error: "token (JWT string) is required" };
  const parts = token.split(".");
  if (parts.length !== 3) return { error: "Invalid JWT format: expected 3 dot-separated parts" };
  try {
    const header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    const expiresAt = payload.exp ? new Date(payload.exp * 1000).toISOString() : null;
    const issuedAt = payload.iat ? new Date(payload.iat * 1000).toISOString() : null;
    const isExpired = payload.exp ? Date.now() / 1000 > payload.exp : null;
    return stampMeta({ header, payload, expires_at: expiresAt, issued_at: issuedAt, is_expired: isExpired, signature_present: parts[2].length > 0 }, {
      source: "local JWT base64url decoder",
      fetched_at: new Date().toISOString(),
      next_steps: ["check payload claims (sub, iss, aud, exp)", "note: this decodes only, it does NOT verify the signature"],
    });
  } catch (e) {
    return { error: `Failed to decode JWT: ${(e as Error).message}` };
  }
}
