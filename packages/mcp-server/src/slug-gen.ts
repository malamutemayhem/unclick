export class SlugGenerator {
  static slugify(input: string, separator: string = "-"): string {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, separator)
      .replace(new RegExp(`${SlugGenerator.escapeRegex(separator)}+`, "g"), separator);
  }

  static unique(input: string, existing: string[]): string {
    const base = SlugGenerator.slugify(input);
    if (!existing.includes(base)) return base;
    let i = 2;
    while (existing.includes(`${base}-${i}`)) i++;
    return `${base}-${i}`;
  }

  static fromPath(filePath: string): string {
    const name = filePath.split(/[/\\]/).pop() || "";
    const withoutExt = name.replace(/\.[^.]+$/, "");
    return SlugGenerator.slugify(withoutExt);
  }

  static toTitle(slug: string): string {
    return slug
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  static toCamelCase(slug: string): string {
    const parts = slug.split(/[-_]/);
    return parts[0] + parts.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  }

  static toPascalCase(slug: string): string {
    return slug
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
  }

  static toSnakeCase(slug: string): string {
    return slug.replace(/-/g, "_");
  }

  static toKebabCase(input: string): string {
    return input
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]+/g, "-")
      .toLowerCase();
  }

  static isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }

  static truncate(input: string, maxLength: number): string {
    const slug = SlugGenerator.slugify(input);
    if (slug.length <= maxLength) return slug;
    const truncated = slug.substring(0, maxLength);
    const lastSep = truncated.lastIndexOf("-");
    if (lastSep > maxLength * 0.5) return truncated.substring(0, lastSep);
    return truncated;
  }

  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
