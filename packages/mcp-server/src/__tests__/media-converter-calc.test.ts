import { describe, it, expect } from "vitest";
import {
  speed, reliability, flexibility, distance,
  mcCost, managed, forOutdoor, interface_,
  bestUse, mediaConverterTypes,
} from "../media-converter-calc.js";

describe("speed", () => {
  it("10gbe fastest", () => {
    expect(speed("copper_to_fiber_10gbe")).toBeGreaterThan(speed("copper_to_fiber_gbe"));
  });
});

describe("reliability", () => {
  it("chassis most reliable", () => {
    expect(reliability("managed_chassis_modular")).toBeGreaterThan(reliability("copper_to_fiber_gbe"));
  });
});

describe("flexibility", () => {
  it("chassis most flexible", () => {
    expect(flexibility("managed_chassis_modular")).toBeGreaterThan(flexibility("copper_to_fiber_gbe"));
  });
});

describe("distance", () => {
  it("10gbe longest distance", () => {
    expect(distance("copper_to_fiber_10gbe")).toBeGreaterThan(distance("copper_to_fiber_gbe"));
  });
});

describe("mcCost", () => {
  it("chassis most expensive", () => {
    expect(mcCost("managed_chassis_modular")).toBeGreaterThan(mcCost("copper_to_fiber_gbe"));
  });
});

describe("managed", () => {
  it("chassis is managed", () => {
    expect(managed("managed_chassis_modular")).toBe(true);
  });
  it("gbe not managed", () => {
    expect(managed("copper_to_fiber_gbe")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("industrial for outdoor", () => {
    expect(forOutdoor("industrial_hardened")).toBe(true);
  });
  it("10gbe not outdoor", () => {
    expect(forOutdoor("copper_to_fiber_10gbe")).toBe(false);
  });
});

describe("interface_", () => {
  it("industrial uses din rail", () => {
    expect(interface_("industrial_hardened")).toBe("din_rail_ip40_wide_temp_fiber");
  });
});

describe("bestUse", () => {
  it("poe for remote camera", () => {
    expect(bestUse("poe_media_converter")).toBe("remote_ip_camera_fiber_fed");
  });
});

describe("mediaConverterTypes", () => {
  it("returns 5 types", () => {
    expect(mediaConverterTypes()).toHaveLength(5);
  });
});
