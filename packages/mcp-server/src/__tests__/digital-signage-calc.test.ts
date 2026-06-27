import { describe, it, expect } from "vitest";
import {
  brightness, durability, interactivity, content,
  dgCost, touchEnabled, forOutdoor, panel,
  bestUse, digitalSignageTypes,
} from "../digital-signage-calc.js";

describe("brightness", () => {
  it("outdoor brightest", () => {
    expect(brightness("outdoor_high_bright")).toBeGreaterThan(brightness("transparent_oled_showcase"));
  });
});

describe("durability", () => {
  it("outdoor most durable", () => {
    expect(durability("outdoor_high_bright")).toBeGreaterThan(durability("transparent_oled_showcase"));
  });
});

describe("interactivity", () => {
  it("kiosk most interactive", () => {
    expect(interactivity("interactive_touch_kiosk")).toBeGreaterThan(interactivity("indoor_commercial_display"));
  });
});

describe("content", () => {
  it("menu board best content", () => {
    expect(content("menu_board_qsr")).toBeGreaterThan(content("outdoor_high_bright"));
  });
});

describe("dgCost", () => {
  it("transparent oled most expensive", () => {
    expect(dgCost("transparent_oled_showcase")).toBeGreaterThan(dgCost("indoor_commercial_display"));
  });
});

describe("touchEnabled", () => {
  it("kiosk is touch enabled", () => {
    expect(touchEnabled("interactive_touch_kiosk")).toBe(true);
  });
  it("outdoor not touch enabled", () => {
    expect(touchEnabled("outdoor_high_bright")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("outdoor high bright for outdoor", () => {
    expect(forOutdoor("outdoor_high_bright")).toBe(true);
  });
  it("menu board not outdoor", () => {
    expect(forOutdoor("menu_board_qsr")).toBe(false);
  });
});

describe("panel", () => {
  it("transparent uses oled 38pct", () => {
    expect(panel("transparent_oled_showcase")).toBe("transparent_oled_55in_38pct");
  });
});

describe("bestUse", () => {
  it("kiosk for museum directory", () => {
    expect(bestUse("interactive_touch_kiosk")).toBe("museum_directory_self_service");
  });
});

describe("digitalSignageTypes", () => {
  it("returns 5 types", () => {
    expect(digitalSignageTypes()).toHaveLength(5);
  });
});
