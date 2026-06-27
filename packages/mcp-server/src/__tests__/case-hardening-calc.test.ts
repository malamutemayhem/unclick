import { describe, it, expect } from "vitest";
import {
  caseDepth, hardness, distortion, throughput,
  chCost, selective, forGear, medium,
  bestUse, caseHardeningTypes,
} from "../case-hardening-calc.js";

describe("caseDepth", () => {
  it("flame hardening deepest case", () => {
    expect(caseDepth("flame_hardening_torch")).toBeGreaterThan(caseDepth("nitriding_gas_ammonia"));
  });
});

describe("hardness", () => {
  it("nitriding hardest surface", () => {
    expect(hardness("nitriding_gas_ammonia")).toBeGreaterThan(hardness("carbonitriding_mixed_gas"));
  });
});

describe("distortion", () => {
  it("nitriding least distortion", () => {
    expect(distortion("nitriding_gas_ammonia")).toBeGreaterThan(distortion("flame_hardening_torch"));
  });
});

describe("throughput", () => {
  it("induction hardening fastest", () => {
    expect(throughput("induction_hardening_coil")).toBeGreaterThan(throughput("nitriding_gas_ammonia"));
  });
});

describe("chCost", () => {
  it("nitriding more expensive than flame", () => {
    expect(chCost("nitriding_gas_ammonia")).toBeGreaterThan(chCost("flame_hardening_torch"));
  });
});

describe("selective", () => {
  it("induction hardening is selective", () => {
    expect(selective("induction_hardening_coil")).toBe(true);
  });
  it("carburizing not selective", () => {
    expect(selective("carburizing_gas_furnace")).toBe(false);
  });
});

describe("forGear", () => {
  it("carburizing for gear", () => {
    expect(forGear("carburizing_gas_furnace")).toBe(true);
  });
  it("flame hardening not for gear", () => {
    expect(forGear("flame_hardening_torch")).toBe(false);
  });
});

describe("medium", () => {
  it("induction uses electromagnetic coil", () => {
    expect(medium("induction_hardening_coil")).toBe("electromagnetic_induction_coil");
  });
});

describe("bestUse", () => {
  it("nitriding for crankshaft wear surface", () => {
    expect(bestUse("nitriding_gas_ammonia")).toBe("crankshaft_die_mold_wear_surface");
  });
});

describe("caseHardeningTypes", () => {
  it("returns 5 types", () => {
    expect(caseHardeningTypes()).toHaveLength(5);
  });
});
