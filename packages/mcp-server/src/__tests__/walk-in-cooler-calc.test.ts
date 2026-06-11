import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, tempRange, insulation,
  wcCost, subZero, forRestaurant, refrigerant,
  bestUse, walkInCoolerTypes,
} from "../walk-in-cooler-calc.js";

describe("capacity", () => {
  it("outdoor remote highest capacity", () => {
    expect(capacity("outdoor_remote_condenser")).toBeGreaterThan(capacity("blast_chiller_rapid"));
  });
});

describe("efficiency", () => {
  it("outdoor most efficient", () => {
    expect(efficiency("outdoor_remote_condenser")).toBeGreaterThan(efficiency("blast_chiller_rapid"));
  });
});

describe("tempRange", () => {
  it("blast chiller widest range", () => {
    expect(tempRange("blast_chiller_rapid")).toBeGreaterThan(tempRange("standard_box_cooler"));
  });
});

describe("insulation", () => {
  it("outdoor best insulation", () => {
    expect(insulation("outdoor_remote_condenser")).toBeGreaterThan(insulation("standard_box_cooler"));
  });
});

describe("wcCost", () => {
  it("blast chiller most expensive", () => {
    expect(wcCost("blast_chiller_rapid")).toBeGreaterThan(wcCost("standard_box_cooler"));
  });
});

describe("subZero", () => {
  it("freezer is sub zero", () => {
    expect(subZero("standard_box_freezer")).toBe(true);
  });
  it("cooler not sub zero", () => {
    expect(subZero("standard_box_cooler")).toBe(false);
  });
});

describe("forRestaurant", () => {
  it("standard cooler for restaurant", () => {
    expect(forRestaurant("standard_box_cooler")).toBe(true);
  });
  it("outdoor not restaurant", () => {
    expect(forRestaurant("outdoor_remote_condenser")).toBe(false);
  });
});

describe("refrigerant", () => {
  it("combo uses shared compressor", () => {
    expect(refrigerant("combo_cooler_freezer")).toBe("dual_system_shared_compressor");
  });
});

describe("bestUse", () => {
  it("blast chiller for haccp", () => {
    expect(bestUse("blast_chiller_rapid")).toBe("haccp_compliance_rapid_chill");
  });
});

describe("walkInCoolerTypes", () => {
  it("returns 5 types", () => {
    expect(walkInCoolerTypes()).toHaveLength(5);
  });
});
