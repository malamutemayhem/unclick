import { describe, it, expect } from "vitest";
import {
  holdingPower, weightSave, durability, groundPenetration,
  stakeCost, reflective, needsHammer, stakeMaterial,
  bestGround, tentStakes,
} from "../tent-stake-calc.js";

describe("holdingPower", () => {
  it("screw in spiral strongest hold", () => {
    expect(holdingPower("screw_in_spiral")).toBeGreaterThan(holdingPower("aluminum_hook_standard"));
  });
});

describe("weightSave", () => {
  it("titanium shepherd light lightest", () => {
    expect(weightSave("titanium_shepherd_light")).toBeGreaterThan(weightSave("steel_nail_heavy"));
  });
});

describe("durability", () => {
  it("steel nail heavy most durable", () => {
    expect(durability("steel_nail_heavy")).toBeGreaterThan(durability("aluminum_hook_standard"));
  });
});

describe("groundPenetration", () => {
  it("steel nail heavy best penetration", () => {
    expect(groundPenetration("steel_nail_heavy")).toBeGreaterThan(groundPenetration("sand_snow_anchor_wide"));
  });
});

describe("stakeCost", () => {
  it("titanium shepherd light most expensive", () => {
    expect(stakeCost("titanium_shepherd_light")).toBeGreaterThan(stakeCost("aluminum_hook_standard"));
  });
});

describe("reflective", () => {
  it("titanium shepherd light is reflective", () => {
    expect(reflective("titanium_shepherd_light")).toBe(true);
  });
  it("steel nail heavy is not", () => {
    expect(reflective("steel_nail_heavy")).toBe(false);
  });
});

describe("needsHammer", () => {
  it("steel nail heavy needs hammer", () => {
    expect(needsHammer("steel_nail_heavy")).toBe(true);
  });
  it("screw in spiral does not", () => {
    expect(needsHammer("screw_in_spiral")).toBe(false);
  });
});

describe("stakeMaterial", () => {
  it("titanium shepherd light uses grade 5 titanium", () => {
    expect(stakeMaterial("titanium_shepherd_light")).toBe("grade_5_titanium");
  });
});

describe("bestGround", () => {
  it("sand snow anchor wide best for sand beach snow", () => {
    expect(bestGround("sand_snow_anchor_wide")).toBe("sand_beach_snow");
  });
});

describe("tentStakes", () => {
  it("returns 5 types", () => {
    expect(tentStakes()).toHaveLength(5);
  });
});
