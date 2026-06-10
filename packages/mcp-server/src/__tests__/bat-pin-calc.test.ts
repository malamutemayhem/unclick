import { describe, it, expect } from "vitest";
import {
  holdStrength, easeOfRemove, centering, durability,
  pinCost, toolFree, universal, pinMaterial,
  bestUse, batPins,
} from "../bat-pin-calc.js";

describe("holdStrength", () => {
  it("magnetic disc hold strongest hold", () => {
    expect(holdStrength("magnetic_disc_hold")).toBeGreaterThan(holdStrength("wood_dowel_press"));
  });
});

describe("easeOfRemove", () => {
  it("magnetic disc hold easiest remove", () => {
    expect(easeOfRemove("magnetic_disc_hold")).toBeGreaterThan(easeOfRemove("wood_dowel_press"));
  });
});

describe("centering", () => {
  it("metal pin standard best centering", () => {
    expect(centering("metal_pin_standard")).toBeGreaterThan(centering("rubber_grip_stick"));
  });
});

describe("durability", () => {
  it("metal pin standard most durable", () => {
    expect(durability("metal_pin_standard")).toBeGreaterThan(durability("rubber_grip_stick"));
  });
});

describe("pinCost", () => {
  it("magnetic disc hold most expensive", () => {
    expect(pinCost("magnetic_disc_hold")).toBeGreaterThan(pinCost("metal_pin_standard"));
  });
});

describe("toolFree", () => {
  it("plastic tab snap is tool free", () => {
    expect(toolFree("plastic_tab_snap")).toBe(true);
  });
  it("metal pin standard not tool free", () => {
    expect(toolFree("metal_pin_standard")).toBe(false);
  });
});

describe("universal", () => {
  it("metal pin standard is universal", () => {
    expect(universal("metal_pin_standard")).toBe(true);
  });
  it("plastic tab snap not universal", () => {
    expect(universal("plastic_tab_snap")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("metal pin standard uses stainless steel rod", () => {
    expect(pinMaterial("metal_pin_standard")).toBe("stainless_steel_rod");
  });
});

describe("bestUse", () => {
  it("magnetic disc hold best for instant attach release", () => {
    expect(bestUse("magnetic_disc_hold")).toBe("instant_attach_release");
  });
});

describe("batPins", () => {
  it("returns 5 types", () => {
    expect(batPins()).toHaveLength(5);
  });
});
