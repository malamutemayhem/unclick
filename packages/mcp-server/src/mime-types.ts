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
  ".yaml": "application/yaml",
  ".yml": "application/yaml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".avif": "image/avif",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".gz": "application/gzip",
  ".tar": "application/x-tar",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".wasm": "application/wasm",
  ".ts": "application/typescript",
  ".tsx": "application/typescript",
  ".jsx": "application/javascript",
};

export function lookup(pathOrExt: string): string | null {
  const ext = pathOrExt.startsWith(".") ? pathOrExt.toLowerCase() : getExt(pathOrExt);
  return MIME_MAP[ext] ?? null;
}

export function extension(mimeType: string): string | null {
  for (const [ext, mime] of Object.entries(MIME_MAP)) {
    if (mime === mimeType) return ext;
  }
  return null;
}

export function isText(mimeType: string): boolean {
  return mimeType.startsWith("text/") || mimeType === "application/json" || mimeType === "application/xml" || mimeType === "application/javascript" || mimeType === "application/yaml";
}

export function isImage(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function isAudio(mimeType: string): boolean {
  return mimeType.startsWith("audio/");
}

export function isVideo(mimeType: string): boolean {
  return mimeType.startsWith("video/");
}

function getExt(path: string): string {
  const idx = path.lastIndexOf(".");
  if (idx <= 0) return "";
  return path.slice(idx).toLowerCase();
}
