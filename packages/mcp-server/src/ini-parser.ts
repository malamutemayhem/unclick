export interface INIData {
  [section: string]: Record<string, string>;
}

export function parseINI(input: string): INIData {
  const result: INIData = {};
  let currentSection = "";
  result[currentSection] = {};

  for (const rawLine of input.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith(";") || line.startsWith("#")) continue;

    const sectionMatch = line.match(/^\[(.+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      if (!result[currentSection]) result[currentSection] = {};
      continue;
    }

    const eqIdx = line.indexOf("=");
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let value = line.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[currentSection][key] = value;
  }

  if (Object.keys(result[""]).length === 0) delete result[""];
  return result;
}

export function stringifyINI(data: INIData): string {
  const lines: string[] = [];

  if (data[""]) {
    for (const [key, value] of Object.entries(data[""])) {
      lines.push(`${key} = ${value}`);
    }
  }

  for (const [section, props] of Object.entries(data)) {
    if (section === "") continue;
    if (lines.length > 0) lines.push("");
    lines.push(`[${section}]`);
    for (const [key, value] of Object.entries(props)) {
      lines.push(`${key} = ${value}`);
    }
  }

  return lines.join("\n");
}
