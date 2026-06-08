export function generateETag(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash + content.charCodeAt(i)) | 0;
  }
  const hex = (hash >>> 0).toString(16);
  return `"${hex}-${content.length.toString(16)}"`;
}

export function generateWeakETag(content: string): string {
  return `W/${generateETag(content)}`;
}

export function isWeakETag(etag: string): boolean {
  return etag.startsWith("W/");
}

export function stripWeakPrefix(etag: string): string {
  return etag.startsWith("W/") ? etag.slice(2) : etag;
}

export function strongMatch(a: string, b: string): boolean {
  if (isWeakETag(a) || isWeakETag(b)) return false;
  return a === b;
}

export function weakMatch(a: string, b: string): boolean {
  return stripWeakPrefix(a) === stripWeakPrefix(b);
}

export function ifNoneMatch(requestETag: string, currentETag: string): boolean {
  return weakMatch(requestETag, currentETag);
}
