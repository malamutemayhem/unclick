import { describe, it, expect } from "vitest";
import {
  durability, poleWeight, packability, jointStability,
  poleCost, adjustable, snowBasket, lockType,
  bestActivity, trekkingPoles,
} from "../trekking-pole-calc.js";

describe("durability", () => {
  it("aluminum telescoping most durable", () => {
    expect(durability("aluminum_telescoping")).toBeGreaterThan(durability("ultralight_z_pole"));
  });
});

describe("poleWeight", () => {
  it("ultralight z pole lightest", () => {
    expect(poleWeight("ultralight_z_pole")).toBeGreaterThan(poleWeight("ski_touring_dual"));
  });
});

describe("packability", () => {
  it("ultralight z pole most packable", () => {
    expect(packability("ultralight_z_pole")).toBeGreaterThan(packability("shock_absorbing"));
  });
});

describe("jointStability", () => {
  it("ski touring dual most joint stability", () => {
    expect(jointStability("ski_touring_dual")).toBeGreaterThan(jointStability("ultralight_z_pole"));
  });
});

describe("poleCost", () => {
  it("ski touring dual most expensive", () => {
    expect(poleCost("ski_touring_dual")).toBeGreaterThan(poleCost("aluminum_telescoping"));
  });
});

describe("adjustable", () => {
  it("aluminum telescoping is adjustable", () => {
    expect(adjustable("aluminum_telescoping")).toBe(true);
  });
  it("carbon fiber folding is not", () => {
    expect(adjustable("carbon_fiber_folding")).toBe(false);
  });
});

describe("snowBasket", () => {
  it("ski touring dual has snow basket", () => {
    expect(snowBasket("ski_touring_dual")).toBe(true);
  });
  it("aluminum telescoping does not", () => {
    expect(snowBasket("aluminum_telescoping")).toBe(false);
  });
});

describe("lockType", () => {
  it("ultralight z pole uses cord tension fixed", () => {
    expect(lockType("ultralight_z_pole")).toBe("cord_tension_fixed");
  });
});

describe("bestActivity", () => {
  it("ski touring dual for backcountry skiing snowshoe", () => {
    expect(bestActivity("ski_touring_dual")).toBe("backcountry_skiing_snowshoe");
  });
});

describe("trekkingPoles", () => {
  it("returns 5 types", () => {
    expect(trekkingPoles()).toHaveLength(5);
  });
});
