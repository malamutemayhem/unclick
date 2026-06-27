import { describe, it, expect } from "vitest";
import {
  claySticktion, releaseEase, durability, flatness,
  batCost, absorbsMoisture, quickSwap, batMaterial,
  bestPot, throwingBats,
} from "../throwing-bat-calc.js";

describe("claySticktion", () => {
  it("plaster absorbing wet best clay sticktion", () => {
    expect(claySticktion("plaster_absorbing_wet")).toBeGreaterThan(claySticktion("plastic_mold_light"));
  });
});

describe("releaseEase", () => {
  it("plaster absorbing wet easiest release", () => {
    expect(releaseEase("plaster_absorbing_wet")).toBeGreaterThan(releaseEase("plywood_round_standard"));
  });
});

describe("durability", () => {
  it("plywood round standard most durable", () => {
    expect(durability("plywood_round_standard")).toBeGreaterThan(durability("plaster_absorbing_wet"));
  });
});

describe("flatness", () => {
  it("mdf smooth flat best flatness", () => {
    expect(flatness("mdf_smooth_flat")).toBeGreaterThan(flatness("plywood_round_standard"));
  });
});

describe("batCost", () => {
  it("pin system quick release most expensive", () => {
    expect(batCost("pin_system_quick_release")).toBeGreaterThan(batCost("plywood_round_standard"));
  });
});

describe("absorbsMoisture", () => {
  it("plaster absorbing wet absorbs moisture", () => {
    expect(absorbsMoisture("plaster_absorbing_wet")).toBe(true);
  });
  it("plywood round standard does not absorb moisture", () => {
    expect(absorbsMoisture("plywood_round_standard")).toBe(false);
  });
});

describe("quickSwap", () => {
  it("pin system quick release has quick swap", () => {
    expect(quickSwap("pin_system_quick_release")).toBe(true);
  });
  it("plywood round standard has no quick swap", () => {
    expect(quickSwap("plywood_round_standard")).toBe(false);
  });
});

describe("batMaterial", () => {
  it("plaster absorbing wet uses pottery plaster cast", () => {
    expect(batMaterial("plaster_absorbing_wet")).toBe("pottery_plaster_cast");
  });
});

describe("bestPot", () => {
  it("pin system quick release best for production batch throw", () => {
    expect(bestPot("pin_system_quick_release")).toBe("production_batch_throw");
  });
});

describe("throwingBats", () => {
  it("returns 5 types", () => {
    expect(throwingBats()).toHaveLength(5);
  });
});
