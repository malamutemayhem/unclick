import { describe, it, expect } from "vitest";
import { lookup, extension, isText, isImage, isAudio, isVideo } from "../mime-types.js";

describe("mime-types", () => {
  it("lookup by extension", () => {
    expect(lookup(".html")).toBe("text/html");
    expect(lookup(".json")).toBe("application/json");
    expect(lookup(".png")).toBe("image/png");
  });

  it("lookup by filename", () => {
    expect(lookup("file.ts")).toBe("application/typescript");
    expect(lookup("styles.css")).toBe("text/css");
  });

  it("lookup returns null for unknown", () => {
    expect(lookup(".xyz123")).toBeNull();
  });

  it("extension from mime type", () => {
    expect(extension("text/html")).toBe(".html");
    expect(extension("application/json")).toBe(".json");
  });

  it("extension returns null for unknown", () => {
    expect(extension("application/unknown")).toBeNull();
  });

  it("isText", () => {
    expect(isText("text/plain")).toBe(true);
    expect(isText("application/json")).toBe(true);
    expect(isText("image/png")).toBe(false);
  });

  it("isImage", () => {
    expect(isImage("image/png")).toBe(true);
    expect(isImage("text/plain")).toBe(false);
  });

  it("isAudio", () => {
    expect(isAudio("audio/mpeg")).toBe(true);
    expect(isAudio("video/mp4")).toBe(false);
  });

  it("isVideo", () => {
    expect(isVideo("video/mp4")).toBe(true);
    expect(isVideo("audio/mpeg")).toBe(false);
  });
});
