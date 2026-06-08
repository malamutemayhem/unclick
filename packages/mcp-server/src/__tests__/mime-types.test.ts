import { describe, it, expect } from "vitest";
import { getMimeType, getExtension, isTextMime, isImageMime, isAudioMime, isVideoMime } from "../mime-types.js";

describe("getMimeType", () => {
  it("returns correct mime for known extensions", () => {
    expect(getMimeType("index.html")).toBe("text/html");
    expect(getMimeType("style.css")).toBe("text/css");
    expect(getMimeType("app.js")).toBe("application/javascript");
    expect(getMimeType("data.json")).toBe("application/json");
    expect(getMimeType("photo.png")).toBe("image/png");
    expect(getMimeType("video.mp4")).toBe("video/mp4");
  });

  it("returns octet-stream for unknown", () => {
    expect(getMimeType("file.xyz")).toBe("application/octet-stream");
  });
});

describe("getExtension", () => {
  it("returns extension for known mime", () => {
    expect(getExtension("text/html")).toBe("html");
    expect(getExtension("image/png")).toBe("png");
  });

  it("returns undefined for unknown", () => {
    expect(getExtension("application/x-custom")).toBeUndefined();
  });
});

describe("type checks", () => {
  it("isTextMime", () => {
    expect(isTextMime("text/plain")).toBe(true);
    expect(isTextMime("application/json")).toBe(true);
    expect(isTextMime("image/png")).toBe(false);
  });

  it("isImageMime", () => {
    expect(isImageMime("image/png")).toBe(true);
    expect(isImageMime("text/plain")).toBe(false);
  });

  it("isAudioMime", () => {
    expect(isAudioMime("audio/mpeg")).toBe(true);
  });

  it("isVideoMime", () => {
    expect(isVideoMime("video/mp4")).toBe(true);
  });
});
