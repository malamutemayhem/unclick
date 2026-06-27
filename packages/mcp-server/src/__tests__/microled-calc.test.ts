import { describe, it, expect } from "vitest";
import {
  brightness, pixelDensity, efficiency, yield_,
  mlCost, fullColor, forAr, process,
  bestUse, microLeds,
} from "../microled-calc.js";

describe("brightness", () => {
  it("vertical nanorod brightest", () => {
    expect(brightness("vertical_nanorod")).toBeGreaterThan(brightness("color_convert_qd"));
  });
});

describe("pixelDensity", () => {
  it("monolithic gan highest pixel density", () => {
    expect(pixelDensity("monolithic_gan_on_si")).toBeGreaterThan(pixelDensity("laser_lift_selective"));
  });
});

describe("efficiency", () => {
  it("vertical nanorod most efficient", () => {
    expect(efficiency("vertical_nanorod")).toBeGreaterThan(efficiency("color_convert_qd"));
  });
});

describe("yield_", () => {
  it("laser lift highest yield", () => {
    expect(yield_("laser_lift_selective")).toBeGreaterThan(yield_("vertical_nanorod"));
  });
});

describe("mlCost", () => {
  it("vertical nanorod most expensive", () => {
    expect(mlCost("vertical_nanorod")).toBeGreaterThan(mlCost("laser_lift_selective"));
  });
});

describe("fullColor", () => {
  it("mass transfer is full color", () => {
    expect(fullColor("mass_transfer_stamp")).toBe(true);
  });
  it("monolithic gan not full color", () => {
    expect(fullColor("monolithic_gan_on_si")).toBe(false);
  });
});

describe("forAr", () => {
  it("monolithic gan for ar", () => {
    expect(forAr("monolithic_gan_on_si")).toBe(true);
  });
  it("mass transfer not for ar", () => {
    expect(forAr("mass_transfer_stamp")).toBe(false);
  });
});

describe("process", () => {
  it("color convert uses blue led qd photoresist", () => {
    expect(process("color_convert_qd")).toBe("blue_led_qd_photoresist_layer");
  });
});

describe("bestUse", () => {
  it("monolithic gan best for ar glasses", () => {
    expect(bestUse("monolithic_gan_on_si")).toBe("ar_glasses_near_eye_display");
  });
});

describe("microLeds", () => {
  it("returns 5 types", () => {
    expect(microLeds()).toHaveLength(5);
  });
});
