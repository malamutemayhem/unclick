// src/lib/jobsmith/appLogStore.ts
//
// Browser-local persistence for the Jobsmith application log. localStorage
// keeps the log on the user's device across reloads; nothing is uploaded.

import {
  isApplicationRecord,
  type ApplicationRecord,
} from "@jobsmith/lib/appLog";

const STORAGE_KEY = "jobsmith.appLog.v1";

export function loadAppLog(): ApplicationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isApplicationRecord);
  } catch {
    return [];
  }
}

export function saveAppLog(records: ApplicationRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Storage full or unavailable: keep the in-memory log, drop persistence.
  }
}
