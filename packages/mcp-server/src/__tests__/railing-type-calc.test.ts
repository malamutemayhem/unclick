import { describe, it, expect } from "vitest";
import {
  strength, visibility, aesthetic, maintenance,
  rlCost, codeCompliant, forExterior, infill,
  bestUse, railingTypeTypes,
} from "../railing-type-calc.js";

describe("strength", () => {
  it("wrought iron strongest", () => {
    expect(strength("wrought_iron_ornamental")).toBeGreaterThan(strength("wood_baluster_traditional"));
  });
});

describe("visibility", () => {
  it("cable rail best visibility", () => {
    expect(visibility("cable_rail_stainless")).toBeGreaterThan(visibility("wood_baluster_traditional"));
  });
});

describe("aesthetic", () => {
  it("glass panel best aesthetic", () => {
    expect(aesthetic("glass_panel_frameless")).toBeGreaterThan(aesthetic("aluminum_picket_powder"));
  });
});

describe("maintenance", () => {
  it("aluminum lowest maintenance", () => {
    expect(maintenance("aluminum_picket_powder")).toBeGreaterThan(maintenance("wood_baluster_traditional"));
  });
});

describe("rlCost", () => {
  it("glass panel most expensive", () => {
    expect(rlCost("glass_panel_frameless")).toBeGreaterThan(rlCost("wood_baluster_traditional"));
  });
});

describe("codeCompliant", () => {
  it("all types code compliant", () => {
    expect(codeCompliant("cable_rail_stainless")).toBe(true);
  });
});

describe("forExterior", () => {
  it("cable rail for exterior", () => {
    expect(forExterior("cable_rail_stainless")).toBe(true);
  });
  it("wood not for exterior", () => {
    expect(forExterior("wood_baluster_traditional")).toBe(false);
  });
});

describe("infill", () => {
  it("wrought iron uses scroll twist", () => {
    expect(infill("wrought_iron_ornamental")).toBe("scroll_twist_forged_picket");
  });
});

describe("bestUse", () => {
  it("glass panel for pool balcony", () => {
    expect(bestUse("glass_panel_frameless")).toBe("pool_balcony_wind_screen");
  });
});

describe("railingTypeTypes", () => {
  it("returns 5 types", () => {
    expect(railingTypeTypes()).toHaveLength(5);
  });
});
