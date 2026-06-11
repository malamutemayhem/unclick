import { describe, it, expect } from "vitest";
import {
  particleSize, throughput, heatEfficiency, productQuality,
  sdCost, agglomerate, forPharma, atomizer,
  bestUse, sprayDryTypes,
} from "../spray-dry-calc.js";

describe("particleSize", () => {
  it("fluidized spray largest particle", () => {
    expect(particleSize("fluidized_spray_agglom")).toBeGreaterThan(particleSize("mixed_flow_fountain"));
  });
});

describe("throughput", () => {
  it("co current nozzle highest throughput", () => {
    expect(throughput("co_current_nozzle")).toBeGreaterThan(throughput("spray_freeze_dry"));
  });
});

describe("heatEfficiency", () => {
  it("mixed flow most efficient", () => {
    expect(heatEfficiency("mixed_flow_fountain")).toBeGreaterThan(heatEfficiency("co_current_nozzle"));
  });
});

describe("productQuality", () => {
  it("spray freeze dry best quality", () => {
    expect(productQuality("spray_freeze_dry")).toBeGreaterThan(productQuality("co_current_nozzle"));
  });
});

describe("sdCost", () => {
  it("spray freeze dry most expensive", () => {
    expect(sdCost("spray_freeze_dry")).toBeGreaterThan(sdCost("co_current_nozzle"));
  });
});

describe("agglomerate", () => {
  it("fluidized spray agglomerates", () => {
    expect(agglomerate("fluidized_spray_agglom")).toBe(true);
  });
  it("co current nozzle no agglomerate", () => {
    expect(agglomerate("co_current_nozzle")).toBe(false);
  });
});

describe("forPharma", () => {
  it("spray freeze dry for pharma", () => {
    expect(forPharma("spray_freeze_dry")).toBe(true);
  });
  it("co current nozzle not for pharma", () => {
    expect(forPharma("co_current_nozzle")).toBe(false);
  });
});

describe("atomizer", () => {
  it("counter current uses rotary wheel disc", () => {
    expect(atomizer("counter_current_tower")).toBe("rotary_atomizer_wheel_disc");
  });
});

describe("bestUse", () => {
  it("fluidized spray for instant beverage", () => {
    expect(bestUse("fluidized_spray_agglom")).toBe("instant_beverage_agglomerate_granule");
  });
});

describe("sprayDryTypes", () => {
  it("returns 5 types", () => {
    expect(sprayDryTypes()).toHaveLength(5);
  });
});
