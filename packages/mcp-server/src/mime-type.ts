const MIME_DB: Record<string, { mime: string; compressible: boolean; category: string }> = {
  ".html": { mime: "text/html", compressible: true, category: "text" },
  ".htm": { mime: "text/html", compressible: true, category: "text" },
  ".css": { mime: "text/css", compressible: true, category: "text" },
  ".js": { mime: "application/javascript", compressible: true, category: "text" },
  ".mjs": { mime: "application/javascript", compressible: true, category: "text" },
  ".json": { mime: "application/json", compressible: true, category: "text" },
  ".xml": { mime: "application/xml", compressible: true, category: "text" },
  ".txt": { mime: "text/plain", compressible: true, category: "text" },
  ".csv": { mime: "text/csv", compressible: true, category: "text" },
  ".md": { mime: "text/markdown", compressible: true, category: "text" },
  ".yaml": { mime: "application/x-yaml", compressible: true, category: "text" },
  ".yml": { mime: "application/x-yaml", compressible: true, category: "text" },
  ".ts": { mime: "application/typescript", compressible: true, category: "text" },
  ".tsx": { mime: "application/typescript", compressible: true, category: "text" },
  ".png": { mime: "image/png", compressible: false, category: "image" },
  ".jpg": { mime: "image/jpeg", compressible: false, category: "image" },
  ".jpeg": { mime: "image/jpeg", compressible: false, category: "image" },
  ".gif": { mime: "image/gif", compressible: false, category: "image" },
  ".svg": { mime: "image/svg+xml", compressible: true, category: "image" },
  ".webp": { mime: "image/webp", compressible: false, category: "image" },
  ".ico": { mime: "image/x-icon", compressible: false, category: "image" },
  ".avif": { mime: "image/avif", compressible: false, category: "image" },
  ".mp3": { mime: "audio/mpeg", compressible: false, category: "audio" },
  ".wav": { mime: "audio/wav", compressible: false, category: "audio" },
  ".ogg": { mime: "audio/ogg", compressible: false, category: "audio" },
  ".mp4": { mime: "video/mp4", compressible: false, category: "video" },
  ".webm": { mime: "video/webm", compressible: false, category: "video" },
  ".avi": { mime: "video/x-msvideo", compressible: false, category: "video" },
  ".pdf": { mime: "application/pdf", compressible: false, category: "document" },
  ".zip": { mime: "application/zip", compressible: false, category: "archive" },
  ".gz": { mime: "application/gzip", compressible: false, category: "archive" },
  ".tar": { mime: "application/x-tar", compressible: false, category: "archive" },
  ".woff": { mime: "font/woff", compressible: false, category: "font" },
  ".woff2": { mime: "font/woff2", compressible: false, category: "font" },
  ".ttf": { mime: "font/ttf", compressible: false, category: "font" },
  ".otf": { mime: "font/otf", compressible: false, category: "font" },
  ".wasm": { mime: "application/wasm", compressible: true, category: "binary" },
};

export class MimeType {
  static lookup(filename: string): string | null {
    const ext = MimeType.getExtension(filename);
    if (!ext) return null;
    const entry = MIME_DB[ext.toLowerCase()];
    return entry ? entry.mime : null;
  }

  static getExtension(filename: string): string | null {
    const lastDot = filename.lastIndexOf(".");
    if (lastDot < 0) return null;
    return filename.slice(lastDot).toLowerCase();
  }

  static extensionForMime(mime: string): string | null {
    for (const [ext, entry] of Object.entries(MIME_DB)) {
      if (entry.mime === mime) return ext;
    }
    return null;
  }

  static isCompressible(filename: string): boolean {
    const ext = MimeType.getExtension(filename);
    if (!ext) return false;
    const entry = MIME_DB[ext.toLowerCase()];
    return entry ? entry.compressible : false;
  }

  static category(filename: string): string | null {
    const ext = MimeType.getExtension(filename);
    if (!ext) return null;
    const entry = MIME_DB[ext.toLowerCase()];
    return entry ? entry.category : null;
  }

  static isText(filename: string): boolean {
    return MimeType.category(filename) === "text";
  }

  static isImage(filename: string): boolean {
    return MimeType.category(filename) === "image";
  }

  static isAudio(filename: string): boolean {
    return MimeType.category(filename) === "audio";
  }

  static isVideo(filename: string): boolean {
    return MimeType.category(filename) === "video";
  }

  static allExtensions(): string[] {
    return Object.keys(MIME_DB);
  }

  static extensionsByCategory(cat: string): string[] {
    return Object.entries(MIME_DB)
      .filter(([, entry]) => entry.category === cat)
      .map(([ext]) => ext);
  }

  static contentType(filename: string, charset = "utf-8"): string | null {
    const mime = MimeType.lookup(filename);
    if (!mime) return null;
    if (mime.startsWith("text/") || mime === "application/json" || mime === "application/javascript") {
      return `${mime}; charset=${charset}`;
    }
    return mime;
  }
}
