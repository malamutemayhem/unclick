export function slugify(input: string, separator: string = "-"): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, separator);
}

export function deslugify(slug: string, separator: string = "-"): string {
  return slug
    .split(separator)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function camelToSlug(input: string, separator: string = "-"): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z])([A-Z][a-z])/g, `$1${separator}$2`)
    .toLowerCase();
}

export function slugToCamel(slug: string, separator: string = "-"): string {
  const parts = slug.split(separator);
  return parts[0] + parts.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

export function slugToPascal(slug: string, separator: string = "-"): string {
  return slug
    .split(separator)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

export function isValidSlug(input: string, separator: string = "-"): boolean {
  const re = new RegExp(`^[a-z0-9]+(?:${escapeRegex(separator)}[a-z0-9]+)*$`);
  return re.test(input);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function truncateSlug(slug: string, maxLen: number, separator: string = "-"): string {
  if (slug.length <= maxLen) return slug;
  const trimmed = slug.slice(0, maxLen);
  const lastSep = trimmed.lastIndexOf(separator);
  return lastSep > 0 ? trimmed.slice(0, lastSep) : trimmed;
}
