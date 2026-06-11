import { describe, it, expect } from "vitest";
import {
  coverage, decaySpeed, balanceAccuracy, maintenance,
  ionizerCost, portable, forCleanroom, ionMethod,
  bestUse, ionizers,
} from "../ionizer-calc.js";

describe("coverage", () => {
  it("room ionizer ceiling widest coverage", () => {
    expect(coverage("room_ionizer_ceiling")).toBeGreaterThan(coverage("point_of_use_gun"));
  });
});

describe("decaySpeed", () => {
  it("point of use gun fastest decay", () => {
    expect(decaySpeed("point_of_use_gun")).toBeGreaterThan(decaySpeed("room_ionizer_ceiling"));
  });
});

describe("balanceAccuracy", () => {
  it("overhead ionizer bar best balance", () => {
    expect(balanceAccuracy("overhead_ionizer_bar")).toBeGreaterThan(balanceAccuracy("point_of_use_gun"));
  });
});

describe("maintenance", () => {
  it("point of use gun lowest maintenance", () => {
    expect(maintenance("point_of_use_gun")).toBeGreaterThan(maintenance("room_ionizer_ceiling"));
  });
});

describe("ionizerCost", () => {
  it("room ionizer ceiling most expensive", () => {
    expect(ionizerCost("room_ionizer_ceiling")).toBeGreaterThan(ionizerCost("point_of_use_gun"));
  });
});

describe("portable", () => {
  it("point of use gun is portable", () => {
    expect(portable("point_of_use_gun")).toBe(true);
  });
  it("benchtop fan blower not portable", () => {
    expect(portable("benchtop_fan_blower")).toBe(false);
  });
});

describe("forCleanroom", () => {
  it("room ionizer ceiling is for cleanroom", () => {
    expect(forCleanroom("room_ionizer_ceiling")).toBe(true);
  });
  it("benchtop fan blower not for cleanroom", () => {
    expect(forCleanroom("benchtop_fan_blower")).toBe(false);
  });
});

describe("ionMethod", () => {
  it("inline nozzle blow uses compressed air ionize", () => {
    expect(ionMethod("inline_nozzle_blow")).toBe("compressed_air_ionize");
  });
});

describe("bestUse", () => {
  it("overhead ionizer bar best for production line static", () => {
    expect(bestUse("overhead_ionizer_bar")).toBe("production_line_static");
  });
});

describe("ionizers", () => {
  it("returns 5 types", () => {
    expect(ionizers()).toHaveLength(5);
  });
});
