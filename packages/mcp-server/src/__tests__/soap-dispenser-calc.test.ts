import { describe, it, expect } from "vitest";
import {
  hygieneLevel, soapEfficiency, refillEase, styleAppeal,
  dispenserCost, touchFree, wallMountable, dispenseMechanism,
  bestSpot, soapDispensers,
} from "../soap-dispenser-calc.js";

describe("hygieneLevel", () => {
  it("touchless sensor most hygienic", () => {
    expect(hygieneLevel("touchless_sensor")).toBeGreaterThan(hygieneLevel("pump_manual"));
  });
});

describe("soapEfficiency", () => {
  it("foaming pump most soap efficient", () => {
    expect(soapEfficiency("foaming_pump")).toBeGreaterThan(soapEfficiency("pump_manual"));
  });
});

describe("refillEase", () => {
  it("pump manual easiest refill", () => {
    expect(refillEase("pump_manual")).toBeGreaterThan(refillEase("dish_sink_built_in"));
  });
});

describe("styleAppeal", () => {
  it("dish sink built in most style appeal", () => {
    expect(styleAppeal("dish_sink_built_in")).toBeGreaterThan(styleAppeal("wall_mount_refill"));
  });
});

describe("dispenserCost", () => {
  it("dish sink built in most expensive", () => {
    expect(dispenserCost("dish_sink_built_in")).toBeGreaterThan(dispenserCost("pump_manual"));
  });
});

describe("touchFree", () => {
  it("touchless sensor is touch free", () => {
    expect(touchFree("touchless_sensor")).toBe(true);
  });
  it("pump manual is not", () => {
    expect(touchFree("pump_manual")).toBe(false);
  });
});

describe("wallMountable", () => {
  it("wall mount refill is wall mountable", () => {
    expect(wallMountable("wall_mount_refill")).toBe(true);
  });
  it("pump manual is not", () => {
    expect(wallMountable("pump_manual")).toBe(false);
  });
});

describe("dispenseMechanism", () => {
  it("foaming pump uses air mix foam chamber", () => {
    expect(dispenseMechanism("foaming_pump")).toBe("air_mix_foam_chamber");
  });
});

describe("bestSpot", () => {
  it("touchless sensor for kitchen germ conscious", () => {
    expect(bestSpot("touchless_sensor")).toBe("kitchen_germ_conscious");
  });
});

describe("soapDispensers", () => {
  it("returns 5 types", () => {
    expect(soapDispensers()).toHaveLength(5);
  });
});
