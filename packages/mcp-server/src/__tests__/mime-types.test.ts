import { describe, it, expect } from "vitest";
import { getMimeType, getExtension, isText, isImage, isAudio, isVideo, isFont } from "../mime-types.js";

describe("mime-types", () => {
  describe("getMimeType", () => {
    it("resolves .html", () => { expect(getMimeType("index.html")).toBe("text/html"); });
    it("resolves .json", () => { expect(getMimeType("data.json")).toBe("application/json"); });
    it("resolves .png", () => { expect(getMimeType("image.png")).toBe("image/png"); });
    it("resolves .mp4", () => { expect(getMimeType("video.mp4")).toBe("video/mp4"); });
    it("resolves bare extension", () => { expect(getMimeType("css")).toBe("text/css"); });
    it("returns octet-stream for unknown", () => { expect(getMimeType("file.xyz")).toBe("application/octet-stream"); });
    it("resolves .ts", () => { expect(getMimeType("app.ts")).toBe("application/typescript"); });
    it("resolves .yaml", () => { expect(getMimeType("config.yaml")).toBe("application/yaml"); });
  });

  describe("getExtension", () => {
    it("returns ext for known mime", () => { expect(getExtension("text/html")).toBe("html"); });
    it("returns undefined for unknown", () => { expect(getExtension("application/x-unknown")).toBeUndefined(); });
  });

  describe("type checks", () => {
    it("isText detects text/*", () => { expect(isText("text/plain")).toBe(true); });
    it("isText detects json", () => { expect(isText("application/json")).toBe(true); });
    it("isText rejects image", () => { expect(isText("image/png")).toBe(false); });
    it("isImage detects image/*", () => { expect(isImage("image/jpeg")).toBe(true); });
    it("isAudio detects audio/*", () => { expect(isAudio("audio/mpeg")).toBe(true); });
    it("isVideo detects video/*", () => { expect(isVideo("video/mp4")).toBe(true); });
    it("isFont detects font/*", () => { expect(isFont("font/woff2")).toBe(true); });
  });
});
