import { describe, it, expect } from "vitest";
import {
  penetration, speed, versatility, quality,
  awCost, shieldGas, forStructural, electrode,
  bestUse, arcWeldTypes,
} from "../arc-weld-calc.js";

describe("penetration", () => {
  it("submerged arc deepest penetration", () => {
    expect(penetration("saw_submerged_arc")).toBeGreaterThan(penetration("gtaw_tig_tungsten"));
  });
});

describe("speed", () => {
  it("submerged arc fastest", () => {
    expect(speed("saw_submerged_arc")).toBeGreaterThan(speed("smaw_stick_electrode"));
  });
});

describe("versatility", () => {
  it("stick most versatile", () => {
    expect(versatility("smaw_stick_electrode")).toBeGreaterThan(versatility("saw_submerged_arc"));
  });
});

describe("quality", () => {
  it("tig highest quality", () => {
    expect(quality("gtaw_tig_tungsten")).toBeGreaterThan(quality("smaw_stick_electrode"));
  });
});

describe("awCost", () => {
  it("tig most expensive", () => {
    expect(awCost("gtaw_tig_tungsten")).toBeGreaterThan(awCost("smaw_stick_electrode"));
  });
});

describe("shieldGas", () => {
  it("mig uses shield gas", () => {
    expect(shieldGas("gmaw_mig_wire")).toBe(true);
  });
  it("stick no shield gas", () => {
    expect(shieldGas("smaw_stick_electrode")).toBe(false);
  });
});

describe("forStructural", () => {
  it("stick for structural", () => {
    expect(forStructural("smaw_stick_electrode")).toBe(true);
  });
  it("tig not for structural", () => {
    expect(forStructural("gtaw_tig_tungsten")).toBe(false);
  });
});

describe("electrode", () => {
  it("tig uses non consumable tungsten", () => {
    expect(electrode("gtaw_tig_tungsten")).toBe("non_consumable_tungsten_argon");
  });
});

describe("bestUse", () => {
  it("mig for production sheet", () => {
    expect(bestUse("gmaw_mig_wire")).toBe("production_sheet_auto_body_fab");
  });
});

describe("arcWeldTypes", () => {
  it("returns 5 types", () => {
    expect(arcWeldTypes()).toHaveLength(5);
  });
});
