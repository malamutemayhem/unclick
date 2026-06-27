import { describe, it, expect } from "vitest";
import {
  fieldStrength, throughput, selectivity, recovery,
  msCost, wetProcess, forFine, magnet,
  bestUse, magneticSepTypes,
} from "../magnetic-sep-calc.js";

describe("fieldStrength", () => {
  it("wet high gradient strongest field", () => {
    expect(fieldStrength("wet_high_gradient")).toBeGreaterThan(fieldStrength("drum_low_intensity"));
  });
});

describe("throughput", () => {
  it("overhead belt highest throughput", () => {
    expect(throughput("overhead_belt_crossbelt")).toBeGreaterThan(throughput("wet_high_gradient"));
  });
});

describe("selectivity", () => {
  it("wet high gradient most selective", () => {
    expect(selectivity("wet_high_gradient")).toBeGreaterThan(selectivity("overhead_belt_crossbelt"));
  });
});

describe("recovery", () => {
  it("wet high gradient best recovery", () => {
    expect(recovery("wet_high_gradient")).toBeGreaterThan(recovery("overhead_belt_crossbelt"));
  });
});

describe("msCost", () => {
  it("wet high gradient most expensive", () => {
    expect(msCost("wet_high_gradient")).toBeGreaterThan(msCost("drum_low_intensity"));
  });
});

describe("wetProcess", () => {
  it("wet high gradient is wet process", () => {
    expect(wetProcess("wet_high_gradient")).toBe(true);
  });
  it("drum low intensity not wet", () => {
    expect(wetProcess("drum_low_intensity")).toBe(false);
  });
});

describe("forFine", () => {
  it("wet high gradient for fine", () => {
    expect(forFine("wet_high_gradient")).toBe(true);
  });
  it("drum low intensity not for fine", () => {
    expect(forFine("drum_low_intensity")).toBe(false);
  });
});

describe("magnet", () => {
  it("eddy current uses rotating rare earth rotor", () => {
    expect(magnet("eddy_current_nonferrous")).toBe("rotating_rare_earth_rotor_repulsion");
  });
});

describe("bestUse", () => {
  it("eddy current for recycling aluminum copper", () => {
    expect(bestUse("eddy_current_nonferrous")).toBe("recycling_aluminum_copper_sort");
  });
});

describe("magneticSepTypes", () => {
  it("returns 5 types", () => {
    expect(magneticSepTypes()).toHaveLength(5);
  });
});
