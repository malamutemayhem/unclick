export interface ContentType {
  type: string;
  subtype: string;
  parameters: Record<string, string>;
}

export function parse(value: string): ContentType {
  const [mediaType, ...paramParts] = value.split(";").map((s) => s.trim());
  const [type, subtype] = mediaType.split("/");
  const parameters: Record<string, string> = {};

  for (const part of paramParts) {
    const eqIndex = part.indexOf("=");
    if (eqIndex === -1) continue;
    const key = part.slice(0, eqIndex).trim().toLowerCase();
    let val = part.slice(eqIndex + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    parameters[key] = val;
  }

  return { type: type.toLowerCase(), subtype: (subtype || "").toLowerCase(), parameters };
}

export function format(ct: ContentType): string {
  let result = `${ct.type}/${ct.subtype}`;
  for (const [key, value] of Object.entries(ct.parameters)) {
    if (/[;\s"=]/.test(value)) {
      result += `; ${key}="${value}"`;
    } else {
      result += `; ${key}=${value}`;
    }
  }
  return result;
}

export function getCharset(ct: ContentType): string | undefined {
  return ct.parameters["charset"];
}

export function getBoundary(ct: ContentType): string | undefined {
  return ct.parameters["boundary"];
}

export function isText(ct: ContentType): boolean {
  return ct.type === "text" || ct.subtype === "json" || ct.subtype === "xml" || ct.subtype.endsWith("+json") || ct.subtype.endsWith("+xml");
}

export function isJSON(ct: ContentType): boolean {
  return ct.subtype === "json" || ct.subtype.endsWith("+json");
}

export function isMultipart(ct: ContentType): boolean {
  return ct.type === "multipart";
}

export function isFormData(ct: ContentType): boolean {
  return ct.type === "application" && ct.subtype === "x-www-form-urlencoded";
}

export function matches(ct: ContentType, pattern: string): boolean {
  const [pType, pSubtype] = pattern.split("/");
  if (pType !== "*" && pType !== ct.type) return false;
  if (pSubtype !== "*" && pSubtype !== ct.subtype) return false;
  return true;
}
