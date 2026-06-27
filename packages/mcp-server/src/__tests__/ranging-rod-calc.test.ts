import { describe, it, expect } from "vitest";
import {
  visibility, portability, durability, straightness,
  rodCost, telescopic, conductive, rodMaterial,
  bestUse, rangingRods,
} from "../ranging-rod-calc.js";

describe("visibility", () => {
  it("wood painted stripe most visible", () => {
    expect(visibility("wood_painted_stripe")).toBeGreaterThan(visibility("carbon_fiber_ultra"));
  });
});

describe("portability", () => {
  it("carbon fiber ultra most portable", () => {
    expect(portability("carbon_fiber_ultra")).toBeGreaterThan(portability("wood_painted_stripe"));
  });
});

describe("durability", () => {
  it("steel telescopic fold most durable", () => {
    expect(durability("steel_telescopic_fold")).toBeGreaterThan(durability("wood_painted_stripe"));
  });
});

describe("straightness", () => {
  it("carbon fiber ultra straightest", () => {
    expect(straightness("carbon_fiber_ultra")).toBeGreaterThan(straightness("wood_painted_stripe"));
  });
});

describe("rodCost", () => {
  it("carbon fiber ultra most expensive", () => {
    expect(rodCost("carbon_fiber_ultra")).toBeGreaterThan(rodCost("wood_painted_stripe"));
  });
});

describe("telescopic", () => {
  it("steel telescopic fold is telescopic", () => {
    expect(telescopic("steel_telescopic_fold")).toBe(true);
  });
  it("wood painted stripe not telescopic", () => {
    expect(telescopic("wood_painted_stripe")).toBe(false);
  });
});

describe("conductive", () => {
  it("steel telescopic fold is conductive", () => {
    expect(conductive("steel_telescopic_fold")).toBe(true);
  });
  it("fiberglass light flex not conductive", () => {
    expect(conductive("fiberglass_light_flex")).toBe(false);
  });
});

describe("rodMaterial", () => {
  it("fiberglass light flex uses fiberglass composite", () => {
    expect(rodMaterial("fiberglass_light_flex")).toBe("fiberglass_composite");
  });
});

describe("bestUse", () => {
  it("carbon fiber ultra best for precision geodetic", () => {
    expect(bestUse("carbon_fiber_ultra")).toBe("precision_geodetic");
  });
});

describe("rangingRods", () => {
  it("returns 5 types", () => {
    expect(rangingRods()).toHaveLength(5);
  });
});
