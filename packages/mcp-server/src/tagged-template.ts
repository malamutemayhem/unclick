export function sql(strings: TemplateStringsArray, ...values: unknown[]): { text: string; values: unknown[] } {
  let text = "";
  const params: unknown[] = [];
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) {
      params.push(values[i]);
      text += `$${params.length}`;
    }
  }
  return { text, values: params };
}

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  let raw = "";
  for (let i = 0; i < strings.length; i++) {
    raw += strings[i];
    if (i < values.length) raw += String(values[i]);
  }

  const lines = raw.split("\n");
  if (lines[0].trim() === "") lines.shift();
  if (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

  const minIndent = lines
    .filter((l) => l.trim().length > 0)
    .reduce((min, l) => {
      const indent = l.match(/^(\s*)/)?.[1].length ?? 0;
      return Math.min(min, indent);
    }, Infinity);

  if (minIndent === Infinity) return lines.join("\n");
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

export function oneLine(strings: TemplateStringsArray, ...values: unknown[]): string {
  let raw = "";
  for (let i = 0; i < strings.length; i++) {
    raw += strings[i];
    if (i < values.length) raw += String(values[i]);
  }
  return raw.replace(/\s+/g, " ").trim();
}
