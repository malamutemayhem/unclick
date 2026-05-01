export type SystemCredentialStatus = "healthy" | "untested" | "stale" | "failing";
export type SystemCredentialRisk = "low" | "medium" | "high";

export interface SystemCredentialSource {
  id:              string;
  platform:        string;
  label:           string | null;
  is_valid:        boolean;
  last_tested_at:  string | null;
  last_used_at:    string | null;
  last_rotated_at: string | null;
  expires_at:      string | null;
  created_at:      string;
}

export interface SystemCredentialRow {
  id:             string;
  displayName:    string;
  platform:       string;
  ownerHint:      string;
  usedBy:         string[];
  status:         SystemCredentialStatus;
  statusLabel:    string;
  rotationRisk:   SystemCredentialRisk;
  rotationLabel:  string;
  lastChecked:    string | null;
  safeNote:       string;
}

const STALE_TEST_DAYS = 7;
const ROTATION_DAYS = 90;

function daysSince(iso: string | null, nowMs: number): number | null {
  if (!iso) return null;
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return null;
  return Math.floor((nowMs - time) / 86_400_000);
}

function hasAny(haystack: string, needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function inferUsedBy(source: SystemCredentialSource): string[] {
  const text = `${source.platform} ${source.label ?? ""}`.toLowerCase();
  const uses: string[] = [];

  if (hasAny(text, ["testpass", "test-pass", "test pass"])) uses.push("TestPass PR checks");
  if (hasAny(text, ["cron", "scheduled", "dogfood"])) uses.push("scheduled smoke receipts");
  if (hasAny(text, ["fishbowl", "wake", "wakepass", "pinball"])) uses.push("Fishbowl/WakePass routing");
  if (hasAny(text, ["openrouter", "router"])) uses.push("wake classifier");
  if (hasAny(text, ["github", "gh_"])) uses.push("GitHub workflows");
  if (hasAny(text, ["vercel"])) uses.push("Vercel deploys and cron");
  if (hasAny(text, ["supabase"])) uses.push("database and auth");
  if (hasAny(text, ["posthog", "analytics"])) uses.push("analytics");
  if (hasAny(text, ["slack", "discord", "telegram"])) uses.push("agent notifications");

  return Array.from(new Set(uses.length > 0 ? uses : ["manual agent connection"]));
}

function inferOwnerHint(source: SystemCredentialSource): string {
  const text = `${source.platform} ${source.label ?? ""}`.toLowerCase();
  if (text.includes("creativelead")) return "creativelead";
  if (text.includes("byrneck")) return "byrneck";
  if (text.includes("prod") || text.includes("production")) return "production";
  if (text.includes("staging") || text.includes("preview")) return "preview";
  return "not recorded";
}

function inferStatus(source: SystemCredentialSource, nowMs: number): Pick<SystemCredentialRow, "status" | "statusLabel"> {
  if (!source.is_valid) return { status: "failing", statusLabel: "failing" };
  const testedAge = daysSince(source.last_tested_at, nowMs);
  if (testedAge === null) return { status: "untested", statusLabel: "untested" };
  if (testedAge > STALE_TEST_DAYS) return { status: "stale", statusLabel: `stale (${testedAge}d)` };
  return { status: "healthy", statusLabel: "healthy" };
}

function inferRotation(source: SystemCredentialSource, status: SystemCredentialStatus, nowMs: number): Pick<SystemCredentialRow, "rotationRisk" | "rotationLabel"> {
  const expiryAge = daysSince(source.expires_at, nowMs);
  if (expiryAge !== null && expiryAge >= 0) {
    return { rotationRisk: "high", rotationLabel: "expired" };
  }

  const rotatedAge = daysSince(source.last_rotated_at, nowMs);
  if (status === "failing") return { rotationRisk: "high", rotationLabel: "check before reuse" };
  if (rotatedAge !== null && rotatedAge >= ROTATION_DAYS) {
    return { rotationRisk: "high", rotationLabel: `rotate (${rotatedAge}d)` };
  }
  if (status === "untested" || status === "stale") {
    return { rotationRisk: "medium", rotationLabel: "test before rotate" };
  }
  if (rotatedAge === null) {
    return { rotationRisk: "medium", rotationLabel: "rotation date unknown" };
  }
  return { rotationRisk: "low", rotationLabel: "low" };
}

export function buildSystemCredentialRows(
  credentials: SystemCredentialSource[],
  nowMs = Date.now(),
): SystemCredentialRow[] {
  return credentials.map((source) => {
    const status = inferStatus(source, nowMs);
    const rotation = inferRotation(source, status.status, nowMs);
    const label = source.label?.trim();
    const displayName = label ? `${source.platform} / ${label}` : source.platform;

    return {
      id:             source.id,
      displayName,
      platform:       source.platform,
      ownerHint:      inferOwnerHint(source),
      usedBy:         inferUsedBy(source),
      ...status,
      ...rotation,
      lastChecked:    source.last_tested_at,
      safeNote:       "Tracks metadata only. Raw secret values are not shown in this view.",
    };
  }).sort((a, b) => {
    const rank: Record<SystemCredentialRisk, number> = { high: 0, medium: 1, low: 2 };
    return rank[a.rotationRisk] - rank[b.rotationRisk] || a.displayName.localeCompare(b.displayName);
  });
}
