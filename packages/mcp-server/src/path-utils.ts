export function join(...parts: string[]): string {
  const joined = parts
    .filter((p) => p.length > 0)
    .join("/")
    .replace(/\/+/g, "/");
  return normalize(joined);
}

export function normalize(path: string): string {
  const isAbsolute = path.startsWith("/");
  const parts = path.split("/").filter((p) => p.length > 0);
  const stack: string[] = [];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      if (stack.length > 0 && stack[stack.length - 1] !== "..") {
        stack.pop();
      } else if (!isAbsolute) {
        stack.push("..");
      }
    } else {
      stack.push(part);
    }
  }
  const result = stack.join("/");
  return isAbsolute ? "/" + result : result || ".";
}

export function basename(path: string, ext?: string): string {
  const name = path.split("/").filter((p) => p.length > 0).pop() ?? "";
  if (ext && name.endsWith(ext)) return name.slice(0, -ext.length);
  return name;
}

export function dirname(path: string): string {
  const parts = path.split("/").filter((p) => p.length > 0);
  if (parts.length <= 1) return path.startsWith("/") ? "/" : ".";
  parts.pop();
  return (path.startsWith("/") ? "/" : "") + parts.join("/");
}

export function extname(path: string): string {
  const name = basename(path);
  const idx = name.lastIndexOf(".");
  if (idx <= 0) return "";
  return name.slice(idx);
}

export function isAbsolute(path: string): boolean {
  return path.startsWith("/");
}

export function relative(from: string, to: string): string {
  const fromParts = normalize(from).split("/").filter((p) => p.length > 0);
  const toParts = normalize(to).split("/").filter((p) => p.length > 0);
  let common = 0;
  while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) {
    common++;
  }
  const ups = fromParts.length - common;
  const downs = toParts.slice(common);
  const parts = [...Array(ups).fill(".."), ...downs];
  return parts.length > 0 ? parts.join("/") : ".";
}
