import { describe, it, expect } from "vitest";
import {
  spinSmooth, momentum, portability, surfaceGrip,
  wheelCost, ballBearing, nonSlipBase, wheelMaterial,
  bestUse, bandingWheels,
} from "../banding-wheel-calc.js";

describe("spinSmooth", () => {
  it("steel heavy smooth smoothest spin", () => {
    expect(spinSmooth("steel_heavy_smooth")).toBeGreaterThan(spinSmooth("plastic_basic_spin"));
  });
});

describe("momentum", () => {
  it("steel heavy smooth most momentum", () => {
    expect(momentum("steel_heavy_smooth")).toBeGreaterThan(momentum("aluminum_light_fast"));
  });
});

describe("portability", () => {
  it("plastic basic spin most portable", () => {
    expect(portability("plastic_basic_spin")).toBeGreaterThan(portability("cast_iron_pro"));
  });
});

describe("surfaceGrip", () => {
  it("wood craft turn best surface grip", () => {
    expect(surfaceGrip("wood_craft_turn")).toBeGreaterThan(surfaceGrip("aluminum_light_fast"));
  });
});

describe("wheelCost", () => {
  it("cast iron pro most expensive", () => {
    expect(wheelCost("cast_iron_pro")).toBeGreaterThan(wheelCost("plastic_basic_spin"));
  });
});

describe("ballBearing", () => {
  it("steel heavy smooth has ball bearing", () => {
    expect(ballBearing("steel_heavy_smooth")).toBe(true);
  });
  it("plastic basic spin no ball bearing", () => {
    expect(ballBearing("plastic_basic_spin")).toBe(false);
  });
});

describe("nonSlipBase", () => {
  it("steel heavy smooth has non slip base", () => {
    expect(nonSlipBase("steel_heavy_smooth")).toBe(true);
  });
  it("aluminum light fast no non slip base", () => {
    expect(nonSlipBase("aluminum_light_fast")).toBe(false);
  });
});

describe("wheelMaterial", () => {
  it("steel heavy smooth uses powder coated steel", () => {
    expect(wheelMaterial("steel_heavy_smooth")).toBe("powder_coated_steel");
  });
});

describe("bestUse", () => {
  it("cast iron pro best for production glaze work", () => {
    expect(bestUse("cast_iron_pro")).toBe("production_glaze_work");
  });
});

describe("bandingWheels", () => {
  it("returns 5 types", () => {
    expect(bandingWheels()).toHaveLength(5);
  });
});
