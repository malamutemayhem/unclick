export type AdminRole = "user" | "superuser" | "god";
export type RoleSource = "god" | "env" | "assigned" | null;

export type ManageAction =
  | "set_role"
  | "set_keys_active"
  | "set_suspended"
  | "delete_user";

// The original UnClick owner remains protected even if a deployment has not
// yet populated GOD_EMAILS. Additional GOD accounts are supplied through the
// server-only allowlist or app metadata.
export const GOD_EMAIL = "creativelead@malamutemayhem.com";

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

function normalizedEmail(email: string | null | undefined): string {
  return email?.trim().toLowerCase() ?? "";
}

export function deriveRole(
  email: string | null,
  appMetadata: unknown,
  admins: Set<string> = envAdminEmails(),
  gods: Set<string> = envGodEmails(),
): AdminRole {
  const emailValue = normalizedEmail(email);
  const role = metadataRole(appMetadata);
  if (role === "god" || (emailValue && gods.has(emailValue))) return "god";
  if (role === "superuser" || (emailValue && admins.has(emailValue))) return "superuser";
  return "user";
}

/**
 * The account-directory role model records where an effective role came
 * from, so the UI can explain why an env-managed superuser cannot be
 * demoted in the browser. It leaves deriveRole's compact return shape intact
 * for MCP and system-connector callers.
 */
export function deriveUserManagementRole(
  email: string | null | undefined,
  appMetadata: unknown,
  admins: Set<string> = envAdminEmails(),
  gods: Set<string> = envGodEmails(),
): { role: AdminRole; source: RoleSource } {
  const emailValue = normalizedEmail(email);
  const role = metadataRole(appMetadata);
  if (
    emailValue === GOD_EMAIL ||
    role === "god" ||
    (emailValue && gods.has(emailValue))
  ) {
    return { role: "god", source: "god" };
  }
  if (emailValue && admins.has(emailValue)) {
    return { role: "superuser", source: "env" };
  }
  if (role === "superuser") {
    return { role: "superuser", source: "assigned" };
  }
  return { role: "user", source: null };
}

export type GuardVerdict =
  | { allowed: true }
  | { allowed: false; status: number; reason: string };

/**
 * Server-side safety gate for the account-management actions. This is kept
 * independent of the React view so no caller can bypass protections by
 * forging a direct API request.
 */
export function guardTargetAction(opts: {
  action: ManageAction;
  callerId: string;
  target: { id: string; email: string | null; app_metadata?: unknown };
  envEmails: Set<string>;
  godEmails?: Set<string>;
  nextRole?: "superuser" | "user";
  suspending?: boolean;
}): GuardVerdict {
  const { action, callerId, target, envEmails } = opts;
  const targetRole = deriveUserManagementRole(
    target.email,
    target.app_metadata ?? null,
    envEmails,
    opts.godEmails ?? envGodEmails(),
  ).role;

  if (targetRole === "god") {
    return {
      allowed: false,
      status: 403,
      reason: "The GOD account is protected. It cannot be modified or deleted from this surface.",
    };
  }
  if (action === "delete_user" && target.id === callerId) {
    return {
      allowed: false,
      status: 400,
      reason: "You cannot delete your own account from here. Use account settings instead.",
    };
  }
  if (action === "set_suspended" && opts.suspending && target.id === callerId) {
    return {
      allowed: false,
      status: 400,
      reason: "You cannot suspend your own account.",
    };
  }
  if (action === "set_role" && opts.nextRole === "user") {
    const emailValue = normalizedEmail(target.email);
    if (emailValue && envEmails.has(emailValue)) {
      return {
        allowed: false,
        status: 409,
        reason: "This superuser is set in the ADMIN_EMAILS env var. Remove the email there to demote them.",
      };
    }
  }
  return { allowed: true };
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
