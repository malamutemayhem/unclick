import { describe, it, expect } from "vitest";
import {
  crispness, controlEase, surfaceSafe, durability,
  rollerCost, heated, nonMarking, rollerMaterial,
  bestUse, edgeRollers,
} from "../edge-roller-calc.js";

describe("crispness", () => {
  it("steel creaser heat crispest", () => {
    expect(crispness("steel_creaser_heat")).toBeGreaterThan(crispness("nylon_roller_soft"));
  });
});

describe("controlEase", () => {
  it("nylon roller soft easiest control", () => {
    expect(controlEase("nylon_roller_soft")).toBeGreaterThan(controlEase("steel_creaser_heat"));
  });
});

describe("surfaceSafe", () => {
  it("teflon bone press safest surface", () => {
    expect(surfaceSafe("teflon_bone_press")).toBeGreaterThan(surfaceSafe("steel_creaser_heat"));
  });
});

describe("durability", () => {
  it("brass wheel smooth most durable", () => {
    expect(durability("brass_wheel_smooth")).toBeGreaterThan(durability("nylon_roller_soft"));
  });
});

describe("rollerCost", () => {
  it("steel creaser heat most expensive", () => {
    expect(rollerCost("steel_creaser_heat")).toBeGreaterThan(rollerCost("nylon_roller_soft"));
  });
});

describe("heated", () => {
  it("steel creaser heat is heated", () => {
    expect(heated("steel_creaser_heat")).toBe(true);
  });
  it("brass wheel smooth not heated", () => {
    expect(heated("brass_wheel_smooth")).toBe(false);
  });
});

describe("nonMarking", () => {
  it("teflon bone press is non marking", () => {
    expect(nonMarking("teflon_bone_press")).toBe(true);
  });
  it("brass wheel smooth not non marking", () => {
    expect(nonMarking("brass_wheel_smooth")).toBe(false);
  });
});

describe("rollerMaterial", () => {
  it("brass wheel smooth uses solid brass turned", () => {
    expect(rollerMaterial("brass_wheel_smooth")).toBe("solid_brass_turned");
  });
});

describe("bestUse", () => {
  it("steel creaser heat best for heated edge line", () => {
    expect(bestUse("steel_creaser_heat")).toBe("heated_edge_line");
  });
});

describe("edgeRollers", () => {
  it("returns 5 types", () => {
    expect(edgeRollers()).toHaveLength(5);
  });
});
