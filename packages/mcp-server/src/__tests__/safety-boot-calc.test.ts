import { describe, it, expect } from "vitest";
import {
  protection, comfort, weight, durability,
  sbCost, metalFree, forHeavy, sole,
  bestUse, safetyBootTypes,
} from "../safety-boot-calc.js";

describe("protection", () => {
  it("metatarsal guard highest protection", () => {
    expect(protection("metatarsal_guard_foundry")).toBeGreaterThan(protection("composite_toe_lightweight"));
  });
});

describe("comfort", () => {
  it("composite most comfortable", () => {
    expect(comfort("composite_toe_lightweight")).toBeGreaterThan(comfort("metatarsal_guard_foundry"));
  });
});

describe("weight", () => {
  it("composite lightest", () => {
    expect(weight("composite_toe_lightweight")).toBeGreaterThan(weight("metatarsal_guard_foundry"));
  });
});

describe("durability", () => {
  it("steel toe most durable", () => {
    expect(durability("steel_toe_cap_industrial")).toBeGreaterThan(durability("composite_toe_lightweight"));
  });
});

describe("sbCost", () => {
  it("metatarsal most expensive", () => {
    expect(sbCost("metatarsal_guard_foundry")).toBeGreaterThan(sbCost("steel_toe_cap_industrial"));
  });
});

describe("metalFree", () => {
  it("composite is metal free", () => {
    expect(metalFree("composite_toe_lightweight")).toBe(true);
  });
  it("steel toe not metal free", () => {
    expect(metalFree("steel_toe_cap_industrial")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("steel toe for heavy", () => {
    expect(forHeavy("steel_toe_cap_industrial")).toBe(true);
  });
  it("composite not for heavy", () => {
    expect(forHeavy("composite_toe_lightweight")).toBe(false);
  });
});

describe("sole", () => {
  it("electrical uses dielectric", () => {
    expect(sole("electrical_hazard_eh_rated")).toBe("dielectric_non_conductive_insole");
  });
});

describe("bestUse", () => {
  it("steel toe for warehouse construction", () => {
    expect(bestUse("steel_toe_cap_industrial")).toBe("warehouse_construction_general_heavy");
  });
});

describe("safetyBootTypes", () => {
  it("returns 5 types", () => {
    expect(safetyBootTypes()).toHaveLength(5);
  });
});
