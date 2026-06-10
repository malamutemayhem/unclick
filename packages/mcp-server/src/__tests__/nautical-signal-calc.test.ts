import { describe, it, expect } from "vitest";
import {
  dayVisibility, nightEffectiveness, rangeNauticalMiles, fogEffectiveness,
  equipmentCost, requiresPower, reusable, colregsCategory,
  bestEmergencyUse, nauticalSignals,
} from "../nautical-signal-calc.js";

describe("dayVisibility", () => {
  it("flag best day visibility", () => {
    expect(dayVisibility("flag")).toBeGreaterThan(dayVisibility("horn"));
  });
});

describe("nightEffectiveness", () => {
  it("light best at night", () => {
    expect(nightEffectiveness("light")).toBeGreaterThan(nightEffectiveness("flag"));
  });
});

describe("rangeNauticalMiles", () => {
  it("radio longest range", () => {
    expect(rangeNauticalMiles("radio")).toBeGreaterThan(rangeNauticalMiles("flag"));
  });
});

describe("fogEffectiveness", () => {
  it("horn best in fog", () => {
    expect(fogEffectiveness("horn")).toBeGreaterThan(fogEffectiveness("flag"));
  });
});

describe("equipmentCost", () => {
  it("radio most expensive", () => {
    expect(equipmentCost("radio")).toBeGreaterThan(equipmentCost("flag"));
  });
});

describe("requiresPower", () => {
  it("radio requires power", () => {
    expect(requiresPower("radio")).toBe(true);
  });
  it("flag does not", () => {
    expect(requiresPower("flag")).toBe(false);
  });
});

describe("reusable", () => {
  it("light is reusable", () => {
    expect(reusable("light")).toBe(true);
  });
  it("flare is not", () => {
    expect(reusable("flare")).toBe(false);
  });
});

describe("colregsCategory", () => {
  it("horn is sound signal", () => {
    expect(colregsCategory("horn")).toBe("sound_signal");
  });
});

describe("bestEmergencyUse", () => {
  it("radio for mayday broadcast", () => {
    expect(bestEmergencyUse("radio")).toBe("mayday_broadcast");
  });
});

describe("nauticalSignals", () => {
  it("returns 5 signals", () => {
    expect(nauticalSignals()).toHaveLength(5);
  });
});
