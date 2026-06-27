import { describe, it, expect } from "vitest";
import {
  heatRetention, gripComfort, capacity, aesthetics,
  mugCost, microwaveSafe, hasHandle, mugMaterial,
  bestScene, coffeeMugs,
} from "../coffee-mug-calc.js";

describe("heatRetention", () => {
  it("ember heated smart best heat retention", () => {
    expect(heatRetention("ember_heated_smart")).toBeGreaterThan(heatRetention("enamel_camp_fire"));
  });
});

describe("gripComfort", () => {
  it("ceramic classic handle most comfortable grip", () => {
    expect(gripComfort("ceramic_classic_handle")).toBeGreaterThan(gripComfort("glass_clear_double"));
  });
});

describe("capacity", () => {
  it("travel insulated seal highest capacity", () => {
    expect(capacity("travel_insulated_seal")).toBeGreaterThan(capacity("glass_clear_double"));
  });
});

describe("aesthetics", () => {
  it("glass clear double best aesthetics", () => {
    expect(aesthetics("glass_clear_double")).toBeGreaterThan(aesthetics("travel_insulated_seal"));
  });
});

describe("mugCost", () => {
  it("ember heated smart most expensive", () => {
    expect(mugCost("ember_heated_smart")).toBeGreaterThan(mugCost("ceramic_classic_handle"));
  });
});

describe("microwaveSafe", () => {
  it("ceramic classic handle is microwave safe", () => {
    expect(microwaveSafe("ceramic_classic_handle")).toBe(true);
  });
  it("enamel camp fire is not", () => {
    expect(microwaveSafe("enamel_camp_fire")).toBe(false);
  });
});

describe("hasHandle", () => {
  it("ceramic classic handle has handle", () => {
    expect(hasHandle("ceramic_classic_handle")).toBe(true);
  });
  it("travel insulated seal does not", () => {
    expect(hasHandle("travel_insulated_seal")).toBe(false);
  });
});

describe("mugMaterial", () => {
  it("enamel camp fire uses steel porcelain enamel", () => {
    expect(mugMaterial("enamel_camp_fire")).toBe("steel_porcelain_enamel");
  });
});

describe("bestScene", () => {
  it("ember heated smart best for desk precise temperature", () => {
    expect(bestScene("ember_heated_smart")).toBe("desk_precise_temperature");
  });
});

describe("coffeeMugs", () => {
  it("returns 5 types", () => {
    expect(coffeeMugs()).toHaveLength(5);
  });
});
