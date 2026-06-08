export interface CSSRule {
  selector: string;
  properties: Record<string, string>;
}

export function parseCSS(css: string): CSSRule[] {
  const rules: CSSRule[] = [];
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  let i = 0;

  while (i < cleaned.length) {
    while (i < cleaned.length && /\s/.test(cleaned[i])) i++;
    if (i >= cleaned.length) break;

    const braceIdx = cleaned.indexOf("{", i);
    if (braceIdx === -1) break;
    const selector = cleaned.slice(i, braceIdx).trim();

    const closeIdx = cleaned.indexOf("}", braceIdx);
    if (closeIdx === -1) break;
    const body = cleaned.slice(braceIdx + 1, closeIdx).trim();

    const properties: Record<string, string> = {};
    if (body) {
      for (const decl of body.split(";")) {
        const colonIdx = decl.indexOf(":");
        if (colonIdx === -1) continue;
        const prop = decl.slice(0, colonIdx).trim();
        const val = decl.slice(colonIdx + 1).trim();
        if (prop && val) properties[prop] = val;
      }
    }

    rules.push({ selector, properties });
    i = closeIdx + 1;
  }

  return rules;
}

export function stringifyCSS(rules: CSSRule[]): string {
  return rules.map((rule) => {
    const decls = Object.entries(rule.properties)
      .map(([prop, val]) => `  ${prop}: ${val};`)
      .join("\n");
    return `${rule.selector} {\n${decls}\n}`;
  }).join("\n\n");
}

export function specificity(selector: string): [number, number, number] {
  let ids = 0;
  let classes = 0;
  let elements = 0;

  const stripped = selector
    .replace(/\[.*?\]/g, (m) => { classes++; return ""; })
    .replace(/::[a-z-]+/g, (m) => { elements++; return ""; })
    .replace(/:[a-z-]+(\(.*?\))?/g, (m) => { classes++; return ""; });

  const parts = stripped.split(/[\s>+~]+/).filter(Boolean);
  for (const part of parts) {
    const tokens = part.split(/(?=[.#])/);
    for (const token of tokens) {
      if (token.startsWith("#")) ids++;
      else if (token.startsWith(".")) classes++;
      else if (token && token !== "*") elements++;
    }
  }

  return [ids, classes, elements];
}
