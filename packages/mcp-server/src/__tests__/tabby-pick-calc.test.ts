import { describe, it, expect } from "vitest";
import {
  pickSpeed, weftPlace, shedClear, handleEase,
  tabbyPickCost, doubleUse, forBelt, pickShape,
  bestUse, tabbyPicks,
} from "../tabby-pick-calc.js";

describe("pickSpeed", () => {
  it("belt pick narrow fastest pick", () => {
    expect(pickSpeed("belt_pick_narrow")).toBeGreaterThan(pickSpeed("backstrap_shed_bar"));
  });
});

describe("weftPlace", () => {
  it("inkle pick card best weft placement", () => {
    expect(weftPlace("inkle_pick_card")).toBeGreaterThan(weftPlace("backstrap_shed_bar"));
  });
});

describe("shedClear", () => {
  it("backstrap shed bar best shed clearance", () => {
    expect(shedClear("backstrap_shed_bar")).toBeGreaterThan(shedClear("inkle_pick_card"));
  });
});

describe("handleEase", () => {
  it("belt pick narrow best handle ease", () => {
    expect(handleEase("belt_pick_narrow")).toBeGreaterThan(handleEase("backstrap_shed_bar"));
  });
});

describe("tabbyPickCost", () => {
  it("sword beater edge most expensive", () => {
    expect(tabbyPickCost("sword_beater_edge")).toBeGreaterThan(tabbyPickCost("inkle_pick_card"));
  });
});

describe("doubleUse", () => {
  it("flat pick stick is double use", () => {
    expect(doubleUse("flat_pick_stick")).toBe(true);
  });
  it("belt pick narrow not double use", () => {
    expect(doubleUse("belt_pick_narrow")).toBe(false);
  });
});

describe("forBelt", () => {
  it("belt pick narrow is for belt", () => {
    expect(forBelt("belt_pick_narrow")).toBe(true);
  });
  it("flat pick stick not for belt", () => {
    expect(forBelt("flat_pick_stick")).toBe(false);
  });
});

describe("pickShape", () => {
  it("sword beater edge uses sword blade edge", () => {
    expect(pickShape("sword_beater_edge")).toBe("sword_blade_edge");
  });
});

describe("bestUse", () => {
  it("inkle pick card best for card weave pick", () => {
    expect(bestUse("inkle_pick_card")).toBe("card_weave_pick");
  });
});

describe("tabbyPicks", () => {
  it("returns 5 types", () => {
    expect(tabbyPicks()).toHaveLength(5);
  });
});
