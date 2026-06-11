import { describe, it, expect } from "vitest";
import {
  capacity, reductionRatio, productShape, wear,
  icCost, cubicProduct, forSoft, rotor,
  bestUse, impactCrusherTypes,
} from "../impact-crusher-calc.js";

describe("capacity", () => {
  it("horizontal shaft highest capacity", () => {
    expect(capacity("horizontal_shaft_primary")).toBeGreaterThan(capacity("cage_mill_fine"));
  });
});

describe("reductionRatio", () => {
  it("cage mill highest reduction ratio", () => {
    expect(reductionRatio("cage_mill_fine")).toBeGreaterThan(reductionRatio("autogenous_rock_on_rock"));
  });
});

describe("productShape", () => {
  it("vsi best product shape", () => {
    expect(productShape("vertical_shaft_vsi")).toBeGreaterThan(productShape("cage_mill_fine"));
  });
});

describe("wear", () => {
  it("autogenous best wear resistance", () => {
    expect(wear("autogenous_rock_on_rock")).toBeGreaterThan(wear("cage_mill_fine"));
  });
});

describe("icCost", () => {
  it("vsi most expensive", () => {
    expect(icCost("vertical_shaft_vsi")).toBeGreaterThan(icCost("autogenous_rock_on_rock"));
  });
});

describe("cubicProduct", () => {
  it("vsi produces cubic product", () => {
    expect(cubicProduct("vertical_shaft_vsi")).toBe(true);
  });
  it("cage mill not cubic product", () => {
    expect(cubicProduct("cage_mill_fine")).toBe(false);
  });
});

describe("forSoft", () => {
  it("cage mill for soft material", () => {
    expect(forSoft("cage_mill_fine")).toBe(true);
  });
  it("horizontal shaft not for soft only", () => {
    expect(forSoft("horizontal_shaft_primary")).toBe(false);
  });
});

describe("rotor", () => {
  it("rotor impactor uses heavy duty rebar tolerant", () => {
    expect(rotor("rotor_impactor_recycle")).toBe("heavy_duty_rotor_rebar_tolerant");
  });
});

describe("bestUse", () => {
  it("vsi for manufactured sand", () => {
    expect(bestUse("vertical_shaft_vsi")).toBe("manufactured_sand_cubic_aggregate_shape");
  });
});

describe("impactCrusherTypes", () => {
  it("returns 5 types", () => {
    expect(impactCrusherTypes()).toHaveLength(5);
  });
});
