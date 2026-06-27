import { describe, it, expect } from "vitest";
import {
  resolution, brightness, seamless, longevity,
  vwCost, indoor, forControlRoom, pixel,
  bestUse, videoWallTypes,
} from "../video-wall-calc.js";

describe("resolution", () => {
  it("micro led highest resolution", () => {
    expect(resolution("micro_led_fine_pitch")).toBeGreaterThan(resolution("led_direct_view"));
  });
});

describe("brightness", () => {
  it("led direct view brightest", () => {
    expect(brightness("led_direct_view")).toBeGreaterThan(brightness("rear_projection_cube"));
  });
});

describe("seamless", () => {
  it("micro led most seamless", () => {
    expect(seamless("micro_led_fine_pitch")).toBeGreaterThan(seamless("lcd_narrow_bezel"));
  });
});

describe("longevity", () => {
  it("rear projection longest lasting", () => {
    expect(longevity("rear_projection_cube")).toBeGreaterThan(longevity("oled_flexible_curved"));
  });
});

describe("vwCost", () => {
  it("micro led most expensive", () => {
    expect(vwCost("micro_led_fine_pitch")).toBeGreaterThan(vwCost("lcd_narrow_bezel"));
  });
});

describe("indoor", () => {
  it("lcd is indoor", () => {
    expect(indoor("lcd_narrow_bezel")).toBe(true);
  });
  it("led direct not indoor only", () => {
    expect(indoor("led_direct_view")).toBe(false);
  });
});

describe("forControlRoom", () => {
  it("rear projection for control room", () => {
    expect(forControlRoom("rear_projection_cube")).toBe(true);
  });
  it("lcd not control room", () => {
    expect(forControlRoom("lcd_narrow_bezel")).toBe(false);
  });
});

describe("pixel", () => {
  it("oled uses curved panel", () => {
    expect(pixel("oled_flexible_curved")).toBe("oled_flexible_55in_curved_3mm");
  });
});

describe("bestUse", () => {
  it("led for stadium billboard", () => {
    expect(bestUse("led_direct_view")).toBe("stadium_billboard_outdoor_sign");
  });
});

describe("videoWallTypes", () => {
  it("returns 5 types", () => {
    expect(videoWallTypes()).toHaveLength(5);
  });
});
