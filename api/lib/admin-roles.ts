export type AdminRole = "user" | "superuser" | "god";

function normalizedEmails(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function envAdminEmails(env: NodeJS.ProcessEnv = process.env): Set<string> {
  return normalizedEmails(env.ADMIN_EMAILS);
}

export function envGodEmails(env: NodeJS.ProcessEnv = process.env): Set<string> {
  return normalizedEmails(env.GOD_EMAILS);
}

function metadataRole(appMetadata: unknown): string | null {
  if (!appMetadata || typeof appMetadata !== "object" || Array.isArray(appMetadata)) return null;
  const record = appMetadata as Record<string, unknown>;
  const value = record.unclick_role ?? record.role;
  return typeof value === "string" ? value.trim().toLowerCase() : null;
}

export function deriveRole(
  email: string | null,
  appMetadata: unknown,
  admins: Set<string> = envAdminEmails(),
  gods: Set<string> = envGodEmails(),
): AdminRole {
  const normalizedEmail = email?.trim().toLowerCase() ?? "";
  const role = metadataRole(appMetadata);
  if (role === "god" || (normalizedEmail && gods.has(normalizedEmail))) return "god";
  if (role === "superuser" || (normalizedEmail && admins.has(normalizedEmail))) return "superuser";
  return "user";
}

/**
 * A dedicated GOD_EMAILS allowlist is preferred. A legacy deployment with one
 * ADMIN_EMAILS entry may bootstrap the master store without a second setting.
 */
export function canManageSystemConnectors(
  role: AdminRole,
  admins: Set<string> = envAdminEmails(),
  gods: Set<string> = envGodEmails(),
): boolean {
  return role === "god" || (role === "superuser" && gods.size === 0 && admins.size === 1);
}
