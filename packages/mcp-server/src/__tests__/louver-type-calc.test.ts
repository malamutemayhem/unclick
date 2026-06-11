import { describe, it, expect } from "vitest";
import {
  airflow, waterReject, acoustic, aesthetic,
  lvCost, operable, forMechanical, blade,
  bestUse, louverTypeTypes,
} from "../louver-type-calc.js";

describe("airflow", () => {
  it("adjustable best airflow", () => {
    expect(airflow("adjustable_operable_blade")).toBeGreaterThan(airflow("acoustic_sound_attenuating"));
  });
});

describe("waterReject", () => {
  it("drainable best water rejection", () => {
    expect(waterReject("drainable_storm_resistant")).toBeGreaterThan(waterReject("fixed_blade_stationary"));
  });
});

describe("acoustic", () => {
  it("acoustic type best sound attenuation", () => {
    expect(acoustic("acoustic_sound_attenuating")).toBeGreaterThan(acoustic("fixed_blade_stationary"));
  });
});

describe("aesthetic", () => {
  it("adjustable best aesthetic", () => {
    expect(aesthetic("adjustable_operable_blade")).toBeGreaterThan(aesthetic("drainable_storm_resistant"));
  });
});

describe("lvCost", () => {
  it("acoustic most expensive", () => {
    expect(lvCost("acoustic_sound_attenuating")).toBeGreaterThan(lvCost("fixed_blade_stationary"));
  });
});

describe("operable", () => {
  it("adjustable is operable", () => {
    expect(operable("adjustable_operable_blade")).toBe(true);
  });
  it("fixed not operable", () => {
    expect(operable("fixed_blade_stationary")).toBe(false);
  });
});

describe("forMechanical", () => {
  it("all types for mechanical", () => {
    expect(forMechanical("fixed_blade_stationary")).toBe(true);
  });
});

describe("blade", () => {
  it("drainable uses j channel", () => {
    expect(blade("drainable_storm_resistant")).toBe("j_channel_drain_gutter_blade");
  });
});

describe("bestUse", () => {
  it("acoustic for generator room", () => {
    expect(bestUse("acoustic_sound_attenuating")).toBe("generator_room_noise_sensitive");
  });
});

describe("louverTypeTypes", () => {
  it("returns 5 types", () => {
    expect(louverTypeTypes()).toHaveLength(5);
  });
});
