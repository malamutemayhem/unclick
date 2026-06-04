export interface QuietHeartbeatPostInput {
  text: string;
  tags?: string[] | null;
  suppressNoopHeartbeat?: boolean | null;
}

const MATERIAL_PATTERNS = [
  /\baction[-_ ]?needed\b/,
  /\bapproval[-_ ]?required\b/,
  /\bblocker\b/,
  /\bfailed check\b/,
  /\bmissing proof\b/,
  /\bneeds[-_ ]?doing\b/,
  /\bowner silence\b/,
  /\bqueue hydration failure\b/,
  /\bstale ack\b/,
  /\btripwire\b/,
];

const NOOP_PATTERNS = [
  /\bdont_notify\b/,
  /\bdon't notify\b/,
  /\bhealthy heartbeat\b/,
  /\bno changes?\b/,
  /\bno new signals?\b/,
  /\bno user action needed\b/,
  /\bno[-_ ]?op heartbeat\b/,
  /\bnothing changed\b/,
  /\bquiet[-_ ]?status\b/,
  /\bstate unchanged\b/,
  /\bunchanged state\b/,
  /^unclick healthy\.?$/,
];

function normalizedText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function normalizedTags(tags: string[] | null | undefined): Set<string> {
  return new Set((tags ?? []).map((tag) => tag.toLowerCase().trim()).filter(Boolean));
}

export function shouldSuppressNoopHeartbeatPost(input: QuietHeartbeatPostInput): boolean {
  if (input.suppressNoopHeartbeat !== true) return false;

  const text = normalizedText(input.text);
  if (!text) return false;
  const materialText = text.replace(/\bno user action needed\b/g, "");
  if (MATERIAL_PATTERNS.some((pattern) => pattern.test(materialText))) return false;

  const tags = normalizedTags(input.tags);
  if (tags.has("no-op-heartbeat")) return true;

  const heartbeatTagged = tags.has("heartbeat") || tags.has("quiet") || tags.has("status");
  const hasHeartbeatText = /\bheartbeat\b/.test(text) || /^unclick healthy\.?$/.test(text);
  const hasNoopText = NOOP_PATTERNS.some((pattern) => pattern.test(text));

  return hasNoopText && (heartbeatTagged || hasHeartbeatText || /^unclick healthy\.?$/.test(text));
}
