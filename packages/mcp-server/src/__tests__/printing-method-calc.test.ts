import { describe, it, expect } from "vitest";
import {
  detail, speed, colorRange, handfeel,
  pmCost, digital, forSmallRun, application,
  bestUse, printingMethodTypes,
} from "../printing-method-calc.js";

describe("detail", () => {
  it("digital inkjet best detail", () => {
    expect(detail("digital_inkjet_dtg")).toBeGreaterThan(detail("block_print_hand"));
  });
});

describe("speed", () => {
  it("screen print fastest", () => {
    expect(speed("screen_print_rotary")).toBeGreaterThan(speed("block_print_hand"));
  });
});

describe("colorRange", () => {
  it("digital inkjet widest color range", () => {
    expect(colorRange("digital_inkjet_dtg")).toBeGreaterThan(colorRange("discharge_print_bleach"));
  });
});

describe("handfeel", () => {
  it("sublimation best handfeel", () => {
    expect(handfeel("sublimation_transfer")).toBeGreaterThan(handfeel("screen_print_rotary"));
  });
});

describe("pmCost", () => {
  it("block print most expensive", () => {
    expect(pmCost("block_print_hand")).toBeGreaterThan(pmCost("screen_print_rotary"));
  });
});

describe("digital", () => {
  it("digital inkjet is digital", () => {
    expect(digital("digital_inkjet_dtg")).toBe(true);
  });
  it("screen print not digital", () => {
    expect(digital("screen_print_rotary")).toBe(false);
  });
});

describe("forSmallRun", () => {
  it("digital inkjet for small run", () => {
    expect(forSmallRun("digital_inkjet_dtg")).toBe(true);
  });
  it("screen print not for small run", () => {
    expect(forSmallRun("screen_print_rotary")).toBe(false);
  });
});

describe("application", () => {
  it("sublimation uses heat transfer dye gas phase", () => {
    expect(application("sublimation_transfer")).toBe("heat_transfer_dye_gas_phase");
  });
});

describe("bestUse", () => {
  it("discharge print best for soft hand dark tshirt", () => {
    expect(bestUse("discharge_print_bleach")).toBe("soft_hand_dark_ground_tshirt");
  });
});

describe("printingMethodTypes", () => {
  it("returns 5 types", () => {
    expect(printingMethodTypes()).toHaveLength(5);
  });
});
