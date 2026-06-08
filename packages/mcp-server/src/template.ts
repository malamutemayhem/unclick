// Simple string template interpolation.
// Replaces {{key}} placeholders with values from a context object.
// Useful for connector error messages, tool descriptions, and
// user-facing text that varies by config.

export function interpolate(template: string, context: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (_match, path: string) => {
    const value = resolvePath(context, path);
    if (value === undefined || value === null) return "";
    return String(value);
  });
}

function resolvePath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

// Extract all placeholder names from a template.
export function extractPlaceholders(template: string): string[] {
  const matches = template.matchAll(/\{\{(\w+(?:\.\w+)*)\}\}/g);
  const names = new Set<string>();
  for (const m of matches) names.add(m[1]);
  return [...names];
}

// Check if a template has all required values in the context.
export function validateTemplate(
  template: string,
  context: Record<string, unknown>,
): { valid: boolean; missing: string[] } {
  const placeholders = extractPlaceholders(template);
  const missing = placeholders.filter((p) => {
    const value = resolvePath(context, p);
    return value === undefined || value === null;
  });
  return { valid: missing.length === 0, missing };
}
