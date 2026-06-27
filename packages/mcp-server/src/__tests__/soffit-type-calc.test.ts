import { describe, it, expect } from "vitest";
import {
  ventilation, durability, aesthetic, maintenance,
  sfCost, vented, forCommercial, material,
  bestUse, soffitTypeTypes,
} from "../soffit-type-calc.js";

describe("ventilation", () => {
  it("aluminum best ventilation", () => {
    expect(ventilation("aluminum_continuous_vent")).toBeGreaterThan(ventilation("wood_tongue_groove"));
  });
});

describe("durability", () => {
  it("steel most durable", () => {
    expect(durability("steel_perforated_commercial")).toBeGreaterThan(durability("wood_tongue_groove"));
  });
});

describe("aesthetic", () => {
  it("wood best aesthetic", () => {
    expect(aesthetic("wood_tongue_groove")).toBeGreaterThan(aesthetic("vinyl_perforated_vented"));
  });
});

describe("maintenance", () => {
  it("vinyl lowest maintenance", () => {
    expect(maintenance("vinyl_perforated_vented")).toBeGreaterThan(maintenance("wood_tongue_groove"));
  });
});

describe("sfCost", () => {
  it("steel most expensive", () => {
    expect(sfCost("steel_perforated_commercial")).toBeGreaterThan(sfCost("vinyl_perforated_vented"));
  });
});

describe("vented", () => {
  it("vinyl is vented", () => {
    expect(vented("vinyl_perforated_vented")).toBe(true);
  });
  it("wood not vented", () => {
    expect(vented("wood_tongue_groove")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("aluminum for commercial", () => {
    expect(forCommercial("aluminum_continuous_vent")).toBe(true);
  });
  it("vinyl not for commercial", () => {
    expect(forCommercial("vinyl_perforated_vented")).toBe(false);
  });
});

describe("material", () => {
  it("fiber cement uses smooth primed", () => {
    expect(material("fiber_cement_smooth")).toBe("fiber_cement_smooth_primed");
  });
});

describe("bestUse", () => {
  it("wood for craftsman historic", () => {
    expect(bestUse("wood_tongue_groove")).toBe("craftsman_historic_exposed_eave");
  });
});

describe("soffitTypeTypes", () => {
  it("returns 5 types", () => {
    expect(soffitTypeTypes()).toHaveLength(5);
  });
});
