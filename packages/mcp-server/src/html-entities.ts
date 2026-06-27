const ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&#x2F;": "/",
  "&#47;": "/",
  "&apos;": "'",
  "&nbsp;": " ",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
  "&mdash;": "—",
  "&ndash;": "–",
  "&laquo;": "«",
  "&raquo;": "»",
  "&bull;": "•",
  "&hellip;": "…",
  "&euro;": "€",
  "&pound;": "£",
  "&yen;": "¥",
  "&cent;": "¢",
};

export function encode(str: string): string {
  return str.replace(/[&<>"']/g, (ch) => ENCODE_MAP[ch] || ch);
}

export function decode(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&[a-zA-Z]+;/g, (entity) => DECODE_MAP[entity] || entity);
}

export function encodeNonASCII(str: string): string {
  return str.replace(/[^\x20-\x7E]/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

export function decodeNumeric(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

export function isEncoded(str: string): boolean {
  return /&(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/.test(str);
}

export function stripEntities(str: string): string {
  return str.replace(/&(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, "");
}
