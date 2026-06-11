import { describe, it, expect } from "vitest";
import {
  baseTemp, coolingPower, holdTime, wiring,
  dfCost, cryoFree, forQubit, coolant,
  bestUse, dilutionFridges,
} from "../dilution-fridge-calc.js";

describe("baseTemp", () => {
  it("nuclear demagnet lowest base temp", () => {
    expect(baseTemp("nuclear_demagnet_copper")).toBeGreaterThan(baseTemp("continuous_cycle_flow"));
  });
});

describe("coolingPower", () => {
  it("continuous cycle highest cooling power", () => {
    expect(coolingPower("continuous_cycle_flow")).toBeGreaterThan(coolingPower("single_shot_demagnet"));
  });
});

describe("holdTime", () => {
  it("wet bath longest hold time", () => {
    expect(holdTime("wet_bath_cryostat")).toBeGreaterThan(holdTime("single_shot_demagnet"));
  });
});

describe("wiring", () => {
  it("dry cryofree best wiring", () => {
    expect(wiring("dry_cryofree_pulse")).toBeGreaterThan(wiring("nuclear_demagnet_copper"));
  });
});

describe("dfCost", () => {
  it("nuclear demagnet most expensive", () => {
    expect(dfCost("nuclear_demagnet_copper")).toBeGreaterThan(dfCost("wet_bath_cryostat"));
  });
});

describe("cryoFree", () => {
  it("dry cryofree is cryo free", () => {
    expect(cryoFree("dry_cryofree_pulse")).toBe(true);
  });
  it("wet bath not cryo free", () => {
    expect(cryoFree("wet_bath_cryostat")).toBe(false);
  });
});

describe("forQubit", () => {
  it("dry cryofree for qubit", () => {
    expect(forQubit("dry_cryofree_pulse")).toBe(true);
  });
  it("continuous cycle not for qubit", () => {
    expect(forQubit("continuous_cycle_flow")).toBe(false);
  });
});

describe("coolant", () => {
  it("dry cryofree uses helium 3 4 mixture closed", () => {
    expect(coolant("dry_cryofree_pulse")).toBe("helium_3_4_mixture_closed");
  });
});

describe("bestUse", () => {
  it("dry cryofree best for quantum processor", () => {
    expect(bestUse("dry_cryofree_pulse")).toBe("quantum_processor_multi_qubit");
  });
});

describe("dilutionFridges", () => {
  it("returns 5 types", () => {
    expect(dilutionFridges()).toHaveLength(5);
  });
});
