import { describe, it, expect } from "vitest";
import {
  cureUniformity, throughput, moldPrecision, energyEfficiency,
  tcCost, automated, forPassenger, curingConfig,
  bestUse, tireCuringTypes,
} from "../tire-curing-calc.js";

describe("cureUniformity", () => {
  it("segmented mold best cure uniformity", () => {
    expect(cureUniformity("segmented_mold")).toBeGreaterThan(cureUniformity("two_piece_mold"));
  });
});

describe("throughput", () => {
  it("continuous cure highest throughput", () => {
    expect(throughput("continuous_cure")).toBeGreaterThan(throughput("autoclave_cure"));
  });
});

describe("moldPrecision", () => {
  it("segmented mold best mold precision", () => {
    expect(moldPrecision("segmented_mold")).toBeGreaterThan(moldPrecision("autoclave_cure"));
  });
});

describe("energyEfficiency", () => {
  it("continuous cure best energy efficiency", () => {
    expect(energyEfficiency("continuous_cure")).toBeGreaterThan(energyEfficiency("autoclave_cure"));
  });
});

describe("tcCost", () => {
  it("segmented mold most expensive", () => {
    expect(tcCost("segmented_mold")).toBeGreaterThan(tcCost("two_piece_mold"));
  });
});

describe("automated", () => {
  it("bladder press is automated", () => {
    expect(automated("bladder_press")).toBe(true);
  });
  it("autoclave cure not automated", () => {
    expect(automated("autoclave_cure")).toBe(false);
  });
});

describe("forPassenger", () => {
  it("bladder press for passenger tire", () => {
    expect(forPassenger("bladder_press")).toBe(true);
  });
  it("autoclave cure not for passenger", () => {
    expect(forPassenger("autoclave_cure")).toBe(false);
  });
});

describe("curingConfig", () => {
  it("two piece mold uses upper lower half clamp steam", () => {
    expect(curingConfig("two_piece_mold")).toBe("two_piece_mold_tire_curing_upper_lower_half_clamp_steam_cure");
  });
});

describe("bestUse", () => {
  it("autoclave cure for large tire aircraft earthmover", () => {
    expect(bestUse("autoclave_cure")).toBe("large_tire_autoclave_cure_aircraft_earthmover_specialty_oversize");
  });
});

describe("tireCuringTypes", () => {
  it("returns 5 types", () => {
    expect(tireCuringTypes()).toHaveLength(5);
  });
});
