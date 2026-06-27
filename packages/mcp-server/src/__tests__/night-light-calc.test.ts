import { describe, it, expect } from "vitest";
import {
  brightness, sleepFriendly, energyUse, ambiance,
  lightCost, autoOnOff, cordless, lightSource,
  bestRoom, nightLights,
} from "../night-light-calc.js";

describe("brightness", () => {
  it("motion sensor brightest", () => {
    expect(brightness("motion_sensor")).toBeGreaterThan(brightness("salt_lamp_warm"));
  });
});

describe("sleepFriendly", () => {
  it("salt lamp warm most sleep friendly", () => {
    expect(sleepFriendly("salt_lamp_warm")).toBeGreaterThan(sleepFriendly("projector_star"));
  });
});

describe("energyUse", () => {
  it("motion sensor lowest energy use", () => {
    expect(energyUse("motion_sensor")).toBeGreaterThan(energyUse("salt_lamp_warm"));
  });
});

describe("ambiance", () => {
  it("projector star best ambiance", () => {
    expect(ambiance("projector_star")).toBeGreaterThan(ambiance("plug_in_led"));
  });
});

describe("lightCost", () => {
  it("salt lamp warm most expensive", () => {
    expect(lightCost("salt_lamp_warm")).toBeGreaterThan(lightCost("plug_in_led"));
  });
});

describe("autoOnOff", () => {
  it("plug in led auto on off", () => {
    expect(autoOnOff("plug_in_led")).toBe(true);
  });
  it("projector star does not", () => {
    expect(autoOnOff("projector_star")).toBe(false);
  });
});

describe("cordless", () => {
  it("rechargeable portable is cordless", () => {
    expect(cordless("rechargeable_portable")).toBe(true);
  });
  it("plug in led is not", () => {
    expect(cordless("plug_in_led")).toBe(false);
  });
});

describe("lightSource", () => {
  it("salt lamp warm uses himalayan salt bulb", () => {
    expect(lightSource("salt_lamp_warm")).toBe("himalayan_salt_bulb");
  });
});

describe("bestRoom", () => {
  it("projector star best for kids bedroom ceiling", () => {
    expect(bestRoom("projector_star")).toBe("kids_bedroom_ceiling");
  });
});

describe("nightLights", () => {
  it("returns 5 types", () => {
    expect(nightLights()).toHaveLength(5);
  });
});
