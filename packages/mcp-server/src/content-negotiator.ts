export interface MediaType {
  type: string;
  subtype: string;
  quality: number;
  params: Record<string, string>;
}

export function parseAccept(header: string): MediaType[] {
  return header
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .map(parseMediaType)
    .sort((a, b) => b.quality - a.quality);
}

function parseMediaType(raw: string): MediaType {
  const parts = raw.split(";").map((s) => s.trim());
  const [type, subtype] = (parts[0] || "*/*").split("/");
  const params: Record<string, string> = {};
  let quality = 1;

  for (let i = 1; i < parts.length; i++) {
    const [key, val] = parts[i].split("=").map((s) => s.trim());
    if (key === "q") {
      quality = parseFloat(val) || 0;
    } else {
      params[key] = val;
    }
  }

  return { type: type || "*", subtype: subtype || "*", quality, params };
}

export function negotiate(accept: string, available: string[]): string | null {
  const requested = parseAccept(accept);

  for (const req of requested) {
    for (const avail of available) {
      if (matchesMediaType(req, avail)) return avail;
    }
  }

  return null;
}

function matchesMediaType(requested: MediaType, available: string): boolean {
  const [aType, aSubtype] = available.split("/");
  if (requested.type === "*" && requested.subtype === "*") return true;
  if (requested.type === aType && requested.subtype === "*") return true;
  if (requested.type === aType && requested.subtype === aSubtype) return true;
  return false;
}

export function negotiateLanguage(acceptLang: string, available: string[]): string | null {
  const parsed = acceptLang
    .split(",")
    .map((part) => {
      const [lang, ...rest] = part.trim().split(";");
      const qPart = rest.find((r) => r.trim().startsWith("q="));
      const q = qPart ? parseFloat(qPart.split("=")[1]) : 1;
      return { lang: lang.trim().toLowerCase(), quality: q };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const req of parsed) {
    const exact = available.find((a) => a.toLowerCase() === req.lang);
    if (exact) return exact;
    const prefix = available.find((a) => a.toLowerCase().startsWith(req.lang.split("-")[0]));
    if (prefix) return prefix;
    if (req.lang === "*" && available.length > 0) return available[0];
  }

  return null;
}

export function negotiateEncoding(acceptEncoding: string, available: string[]): string | null {
  const parsed = acceptEncoding
    .split(",")
    .map((part) => {
      const [enc, ...rest] = part.trim().split(";");
      const qPart = rest.find((r) => r.trim().startsWith("q="));
      const q = qPart ? parseFloat(qPart.split("=")[1]) : 1;
      return { encoding: enc.trim().toLowerCase(), quality: q };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const req of parsed) {
    const match = available.find((a) => a.toLowerCase() === req.encoding);
    if (match) return match;
    if (req.encoding === "*" && available.length > 0) return available[0];
  }

  return null;
}
