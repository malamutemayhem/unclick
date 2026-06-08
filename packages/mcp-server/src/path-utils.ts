export function join(...parts: string[]): string {
  const joined = parts.filter(Boolean).join("/");
  return normalize(joined);
}

export function normalize(path: string): string {
  const isAbsolute = path.startsWith("/");
  const segments = path.split("/").filter(Boolean);
  const result: string[] = [];
  for (const seg of segments) {
    if (seg === ".") continue;
    if (seg === "..") {
      if (result.length > 0 && result[result.length - 1] !== "..") result.pop();
      else if (!isAbsolute) result.push("..");
    } else {
      result.push(seg);
    }
  }
  const normalized = result.join("/");
  if (isAbsolute) return "/" + normalized;
  return normalized || ".";
}

export function dirname(path: string): string {
  const idx = path.lastIndexOf("/");
  if (idx === -1) return ".";
  if (idx === 0) return "/";
  return path.slice(0, idx);
}

export function basename(path: string, ext?: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  if (ext && base.endsWith(ext)) return base.slice(0, -ext.length);
  return base;
}

export function extname(path: string): string {
  const base = basename(path);
  const idx = base.lastIndexOf(".");
  if (idx <= 0) return "";
  return base.slice(idx);
}

export function isAbsolute(path: string): boolean {
  return path.startsWith("/");
}

export function relative(from: string, to: string): string {
  const fromParts = normalize(from).split("/").filter(Boolean);
  const toParts = normalize(to).split("/").filter(Boolean);
  let common = 0;
  while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) {
    common++;
  }
  const ups = fromParts.length - common;
  const downs = toParts.slice(common);
  const parts = [...Array(ups).fill(".."), ...downs];
  return parts.join("/") || ".";
}
