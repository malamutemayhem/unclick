const MIME_MAP: Record<string, string> = {
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".csv": "text/csv",
  ".md": "text/markdown",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".gz": "application/gzip",
  ".tar": "application/x-tar",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".yaml": "application/yaml",
  ".yml": "application/yaml",
  ".ts": "application/typescript",
  ".tsx": "application/typescript",
  ".jsx": "application/javascript",
  ".wasm": "application/wasm",
};

const EXT_MAP = new Map<string, string>();
for (const [ext, mime] of Object.entries(MIME_MAP)) {
  if (!EXT_MAP.has(mime)) EXT_MAP.set(mime, ext);
}

export function lookup(pathOrExt: string): string | undefined {
  const ext = pathOrExt.startsWith(".") ? pathOrExt : getExtension(pathOrExt);
  return MIME_MAP[ext.toLowerCase()];
}

export function extension(mimeType: string): string | undefined {
  return EXT_MAP.get(mimeType.toLowerCase());
}

export function isText(mimeType: string): boolean {
  const lower = mimeType.toLowerCase();
  return lower.startsWith("text/") || lower === "application/json" || lower === "application/xml" || lower === "application/javascript" || lower === "application/yaml" || lower === "application/typescript";
}

export function isBinary(mimeType: string): boolean {
  return !isText(mimeType);
}

export function contentType(pathOrExt: string): string | undefined {
  const mime = lookup(pathOrExt);
  if (!mime) return undefined;
  if (isText(mime)) return `${mime}; charset=utf-8`;
  return mime;
}

function getExtension(path: string): string {
  const idx = path.lastIndexOf(".");
  if (idx <= 0) return "";
  return path.slice(idx);
}
