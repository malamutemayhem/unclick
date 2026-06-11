export interface RelativeTimeOptions {
  /** Label for a missing timestamp. Default "never". */
  emptyLabel?: string;
  /** Use "5 minutes ago" instead of "5m ago". Default false. */
  longForm?: boolean;
  /** Days before falling back to a plain date. Default 14. */
  maxDays?: number;
}

/**
 * One shared "how long ago" formatter for admin surfaces. The admin pages
 * used to carry five drifting copies of this; keep behavior changes here so
 * every surface stays consistent.
 */
export function relativeTime(iso: string | null | undefined, options: RelativeTimeOptions = {}): string {
  const { emptyLabel = "never", longForm = false, maxDays = 14 } = options;
  if (!iso) return emptyLabel;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "unknown";
  const diffSec = Math.max(1, Math.floor((Date.now() - then) / 1000));
  const unit = (value: number, short: string, long: string) =>
    longForm ? `${value} ${long}${value === 1 ? "" : "s"} ago` : `${value}${short} ago`;
  if (diffSec < 60) return unit(diffSec, "s", "second");
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return unit(diffMin, "m", "minute");
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return unit(diffHr, "h", "hour");
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < maxDays) return unit(diffDay, "d", "day");
  return new Date(iso).toLocaleDateString();
}
