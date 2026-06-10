import { describe, it, expect } from "vitest";
import {
  burnishForce, finishQuality, reachAbility, controlEase,
  setterCost, polishedTip, forBezel, tipMaterial,
  bestUse, burnishSetters,
} from "../burnish-setter-calc.js";

describe("burnishForce", () => {
  it("rub over flat strongest burnish", () => {
    expect(burnishForce("rub_over_flat")).toBeGreaterThan(burnishForce("knife_edge_thin"));
  });
});

describe("finishQuality", () => {
  it("rub over flat best finish quality", () => {
    expect(finishQuality("rub_over_flat")).toBeGreaterThan(finishQuality("curved_hook_pull"));
  });
});

describe("reachAbility", () => {
  it("curved hook pull best reach ability", () => {
    expect(reachAbility("curved_hook_pull")).toBeGreaterThan(reachAbility("rub_over_flat"));
  });
});

describe("controlEase", () => {
  it("rub over flat easiest control", () => {
    expect(controlEase("rub_over_flat")).toBeGreaterThan(controlEase("knife_edge_thin"));
  });
});

describe("setterCost", () => {
  it("rub over flat more expensive", () => {
    expect(setterCost("rub_over_flat")).toBeGreaterThan(setterCost("straight_rod_push"));
  });
});

describe("polishedTip", () => {
  it("rub over flat has polished tip", () => {
    expect(polishedTip("rub_over_flat")).toBe(true);
  });
  it("curved hook pull no polished tip", () => {
    expect(polishedTip("curved_hook_pull")).toBe(false);
  });
});

describe("forBezel", () => {
  it("rub over flat is for bezel", () => {
    expect(forBezel("rub_over_flat")).toBe(true);
  });
  it("ball end round not for bezel", () => {
    expect(forBezel("ball_end_round")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("rub over flat uses agate stone smooth", () => {
    expect(tipMaterial("rub_over_flat")).toBe("agate_stone_smooth");
  });
});

describe("bestUse", () => {
  it("rub over flat best for smooth bezel finish", () => {
    expect(bestUse("rub_over_flat")).toBe("smooth_bezel_finish");
  });
});

describe("burnishSetters", () => {
  it("returns 5 types", () => {
    expect(burnishSetters()).toHaveLength(5);
  });
});
