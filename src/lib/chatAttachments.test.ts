import { describe, expect, it } from "vitest";
import { ACCEPT, MAX_TEXT_CHARS, processFile, type ProcessedAttachment } from "./chatAttachments";

// Build a File from a string body. jsdom provides File + Blob.text().
function textFile(name: string, body: string, type = "text/plain"): File {
  return new File([body], name, { type });
}

describe("chatAttachments", () => {
  it("exposes an ACCEPT string covering images, text, pdf and docx", () => {
    expect(ACCEPT).toContain("image/*");
    expect(ACCEPT).toContain(".md");
    expect(ACCEPT).toContain(".pdf");
    expect(ACCEPT).toContain(".docx");
    expect(ACCEPT).toContain(".ts");
  });

  it("reads a text file and inlines its content", async () => {
    const file = textFile("notes.txt", "hello world");
    const result = await processFile(file);
    expect(result.kind).toBe("text");
    expect(result.text).toBe("hello world");
    expect(result.name).toBe("notes.txt");
  });

  it("treats a code file (by extension) as text even without a text/* mime", async () => {
    const file = new File(["const x = 1;"], "main.ts", { type: "" });
    const result = await processFile(file);
    expect(result.kind).toBe("text");
    expect(result.text).toBe("const x = 1;");
  });

  it("returns an unsupported note for an unknown binary", async () => {
    const file = new File([new Uint8Array([0, 1, 2, 3])], "blob.bin", {
      type: "application/octet-stream",
    });
    const result: ProcessedAttachment = await processFile(file);
    expect(result.kind).toBe("unsupported");
    expect(result.error).toMatch(/could not read/i);
    expect(result.error).toContain("blob.bin");
  });

  it("returns an unsupported note for a legacy .doc file", async () => {
    const file = new File([new Uint8Array([1, 2, 3])], "old.doc", {
      type: "application/msword",
    });
    const result = await processFile(file);
    expect(result.kind).toBe("unsupported");
  });

  it("caps extracted text and appends a truncation marker", async () => {
    const body = "a".repeat(MAX_TEXT_CHARS + 500);
    const file = textFile("big.txt", body);
    const result = await processFile(file);
    expect(result.kind).toBe("text");
    expect(result.text).toBeDefined();
    expect(result.text!.endsWith("[truncated]")).toBe(true);
    // Capped body length + the appended marker (not the full original length).
    expect(result.text!.length).toBeLessThan(body.length);
    expect(result.text!.startsWith("a".repeat(100))).toBe(true);
  });
});
