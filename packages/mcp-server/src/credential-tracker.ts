export interface TrackedCredential {
  id: string;
  name: string;
  expiresAt: number;
  warnBeforeMs: number;
  rotatedAt?: number;
  metadata?: Record<string, unknown>;
}

export type CredentialStatus = "valid" | "expiring_soon" | "expired";

export interface CredentialReport {
  id: string;
  name: string;
  status: CredentialStatus;
  expiresAt: number;
  remainingMs: number;
}

export class CredentialTracker {
  private credentials = new Map<string, TrackedCredential>();

  track(cred: {
    id: string;
    name: string;
    expiresAt: number | Date;
    warnBeforeMs?: number;
    metadata?: Record<string, unknown>;
  }): void {
    this.credentials.set(cred.id, {
      id: cred.id,
      name: cred.name,
      expiresAt: typeof cred.expiresAt === "number" ? cred.expiresAt : cred.expiresAt.getTime(),
      warnBeforeMs: cred.warnBeforeMs ?? 7 * 24 * 60 * 60 * 1000,
      metadata: cred.metadata,
    });
  }

  untrack(id: string): boolean {
    return this.credentials.delete(id);
  }

  markRotated(id: string, newExpiresAt: number | Date): void {
    const cred = this.credentials.get(id);
    if (!cred) return;
    cred.rotatedAt = Date.now();
    cred.expiresAt = typeof newExpiresAt === "number" ? newExpiresAt : newExpiresAt.getTime();
  }

  getStatus(id: string, now = Date.now()): CredentialReport | undefined {
    const cred = this.credentials.get(id);
    if (!cred) return undefined;
    return buildReport(cred, now);
  }

  getExpired(now = Date.now()): CredentialReport[] {
    return this.all(now).filter((r) => r.status === "expired");
  }

  getExpiringSoon(now = Date.now()): CredentialReport[] {
    return this.all(now).filter((r) => r.status === "expiring_soon");
  }

  all(now = Date.now()): CredentialReport[] {
    return Array.from(this.credentials.values()).map((c) => buildReport(c, now));
  }

  get size(): number {
    return this.credentials.size;
  }
}

function buildReport(cred: TrackedCredential, now: number): CredentialReport {
  const remainingMs = cred.expiresAt - now;
  let status: CredentialStatus = "valid";
  if (remainingMs <= 0) {
    status = "expired";
  } else if (remainingMs <= cred.warnBeforeMs) {
    status = "expiring_soon";
  }
  return {
    id: cred.id,
    name: cred.name,
    status,
    expiresAt: cred.expiresAt,
    remainingMs: Math.max(0, remainingMs),
  };
}
