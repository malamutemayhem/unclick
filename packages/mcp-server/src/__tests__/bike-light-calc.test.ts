import { describe, it, expect } from "vitest";
import {
  brightness, runtime, visibility, mountEase,
  lightCost, weatherproof, needsCharging, powerSource,
  bestRide, bikeLights,
} from "../bike-light-calc.js";

describe("brightness", () => {
  it("front usb rechargeable brightest", () => {
    expect(brightness("front_usb_rechargeable")).toBeGreaterThan(brightness("spoke_wheel"));
  });
});

describe("runtime", () => {
  it("dynamo hub longest runtime", () => {
    expect(runtime("dynamo_hub")).toBeGreaterThan(runtime("helmet_mount"));
  });
});

describe("visibility", () => {
  it("rear tail flash best visibility", () => {
    expect(visibility("rear_tail_flash")).toBeGreaterThan(visibility("spoke_wheel"));
  });
});

describe("mountEase", () => {
  it("rear tail flash easiest mount", () => {
    expect(mountEase("rear_tail_flash")).toBeGreaterThan(mountEase("dynamo_hub"));
  });
});

describe("lightCost", () => {
  it("dynamo hub most expensive", () => {
    expect(lightCost("dynamo_hub")).toBeGreaterThan(lightCost("rear_tail_flash"));
  });
});

describe("weatherproof", () => {
  it("dynamo hub is weatherproof", () => {
    expect(weatherproof("dynamo_hub")).toBe(true);
  });
  it("helmet mount is not", () => {
    expect(weatherproof("helmet_mount")).toBe(false);
  });
});

describe("needsCharging", () => {
  it("front usb rechargeable needs charging", () => {
    expect(needsCharging("front_usb_rechargeable")).toBe(true);
  });
  it("dynamo hub does not", () => {
    expect(needsCharging("dynamo_hub")).toBe(false);
  });
});

describe("powerSource", () => {
  it("dynamo hub uses hub generator magnetic", () => {
    expect(powerSource("dynamo_hub")).toBe("hub_generator_magnetic");
  });
});

describe("bestRide", () => {
  it("dynamo hub for long distance touring", () => {
    expect(bestRide("dynamo_hub")).toBe("long_distance_touring");
  });
});

describe("bikeLights", () => {
  it("returns 5 types", () => {
    expect(bikeLights()).toHaveLength(5);
  });
});
