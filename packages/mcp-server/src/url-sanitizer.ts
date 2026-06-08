// URL sanitization and validation.
// Strips credentials and secret query params before logging,
// validates against SSRF patterns, and normalizes for consistency.

const SECRET_PARAM_PATTERNS = [
  /key/i, /token/i, /secret/i, /password/i, /auth/i, /credential/i,
  /bearer/i, /apikey/i, /api_key/i, /access_key/i, /session/i,
];

const SSRF_BLOCKED_HOSTS = [
  "169.254.169.254",
  "metadata.google.internal",
  "100.100.100.200",
];

const SSRF_BLOCKED_PREFIXES = [
  "10.", "172.16.", "172.17.", "172.18.", "172.19.",
  "172.20.", "172.21.", "172.22.", "172.23.", "172.24.",
  "172.25.", "172.26.", "172.27.", "172.28.", "172.29.",
  "172.30.", "172.31.", "192.168.", "127.", "0.",
];

export interface SanitizeOptions {
  stripAuth?: boolean;
  stripSecretParams?: boolean;
  blockSsrf?: boolean;
  extraSecretParams?: string[];
}

const DEFAULT_OPTIONS: Required<SanitizeOptions> = {
  stripAuth: true,
  stripSecretParams: true,
  blockSsrf: true,
  extraSecretParams: [],
};

export function sanitizeUrl(raw: string, opts: SanitizeOptions = {}): string {
  const o = { ...DEFAULT_OPTIONS, ...opts };
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return "[invalid-url]";
  }

  if (o.stripAuth && (url.username || url.password)) {
    url.username = "";
    url.password = "";
  }

  if (o.stripSecretParams) {
    const allPatterns = [...SECRET_PARAM_PATTERNS];
    for (const extra of o.extraSecretParams) {
      allPatterns.push(new RegExp(extra, "i"));
    }

    for (const key of [...url.searchParams.keys()]) {
      if (allPatterns.some((p) => p.test(key))) {
        url.searchParams.set(key, "***");
      }
    }
  }

  return url.toString();
}

export interface SsrfCheckResult {
  safe: boolean;
  reason?: string;
}

export function checkSsrf(raw: string): SsrfCheckResult {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { safe: false, reason: "Invalid URL" };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { safe: false, reason: `Blocked protocol: ${url.protocol}` };
  }

  const hostname = url.hostname.toLowerCase();

  if (SSRF_BLOCKED_HOSTS.includes(hostname)) {
    return { safe: false, reason: `Blocked host: ${hostname}` };
  }

  if (hostname === "localhost" || hostname === "[::1]") {
    return { safe: false, reason: "Localhost access blocked" };
  }

  if (SSRF_BLOCKED_PREFIXES.some((p) => hostname.startsWith(p))) {
    return { safe: false, reason: `Private IP range: ${hostname}` };
  }

  return { safe: true };
}

export function validateAndSanitize(raw: string, opts: SanitizeOptions = {}): {
  url: string;
  ssrf: SsrfCheckResult;
} {
  const o = { ...DEFAULT_OPTIONS, ...opts };
  const ssrf = o.blockSsrf ? checkSsrf(raw) : { safe: true };
  const url = sanitizeUrl(raw, opts);
  return { url, ssrf };
}

export function redactUrlForLog(raw: string): string {
  return sanitizeUrl(raw, { stripAuth: true, stripSecretParams: true, blockSsrf: false });
}
