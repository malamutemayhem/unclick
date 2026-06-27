import { describe, it, expect } from "vitest";
import {
  reduction, capacity, fines, wearLife,
  crCost, cubicProduct, forPrimary, mechanism,
  bestUse, crusherTypes,
} from "../crusher-type-calc.js";

describe("reduction", () => {
  it("impact highest reduction", () => {
    expect(reduction("impact_horizontal_shaft")).toBeGreaterThan(reduction("roll_double_smooth"));
  });
});

describe("capacity", () => {
  it("cone highest capacity", () => {
    expect(capacity("cone_secondary_gyrate")).toBeGreaterThan(capacity("roll_double_smooth"));
  });
});

describe("fines", () => {
  it("vsi produces most fines", () => {
    expect(fines("vsi_vertical_shaft_impact")).toBeGreaterThan(fines("roll_double_smooth"));
  });
});

describe("wearLife", () => {
  it("cone longest wear life", () => {
    expect(wearLife("cone_secondary_gyrate")).toBeGreaterThan(wearLife("impact_horizontal_shaft"));
  });
});

describe("crCost", () => {
  it("cone most expensive", () => {
    expect(crCost("cone_secondary_gyrate")).toBeGreaterThan(crCost("jaw_primary_toggle"));
  });
});

describe("cubicProduct", () => {
  it("cone produces cubic product", () => {
    expect(cubicProduct("cone_secondary_gyrate")).toBe(true);
  });
  it("jaw does not produce cubic", () => {
    expect(cubicProduct("jaw_primary_toggle")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("jaw for primary", () => {
    expect(forPrimary("jaw_primary_toggle")).toBe(true);
  });
  it("cone not for primary", () => {
    expect(forPrimary("cone_secondary_gyrate")).toBe(false);
  });
});

describe("mechanism", () => {
  it("vsi uses rotor rock on rock", () => {
    expect(mechanism("vsi_vertical_shaft_impact")).toBe("rotor_rock_on_rock_anvil");
  });
});

describe("bestUse", () => {
  it("roll best for coal salt friable", () => {
    expect(bestUse("roll_double_smooth")).toBe("coal_salt_friable_material");
  });
});

describe("crusherTypes", () => {
  it("returns 5 types", () => {
    expect(crusherTypes()).toHaveLength(5);
  });
});
