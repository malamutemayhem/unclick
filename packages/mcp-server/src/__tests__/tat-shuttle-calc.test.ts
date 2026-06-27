import { describe, it, expect } from "vitest";
import {
  threadCapacity, joinEase, handFeel, durability,
  shuttleCost, hasBobbin, hasPickPoint, shuttleMaterial,
  bestUse, tatShuttles,
} from "../tat-shuttle-calc.js";

describe("threadCapacity", () => {
  it("clover plastic bobbin most capacity", () => {
    expect(threadCapacity("clover_plastic_bobbin")).toBeGreaterThan(threadCapacity("pop_shuttle_easy"));
  });
});

describe("joinEase", () => {
  it("aero pointed tip easiest join", () => {
    expect(joinEase("aero_pointed_tip")).toBeGreaterThan(joinEase("wood_hand_turned"));
  });
});

describe("handFeel", () => {
  it("wood hand turned best hand feel", () => {
    expect(handFeel("wood_hand_turned")).toBeGreaterThan(handFeel("vintage_metal_post"));
  });
});

describe("durability", () => {
  it("vintage metal post most durable", () => {
    expect(durability("vintage_metal_post")).toBeGreaterThan(durability("wood_hand_turned"));
  });
});

describe("shuttleCost", () => {
  it("wood hand turned most expensive", () => {
    expect(shuttleCost("wood_hand_turned")).toBeGreaterThan(shuttleCost("clover_plastic_bobbin"));
  });
});

describe("hasBobbin", () => {
  it("clover plastic bobbin has bobbin", () => {
    expect(hasBobbin("clover_plastic_bobbin")).toBe(true);
  });
  it("vintage metal post has no bobbin", () => {
    expect(hasBobbin("vintage_metal_post")).toBe(false);
  });
});

describe("hasPickPoint", () => {
  it("aero pointed tip has pick point", () => {
    expect(hasPickPoint("aero_pointed_tip")).toBe(true);
  });
  it("wood hand turned has no pick point", () => {
    expect(hasPickPoint("wood_hand_turned")).toBe(false);
  });
});

describe("shuttleMaterial", () => {
  it("wood hand turned uses exotic wood lathe", () => {
    expect(shuttleMaterial("wood_hand_turned")).toBe("exotic_wood_lathe");
  });
});

describe("bestUse", () => {
  it("aero pointed tip best for fast join picot", () => {
    expect(bestUse("aero_pointed_tip")).toBe("fast_join_picot");
  });
});

describe("tatShuttles", () => {
  it("returns 5 types", () => {
    expect(tatShuttles()).toHaveLength(5);
  });
});
