import { describe, it, expect } from "vitest";
import {
  accuracy, tempDrift, noise, longTermStab,
  refCost, adjustable, forPrecision, topology,
  bestUse, voltageReferences,
} from "../voltage-reference-calc.js";

describe("accuracy", () => {
  it("buried zener most accurate", () => {
    expect(accuracy("buried_zener")).toBeGreaterThan(accuracy("shunt_tl431"));
  });
});

describe("tempDrift", () => {
  it("buried zener lowest temp drift", () => {
    expect(tempDrift("buried_zener")).toBeGreaterThan(tempDrift("shunt_tl431"));
  });
});

describe("noise", () => {
  it("xfet low noise lowest noise", () => {
    expect(noise("xfet_low_noise")).toBeGreaterThan(noise("shunt_tl431"));
  });
});

describe("longTermStab", () => {
  it("buried zener best long term stability", () => {
    expect(longTermStab("buried_zener")).toBeGreaterThan(longTermStab("bandgap_1v2"));
  });
});

describe("refCost", () => {
  it("buried zener most expensive", () => {
    expect(refCost("buried_zener")).toBeGreaterThan(refCost("shunt_tl431"));
  });
});

describe("adjustable", () => {
  it("shunt tl431 is adjustable", () => {
    expect(adjustable("shunt_tl431")).toBe(true);
  });
  it("buried zener not adjustable", () => {
    expect(adjustable("buried_zener")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("buried zener is for precision", () => {
    expect(forPrecision("buried_zener")).toBe(true);
  });
  it("bandgap 1v2 not for precision", () => {
    expect(forPrecision("bandgap_1v2")).toBe(false);
  });
});

describe("topology", () => {
  it("buried zener uses sub surface avalanche", () => {
    expect(topology("buried_zener")).toBe("sub_surface_avalanche");
  });
});

describe("bestUse", () => {
  it("buried zener best for 6 5digit multimeter", () => {
    expect(bestUse("buried_zener")).toBe("6_5digit_multimeter");
  });
});

describe("voltageReferences", () => {
  it("returns 5 types", () => {
    expect(voltageReferences()).toHaveLength(5);
  });
});
