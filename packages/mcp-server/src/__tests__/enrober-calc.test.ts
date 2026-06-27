import { describe, it, expect } from "vitest";
import {
  coatingUniformity, throughput, coatingThickness, wasteControl,
  enCost, continuous, forChocolate, enroberConfig,
  bestUse, enroberTypes,
} from "../enrober-calc.js";

describe("coatingUniformity", () => {
  it("curtain enrober best coating uniformity", () => {
    expect(coatingUniformity("curtain_enrober")).toBeGreaterThan(coatingUniformity("dipping_fork"));
  });
});

describe("throughput", () => {
  it("curtain enrober highest throughput", () => {
    expect(throughput("curtain_enrober")).toBeGreaterThan(throughput("dipping_fork"));
  });
});

describe("coatingThickness", () => {
  it("pan coater thickest coating", () => {
    expect(coatingThickness("pan_coater")).toBeGreaterThan(coatingThickness("spray_coater"));
  });
});

describe("wasteControl", () => {
  it("spin enrober best waste control", () => {
    expect(wasteControl("spin_enrober")).toBeGreaterThan(wasteControl("dipping_fork"));
  });
});

describe("enCost", () => {
  it("curtain enrober most expensive", () => {
    expect(enCost("curtain_enrober")).toBeGreaterThan(enCost("dipping_fork"));
  });
});

describe("continuous", () => {
  it("curtain enrober is continuous", () => {
    expect(continuous("curtain_enrober")).toBe(true);
  });
  it("dipping fork not continuous", () => {
    expect(continuous("dipping_fork")).toBe(false);
  });
});

describe("forChocolate", () => {
  it("curtain enrober for chocolate", () => {
    expect(forChocolate("curtain_enrober")).toBe(true);
  });
  it("spray coater not for chocolate", () => {
    expect(forChocolate("spray_coater")).toBe(false);
  });
});

describe("enroberConfig", () => {
  it("pan coater uses revolving drum layer sugar shell", () => {
    expect(enroberConfig("pan_coater")).toBe("pan_coater_revolving_drum_layer_sugar_shell_chocolate_dragee_panning");
  });
});

describe("bestUse", () => {
  it("dipping fork for artisan chocolatier", () => {
    expect(bestUse("dipping_fork")).toBe("artisan_chocolatier_dipping_fork_hand_enrobe_truffle_bonbon_craft");
  });
});

describe("enroberTypes", () => {
  it("returns 5 types", () => {
    expect(enroberTypes()).toHaveLength(5);
  });
});
