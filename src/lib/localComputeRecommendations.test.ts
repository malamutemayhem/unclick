import { describe, expect, it } from "vitest";
import {
  classifyVramTier,
  describeModelFit,
  modelById,
  rankModelsForHardware,
  recommendModelsByTask,
  type LocalHardwareProfile,
} from "./localComputeRecommendations";

const baseHardware: LocalHardwareProfile = {
  ramGb: 32,
  cpuCores: 12,
  gpuName: "RTX 4070",
  gpuVendor: "NVIDIA",
  vramGb: 12,
  webGpuSupported: true,
};

describe("local compute recommendations", () => {
  it("classifies the expected VRAM tiers", () => {
    expect(classifyVramTier(4)?.label).toBe("4GB tier");
    expect(classifyVramTier(8)?.label).toBe("8GB tier");
    expect(classifyVramTier(12)?.label).toBe("12GB tier");
    expect(classifyVramTier(16)?.label).toBe("16GB tier");
    expect(classifyVramTier(24)?.label).toBe("24GB+ tier");
  });

  it("flags models that do not fit the detected GPU", () => {
    const fit = describeModelFit(modelById("llama-3.1-70b-q4"), baseHardware);

    expect(fit.status).toBe("blocked");
    expect(fit.reason).toContain("Needs ~40GB VRAM");
    expect(fit.reason).toContain("you have 12GB");
  });

  it("keeps CPU-friendly embedding models viable without GPU VRAM", () => {
    const recommendations = recommendModelsByTask({
      ...baseHardware,
      gpuName: null,
      gpuVendor: null,
      vramGb: null,
      webGpuSupported: false,
    });

    expect(recommendations.embeddings.model.id).toBe("bge-m3");
    expect(recommendations.embeddings.fit.status).toBe("fits");
  });

  it("recommends compact code models for 8GB VRAM", () => {
    const ranked = rankModelsForHardware({ ...baseHardware, vramGb: 8 }, "code");

    expect(ranked[0].model.id).toBe("qwen-2.5-coder-7b-q4");
    expect(ranked[0].fit.status).toBe("fits");
    expect(ranked.some((entry) => entry.model.id === "codestral-22b-q4" && entry.fit.status === "blocked")).toBe(true);
  });
});
