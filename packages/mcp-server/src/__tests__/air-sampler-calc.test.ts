import { describe, it, expect } from "vitest";
import {
  flowRate, sensitivity, selectivity, portability,
  asCost, powered, forParticulate, collection,
  bestUse, airSamplerTypes,
} from "../air-sampler-calc.js";

describe("flowRate", () => {
  it("high volume highest flow rate", () => {
    expect(flowRate("high_volume_tsp_filter")).toBeGreaterThan(flowRate("passive_diffusion_badge"));
  });
});

describe("sensitivity", () => {
  it("canister most sensitive", () => {
    expect(sensitivity("canister_whole_air_grab")).toBeGreaterThan(sensitivity("passive_diffusion_badge"));
  });
});

describe("selectivity", () => {
  it("cascade impactor most selective", () => {
    expect(selectivity("cascade_impactor_size")).toBeGreaterThan(selectivity("canister_whole_air_grab"));
  });
});

describe("portability", () => {
  it("passive badge most portable", () => {
    expect(portability("passive_diffusion_badge")).toBeGreaterThan(portability("high_volume_tsp_filter"));
  });
});

describe("asCost", () => {
  it("cascade impactor most expensive", () => {
    expect(asCost("cascade_impactor_size")).toBeGreaterThan(asCost("passive_diffusion_badge"));
  });
});

describe("powered", () => {
  it("high volume is powered", () => {
    expect(powered("high_volume_tsp_filter")).toBe(true);
  });
  it("passive badge not powered", () => {
    expect(powered("passive_diffusion_badge")).toBe(false);
  });
});

describe("forParticulate", () => {
  it("high volume for particulate", () => {
    expect(forParticulate("high_volume_tsp_filter")).toBe(true);
  });
  it("impinger not for particulate", () => {
    expect(forParticulate("impinger_bubbler_liquid")).toBe(false);
  });
});

describe("collection", () => {
  it("canister uses summa passivated", () => {
    expect(collection("canister_whole_air_grab")).toBe("summa_canister_passivated");
  });
});

describe("bestUse", () => {
  it("passive badge best for personal voc twa", () => {
    expect(bestUse("passive_diffusion_badge")).toBe("personal_exposure_voc_twa_8hr");
  });
});

describe("airSamplerTypes", () => {
  it("returns 5 types", () => {
    expect(airSamplerTypes()).toHaveLength(5);
  });
});
