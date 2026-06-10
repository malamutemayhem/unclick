import { describe, it, expect } from "vitest";
import {
  audioQuality, fileSize, compatibility, streamingEfficiency,
  editingWorkflow, lossless, openSource, bestUseCase,
  compressionAlgorithm, audioFormats,
} from "../audio-format-calc.js";

describe("audioQuality", () => {
  it("wav highest quality", () => {
    expect(audioQuality("wav")).toBeGreaterThan(audioQuality("mp3"));
  });
});

describe("fileSize", () => {
  it("wav largest file size", () => {
    expect(fileSize("wav")).toBeGreaterThan(fileSize("mp3"));
  });
});

describe("compatibility", () => {
  it("mp3 most compatible", () => {
    expect(compatibility("mp3")).toBeGreaterThan(compatibility("ogg"));
  });
});

describe("streamingEfficiency", () => {
  it("aac best for streaming", () => {
    expect(streamingEfficiency("aac")).toBeGreaterThan(streamingEfficiency("wav"));
  });
});

describe("editingWorkflow", () => {
  it("wav best for editing", () => {
    expect(editingWorkflow("wav")).toBeGreaterThan(editingWorkflow("mp3"));
  });
});

describe("lossless", () => {
  it("flac is lossless", () => {
    expect(lossless("flac")).toBe(true);
  });
  it("mp3 is not", () => {
    expect(lossless("mp3")).toBe(false);
  });
});

describe("openSource", () => {
  it("ogg is open source", () => {
    expect(openSource("ogg")).toBe(true);
  });
  it("aac is not", () => {
    expect(openSource("aac")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("flac for archival audiophile", () => {
    expect(bestUseCase("flac")).toBe("archival_audiophile");
  });
});

describe("compressionAlgorithm", () => {
  it("wav is uncompressed pcm", () => {
    expect(compressionAlgorithm("wav")).toBe("uncompressed_pcm");
  });
});

describe("audioFormats", () => {
  it("returns 5 formats", () => {
    expect(audioFormats()).toHaveLength(5);
  });
});
