export function slugify(input: string, separator = "-"): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");
}

export function deslugify(slug: string, separator = "-"): string {
  return slug.split(separator).map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function camelCase(input: string): string {
  return slugify(input)
    .split("-")
    .map((w: string, i: number) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
}

export function pascalCase(input: string): string {
  return slugify(input)
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

export function snakeCase(input: string): string {
  return slugify(input, "_");
}

export function kebabCase(input: string): string {
  return slugify(input);
}

export function titleCase(input: string): string {
  return slugify(input)
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function constantCase(input: string): string {
  return slugify(input, "_").toUpperCase();
}
