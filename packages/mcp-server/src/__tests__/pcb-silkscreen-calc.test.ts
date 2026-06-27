import { describe, it, expect } from "vitest";
import {
  resolution, adhesion, contrast, speed,
  printCost, digital, forFinePitch, inkType,
  bestUse, pcbSilkscreens,
} from "../pcb-silkscreen-calc.js";

describe("resolution", () => {
  it("inkjet direct print best resolution", () => {
    expect(resolution("inkjet_direct_print")).toBeGreaterThan(resolution("manual_screen_print"));
  });
});

describe("adhesion", () => {
  it("laser mark engrave best adhesion", () => {
    expect(adhesion("laser_mark_engrave")).toBeGreaterThan(adhesion("thermal_transfer_ribbon"));
  });
});

describe("contrast", () => {
  it("inkjet direct print best contrast", () => {
    expect(contrast("inkjet_direct_print")).toBeGreaterThan(contrast("thermal_transfer_ribbon"));
  });
});

describe("speed", () => {
  it("thermal transfer ribbon fastest", () => {
    expect(speed("thermal_transfer_ribbon")).toBeGreaterThan(speed("liquid_photo_image"));
  });
});

describe("printCost", () => {
  it("laser mark engrave most expensive", () => {
    expect(printCost("laser_mark_engrave")).toBeGreaterThan(printCost("thermal_transfer_ribbon"));
  });
});

describe("digital", () => {
  it("inkjet direct print is digital", () => {
    expect(digital("inkjet_direct_print")).toBe(true);
  });
  it("manual screen print not digital", () => {
    expect(digital("manual_screen_print")).toBe(false);
  });
});

describe("forFinePitch", () => {
  it("liquid photo image is for fine pitch", () => {
    expect(forFinePitch("liquid_photo_image")).toBe(true);
  });
  it("manual screen print not for fine pitch", () => {
    expect(forFinePitch("manual_screen_print")).toBe(false);
  });
});

describe("inkType", () => {
  it("laser mark engrave uses none ablation", () => {
    expect(inkType("laser_mark_engrave")).toBe("none_ablation");
  });
});

describe("bestUse", () => {
  it("inkjet direct print best for prototype variable data", () => {
    expect(bestUse("inkjet_direct_print")).toBe("prototype_variable_data");
  });
});

describe("pcbSilkscreens", () => {
  it("returns 5 types", () => {
    expect(pcbSilkscreens()).toHaveLength(5);
  });
});
