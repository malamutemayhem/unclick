import { describe, it, expect } from "vitest";
import {
  pressEven, clampForce, setupSpeed, panelRange,
  pressCost, powered, forCurve, pressMethod,
  bestUse, veneerPresses,
} from "../veneer-press-calc.js";

describe("pressEven", () => {
  it("vacuum bag pump most even press", () => {
    expect(pressEven("vacuum_bag_pump")).toBeGreaterThan(pressEven("sandbag_weight_simple"));
  });
});

describe("clampForce", () => {
  it("screw press frame best clamp force", () => {
    expect(clampForce("screw_press_frame")).toBeGreaterThan(clampForce("sandbag_weight_simple"));
  });
});

describe("setupSpeed", () => {
  it("sandbag weight simple fastest setup", () => {
    expect(setupSpeed("sandbag_weight_simple")).toBeGreaterThan(setupSpeed("screw_press_frame"));
  });
});

describe("panelRange", () => {
  it("vacuum bag pump best panel range", () => {
    expect(panelRange("vacuum_bag_pump")).toBeGreaterThan(panelRange("sandbag_weight_simple"));
  });
});

describe("pressCost", () => {
  it("hydraulic platen flat most expensive", () => {
    expect(pressCost("hydraulic_platen_flat")).toBeGreaterThan(pressCost("sandbag_weight_simple"));
  });
});

describe("powered", () => {
  it("vacuum bag pump is powered", () => {
    expect(powered("vacuum_bag_pump")).toBe(true);
  });
  it("caul board clamp not powered", () => {
    expect(powered("caul_board_clamp")).toBe(false);
  });
});

describe("forCurve", () => {
  it("vacuum bag pump is for curve", () => {
    expect(forCurve("vacuum_bag_pump")).toBe(true);
  });
  it("screw press frame not for curve", () => {
    expect(forCurve("screw_press_frame")).toBe(false);
  });
});

describe("pressMethod", () => {
  it("hydraulic platen flat uses hydraulic ram", () => {
    expect(pressMethod("hydraulic_platen_flat")).toBe("hydraulic_ram");
  });
});

describe("bestUse", () => {
  it("vacuum bag pump best for curved form press", () => {
    expect(bestUse("vacuum_bag_pump")).toBe("curved_form_press");
  });
});

describe("veneerPresses", () => {
  it("returns 5 types", () => {
    expect(veneerPresses()).toHaveLength(5);
  });
});
