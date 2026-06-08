const EXT_TO_MIME: Record<string, string> = {
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
  pdf: "application/pdf",
  zip: "application/zip",
  gz: "application/gzip",
  tar: "application/x-tar",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  mp4: "video/mp4",
  webm: "video/webm",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  ts: "application/typescript",
  tsx: "application/typescript",
  yaml: "application/x-yaml",
  yml: "application/x-yaml",
  toml: "application/toml",
};

export function lookup(filenameOrExt: string): string | undefined {
  const ext = filenameOrExt.includes(".")
    ? filenameOrExt.split(".").pop()!.toLowerCase()
    : filenameOrExt.toLowerCase();
  return EXT_TO_MIME[ext];
}

export function extension(mimeType: string): string | undefined {
  const lower = mimeType.toLowerCase();
  for (const [ext, mime] of Object.entries(EXT_TO_MIME)) {
    if (mime === lower) return ext;
  }
  return undefined;
}

export function isText(mimeType: string): boolean {
  const lower = mimeType.toLowerCase();
  return (
    lower.startsWith("text/") ||
    lower === "application/json" ||
    lower === "application/xml" ||
    lower === "application/javascript" ||
    lower === "application/typescript" ||
    lower.endsWith("+xml") ||
    lower.endsWith("+json")
  );
}

export function isBinary(mimeType: string): boolean {
  return !isText(mimeType);
}

export function isImage(mimeType: string): boolean {
  return mimeType.toLowerCase().startsWith("image/");
}
