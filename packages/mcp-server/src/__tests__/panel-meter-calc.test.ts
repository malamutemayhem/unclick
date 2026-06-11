import { describe, it, expect } from "vitest";
import {
  accuracy, readability, rangeSpan, responseSpeed,
  meterCost, digital, multiFunction, displayType,
  bestUse, panelMeters,
} from "../panel-meter-calc.js";

describe("accuracy", () => {
  it("frequency counter most accurate", () => {
    expect(accuracy("frequency_counter_panel")).toBeGreaterThan(accuracy("bargraph_led_level"));
  });
});

describe("readability", () => {
  it("digital led display most readable", () => {
    expect(readability("digital_led_display")).toBeGreaterThan(readability("analog_moving_coil"));
  });
});

describe("rangeSpan", () => {
  it("frequency counter widest range", () => {
    expect(rangeSpan("frequency_counter_panel")).toBeGreaterThan(rangeSpan("bargraph_led_level"));
  });
});

describe("responseSpeed", () => {
  it("bargraph led level fastest response", () => {
    expect(responseSpeed("bargraph_led_level")).toBeGreaterThan(responseSpeed("frequency_counter_panel"));
  });
});

describe("meterCost", () => {
  it("frequency counter most expensive", () => {
    expect(meterCost("frequency_counter_panel")).toBeGreaterThan(meterCost("analog_moving_coil"));
  });
});

describe("digital", () => {
  it("digital led display is digital", () => {
    expect(digital("digital_led_display")).toBe(true);
  });
  it("analog moving coil not digital", () => {
    expect(digital("analog_moving_coil")).toBe(false);
  });
});

describe("multiFunction", () => {
  it("dual voltage current is multi function", () => {
    expect(multiFunction("dual_voltage_current")).toBe(true);
  });
  it("digital led display not multi function", () => {
    expect(multiFunction("digital_led_display")).toBe(false);
  });
});

describe("displayType", () => {
  it("analog moving coil uses needle arc scale", () => {
    expect(displayType("analog_moving_coil")).toBe("needle_arc_scale");
  });
});

describe("bestUse", () => {
  it("dual voltage current best for power supply monitor", () => {
    expect(bestUse("dual_voltage_current")).toBe("power_supply_monitor");
  });
});

describe("panelMeters", () => {
  it("returns 5 types", () => {
    expect(panelMeters()).toHaveLength(5);
  });
});
