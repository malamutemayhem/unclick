import { describe, it, expect } from "vitest";
import {
  heatEvenness, portability, heatLevels, softness,
  blanketCost, machineWash, autoShutoff, heatingElement,
  bestUse, heatedBlankets,
} from "../heated-blanket-calc.js";

describe("heatEvenness", () => {
  it("heated mattress pad most even heat", () => {
    expect(heatEvenness("heated_mattress_pad")).toBeGreaterThan(heatEvenness("battery_cordless"));
  });
});

describe("portability", () => {
  it("battery cordless most portable", () => {
    expect(portability("battery_cordless")).toBeGreaterThan(portability("heated_mattress_pad"));
  });
});

describe("heatLevels", () => {
  it("electric wired most heat levels", () => {
    expect(heatLevels("electric_wired")).toBeGreaterThan(heatLevels("battery_cordless"));
  });
});

describe("softness", () => {
  it("weighted heated combo softest", () => {
    expect(softness("weighted_heated_combo")).toBeGreaterThan(softness("heated_mattress_pad"));
  });
});

describe("blanketCost", () => {
  it("weighted heated combo most expensive", () => {
    expect(blanketCost("weighted_heated_combo")).toBeGreaterThan(blanketCost("usb_powered_throw"));
  });
});

describe("machineWash", () => {
  it("electric wired is machine wash", () => {
    expect(machineWash("electric_wired")).toBe(true);
  });
  it("battery cordless is not", () => {
    expect(machineWash("battery_cordless")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("electric wired has auto shutoff", () => {
    expect(autoShutoff("electric_wired")).toBe(true);
  });
  it("usb powered throw does not", () => {
    expect(autoShutoff("usb_powered_throw")).toBe(false);
  });
});

describe("heatingElement", () => {
  it("weighted heated combo uses wire glass bead dual", () => {
    expect(heatingElement("weighted_heated_combo")).toBe("wire_glass_bead_dual");
  });
});

describe("bestUse", () => {
  it("battery cordless best for outdoor camping stadium", () => {
    expect(bestUse("battery_cordless")).toBe("outdoor_camping_stadium");
  });
});

describe("heatedBlankets", () => {
  it("returns 5 types", () => {
    expect(heatedBlankets()).toHaveLength(5);
  });
});
