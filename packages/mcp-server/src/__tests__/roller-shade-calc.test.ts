import { describe, it, expect } from "vitest";
import {
  lightControl, uvProtection, privacy, easeOfUse,
  shadeCost, cordless, smartHome, fabricType,
  bestRoom, rollerShades,
} from "../roller-shade-calc.js";

describe("lightControl", () => {
  it("blackout total dark best light control", () => {
    expect(lightControl("blackout_total_dark")).toBeGreaterThan(lightControl("light_filter_basic"));
  });
});

describe("uvProtection", () => {
  it("solar screen uv best uv protection", () => {
    expect(uvProtection("solar_screen_uv")).toBeGreaterThanOrEqual(uvProtection("dual_zebra_stripe"));
  });
});

describe("privacy", () => {
  it("blackout total dark best privacy", () => {
    expect(privacy("blackout_total_dark")).toBeGreaterThan(privacy("light_filter_basic"));
  });
});

describe("easeOfUse", () => {
  it("motorized smart remote easiest", () => {
    expect(easeOfUse("motorized_smart_remote")).toBeGreaterThan(easeOfUse("blackout_total_dark"));
  });
});

describe("shadeCost", () => {
  it("motorized smart remote most expensive", () => {
    expect(shadeCost("motorized_smart_remote")).toBeGreaterThan(shadeCost("light_filter_basic"));
  });
});

describe("cordless", () => {
  it("all roller shades are cordless", () => {
    expect(cordless("light_filter_basic")).toBe(true);
    expect(cordless("motorized_smart_remote")).toBe(true);
  });
});

describe("smartHome", () => {
  it("motorized smart remote is smart home", () => {
    expect(smartHome("motorized_smart_remote")).toBe(true);
  });
  it("light filter basic is not smart home", () => {
    expect(smartHome("light_filter_basic")).toBe(false);
  });
});

describe("fabricType", () => {
  it("solar screen uv uses open weave solar mesh", () => {
    expect(fabricType("solar_screen_uv")).toBe("open_weave_solar_mesh");
  });
});

describe("bestRoom", () => {
  it("blackout total dark best for bedroom media room", () => {
    expect(bestRoom("blackout_total_dark")).toBe("bedroom_media_room");
  });
});

describe("rollerShades", () => {
  it("returns 5 types", () => {
    expect(rollerShades()).toHaveLength(5);
  });
});
