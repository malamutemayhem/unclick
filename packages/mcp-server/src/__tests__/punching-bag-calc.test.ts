import { describe, it, expect } from "vitest";
import {
  punchResistance, speedTraining, installEase, realism,
  bagCost, noMounting, fullBody, shellMaterial,
  bestTraining, punchingBags,
} from "../punching-bag-calc.js";

describe("punchResistance", () => {
  it("heavy hanging highest punch resistance", () => {
    expect(punchResistance("heavy_hanging")).toBeGreaterThan(punchResistance("speed_bag_swivel"));
  });
});

describe("speedTraining", () => {
  it("speed bag swivel best speed training", () => {
    expect(speedTraining("speed_bag_swivel")).toBeGreaterThan(speedTraining("heavy_hanging"));
  });
});

describe("installEase", () => {
  it("free standing base easiest install", () => {
    expect(installEase("free_standing_base")).toBeGreaterThan(installEase("heavy_hanging"));
  });
});

describe("realism", () => {
  it("body opponent bob most realistic", () => {
    expect(realism("body_opponent_bob")).toBeGreaterThan(realism("speed_bag_swivel"));
  });
});

describe("bagCost", () => {
  it("body opponent bob most expensive", () => {
    expect(bagCost("body_opponent_bob")).toBeGreaterThan(bagCost("double_end_anchor"));
  });
});

describe("noMounting", () => {
  it("free standing base needs no mounting", () => {
    expect(noMounting("free_standing_base")).toBe(true);
  });
  it("heavy hanging does", () => {
    expect(noMounting("heavy_hanging")).toBe(false);
  });
});

describe("fullBody", () => {
  it("heavy hanging is full body", () => {
    expect(fullBody("heavy_hanging")).toBe(true);
  });
  it("speed bag swivel is not", () => {
    expect(fullBody("speed_bag_swivel")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("body opponent bob uses urethane molded torso", () => {
    expect(shellMaterial("body_opponent_bob")).toBe("urethane_molded_torso");
  });
});

describe("bestTraining", () => {
  it("speed bag swivel best for hand speed rhythm", () => {
    expect(bestTraining("speed_bag_swivel")).toBe("hand_speed_rhythm");
  });
});

describe("punchingBags", () => {
  it("returns 5 types", () => {
    expect(punchingBags()).toHaveLength(5);
  });
});
