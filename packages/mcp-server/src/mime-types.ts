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
  yaml: "application/x-yaml",
  yml: "application/x-yaml",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  ico: "image/x-icon",
  avif: "image/avif",
  bmp: "image/bmp",
  tiff: "image/tiff",
  tif: "image/tiff",
  pdf: "application/pdf",
  zip: "application/zip",
  gz: "application/gzip",
  tar: "application/x-tar",
  rar: "application/vnd.rar",
  "7z": "application/x-7z-compressed",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  flac: "audio/flac",
  mp4: "video/mp4",
  webm: "video/webm",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  eot: "application/vnd.ms-fontobject",
  wasm: "application/wasm",
  ts: "application/typescript",
  tsx: "application/typescript",
  jsx: "application/javascript",
  map: "application/json",
};

const MIME_TO_EXT: Record<string, string> = {};
for (const [ext, mime] of Object.entries(EXT_TO_MIME)) {
  if (!MIME_TO_EXT[mime]) MIME_TO_EXT[mime] = ext;
}

export function lookup(path: string): string | undefined {
  const ext = extractExtension(path);
  return ext ? EXT_TO_MIME[ext] : undefined;
}

export function extension(mimeType: string): string | undefined {
  return MIME_TO_EXT[mimeType];
}

export function contentType(pathOrExt: string): string | undefined {
  const mime = lookup(pathOrExt) || EXT_TO_MIME[pathOrExt.replace(/^\./, "")];
  if (!mime) return undefined;
  if (mime.startsWith("text/") || mime === "application/json" || mime === "application/javascript") {
    return `${mime}; charset=utf-8`;
  }
  return mime;
}

export function isText(mimeType: string): boolean {
  if (mimeType.startsWith("text/")) return true;
  const textTypes = ["application/json", "application/javascript", "application/xml", "application/typescript", "image/svg+xml", "application/x-yaml"];
  return textTypes.includes(mimeType);
}

export function isBinary(mimeType: string): boolean {
  return !isText(mimeType);
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

function extractExtension(path: string): string | undefined {
  const lastDot = path.lastIndexOf(".");
  if (lastDot < 0 || lastDot === path.length - 1) return undefined;
  return path.slice(lastDot + 1).toLowerCase();
}
