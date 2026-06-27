import { describe, it, expect } from "vitest";
import {
  fillSpeed, fillAccuracy, pouchRange, sealIntegrity,
  pfCost, premade, forLiquid, fillerConfig,
  bestUse, pouchFillerTypes,
} from "../pouch-filler-calc.js";

describe("fillSpeed", () => {
  it("form fill seal fastest fill speed", () => {
    expect(fillSpeed("form_fill_seal")).toBeGreaterThan(fillSpeed("vacuum_retort"));
  });
});

describe("fillAccuracy", () => {
  it("stick pack best fill accuracy", () => {
    expect(fillAccuracy("stick_pack")).toBeGreaterThan(fillAccuracy("vacuum_retort"));
  });
});

describe("pouchRange", () => {
  it("premade rotary widest pouch range", () => {
    expect(pouchRange("premade_rotary")).toBeGreaterThan(pouchRange("stick_pack"));
  });
});

describe("sealIntegrity", () => {
  it("vacuum retort and spouted pouch best seal integrity", () => {
    expect(sealIntegrity("vacuum_retort")).toBeGreaterThan(sealIntegrity("form_fill_seal"));
  });
});

describe("pfCost", () => {
  it("vacuum retort most expensive", () => {
    expect(pfCost("vacuum_retort")).toBeGreaterThan(pfCost("stick_pack"));
  });
});

describe("premade", () => {
  it("premade rotary uses premade pouches", () => {
    expect(premade("premade_rotary")).toBe(true);
  });
  it("form fill seal not premade", () => {
    expect(premade("form_fill_seal")).toBe(false);
  });
});

describe("forLiquid", () => {
  it("spouted pouch for liquid", () => {
    expect(forLiquid("spouted_pouch")).toBe(true);
  });
  it("form fill seal not for liquid", () => {
    expect(forLiquid("form_fill_seal")).toBe(false);
  });
});

describe("fillerConfig", () => {
  it("stick pack uses multi lane narrow tube", () => {
    expect(fillerConfig("stick_pack")).toBe("multi_lane_stick_pack_form_fill_seal_narrow_tube_sachet_line");
  });
});

describe("bestUse", () => {
  it("vacuum retort for shelf stable ready meal", () => {
    expect(bestUse("vacuum_retort")).toBe("shelf_stable_ready_meal_retort_pouch_military_mre_autoclave");
  });
});

describe("pouchFillerTypes", () => {
  it("returns 5 types", () => {
    expect(pouchFillerTypes()).toHaveLength(5);
  });
});
