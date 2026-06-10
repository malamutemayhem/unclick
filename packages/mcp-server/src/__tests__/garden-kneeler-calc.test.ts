import { describe, it, expect } from "vitest";
import {
  kneeComfort, backSupport, portability, durability,
  kneelerCost, dualPurpose, waterproof, cushionType,
  bestGardener, gardenKneelers,
} from "../garden-kneeler-calc.js";

describe("kneeComfort", () => {
  it("memory foam thick most comfortable", () => {
    expect(kneeComfort("memory_foam_thick")).toBeGreaterThan(kneeComfort("foam_pad_basic"));
  });
});

describe("backSupport", () => {
  it("rolling cart seat best back support", () => {
    expect(backSupport("rolling_cart_seat")).toBeGreaterThan(backSupport("foam_pad_basic"));
  });
});

describe("portability", () => {
  it("foam pad basic most portable", () => {
    expect(portability("foam_pad_basic")).toBeGreaterThan(portability("rolling_cart_seat"));
  });
});

describe("durability", () => {
  it("rolling cart seat most durable", () => {
    expect(durability("rolling_cart_seat")).toBeGreaterThan(durability("foam_pad_basic"));
  });
});

describe("kneelerCost", () => {
  it("rolling cart seat most expensive", () => {
    expect(kneelerCost("rolling_cart_seat")).toBeGreaterThan(kneelerCost("foam_pad_basic"));
  });
});

describe("dualPurpose", () => {
  it("seat stool combo is dual purpose", () => {
    expect(dualPurpose("seat_stool_combo")).toBe(true);
  });
  it("foam pad basic is not", () => {
    expect(dualPurpose("foam_pad_basic")).toBe(false);
  });
});

describe("waterproof", () => {
  it("waterproof neoprene is waterproof", () => {
    expect(waterproof("waterproof_neoprene")).toBe(true);
  });
  it("memory foam thick is not", () => {
    expect(waterproof("memory_foam_thick")).toBe(false);
  });
});

describe("cushionType", () => {
  it("memory foam thick uses viscoelastic contour", () => {
    expect(cushionType("memory_foam_thick")).toBe("viscoelastic_contour");
  });
});

describe("bestGardener", () => {
  it("seat stool combo best for senior mobility ease", () => {
    expect(bestGardener("seat_stool_combo")).toBe("senior_mobility_ease");
  });
});

describe("gardenKneelers", () => {
  it("returns 5 types", () => {
    expect(gardenKneelers()).toHaveLength(5);
  });
});
