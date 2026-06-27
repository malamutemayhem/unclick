import { describe, it, expect } from "vitest";
import {
  energy, dose, uniformity, throughput,
  impCost, channelFree, forHalo, species,
  bestUse, implantTypes,
} from "../implant-type-calc.js";

describe("energy", () => {
  it("high energy deep highest energy", () => {
    expect(energy("high_energy_deep")).toBeGreaterThan(energy("ultra_low_energy"));
  });
});

describe("dose", () => {
  it("high current sd highest dose", () => {
    expect(dose("high_current_sd")).toBeGreaterThan(dose("high_energy_deep"));
  });
});

describe("uniformity", () => {
  it("medium current well best uniformity", () => {
    expect(uniformity("medium_current_well")).toBeGreaterThanOrEqual(uniformity("high_current_sd"));
  });
});

describe("throughput", () => {
  it("high current sd highest throughput", () => {
    expect(throughput("high_current_sd")).toBeGreaterThan(throughput("cluster_molecular"));
  });
});

describe("impCost", () => {
  it("cluster molecular most expensive", () => {
    expect(impCost("cluster_molecular")).toBeGreaterThan(impCost("medium_current_well"));
  });
});

describe("channelFree", () => {
  it("ultra low energy is channel free", () => {
    expect(channelFree("ultra_low_energy")).toBe(true);
  });
  it("high energy deep not channel free", () => {
    expect(channelFree("high_energy_deep")).toBe(false);
  });
});

describe("forHalo", () => {
  it("medium current well for halo", () => {
    expect(forHalo("medium_current_well")).toBe(true);
  });
  it("high current sd not for halo", () => {
    expect(forHalo("high_current_sd")).toBe(false);
  });
});

describe("species", () => {
  it("cluster molecular uses decaborane octadecaborane", () => {
    expect(species("cluster_molecular")).toBe("decaborane_octadecaborane");
  });
});

describe("bestUse", () => {
  it("ultra low energy best for usj finfet junction", () => {
    expect(bestUse("ultra_low_energy")).toBe("usj_finfet_junction");
  });
});

describe("implantTypes", () => {
  it("returns 5 types", () => {
    expect(implantTypes()).toHaveLength(5);
  });
});
