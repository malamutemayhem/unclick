import { describe, it, expect } from "vitest";
import {
  dimRange, installEase, bulbCompat, aestheticClean,
  switchCost, voiceControl, needsNeutral, controlMethod,
  bestRoom, dimmerSwitches,
} from "../dimmer-switch-calc.js";

describe("dimRange", () => {
  it("smart wifi app widest dim range", () => {
    expect(dimRange("smart_wifi_app")).toBeGreaterThan(dimRange("toggle_tap"));
  });
});

describe("installEase", () => {
  it("rotary knob easiest install", () => {
    expect(installEase("rotary_knob")).toBeGreaterThan(installEase("touch_panel"));
  });
});

describe("bulbCompat", () => {
  it("smart wifi app best bulb compatibility", () => {
    expect(bulbCompat("smart_wifi_app")).toBeGreaterThan(bulbCompat("toggle_tap"));
  });
});

describe("aestheticClean", () => {
  it("touch panel most aesthetic", () => {
    expect(aestheticClean("touch_panel")).toBeGreaterThan(aestheticClean("toggle_tap"));
  });
});

describe("switchCost", () => {
  it("smart wifi app most expensive", () => {
    expect(switchCost("smart_wifi_app")).toBeGreaterThan(switchCost("rotary_knob"));
  });
});

describe("voiceControl", () => {
  it("smart wifi app has voice control", () => {
    expect(voiceControl("smart_wifi_app")).toBe(true);
  });
  it("rotary knob does not", () => {
    expect(voiceControl("rotary_knob")).toBe(false);
  });
});

describe("needsNeutral", () => {
  it("smart wifi app needs neutral", () => {
    expect(needsNeutral("smart_wifi_app")).toBe(true);
  });
  it("rotary knob does not", () => {
    expect(needsNeutral("rotary_knob")).toBe(false);
  });
});

describe("controlMethod", () => {
  it("touch panel uses capacitive glass swipe", () => {
    expect(controlMethod("touch_panel")).toBe("capacitive_glass_swipe");
  });
});

describe("bestRoom", () => {
  it("smart wifi app best for whole home automation", () => {
    expect(bestRoom("smart_wifi_app")).toBe("whole_home_automation");
  });
});

describe("dimmerSwitches", () => {
  it("returns 5 types", () => {
    expect(dimmerSwitches()).toHaveLength(5);
  });
});
