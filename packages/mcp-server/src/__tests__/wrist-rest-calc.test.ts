import { describe, it, expect } from "vitest";
import {
  comfort, support, durability, coolTouch,
  restCost, nonSlip, machineWash, restMaterial,
  bestSetup, wristRests,
} from "../wrist-rest-calc.js";

describe("comfort", () => {
  it("ergonomic split angle most comfortable", () => {
    expect(comfort("ergonomic_split_angle")).toBeGreaterThan(comfort("wooden_palm_raise"));
  });
});

describe("support", () => {
  it("ergonomic split angle best support", () => {
    expect(support("ergonomic_split_angle")).toBeGreaterThan(support("leather_padded_roll"));
  });
});

describe("durability", () => {
  it("wooden palm raise most durable", () => {
    expect(durability("wooden_palm_raise")).toBeGreaterThan(durability("gel_filled_cool"));
  });
});

describe("coolTouch", () => {
  it("gel filled cool coolest touch", () => {
    expect(coolTouch("gel_filled_cool")).toBeGreaterThan(coolTouch("memory_foam_keyboard"));
  });
});

describe("restCost", () => {
  it("ergonomic split angle most expensive", () => {
    expect(restCost("ergonomic_split_angle")).toBeGreaterThan(restCost("memory_foam_keyboard"));
  });
});

describe("nonSlip", () => {
  it("memory foam keyboard is non slip", () => {
    expect(nonSlip("memory_foam_keyboard")).toBe(true);
  });
  it("leather padded roll is not", () => {
    expect(nonSlip("leather_padded_roll")).toBe(false);
  });
});

describe("machineWash", () => {
  it("memory foam keyboard is machine washable", () => {
    expect(machineWash("memory_foam_keyboard")).toBe(true);
  });
  it("gel filled cool is not", () => {
    expect(machineWash("gel_filled_cool")).toBe(false);
  });
});

describe("restMaterial", () => {
  it("wooden palm raise uses walnut hardwood contour", () => {
    expect(restMaterial("wooden_palm_raise")).toBe("walnut_hardwood_contour");
  });
});

describe("bestSetup", () => {
  it("ergonomic split angle best for ergonomic split keyboard", () => {
    expect(bestSetup("ergonomic_split_angle")).toBe("ergonomic_split_keyboard");
  });
});

describe("wristRests", () => {
  it("returns 5 types", () => {
    expect(wristRests()).toHaveLength(5);
  });
});
