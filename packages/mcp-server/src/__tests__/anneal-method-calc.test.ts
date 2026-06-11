import { describe, it, expect } from "vitest";
import {
  activation, diffusion, throughput, uniformity,
  annCost, selective, forUsj, heating,
  bestUse, annealMethods,
} from "../anneal-method-calc.js";

describe("activation", () => {
  it("laser spike usec best activation", () => {
    expect(activation("laser_spike_usec")).toBeGreaterThan(activation("furnace_soak"));
  });
});

describe("diffusion", () => {
  it("laser spike usec least diffusion", () => {
    expect(diffusion("laser_spike_usec")).toBeGreaterThan(diffusion("furnace_soak"));
  });
});

describe("throughput", () => {
  it("furnace soak highest throughput", () => {
    expect(throughput("furnace_soak")).toBeGreaterThan(throughput("laser_spike_usec"));
  });
});

describe("uniformity", () => {
  it("furnace soak best uniformity", () => {
    expect(uniformity("furnace_soak")).toBeGreaterThan(uniformity("laser_spike_usec"));
  });
});

describe("annCost", () => {
  it("laser spike usec most expensive", () => {
    expect(annCost("laser_spike_usec")).toBeGreaterThan(annCost("furnace_soak"));
  });
});

describe("selective", () => {
  it("laser spike usec is selective", () => {
    expect(selective("laser_spike_usec")).toBe(true);
  });
  it("furnace soak not selective", () => {
    expect(selective("furnace_soak")).toBe(false);
  });
});

describe("forUsj", () => {
  it("flash lamp msec for usj", () => {
    expect(forUsj("flash_lamp_msec")).toBe(true);
  });
  it("furnace soak not for usj", () => {
    expect(forUsj("furnace_soak")).toBe(false);
  });
});

describe("heating", () => {
  it("microwave selective uses ghz volumetric dopant only", () => {
    expect(heating("microwave_selective")).toBe("ghz_volumetric_dopant_only");
  });
});

describe("bestUse", () => {
  it("furnace soak best for oxidation densification", () => {
    expect(bestUse("furnace_soak")).toBe("oxidation_densification");
  });
});

describe("annealMethods", () => {
  it("returns 5 types", () => {
    expect(annealMethods()).toHaveLength(5);
  });
});
