import { describe, it, expect } from "vitest";
import { lookup, extension, contentType, isText, isBinary, isImage, isAudio, isVideo } from "../mime-types.js";

describe("mime-types", () => {
  it("lookup by file path", () => {
    expect(lookup("file.html")).toBe("text/html");
    expect(lookup("script.js")).toBe("application/javascript");
    expect(lookup("data.json")).toBe("application/json");
    expect(lookup("photo.png")).toBe("image/png");
  });

  it("lookup is case insensitive via extension", () => {
    expect(lookup("FILE.JSON")).toBe("application/json");
  });

  it("lookup returns undefined for unknown", () => {
    expect(lookup("file.xyz")).toBeUndefined();
    expect(lookup("noext")).toBeUndefined();
  });

  it("extension from mime type", () => {
    expect(extension("text/html")).toBe("html");
    expect(extension("application/json")).toBe("json");
    expect(extension("image/png")).toBe("png");
  });

  it("contentType includes charset for text", () => {
    expect(contentType("file.html")).toBe("text/html; charset=utf-8");
    expect(contentType("file.json")).toBe("application/json; charset=utf-8");
  });

  it("contentType without charset for binary", () => {
    expect(contentType("file.png")).toBe("image/png");
    expect(contentType("file.pdf")).toBe("application/pdf");
  });

  it("contentType by extension directly", () => {
    expect(contentType("json")).toBe("application/json; charset=utf-8");
    expect(contentType(".json")).toBe("application/json; charset=utf-8");
  });

  it("isText for text types", () => {
    expect(isText("text/html")).toBe(true);
    expect(isText("application/json")).toBe(true);
    expect(isText("image/svg+xml")).toBe(true);
  });

  it("isBinary for binary types", () => {
    expect(isBinary("image/png")).toBe(true);
    expect(isBinary("application/pdf")).toBe(true);
  });

  it("isImage/isAudio/isVideo", () => {
    expect(isImage("image/png")).toBe(true);
    expect(isImage("text/plain")).toBe(false);
    expect(isAudio("audio/mpeg")).toBe(true);
    expect(isVideo("video/mp4")).toBe(true);
  });
});
