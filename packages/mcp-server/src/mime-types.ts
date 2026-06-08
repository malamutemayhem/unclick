const MIME_MAP: Record<string, string> = {
  html: "text/html",
  htm: "text/html",
  css: "text/css",
  js: "application/javascript",
  mjs: "application/javascript",
  json: "application/json",
  xml: "application/xml",
  txt: "text/plain",
  csv: "text/csv",
  md: "text/markdown",
  yaml: "text/yaml",
  yml: "text/yaml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
  bmp: "image/bmp",
  pdf: "application/pdf",
  zip: "application/zip",
  gz: "application/gzip",
  tar: "application/x-tar",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  mp4: "video/mp4",
  webm: "video/webm",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  eot: "application/vnd.ms-fontobject",
  ts: "application/typescript",
  tsx: "application/typescript",
  jsx: "text/jsx",
  wasm: "application/wasm",
};

export function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return MIME_MAP[ext] || "application/octet-stream";
}

export function getExtension(mimeType: string): string | undefined {
  for (const [ext, mime] of Object.entries(MIME_MAP)) {
    if (mime === mimeType) return ext;
  }
  return undefined;
}

export function isTextMime(mimeType: string): boolean {
  return mimeType.startsWith("text/")
    || mimeType === "application/json"
    || mimeType === "application/xml"
    || mimeType === "application/javascript"
    || mimeType === "application/typescript";
}

export function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function isAudioMime(mimeType: string): boolean {
  return mimeType.startsWith("audio/");
}

export function isVideoMime(mimeType: string): boolean {
  return mimeType.startsWith("video/");
}
