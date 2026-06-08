import { describe, it, expect } from "vitest";
import { lookup, extension, isText, isBinary, isImage } from "../mime-types.js";

describe("mime-types", () => {
  it("lookup by extension", () => {
    expect(lookup("json")).toBe("application/json");
    expect(lookup("html")).toBe("text/html");
    expect(lookup("png")).toBe("image/png");
  });

  it("lookup by filename", () => {
    expect(lookup("file.js")).toBe("application/javascript");
    expect(lookup("image.webp")).toBe("image/webp");
    expect(lookup("data.csv")).toBe("text/csv");
  });

  it("lookup returns undefined for unknown", () => {
    expect(lookup("xyz123")).toBeUndefined();
  });

  it("extension finds ext from mime", () => {
    expect(extension("application/json")).toBe("json");
    expect(extension("image/png")).toBe("png");
    expect(extension("text/html")).toBe("html");
  });

  it("extension returns undefined for unknown mime", () => {
    expect(extension("application/x-unknown")).toBeUndefined();
  });

  it("isText detects text types", () => {
    expect(isText("text/html")).toBe(true);
    expect(isText("application/json")).toBe(true);
    expect(isText("application/xml")).toBe(true);
    expect(isText("application/javascript")).toBe(true);
  });

  it("isBinary is inverse of isText", () => {
    expect(isBinary("image/png")).toBe(true);
    expect(isBinary("text/plain")).toBe(false);
  });

  it("isImage detects image types", () => {
    expect(isImage("image/png")).toBe(true);
    expect(isImage("image/jpeg")).toBe(true);
    expect(isImage("text/html")).toBe(false);
  });
});
