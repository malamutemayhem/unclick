import { describe, it, expect } from "vitest";
import {
  coolingControl, throughput, stressRelief, energyUse,
  gaCost, continuous, forContainer, annealerConfig,
  bestUse, glassAnnealerTypes,
} from "../glass-annealer-calc.js";

describe("coolingControl", () => {
  it("batch annealer best cooling control", () => {
    expect(coolingControl("batch_annealer")).toBeGreaterThan(coolingControl("infrared_rapid"));
  });
});

describe("throughput", () => {
  it("tunnel lehr highest throughput", () => {
    expect(throughput("tunnel_lehr")).toBeGreaterThan(throughput("batch_annealer"));
  });
});

describe("stressRelief", () => {
  it("batch annealer best stress relief", () => {
    expect(stressRelief("batch_annealer")).toBeGreaterThan(stressRelief("infrared_rapid"));
  });
});

describe("energyUse", () => {
  it("infrared rapid best energy use", () => {
    expect(energyUse("infrared_rapid")).toBeGreaterThan(energyUse("batch_annealer"));
  });
});

describe("gaCost", () => {
  it("tunnel lehr most expensive", () => {
    expect(gaCost("tunnel_lehr")).toBeGreaterThan(gaCost("batch_annealer"));
  });
});

describe("continuous", () => {
  it("lehr continuous is continuous", () => {
    expect(continuous("lehr_continuous")).toBe(true);
  });
  it("batch annealer not continuous", () => {
    expect(continuous("batch_annealer")).toBe(false);
  });
});

describe("forContainer", () => {
  it("lehr continuous for container", () => {
    expect(forContainer("lehr_continuous")).toBe(true);
  });
  it("batch annealer not for container", () => {
    expect(forContainer("batch_annealer")).toBe(false);
  });
});

describe("annealerConfig", () => {
  it("batch annealer uses programmable soak slow cool", () => {
    expect(annealerConfig("batch_annealer")).toBe("batch_annealer_oven_programmable_soak_slow_cool_art_glass");
  });
});

describe("bestUse", () => {
  it("roller lehr for flat glass tableware", () => {
    expect(bestUse("roller_lehr")).toBe("flat_glass_tableware_roller_lehr_ceramic_roller_controlled_cool");
  });
});

describe("glassAnnealerTypes", () => {
  it("returns 5 types", () => {
    expect(glassAnnealerTypes()).toHaveLength(5);
  });
});
