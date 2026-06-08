import { describe, it, expect } from "vitest";
import { MimeType } from "../mime-type.js";

describe("MimeType", () => {
  it("looks up common MIME types", () => {
    expect(MimeType.lookup("file.html")).toBe("text/html");
    expect(MimeType.lookup("app.js")).toBe("application/javascript");
    expect(MimeType.lookup("data.json")).toBe("application/json");
    expect(MimeType.lookup("image.png")).toBe("image/png");
  });

  it("returns null for unknown extensions", () => {
    expect(MimeType.lookup("file.xyz123")).toBeNull();
    expect(MimeType.lookup("noext")).toBeNull();
  });

  it("extracts file extension", () => {
    expect(MimeType.getExtension("index.html")).toBe(".html");
    expect(MimeType.getExtension("archive.tar.gz")).toBe(".gz");
    expect(MimeType.getExtension("noext")).toBeNull();
  });

  it("finds extension for MIME type", () => {
    expect(MimeType.extensionForMime("text/html")).toBe(".html");
    expect(MimeType.extensionForMime("application/json")).toBe(".json");
    expect(MimeType.extensionForMime("fake/type")).toBeNull();
  });

  it("checks compressibility", () => {
    expect(MimeType.isCompressible("file.html")).toBe(true);
    expect(MimeType.isCompressible("file.json")).toBe(true);
    expect(MimeType.isCompressible("image.png")).toBe(false);
    expect(MimeType.isCompressible("video.mp4")).toBe(false);
  });

  it("categorizes files", () => {
    expect(MimeType.category("file.css")).toBe("text");
    expect(MimeType.category("photo.jpg")).toBe("image");
    expect(MimeType.category("song.mp3")).toBe("audio");
    expect(MimeType.category("clip.mp4")).toBe("video");
    expect(MimeType.category("doc.pdf")).toBe("document");
    expect(MimeType.category("file.zip")).toBe("archive");
  });

  it("checks type helpers", () => {
    expect(MimeType.isText("app.ts")).toBe(true);
    expect(MimeType.isImage("photo.webp")).toBe(true);
    expect(MimeType.isAudio("track.ogg")).toBe(true);
    expect(MimeType.isVideo("movie.webm")).toBe(true);
    expect(MimeType.isText("image.png")).toBe(false);
  });

  it("lists all extensions", () => {
    const all = MimeType.allExtensions();
    expect(all).toContain(".html");
    expect(all).toContain(".png");
    expect(all.length).toBeGreaterThan(30);
  });

  it("filters extensions by category", () => {
    const images = MimeType.extensionsByCategory("image");
    expect(images).toContain(".png");
    expect(images).toContain(".jpg");
    expect(images).not.toContain(".html");
  });

  it("generates content type with charset for text", () => {
    expect(MimeType.contentType("file.html")).toBe("text/html; charset=utf-8");
    expect(MimeType.contentType("data.json")).toBe("application/json; charset=utf-8");
  });

  it("generates content type without charset for binary", () => {
    expect(MimeType.contentType("image.png")).toBe("image/png");
    expect(MimeType.contentType("file.zip")).toBe("application/zip");
  });

  it("returns null content type for unknown", () => {
    expect(MimeType.contentType("file.xyz")).toBeNull();
  });
});
