import { describe, it, expect } from "vitest";
import {
  resolution, colorDepth, contrast, powerEfficient,
  displayCost, color, spiInterface, driverChip,
  bestUse, oledDisplays,
} from "../oled-display-calc.js";

describe("resolution", () => {
  it("ssd1351 color 128x128 highest resolution", () => {
    expect(resolution("ssd1351_color_128x128")).toBeGreaterThan(resolution("ssd1306_mono_128x32"));
  });
});

describe("colorDepth", () => {
  it("ssd1351 color 128x128 deepest color", () => {
    expect(colorDepth("ssd1351_color_128x128")).toBeGreaterThan(colorDepth("ssd1306_mono_128x64"));
  });
});

describe("contrast", () => {
  it("ssd1351 color 128x128 best contrast", () => {
    expect(contrast("ssd1351_color_128x128")).toBeGreaterThan(contrast("ssd1331_color_96x64"));
  });
});

describe("powerEfficient", () => {
  it("ssd1306 mono 128x32 most power efficient", () => {
    expect(powerEfficient("ssd1306_mono_128x32")).toBeGreaterThan(powerEfficient("ssd1351_color_128x128"));
  });
});

describe("displayCost", () => {
  it("ssd1351 color 128x128 most expensive", () => {
    expect(displayCost("ssd1351_color_128x128")).toBeGreaterThan(displayCost("ssd1306_mono_128x32"));
  });
});

describe("color", () => {
  it("ssd1331 color 96x64 is color", () => {
    expect(color("ssd1331_color_96x64")).toBe(true);
  });
  it("ssd1306 mono 128x64 not color", () => {
    expect(color("ssd1306_mono_128x64")).toBe(false);
  });
});

describe("spiInterface", () => {
  it("sh1106 mono round has spi interface", () => {
    expect(spiInterface("sh1106_mono_round")).toBe(true);
  });
  it("ssd1306 mono 128x64 no spi interface", () => {
    expect(spiInterface("ssd1306_mono_128x64")).toBe(false);
  });
});

describe("driverChip", () => {
  it("ssd1331 color 96x64 uses ssd1331 65k color", () => {
    expect(driverChip("ssd1331_color_96x64")).toBe("ssd1331_65k_color");
  });
});

describe("bestUse", () => {
  it("ssd1306 mono 128x32 best for compact status line", () => {
    expect(bestUse("ssd1306_mono_128x32")).toBe("compact_status_line");
  });
});

describe("oledDisplays", () => {
  it("returns 5 types", () => {
    expect(oledDisplays()).toHaveLength(5);
  });
});
