import { describe, it, expect } from "vitest";
import {
  strength, surfaceFinish, materialUtil, complexity,
  fgCost, nearNetShape, forAerospace, temperature,
  bestUse, forgingTypes,
} from "../forging-type-calc.js";

describe("strength", () => {
  it("rolled ring highest strength", () => {
    expect(strength("rolled_ring_seamless")).toBeGreaterThan(strength("upset_heading_bolt"));
  });
});

describe("surfaceFinish", () => {
  it("isothermal best surface finish", () => {
    expect(surfaceFinish("isothermal_superalloy")).toBeGreaterThan(surfaceFinish("open_die_flat_anvil"));
  });
});

describe("materialUtil", () => {
  it("upset heading best material utilization", () => {
    expect(materialUtil("upset_heading_bolt")).toBeGreaterThan(materialUtil("open_die_flat_anvil"));
  });
});

describe("complexity", () => {
  it("isothermal most complex", () => {
    expect(complexity("isothermal_superalloy")).toBeGreaterThan(complexity("open_die_flat_anvil"));
  });
});

describe("fgCost", () => {
  it("isothermal most expensive", () => {
    expect(fgCost("isothermal_superalloy")).toBeGreaterThan(fgCost("upset_heading_bolt"));
  });
});

describe("nearNetShape", () => {
  it("closed die is near net shape", () => {
    expect(nearNetShape("closed_die_impression")).toBe(true);
  });
  it("open die not near net shape", () => {
    expect(nearNetShape("open_die_flat_anvil")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("rolled ring for aerospace", () => {
    expect(forAerospace("rolled_ring_seamless")).toBe(true);
  });
  it("upset heading not for aerospace", () => {
    expect(forAerospace("upset_heading_bolt")).toBe(false);
  });
});

describe("temperature", () => {
  it("upset heading uses cold room temp strain", () => {
    expect(temperature("upset_heading_bolt")).toBe("cold_room_temp_strain");
  });
});

describe("bestUse", () => {
  it("isothermal best for nickel superalloy disk", () => {
    expect(bestUse("isothermal_superalloy")).toBe("nickel_superalloy_disk_blade");
  });
});

describe("forgingTypes", () => {
  it("returns 5 types", () => {
    expect(forgingTypes()).toHaveLength(5);
  });
});
