import { describe, it, expect } from "vitest";
import {
  noiseReduction, comfort, durability, speechClarity,
  purchasePrice, reusable, allowsAmbientSound, attenuationMethod,
  bestEnvironment, earProtections,
} from "../ear-protection-calc.js";

describe("noiseReduction", () => {
  it("custom mold best noise reduction", () => {
    expect(noiseReduction("custom_mold")).toBeGreaterThan(noiseReduction("silicone_plug"));
  });
});

describe("comfort", () => {
  it("custom mold most comfortable", () => {
    expect(comfort("custom_mold")).toBeGreaterThan(comfort("foam_plug"));
  });
});

describe("durability", () => {
  it("custom mold most durable", () => {
    expect(durability("custom_mold")).toBeGreaterThan(durability("foam_plug"));
  });
});

describe("speechClarity", () => {
  it("electronic muff best speech clarity", () => {
    expect(speechClarity("electronic_muff")).toBeGreaterThan(speechClarity("foam_plug"));
  });
});

describe("purchasePrice", () => {
  it("custom mold most expensive", () => {
    expect(purchasePrice("custom_mold")).toBeGreaterThan(purchasePrice("foam_plug"));
  });
});

describe("reusable", () => {
  it("silicone plug is reusable", () => {
    expect(reusable("silicone_plug")).toBe(true);
  });
  it("foam plug is not", () => {
    expect(reusable("foam_plug")).toBe(false);
  });
});

describe("allowsAmbientSound", () => {
  it("electronic muff allows ambient sound", () => {
    expect(allowsAmbientSound("electronic_muff")).toBe(true);
  });
  it("foam plug does not", () => {
    expect(allowsAmbientSound("foam_plug")).toBe(false);
  });
});

describe("attenuationMethod", () => {
  it("electronic muff uses active noise limit circuit", () => {
    expect(attenuationMethod("electronic_muff")).toBe("active_noise_limit_circuit");
  });
});

describe("bestEnvironment", () => {
  it("foam plug for disposable industrial", () => {
    expect(bestEnvironment("foam_plug")).toBe("disposable_industrial");
  });
});

describe("earProtections", () => {
  it("returns 5 protections", () => {
    expect(earProtections()).toHaveLength(5);
  });
});
