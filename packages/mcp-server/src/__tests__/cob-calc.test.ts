import { describe, it, expect } from "vitest";
import {
  wallThicknessCm, clayPercent, strawLengthCm, mixingTimeMinutes,
  dryingWeeks, compressiveStrengthMpa, thermalResistanceRPerCm,
  shrinkagePercent, costPerM3, cobMixes,
} from "../cob-calc.js";

describe("wallThicknessCm", () => {
  it("taller wall is thicker", () => {
    expect(wallThicknessCm(3)).toBeGreaterThan(wallThicknessCm(2));
  });
});

describe("clayPercent", () => {
  it("sculptural has most clay", () => {
    expect(clayPercent("sculptural")).toBeGreaterThan(
      clayPercent("light_straw_clay")
    );
  });
});

describe("strawLengthCm", () => {
  it("light straw clay uses longest straw", () => {
    expect(strawLengthCm("light_straw_clay")).toBeGreaterThan(
      strawLengthCm("sculptural")
    );
  });
});

describe("mixingTimeMinutes", () => {
  it("more volume takes longer", () => {
    expect(mixingTimeMinutes(100)).toBeGreaterThan(mixingTimeMinutes(50));
  });
});

describe("dryingWeeks", () => {
  it("thicker wall dries slower", () => {
    expect(dryingWeeks(50)).toBeGreaterThan(dryingWeeks(30));
  });
});

describe("compressiveStrengthMpa", () => {
  it("stabilized is strongest", () => {
    expect(compressiveStrengthMpa("stabilized")).toBeGreaterThan(
      compressiveStrengthMpa("light_straw_clay")
    );
  });
});

describe("thermalResistanceRPerCm", () => {
  it("light straw clay insulates best", () => {
    expect(thermalResistanceRPerCm("light_straw_clay")).toBeGreaterThan(
      thermalResistanceRPerCm("traditional")
    );
  });
});

describe("shrinkagePercent", () => {
  it("sculptural shrinks most", () => {
    expect(shrinkagePercent("sculptural")).toBeGreaterThan(
      shrinkagePercent("light_straw_clay")
    );
  });
});

describe("costPerM3", () => {
  it("stabilized is most expensive", () => {
    expect(costPerM3("stabilized")).toBeGreaterThan(
      costPerM3("traditional")
    );
  });
});

describe("cobMixes", () => {
  it("returns 5 mixes", () => {
    expect(cobMixes()).toHaveLength(5);
  });
});
