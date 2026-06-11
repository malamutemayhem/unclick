/**
 * Pure helpers for the Passport (Keychain) page. Extracted from
 * AdminKeychain.tsx so the health, masking, and password-strength rules
 * that drive user-visible badges are unit-testable.
 */

export type CredentialHealthStatus = "healthy" | "untested" | "failing" | "stale" | "needs_rotation";

// Rotation-reminder threshold. Credentials whose last_rotated_at is older
// than this show an inline warning pill in the admin list.
export const ROTATION_WARNING_DAYS = 90;
export const STALE_TEST_DAYS = 30;

export interface CredentialHealthInput {
  is_valid: boolean;
  health_status?: CredentialHealthStatus;
  last_tested_at: string | null;
  last_rotated_at: string | null;
  expires_at: string | null;
}

export function daysSince(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86_400_000);
}

export function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.ceil((t - Date.now()) / 86_400_000);
}

export function maskValue(v: string): string {
  if (v.length <= 8) return "•".repeat(Math.max(v.length, 4));
  return `${v.slice(0, 4)}${"•".repeat(8)}${v.slice(-4)}`;
}

/**
 * Priority order: an explicit backend health_status wins, then imminent
 * expiry, then rotation age, then validity, then test freshness.
 */
export function credentialHealth(cred: CredentialHealthInput): CredentialHealthStatus {
  if (cred.health_status) return cred.health_status;

  const expiresIn = daysUntil(cred.expires_at);
  if (expiresIn !== null && expiresIn <= 14) return "needs_rotation";

  const rotationAge = daysSince(cred.last_rotated_at);
  if (rotationAge !== null && rotationAge >= ROTATION_WARNING_DAYS) return "needs_rotation";

  if (!cred.is_valid) return "failing";

  const testAge = daysSince(cred.last_tested_at);
  if (testAge === null) return "untested";
  if (testAge >= STALE_TEST_DAYS) return "stale";
  return "healthy";
}

export function exportPasswordStrength(pw: string): { label: string; color: string } {
  if (pw.length < 12) return { label: "Weak", color: "bg-red-500" };
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const variety = [hasUpper, hasLower, hasDigit, hasSymbol].filter(Boolean).length;
  if (pw.length >= 16 && variety >= 3) return { label: "Strong", color: "bg-green-500" };
  if (pw.length >= 12 && variety >= 2) return { label: "Good", color: "bg-[#E2B93B]" };
  return { label: "Weak", color: "bg-red-500" };
}
