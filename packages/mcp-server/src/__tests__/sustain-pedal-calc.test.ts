import { describe, it, expect } from "vitest";
import {
  responsiveness, realism, durability, portability,
  pedalCost, halfPedal, wireless, pedalAction,
  bestSetup, sustainPedals,
} from "../sustain-pedal-calc.js";

describe("responsiveness", () => {
  it("half damper continuous most responsive", () => {
    expect(responsiveness("half_damper_continuous")).toBeGreaterThan(responsiveness("switch_basic_on_off"));
  });
});

describe("realism", () => {
  it("triple pedal unit most realistic", () => {
    expect(realism("triple_pedal_unit")).toBeGreaterThan(realism("switch_basic_on_off"));
  });
});

describe("durability", () => {
  it("triple pedal unit most durable", () => {
    expect(durability("triple_pedal_unit")).toBeGreaterThan(durability("bluetooth_wireless_pedal"));
  });
});

describe("portability", () => {
  it("switch basic on off most portable", () => {
    expect(portability("switch_basic_on_off")).toBeGreaterThan(portability("triple_pedal_unit"));
  });
});

describe("pedalCost", () => {
  it("triple pedal unit most expensive", () => {
    expect(pedalCost("triple_pedal_unit")).toBeGreaterThan(pedalCost("switch_basic_on_off"));
  });
});

describe("halfPedal", () => {
  it("half damper continuous supports half pedal", () => {
    expect(halfPedal("half_damper_continuous")).toBe(true);
  });
  it("switch basic on off does not", () => {
    expect(halfPedal("switch_basic_on_off")).toBe(false);
  });
});

describe("wireless", () => {
  it("bluetooth wireless pedal is wireless", () => {
    expect(wireless("bluetooth_wireless_pedal")).toBe(true);
  });
  it("piano style weighted is not", () => {
    expect(wireless("piano_style_weighted")).toBe(false);
  });
});

describe("pedalAction", () => {
  it("half damper continuous uses continuous resistance curve", () => {
    expect(pedalAction("half_damper_continuous")).toBe("continuous_resistance_curve");
  });
});

describe("bestSetup", () => {
  it("switch basic on off best for beginner portable keyboard", () => {
    expect(bestSetup("switch_basic_on_off")).toBe("beginner_portable_keyboard");
  });
});

describe("sustainPedals", () => {
  it("returns 5 types", () => {
    expect(sustainPedals()).toHaveLength(5);
  });
});
