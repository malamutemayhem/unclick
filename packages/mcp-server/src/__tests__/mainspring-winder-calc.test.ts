import { describe, it, expect } from "vitest";
import {
  windControl, springSafe, sizeRange, speedWind,
  winderCost, powered, forLetDown, clampType,
  bestUse, mainspringWinders,
} from "../mainspring-winder-calc.js";

describe("windControl", () => {
  it("let down clamp safe best control", () => {
    expect(windControl("let_down_clamp_safe")).toBeGreaterThan(windControl("bench_key_lever"));
  });
});

describe("springSafe", () => {
  it("let down clamp safe safest", () => {
    expect(springSafe("let_down_clamp_safe")).toBeGreaterThan(springSafe("barrel_arbor_manual"));
  });
});

describe("sizeRange", () => {
  it("universal set multi widest range", () => {
    expect(sizeRange("universal_set_multi")).toBeGreaterThan(sizeRange("barrel_arbor_manual"));
  });
});

describe("speedWind", () => {
  it("automatic power feed fastest wind", () => {
    expect(speedWind("automatic_power_feed")).toBeGreaterThan(speedWind("let_down_clamp_safe"));
  });
});

describe("winderCost", () => {
  it("automatic power feed most expensive", () => {
    expect(winderCost("automatic_power_feed")).toBeGreaterThan(winderCost("bench_key_lever"));
  });
});

describe("powered", () => {
  it("automatic power feed is powered", () => {
    expect(powered("automatic_power_feed")).toBe(true);
  });
  it("barrel arbor manual not powered", () => {
    expect(powered("barrel_arbor_manual")).toBe(false);
  });
});

describe("forLetDown", () => {
  it("let down clamp safe is for let down", () => {
    expect(forLetDown("let_down_clamp_safe")).toBe(true);
  });
  it("barrel arbor manual not for let down", () => {
    expect(forLetDown("barrel_arbor_manual")).toBe(false);
  });
});

describe("clampType", () => {
  it("universal set multi uses interchangeable cone", () => {
    expect(clampType("universal_set_multi")).toBe("interchangeable_cone");
  });
});

describe("bestUse", () => {
  it("let down clamp safe best for controlled let down", () => {
    expect(bestUse("let_down_clamp_safe")).toBe("controlled_let_down");
  });
});

describe("mainspringWinders", () => {
  it("returns 5 types", () => {
    expect(mainspringWinders()).toHaveLength(5);
  });
});
