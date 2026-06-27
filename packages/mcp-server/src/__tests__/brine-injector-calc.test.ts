import { describe, it, expect } from "vitest";
import {
  brineDistribution, throughput, yieldGain, meatDamage,
  biCost, automated, forWhole, injectorConfig,
  bestUse, brineInjectorTypes,
} from "../brine-injector-calc.js";

describe("brineDistribution", () => {
  it("multi needle auto best brine distribution", () => {
    expect(brineDistribution("multi_needle_auto")).toBeGreaterThan(brineDistribution("spray_injector"));
  });
});

describe("throughput", () => {
  it("multi needle auto highest throughput", () => {
    expect(throughput("multi_needle_auto")).toBeGreaterThan(throughput("needle_injector"));
  });
});

describe("yieldGain", () => {
  it("multi needle auto best yield gain", () => {
    expect(yieldGain("multi_needle_auto")).toBeGreaterThan(yieldGain("spray_injector"));
  });
});

describe("meatDamage", () => {
  it("spray injector least meat damage", () => {
    expect(meatDamage("spray_injector")).toBeGreaterThan(meatDamage("multi_needle_auto"));
  });
});

describe("biCost", () => {
  it("multi needle auto most expensive", () => {
    expect(biCost("multi_needle_auto")).toBeGreaterThan(biCost("spray_injector"));
  });
});

describe("automated", () => {
  it("vacuum tumbler is automated", () => {
    expect(automated("vacuum_tumbler")).toBe(true);
  });
  it("needle injector not automated", () => {
    expect(automated("needle_injector")).toBe(false);
  });
});

describe("forWhole", () => {
  it("needle injector for whole cuts", () => {
    expect(forWhole("needle_injector")).toBe(true);
  });
  it("spray injector not for whole", () => {
    expect(forWhole("spray_injector")).toBe(false);
  });
});

describe("injectorConfig", () => {
  it("vacuum tumbler uses sealed drum vacuum massage", () => {
    expect(injectorConfig("vacuum_tumbler")).toBe("vacuum_tumbler_brine_sealed_drum_vacuum_massage_deep_penetrate");
  });
});

describe("bestUse", () => {
  it("tumble marinator for massage brine absorb", () => {
    expect(bestUse("tumble_marinator")).toBe("meat_processing_tumble_marinator_massage_brine_absorb_tenderize");
  });
});

describe("brineInjectorTypes", () => {
  it("returns 5 types", () => {
    expect(brineInjectorTypes()).toHaveLength(5);
  });
});
