import { describe, it, expect } from "vitest";
import {
  scalingEfficiency, throughput, skinDamage, speciesRange,
  fsCost, automated, forRound, scalerConfig,
  bestUse, fishScalerTypes,
} from "../fish-scaler-calc.js";

describe("scalingEfficiency", () => {
  it("high pressure water best scaling efficiency", () => {
    expect(scalingEfficiency("high_pressure_water")).toBeGreaterThan(scalingEfficiency("hand_electric"));
  });
});

describe("throughput", () => {
  it("rotary drum highest throughput", () => {
    expect(throughput("rotary_drum")).toBeGreaterThan(throughput("hand_electric"));
  });
});

describe("skinDamage", () => {
  it("high pressure water least skin damage", () => {
    expect(skinDamage("high_pressure_water")).toBeGreaterThan(skinDamage("tumble_barrel"));
  });
});

describe("speciesRange", () => {
  it("hand electric widest species range", () => {
    expect(speciesRange("hand_electric")).toBeGreaterThan(speciesRange("tumble_barrel"));
  });
});

describe("fsCost", () => {
  it("high pressure water most expensive", () => {
    expect(fsCost("high_pressure_water")).toBeGreaterThan(fsCost("hand_electric"));
  });
});

describe("automated", () => {
  it("rotary drum is automated", () => {
    expect(automated("rotary_drum")).toBe(true);
  });
  it("hand electric not automated", () => {
    expect(automated("hand_electric")).toBe(false);
  });
});

describe("forRound", () => {
  it("rotary drum for round fish", () => {
    expect(forRound("rotary_drum")).toBe(true);
  });
  it("belt scaler not for round", () => {
    expect(forRound("belt_scaler")).toBe(false);
  });
});

describe("scalerConfig", () => {
  it("tumble barrel uses rotating drum batch abrade", () => {
    expect(scalerConfig("tumble_barrel")).toBe("tumble_barrel_fish_scaler_rotating_drum_batch_abrade_scale_off");
  });
});

describe("bestUse", () => {
  it("hand electric for small fish shop gentle versatile", () => {
    expect(bestUse("hand_electric")).toBe("small_fish_shop_hand_electric_scaler_gentle_versatile_species");
  });
});

describe("fishScalerTypes", () => {
  it("returns 5 types", () => {
    expect(fishScalerTypes()).toHaveLength(5);
  });
});
