import { describe, it, expect } from "vitest";
import {
  channels, dataRate, powerEff, integration,
  ddCost, touchIntegrated, forOled, interface_,
  bestUse, displayDrivers,
} from "../display-driver-calc.js";

describe("channels", () => {
  it("oled amoled most channels", () => {
    expect(channels("oled_amoled_ddic")).toBeGreaterThan(channels("led_matrix_constant"));
  });
});

describe("dataRate", () => {
  it("oled amoled highest data rate", () => {
    expect(dataRate("oled_amoled_ddic")).toBeGreaterThan(dataRate("gate_row_cof"));
  });
});

describe("powerEff", () => {
  it("led matrix most power efficient", () => {
    expect(powerEff("led_matrix_constant")).toBeGreaterThan(powerEff("oled_amoled_ddic"));
  });
});

describe("integration", () => {
  it("tddi most integrated", () => {
    expect(integration("tddi_touch_display")).toBeGreaterThan(integration("gate_row_cof"));
  });
});

describe("ddCost", () => {
  it("oled amoled most expensive", () => {
    expect(ddCost("oled_amoled_ddic")).toBeGreaterThan(ddCost("gate_row_cof"));
  });
});

describe("touchIntegrated", () => {
  it("tddi is touch integrated", () => {
    expect(touchIntegrated("tddi_touch_display")).toBe(true);
  });
  it("source column not touch integrated", () => {
    expect(touchIntegrated("source_column_cof")).toBe(false);
  });
});

describe("forOled", () => {
  it("oled amoled for oled", () => {
    expect(forOled("oled_amoled_ddic")).toBe(true);
  });
  it("tddi not for oled", () => {
    expect(forOled("tddi_touch_display")).toBe(false);
  });
});

describe("interface_", () => {
  it("oled amoled uses mipi dsi ltpo pwm dimming", () => {
    expect(interface_("oled_amoled_ddic")).toBe("mipi_dsi_ltpo_pwm_dimming");
  });
});

describe("bestUse", () => {
  it("tddi best for smartphone incell touch", () => {
    expect(bestUse("tddi_touch_display")).toBe("smartphone_incell_touch_lcd");
  });
});

describe("displayDrivers", () => {
  it("returns 5 types", () => {
    expect(displayDrivers()).toHaveLength(5);
  });
});
