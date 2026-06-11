import { describe, it, expect } from "vitest";
import {
  resolution, adhesion, chemResist, thickness,
  maskCost, photoSensitive, forHdi, applyMethod,
  bestUse, pcbMasks,
} from "../pcb-mask-calc.js";

describe("resolution", () => {
  it("inkjet digital print best resolution", () => {
    expect(resolution("inkjet_digital_print")).toBeGreaterThan(resolution("screen_print_thermal"));
  });
});

describe("adhesion", () => {
  it("dry film laminate best adhesion", () => {
    expect(adhesion("dry_film_laminate")).toBeGreaterThan(adhesion("peelable_temp_mask"));
  });
});

describe("chemResist", () => {
  it("dry film laminate best chem resist", () => {
    expect(chemResist("dry_film_laminate")).toBeGreaterThan(chemResist("peelable_temp_mask"));
  });
});

describe("thickness", () => {
  it("inkjet digital print best thickness control", () => {
    expect(thickness("inkjet_digital_print")).toBeGreaterThan(thickness("peelable_temp_mask"));
  });
});

describe("maskCost", () => {
  it("inkjet digital print most expensive", () => {
    expect(maskCost("inkjet_digital_print")).toBeGreaterThan(maskCost("screen_print_thermal"));
  });
});

describe("photoSensitive", () => {
  it("liquid photo imageable is photo sensitive", () => {
    expect(photoSensitive("liquid_photo_imageable")).toBe(true);
  });
  it("screen print thermal not photo sensitive", () => {
    expect(photoSensitive("screen_print_thermal")).toBe(false);
  });
});

describe("forHdi", () => {
  it("liquid photo imageable is for hdi", () => {
    expect(forHdi("liquid_photo_imageable")).toBe(true);
  });
  it("dry film laminate not for hdi", () => {
    expect(forHdi("dry_film_laminate")).toBe(false);
  });
});

describe("applyMethod", () => {
  it("inkjet digital print uses digital inkjet uv cure", () => {
    expect(applyMethod("inkjet_digital_print")).toBe("digital_inkjet_uv_cure");
  });
});

describe("bestUse", () => {
  it("liquid photo imageable best for standard multilayer pcb", () => {
    expect(bestUse("liquid_photo_imageable")).toBe("standard_multilayer_pcb");
  });
});

describe("pcbMasks", () => {
  it("returns 5 types", () => {
    expect(pcbMasks()).toHaveLength(5);
  });
});
