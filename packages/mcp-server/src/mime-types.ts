const EXT_TO_MIME: Record<string, string> = {
  html: "text/html", htm: "text/html", css: "text/css",
  js: "application/javascript", mjs: "application/javascript",
  json: "application/json", xml: "application/xml",
  txt: "text/plain", csv: "text/csv", md: "text/markdown",
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  gif: "image/gif", svg: "image/svg+xml", webp: "image/webp",
  ico: "image/x-icon", bmp: "image/bmp",
  mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg",
  mp4: "video/mp4", webm: "video/webm", avi: "video/x-msvideo",
  pdf: "application/pdf", zip: "application/zip",
  gz: "application/gzip", tar: "application/x-tar",
  woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf",
  ts: "application/typescript", tsx: "application/typescript",
  yaml: "application/yaml", yml: "application/yaml",
  wasm: "application/wasm", graphql: "application/graphql",
};

const MIME_TO_EXT: Record<string, string> = {};
for (const [ext, mime] of Object.entries(EXT_TO_MIME)) {
  if (!(mime in MIME_TO_EXT)) MIME_TO_EXT[mime] = ext;
}

export function getMimeType(filenameOrExt: string): string {
  const ext = filenameOrExt.includes(".")
    ? filenameOrExt.split(".").pop()!.toLowerCase()
    : filenameOrExt.toLowerCase();
  return EXT_TO_MIME[ext] || "application/octet-stream";
}

export function getExtension(mimeType: string): string | undefined {
  return MIME_TO_EXT[mimeType];
}

export function isText(mimeType: string): boolean {
  return mimeType.startsWith("text/") ||
    mimeType === "application/json" ||
    mimeType === "application/javascript" ||
    mimeType === "application/typescript" ||
    mimeType === "application/xml" ||
    mimeType === "application/yaml" ||
    mimeType === "application/graphql";
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

export function isFont(mimeType: string): boolean {
  return mimeType.startsWith("font/");
}
