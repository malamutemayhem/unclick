import { describe, it, expect } from "vitest";
import {
  accuracy, speed, adaptability, falseReject,
  viCost, aiPowered, forHighMix, algorithm,
  bestUse, visionInspectTypes,
} from "../vision-inspect-calc.js";

describe("accuracy", () => {
  it("dimensional gauging most accurate", () => {
    expect(accuracy("dimensional_gauging")).toBeGreaterThan(accuracy("color_sorting_rgb"));
  });
});

describe("speed", () => {
  it("color sorting fastest", () => {
    expect(speed("color_sorting_rgb")).toBeGreaterThan(speed("deep_learn_anomaly"));
  });
});

describe("adaptability", () => {
  it("deep learning most adaptable", () => {
    expect(adaptability("deep_learn_anomaly")).toBeGreaterThan(adaptability("dimensional_gauging"));
  });
});

describe("falseReject", () => {
  it("dimensional gauging lowest false reject", () => {
    expect(falseReject("dimensional_gauging")).toBeGreaterThan(falseReject("color_sorting_rgb"));
  });
});

describe("viCost", () => {
  it("deep learning most expensive", () => {
    expect(viCost("deep_learn_anomaly")).toBeGreaterThan(viCost("color_sorting_rgb"));
  });
});

describe("aiPowered", () => {
  it("deep learning is AI powered", () => {
    expect(aiPowered("deep_learn_anomaly")).toBe(true);
  });
  it("surface defect AOI not AI powered", () => {
    expect(aiPowered("surface_defect_aoi")).toBe(false);
  });
});

describe("forHighMix", () => {
  it("deep learning for high mix", () => {
    expect(forHighMix("deep_learn_anomaly")).toBe(true);
  });
  it("surface defect not for high mix", () => {
    expect(forHighMix("surface_defect_aoi")).toBe(false);
  });
});

describe("algorithm", () => {
  it("deep learning uses autoencoder", () => {
    expect(algorithm("deep_learn_anomaly")).toBe("autoencoder_anomaly_few_shot");
  });
});

describe("bestUse", () => {
  it("color sorting for food grain sort", () => {
    expect(bestUse("color_sorting_rgb")).toBe("food_grain_plastic_flake_sort");
  });
});

describe("visionInspectTypes", () => {
  it("returns 5 types", () => {
    expect(visionInspectTypes()).toHaveLength(5);
  });
});
