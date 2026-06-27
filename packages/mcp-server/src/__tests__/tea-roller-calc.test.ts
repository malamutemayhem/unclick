import { describe, it, expect } from "vitest";
import {
  leafIntegrity, throughput, cellDamage, flavorComplexity,
  trCost, continuous, forOrthodox, rollerConfig,
  bestUse, teaRollerTypes,
} from "../tea-roller-calc.js";

describe("leafIntegrity", () => {
  it("hand roll best leaf integrity", () => {
    expect(leafIntegrity("hand_roll")).toBeGreaterThan(leafIntegrity("ctc_machine"));
  });
});

describe("throughput", () => {
  it("ctc machine highest throughput", () => {
    expect(throughput("ctc_machine")).toBeGreaterThan(throughput("hand_roll"));
  });
});

describe("cellDamage", () => {
  it("ctc machine highest cell damage", () => {
    expect(cellDamage("ctc_machine")).toBeGreaterThan(cellDamage("hand_roll"));
  });
});

describe("flavorComplexity", () => {
  it("hand roll best flavor complexity", () => {
    expect(flavorComplexity("hand_roll")).toBeGreaterThan(flavorComplexity("ctc_machine"));
  });
});

describe("trCost", () => {
  it("ctc machine most expensive", () => {
    expect(trCost("ctc_machine")).toBeGreaterThan(trCost("hand_roll"));
  });
});

describe("continuous", () => {
  it("ctc machine is continuous", () => {
    expect(continuous("ctc_machine")).toBe(true);
  });
  it("orthodox roller not continuous", () => {
    expect(continuous("orthodox_roller")).toBe(false);
  });
});

describe("forOrthodox", () => {
  it("orthodox roller for orthodox tea", () => {
    expect(forOrthodox("orthodox_roller")).toBe(true);
  });
  it("ctc machine not for orthodox", () => {
    expect(forOrthodox("ctc_machine")).toBe(false);
  });
});

describe("rollerConfig", () => {
  it("ctc machine uses crush tear curl serrated roller", () => {
    expect(rollerConfig("ctc_machine")).toBe("ctc_machine_crush_tear_curl_serrated_roller_fine_particle_strong");
  });
});

describe("bestUse", () => {
  it("hand roll for artisan oolong green tea", () => {
    expect(bestUse("hand_roll")).toBe("artisan_oolong_green_tea_hand_roll_gentle_shape_premium_single_origin");
  });
});

describe("teaRollerTypes", () => {
  it("returns 5 types", () => {
    expect(teaRollerTypes()).toHaveLength(5);
  });
});
