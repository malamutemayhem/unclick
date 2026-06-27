import { describe, it, expect } from "vitest";
import {
  liftCapacity, liftHeight, maneuverability, operatorEase,
  pjCost, powered, forLongDistance, frame,
  bestUse, palletJackTypes,
} from "../pallet-jack-calc.js";

describe("liftCapacity", () => {
  it("electric walkie ride highest capacity", () => {
    expect(liftCapacity("electric_walkie_ride")).toBeGreaterThan(liftCapacity("high_lift_stacker"));
  });
});

describe("liftHeight", () => {
  it("high lift stacker highest lift", () => {
    expect(liftHeight("high_lift_stacker")).toBeGreaterThan(liftHeight("manual_hand_pump"));
  });
});

describe("maneuverability", () => {
  it("manual hand pump best maneuverability", () => {
    expect(maneuverability("manual_hand_pump")).toBeGreaterThan(maneuverability("high_lift_stacker"));
  });
});

describe("operatorEase", () => {
  it("electric walkie ride easiest to operate", () => {
    expect(operatorEase("electric_walkie_ride")).toBeGreaterThan(operatorEase("high_lift_stacker"));
  });
});

describe("pjCost", () => {
  it("high lift stacker most expensive", () => {
    expect(pjCost("high_lift_stacker")).toBeGreaterThan(pjCost("manual_hand_pump"));
  });
});

describe("powered", () => {
  it("electric walkie ride is powered", () => {
    expect(powered("electric_walkie_ride")).toBe(true);
  });
  it("manual hand pump not powered", () => {
    expect(powered("manual_hand_pump")).toBe(false);
  });
});

describe("forLongDistance", () => {
  it("electric walkie ride for long distance", () => {
    expect(forLongDistance("electric_walkie_ride")).toBe(true);
  });
  it("manual hand pump not for long distance", () => {
    expect(forLongDistance("manual_hand_pump")).toBe(false);
  });
});

describe("frame", () => {
  it("weigh scale uses load cell fork", () => {
    expect(frame("weigh_scale_built")).toBe("load_cell_integrated_fork_digital_display_tare");
  });
});

describe("bestUse", () => {
  it("low profile printer for printing industry", () => {
    expect(bestUse("low_profile_printer")).toBe("printing_industry_display_pallet_low_clearance_load");
  });
});

describe("palletJackTypes", () => {
  it("returns 5 types", () => {
    expect(palletJackTypes()).toHaveLength(5);
  });
});
