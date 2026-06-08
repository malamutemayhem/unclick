import { describe, it, expect } from "vitest";
import { lookup, extension, isText, isBinary, contentType } from "../mime-types.js";

describe("lookup", () => {
  it("looks up by extension", () => {
    expect(lookup(".html")).toBe("text/html");
    expect(lookup(".json")).toBe("application/json");
    expect(lookup(".png")).toBe("image/png");
  });

  it("looks up by file path", () => {
    expect(lookup("index.html")).toBe("text/html");
    expect(lookup("/path/to/file.css")).toBe("text/css");
  });

  it("is case-insensitive", () => {
    expect(lookup(".HTML")).toBe("text/html");
    expect(lookup(".JSON")).toBe("application/json");
  });

  it("returns undefined for unknown extension", () => {
    expect(lookup(".xyz123")).toBeUndefined();
  });

  it("handles common types", () => {
    expect(lookup(".js")).toBe("application/javascript");
    expect(lookup(".ts")).toBe("application/typescript");
    expect(lookup(".pdf")).toBe("application/pdf");
    expect(lookup(".mp4")).toBe("video/mp4");
    expect(lookup(".svg")).toBe("image/svg+xml");
  });
});

describe("extension", () => {
  it("returns extension for mime type", () => {
    expect(extension("text/html")).toBe(".html");
    expect(extension("application/json")).toBe(".json");
  });

  it("returns undefined for unknown mime", () => {
    expect(extension("application/x-unknown-thing")).toBeUndefined();
  });
});

describe("isText", () => {
  it("identifies text types", () => {
    expect(isText("text/html")).toBe(true);
    expect(isText("text/plain")).toBe(true);
    expect(isText("application/json")).toBe(true);
    expect(isText("application/javascript")).toBe(true);
  });

  it("rejects binary types", () => {
    expect(isText("image/png")).toBe(false);
    expect(isText("application/pdf")).toBe(false);
  });
});

describe("isBinary", () => {
  it("identifies binary types", () => {
    expect(isBinary("image/png")).toBe(true);
    expect(isBinary("application/zip")).toBe(true);
  });

  it("rejects text types", () => {
    expect(isBinary("text/plain")).toBe(false);
  });
});

describe("contentType", () => {
  it("adds charset for text types", () => {
    expect(contentType(".html")).toBe("text/html; charset=utf-8");
    expect(contentType(".json")).toBe("application/json; charset=utf-8");
  });

  it("omits charset for binary types", () => {
    expect(contentType(".png")).toBe("image/png");
    expect(contentType(".pdf")).toBe("application/pdf");
  });

  it("returns undefined for unknown", () => {
    expect(contentType(".xyz")).toBeUndefined();
  });
});
