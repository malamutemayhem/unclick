export function slugify(input: string, separator = "-"): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, separator);
}

export function deslugify(slug: string, separator = "-"): string {
  return slug
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function camelToSlug(camel: string, separator = "-"): string {
  return camel
    .replace(/([a-z])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z])/g, `$1${separator}$2`)
    .toLowerCase();
}

export function slugToCamel(slug: string, separator = "-"): string {
  return slug
    .split(separator)
    .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function slugToPascal(slug: string, separator = "-"): string {
  return slug
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(input: string): string {
  return slugify(input, "_");
}

export function toKebabCase(input: string): string {
  return slugify(input, "-");
}

export function isSlug(input: string, separator = "-"): boolean {
  const pattern = new RegExp(`^[a-z0-9]+(?:${escapeRegex(separator)}[a-z0-9]+)*$`);
  return pattern.test(input);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
