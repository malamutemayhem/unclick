// apps/jobsmith/src/lib/appLog.ts
//
// The application log: one record per job applied for. Pure logic only
// (hashing, record creation, validation). Browser storage glue lives in
// src/lib/jobsmith/appLogStore.ts.

export type ApplicationStatus =
  | "draft"
  | "sent"
  | "ack"
  | "interview"
  | "rejected"
  | "offer"
  | "ghosted";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "draft",
  "sent",
  "ack",
  "interview",
  "rejected",
  "offer",
  "ghosted",
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  ack: "Acknowledged",
  interview: "Interview",
  rejected: "Rejected",
  offer: "Offer",
  ghosted: "Ghosted",
};

export interface ApplicationRecord {
  id: string;
  company: string;
  role: string;
  jdHash: string;
  sentAt: string; // ISO timestamp
  status: ApplicationStatus;
  cvVersionId: string;
  letterVersionId: string;
}

export interface NewApplicationInput {
  company: string;
  role: string;
  jobText: string;
  cvText: string;
  letterText: string;
  status?: ApplicationStatus;
}

// Stable djb2 hash, hex. Used for the JD fingerprint and draft version ids.
export function hashString(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function jdHash(jobText: string): string {
  return hashString(jobText.trim().toLowerCase().replace(/\s+/g, " "));
}

function newId(): string {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  return `app-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createApplicationRecord(
  input: NewApplicationInput,
): ApplicationRecord {
  return {
    id: newId(),
    company: input.company.trim() || "Unknown company",
    role: input.role.trim() || "Unknown role",
    jdHash: jdHash(input.jobText),
    sentAt: new Date().toISOString(),
    status: input.status ?? "draft",
    cvVersionId: input.cvText.trim() ? hashString(input.cvText) : "none",
    letterVersionId: input.letterText.trim()
      ? hashString(input.letterText)
      : "none",
  };
}

export function isApplicationRecord(value: unknown): value is ApplicationRecord {
  if (typeof value !== "object" || value === null) return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.company === "string" &&
    typeof r.role === "string" &&
    typeof r.jdHash === "string" &&
    typeof r.sentAt === "string" &&
    typeof r.status === "string" &&
    APPLICATION_STATUSES.includes(r.status as ApplicationStatus) &&
    typeof r.cvVersionId === "string" &&
    typeof r.letterVersionId === "string"
  );
}
