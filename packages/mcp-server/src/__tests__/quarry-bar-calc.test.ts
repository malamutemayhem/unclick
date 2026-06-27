import { describe, it, expect } from "vitest";
import {
  leverForce, pryControl, durability, reachDepth,
  barCost, powered, forSplit, tipProfile,
  bestUse, quarryBars,
} from "../quarry-bar-calc.js";

describe("leverForce", () => {
  it("wedge bar split strongest lever force", () => {
    expect(leverForce("wedge_bar_split")).toBeGreaterThan(leverForce("pinch_bar_pry"));
  });
});

describe("pryControl", () => {
  it("pinch bar pry best pry control", () => {
    expect(pryControl("pinch_bar_pry")).toBeGreaterThan(pryControl("pneumatic_bar_drill"));
  });
});

describe("durability", () => {
  it("straight bar standard most durable", () => {
    expect(durability("straight_bar_standard")).toBeGreaterThan(durability("pneumatic_bar_drill"));
  });
});

describe("reachDepth", () => {
  it("pneumatic bar drill best reach depth", () => {
    expect(reachDepth("pneumatic_bar_drill")).toBeGreaterThan(reachDepth("wedge_bar_split"));
  });
});

describe("barCost", () => {
  it("pneumatic bar drill most expensive", () => {
    expect(barCost("pneumatic_bar_drill")).toBeGreaterThan(barCost("pinch_bar_pry"));
  });
});

describe("powered", () => {
  it("pneumatic bar drill is powered", () => {
    expect(powered("pneumatic_bar_drill")).toBe(true);
  });
  it("straight bar standard not powered", () => {
    expect(powered("straight_bar_standard")).toBe(false);
  });
});

describe("forSplit", () => {
  it("wedge bar split is for split", () => {
    expect(forSplit("wedge_bar_split")).toBe(true);
  });
  it("straight bar standard not for split", () => {
    expect(forSplit("straight_bar_standard")).toBe(false);
  });
});

describe("tipProfile", () => {
  it("channeling bar slot uses narrow channel tip", () => {
    expect(tipProfile("channeling_bar_slot")).toBe("narrow_channel_tip");
  });
});

describe("bestUse", () => {
  it("straight bar standard best for general quarry lever", () => {
    expect(bestUse("straight_bar_standard")).toBe("general_quarry_lever");
  });
});

describe("quarryBars", () => {
  it("returns 5 types", () => {
    expect(quarryBars()).toHaveLength(5);
  });
});
