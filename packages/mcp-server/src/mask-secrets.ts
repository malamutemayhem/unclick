// API key masking for logs and error messages.
// Inspired by OpenClaw's mask-api-key.ts. Prevents credential leaks in
// error reports and diagnostics while keeping enough of the key visible
// to identify which credential is involved.

export function maskApiKey(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) return "missing";
  if (trimmed.length <= 6) return `${trimmed.slice(0, 1)}...${trimmed.slice(-1)}`;
  if (trimmed.length <= 16) return `${trimmed.slice(0, 2)}...${trimmed.slice(-2)}`;
  return `${trimmed.slice(0, 8)}...${trimmed.slice(-8)}`;
}

// Scan an object for anything that looks like a secret and mask it.
// Useful for sanitizing args before logging.
const SECRET_PATTERNS = /(?:key|token|secret|password|credential|auth|bearer|api_key)/i;

export function maskSecretsInRecord(
  record: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string" && SECRET_PATTERNS.test(key)) {
      result[key] = maskApiKey(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = maskSecretsInRecord(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}
