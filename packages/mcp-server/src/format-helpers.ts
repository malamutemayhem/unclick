// Formatting helpers for agent-facing output.
// Small utilities that make tool responses read better for both
// humans and LLMs. Inspired by OpenClaw's human-list.ts and
// various formatting patterns across their codebase.

// Format a list in natural English: "A, B, and C" or "A, B, or C".
export function humanList(
  values: readonly string[],
  conjunction: "and" | "or" = "or",
): string {
  if (values.length === 0) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} ${conjunction} ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, ${conjunction} ${values.at(-1)}`;
}

// Truncate a string to a max length with ellipsis.
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  if (maxLength <= 3) return text.slice(0, maxLength);
  return text.slice(0, maxLength - 3) + "...";
}

// Pluralize a word based on count.
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? singular + "s");
}

// Format a count with its label: "1 item", "5 items", "no items".
export function countLabel(count: number, singular: string, plural?: string): string {
  if (count === 0) return `no ${pluralize(0, singular, plural)}`;
  return `${count} ${pluralize(count, singular, plural)}`;
}

// Relative time formatting: "2 minutes ago", "in 3 hours".
export function relativeTime(date: Date, now?: Date): string {
  const ref = now ?? new Date();
  const diffMs = ref.getTime() - date.getTime();
  const absDiff = Math.abs(diffMs);
  const past = diffMs > 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let label: string;
  if (seconds < 60) label = "just now";
  else if (minutes < 60) label = `${minutes} ${pluralize(minutes, "minute")}`;
  else if (hours < 24) label = `${hours} ${pluralize(hours, "hour")}`;
  else if (days < 30) label = `${days} ${pluralize(days, "day")}`;
  else label = `${Math.floor(days / 30)} ${pluralize(Math.floor(days / 30), "month")}`;

  if (label === "just now") return label;
  return past ? `${label} ago` : `in ${label}`;
}

// Chunk an array into fixed-size batches.
export function chunkArray<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) return [Array.from(items)];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

// Generate a hyphen-slug from a string (for IDs, filenames).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
