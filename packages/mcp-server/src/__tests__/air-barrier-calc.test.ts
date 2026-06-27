import { describe, it, expect } from "vitest";
import {
  airTight, durability, moisture, installEase,
  abCost, seamless, forExterior, material,
  bestUse, airBarrierTypes,
} from "../air-barrier-calc.js";

describe("airTight", () => {
  it("fluid applied most airtight", () => {
    expect(airTight("fluid_applied_membrane_spray")).toBeGreaterThan(airTight("mechanically_fastened_wrap"));
  });
});

describe("durability", () => {
  it("self adhered most durable", () => {
    expect(durability("self_adhered_sheet_peel")).toBeGreaterThan(durability("mechanically_fastened_wrap"));
  });
});

describe("moisture", () => {
  it("self adhered best moisture resist", () => {
    expect(moisture("self_adhered_sheet_peel")).toBeGreaterThan(moisture("rigid_board_insulation_seal"));
  });
});

describe("installEase", () => {
  it("house wrap easiest install", () => {
    expect(installEase("mechanically_fastened_wrap")).toBeGreaterThan(installEase("spray_foam_closed_cell"));
  });
});

describe("abCost", () => {
  it("spray foam most expensive", () => {
    expect(abCost("spray_foam_closed_cell")).toBeGreaterThan(abCost("mechanically_fastened_wrap"));
  });
});

describe("seamless", () => {
  it("fluid applied is seamless", () => {
    expect(seamless("fluid_applied_membrane_spray")).toBe(true);
  });
  it("house wrap not seamless", () => {
    expect(seamless("mechanically_fastened_wrap")).toBe(false);
  });
});

describe("forExterior", () => {
  it("house wrap for exterior", () => {
    expect(forExterior("mechanically_fastened_wrap")).toBe(true);
  });
  it("spray foam not for exterior", () => {
    expect(forExterior("spray_foam_closed_cell")).toBe(false);
  });
});

describe("material", () => {
  it("spray foam uses polyurethane closed cell", () => {
    expect(material("spray_foam_closed_cell")).toBe("polyurethane_closed_cell_foam");
  });
});

describe("bestUse", () => {
  it("house wrap for residential wood frame", () => {
    expect(bestUse("mechanically_fastened_wrap")).toBe("residential_wood_frame_house_wrap");
  });
});

describe("airBarrierTypes", () => {
  it("returns 5 types", () => {
    expect(airBarrierTypes()).toHaveLength(5);
  });
});
