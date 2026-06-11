import { describe, it, expect } from "vitest";
import {
  brightness, contrast, colorGamut, responseTime,
  panelCost, selfEmissive, forOutdoor, technology,
  bestUse, displayPanels,
} from "../display-panel-calc.js";

describe("brightness", () => {
  it("microled direct highest brightness", () => {
    expect(brightness("microled_direct")).toBeGreaterThan(brightness("ips_lcd"));
  });
});

describe("contrast", () => {
  it("amoled ltpo best contrast", () => {
    expect(contrast("amoled_ltpo")).toBeGreaterThan(contrast("ips_lcd"));
  });
});

describe("colorGamut", () => {
  it("microled direct widest color gamut", () => {
    expect(colorGamut("microled_direct")).toBeGreaterThan(colorGamut("eink_epaper"));
  });
});

describe("responseTime", () => {
  it("amoled ltpo fastest response time", () => {
    expect(responseTime("amoled_ltpo")).toBeGreaterThan(responseTime("eink_epaper"));
  });
});

describe("panelCost", () => {
  it("microled direct most expensive", () => {
    expect(panelCost("microled_direct")).toBeGreaterThan(panelCost("ips_lcd"));
  });
});

describe("selfEmissive", () => {
  it("amoled ltpo is self emissive", () => {
    expect(selfEmissive("amoled_ltpo")).toBe(true);
  });
  it("ips lcd not self emissive", () => {
    expect(selfEmissive("ips_lcd")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("eink epaper is for outdoor", () => {
    expect(forOutdoor("eink_epaper")).toBe(true);
  });
  it("amoled ltpo not for outdoor", () => {
    expect(forOutdoor("amoled_ltpo")).toBe(false);
  });
});

describe("technology", () => {
  it("microled direct uses inorganic led chip", () => {
    expect(technology("microled_direct")).toBe("inorganic_led_chip");
  });
});

describe("bestUse", () => {
  it("amoled ltpo best for flagship phone screen", () => {
    expect(bestUse("amoled_ltpo")).toBe("flagship_phone_screen");
  });
});

describe("displayPanels", () => {
  it("returns 5 types", () => {
    expect(displayPanels()).toHaveLength(5);
  });
});
