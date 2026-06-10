import { describe, it, expect } from "vitest";
import {
  outletCount, surgeRating, usbPorts, portability,
  stripCost, individualSwitch, flatPlug, formFactor,
  bestSetup, powerStrips,
} from "../power-strip-calc.js";

describe("outletCount", () => {
  it("surge protector 12 most outlets", () => {
    expect(outletCount("surge_protector_12")).toBeGreaterThan(outletCount("travel_international"));
  });
});

describe("surgeRating", () => {
  it("surge protector 12 best surge rating", () => {
    expect(surgeRating("surge_protector_12")).toBeGreaterThan(surgeRating("basic_6_outlet"));
  });
});

describe("usbPorts", () => {
  it("tower vertical most usb ports", () => {
    expect(usbPorts("tower_vertical")).toBeGreaterThan(usbPorts("basic_6_outlet"));
  });
});

describe("portability", () => {
  it("travel international most portable", () => {
    expect(portability("travel_international")).toBeGreaterThan(portability("under_desk_clamp"));
  });
});

describe("stripCost", () => {
  it("under desk clamp most expensive", () => {
    expect(stripCost("under_desk_clamp")).toBeGreaterThan(stripCost("basic_6_outlet"));
  });
});

describe("individualSwitch", () => {
  it("surge protector 12 has individual switch", () => {
    expect(individualSwitch("surge_protector_12")).toBe(true);
  });
  it("basic 6 outlet does not", () => {
    expect(individualSwitch("basic_6_outlet")).toBe(false);
  });
});

describe("flatPlug", () => {
  it("travel international has flat plug", () => {
    expect(flatPlug("travel_international")).toBe(true);
  });
  it("tower vertical does not", () => {
    expect(flatPlug("tower_vertical")).toBe(false);
  });
});

describe("formFactor", () => {
  it("tower vertical uses vertical stack rotating", () => {
    expect(formFactor("tower_vertical")).toBe("vertical_stack_rotating");
  });
});

describe("bestSetup", () => {
  it("surge protector 12 for home theater pc setup", () => {
    expect(bestSetup("surge_protector_12")).toBe("home_theater_pc_setup");
  });
});

describe("powerStrips", () => {
  it("returns 5 types", () => {
    expect(powerStrips()).toHaveLength(5);
  });
});
