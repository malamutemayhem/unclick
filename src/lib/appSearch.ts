import type { AppEntry } from "@/lib/appCatalog";

function normalizeSearchText(value: string): { spaced: string; compact: string } {
  const spaced = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

  return { spaced, compact: spaced.replace(/\s+/g, "") };
}

function appSearchText(app: AppEntry): string {
  return [
    app.name,
    app.slug,
    app.category,
    app.blurb,
    app.domain ?? "",
    ...app.tools.flatMap((tool) => [tool.name, tool.label ?? "", tool.description]),
  ].join(" ");
}

export function appMatchesSearch(app: AppEntry, query: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery.spaced) return true;

  const haystack = normalizeSearchText(appSearchText(app));
  if (
    haystack.spaced.includes(normalizedQuery.spaced) ||
    haystack.compact.includes(normalizedQuery.compact)
  ) {
    return true;
  }

  const parts = normalizedQuery.spaced.split(" ").filter(Boolean);
  return parts.every((part) => haystack.spaced.includes(part) || haystack.compact.includes(part));
}
