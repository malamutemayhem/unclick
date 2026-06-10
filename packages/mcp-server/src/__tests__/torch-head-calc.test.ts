import { describe, it, expect } from "vitest";
import {
  flameTemp, flameControl, easeOfUse, glassRange,
  torchCost, dualFuel, forBeginner, fuelType,
  bestUse, torchHeads,
} from "../torch-head-calc.js";

describe("flameTemp", () => {
  it("nortel mega dual highest flame temp", () => {
    expect(flameTemp("nortel_mega_dual")).toBeGreaterThan(flameTemp("hothead_mapp_basic"));
  });
});

describe("flameControl", () => {
  it("nortel mega dual best flame control", () => {
    expect(flameControl("nortel_mega_dual")).toBeGreaterThan(flameControl("hothead_mapp_basic"));
  });
});

describe("easeOfUse", () => {
  it("hothead mapp basic easiest to use", () => {
    expect(easeOfUse("hothead_mapp_basic")).toBeGreaterThan(easeOfUse("nortel_mega_dual"));
  });
});

describe("glassRange", () => {
  it("nortel mega dual widest glass range", () => {
    expect(glassRange("nortel_mega_dual")).toBeGreaterThan(glassRange("hothead_mapp_basic"));
  });
});

describe("torchCost", () => {
  it("nortel mega dual most expensive", () => {
    expect(torchCost("nortel_mega_dual")).toBeGreaterThan(torchCost("hothead_mapp_basic"));
  });
});

describe("dualFuel", () => {
  it("minor bench burner is dual fuel", () => {
    expect(dualFuel("minor_bench_burner")).toBe(true);
  });
  it("hothead mapp basic not dual fuel", () => {
    expect(dualFuel("hothead_mapp_basic")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("hothead mapp basic for beginner", () => {
    expect(forBeginner("hothead_mapp_basic")).toBe(true);
  });
  it("nortel mega dual not for beginner", () => {
    expect(forBeginner("nortel_mega_dual")).toBe(false);
  });
});

describe("fuelType", () => {
  it("hothead mapp basic uses mapp gas canister", () => {
    expect(fuelType("hothead_mapp_basic")).toBe("mapp_gas_canister");
  });
});

describe("bestUse", () => {
  it("nortel mega dual best for boro sculpture large", () => {
    expect(bestUse("nortel_mega_dual")).toBe("boro_sculpture_large");
  });
});

describe("torchHeads", () => {
  it("returns 5 types", () => {
    expect(torchHeads()).toHaveLength(5);
  });
});
