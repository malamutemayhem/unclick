// ============================================================
// Chat attachments (client)
//
// Turns a user-picked or pasted File into a ProcessedAttachment the chat
// composer can send. Images become vision file parts; text-like files,
// PDFs (text layer), and DOCX are extracted to plain text and inlined.
// Anything we cannot read returns a friendly "unsupported" note instead
// of crashing - every extraction path is wrapped so processFile never
// throws.
// ============================================================

export type AttachmentKind = "image" | "text" | "unsupported";

export interface ProcessedAttachment {
  id: string;
  name: string;
  mediaType: string;
  kind: AttachmentKind;
  dataUrl?: string;
  text?: string;
  error?: string;
}

// Image types we send to the model as vision.
const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp"];

// Plain-text family + common code extensions we read with file.text().
const TEXT_EXTENSIONS = [
  "txt", "md", "markdown", "csv", "tsv", "json", "log", "xml", "html", "htm",
  "yml", "yaml", "toml", "ini", "env", "rtf",
  // common code
  "js", "jsx", "ts", "tsx", "mjs", "cjs", "py", "rb", "go", "rs", "java",
  "c", "h", "cpp", "hpp", "cc", "cs", "php", "swift", "kt", "scala", "sh",
  "bash", "zsh", "sql", "css", "scss", "less", "vue", "svelte", "astro",
  "graphql", "gql", "dockerfile", "makefile",
];

// File input accept string: images + the inlined-text family + pdf/docx.
export const ACCEPT = [
  "image/*",
  ...TEXT_EXTENSIONS.map((e) => `.${e}`),
  ".pdf",
  ".docx",
].join(",");

// Policy: keep the tray and payloads sane.
export const MAX_FILES = 8;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // ~10MB
export const MAX_TEXT_CHARS = 80_000;

function extOf(name: string): string {
  const dot = name.lastIndexOf(".");
  if (dot === -1 || dot === name.length - 1) return "";
  return name.slice(dot + 1).toLowerCase();
}

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `att_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}

function capText(text: string): string {
  if (text.length <= MAX_TEXT_CHARS) return text;
  return `${text.slice(0, MAX_TEXT_CHARS)}\n\n[truncated]`;
}

function isImage(file: File): boolean {
  return file.type.startsWith("image/") || IMAGE_EXTENSIONS.includes(extOf(file.name));
}

function isTextLike(file: File): boolean {
  if (file.type.startsWith("text/")) return true;
  // A few non-text/* mime types that are still plain text.
  if (
    file.type === "application/json" ||
    file.type === "application/xml" ||
    file.type === "application/javascript" ||
    file.type === "application/x-yaml"
  ) {
    return true;
  }
  return TEXT_EXTENSIONS.includes(extOf(file.name));
}

function isPdf(file: File): boolean {
  return file.type === "application/pdf" || extOf(file.name) === "pdf";
}

function isDocx(file: File): boolean {
  return (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extOf(file.name) === "docx"
  );
}

// Read a File as a base64 data URL via FileReader.
function readDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

function unsupported(file: File, error: string): ProcessedAttachment {
  return {
    id: newId(),
    name: file.name || "file",
    mediaType: file.type || "application/octet-stream",
    kind: "unsupported",
    error,
  };
}

// Extract a PDF's text layer with pdfjs-dist (lazy import so the worker and
// the library only load when a PDF is actually attached).
async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  // Wire the worker for Vite: the URL is resolved by the bundler at build time.
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const out: string[] = [];
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? (item as { str: string }).str : ""))
      .join(" ")
      .trim();
    if (pageText) out.push(pageText);
  }
  return out.join("\n\n").trim();
}

// Extract a DOCX's raw text with mammoth (lazy import). Returns null if the
// library cannot be loaded so the caller emits the unsupported note.
async function extractDocxText(file: File): Promise<string | null> {
  try {
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return (result?.value ?? "").trim();
  } catch {
    return null;
  }
}

const UNSUPPORTED_NOTE = (name: string) =>
  `could not read ${name}; paste the text or export to PDF/txt`;

// Turn one File into a ProcessedAttachment. Never throws: any failure
// resolves to an "unsupported" result with a friendly note.
export async function processFile(file: File): Promise<ProcessedAttachment> {
  const name = file.name || "file";
  try {
    // Images -> vision file part (data URL).
    if (isImage(file)) {
      if (file.size > MAX_IMAGE_BYTES) {
        return unsupported(file, `image ${name} is too large (max 10MB); shrink it and retry`);
      }
      const dataUrl = await readDataUrl(file);
      return {
        id: newId(),
        name,
        mediaType: file.type || `image/${extOf(name) || "png"}`,
        kind: "image",
        dataUrl,
      };
    }

    // Plain-text family + code -> inline the text.
    if (isTextLike(file)) {
      const raw = await file.text();
      return {
        id: newId(),
        name,
        mediaType: file.type || "text/plain",
        kind: "text",
        text: capText(raw),
      };
    }

    // PDF -> client-side text extraction.
    if (isPdf(file)) {
      const text = await extractPdfText(file);
      if (!text) {
        return unsupported(file, `${name} looks like a scanned PDF (no text layer); paste the text or use OCR`);
      }
      return {
        id: newId(),
        name,
        mediaType: "application/pdf",
        kind: "text",
        text: capText(text),
      };
    }

    // DOCX -> client-side text extraction.
    if (isDocx(file)) {
      const text = await extractDocxText(file);
      if (text === null) {
        return unsupported(file, UNSUPPORTED_NOTE(name));
      }
      if (!text) {
        return unsupported(file, `${name} appears to have no readable text; paste the text or export to txt`);
      }
      return {
        id: newId(),
        name,
        mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        kind: "text",
        text: capText(text),
      };
    }

    // Everything else (legacy .doc, unknown binary).
    return unsupported(file, UNSUPPORTED_NOTE(name));
  } catch {
    return unsupported(file, UNSUPPORTED_NOTE(name));
  }
}
