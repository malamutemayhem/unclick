/**
 * Due-date input parsing for the Boardroom todo substrate.
 *
 * Callers send due_at in three shapes:
 *   - undefined: field untouched (create: no due date; update: no change)
 *   - null or "": clear the due date
 *   - string: any Date-parseable value. Date-only strings ("2026-06-15")
 *     mean "due by the end of that day", so they normalize to 23:59:59 UTC
 *     instead of midnight (which would mark the job overdue all day).
 *
 * Returns a normalized ISO timestamp (or null to clear, or undefined for
 * "no change") ready for the due_at column.
 */
export type DueAtParse =
  | { ok: true; value: string | null | undefined }
  | { ok: false; error: string };

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const MIN_DUE_YEAR = 2000;
const MAX_DUE_YEAR = 2100;

export function parseDueAtInput(raw: unknown): DueAtParse {
  if (raw === undefined) return { ok: true, value: undefined };
  if (raw === null) return { ok: true, value: null };
  if (typeof raw !== "string") {
    return { ok: false, error: "due_at must be an ISO date string, an empty string, or null" };
  }
  const trimmed = raw.trim();
  if (trimmed === "") return { ok: true, value: null };
  const candidate = DATE_ONLY.test(trimmed) ? `${trimmed}T23:59:59.999Z` : trimmed;
  const parsed = new Date(candidate);
  if (Number.isNaN(parsed.getTime())) {
    return {
      ok: false,
      error: "due_at must be a valid date, e.g. 2026-06-15 or 2026-06-15T09:00:00+10:00",
    };
  }
  const year = parsed.getUTCFullYear();
  if (year < MIN_DUE_YEAR || year > MAX_DUE_YEAR) {
    return { ok: false, error: `due_at year must be between ${MIN_DUE_YEAR} and ${MAX_DUE_YEAR}` };
  }
  return { ok: true, value: parsed.toISOString() };
}
