import { describe, it, expect } from "vitest";
import {
  strikeControl, surfaceFinish, textureCreate, weightBalance,
  chasingCost, textureHead, forPlanish, faceShape,
  bestUse, chasingHammers,
} from "../chasing-hammer-calc.js";

describe("strikeControl", () => {
  it("planishing flat smooth best strike control", () => {
    expect(strikeControl("planishing_flat_smooth")).toBeGreaterThan(strikeControl("ball_peen_texture"));
  });
});

describe("surfaceFinish", () => {
  it("planishing flat smooth best surface finish", () => {
    expect(surfaceFinish("planishing_flat_smooth")).toBeGreaterThan(surfaceFinish("ball_peen_texture"));
  });
});

describe("textureCreate", () => {
  it("ball peen texture best texture creation", () => {
    expect(textureCreate("ball_peen_texture")).toBeGreaterThan(textureCreate("planishing_flat_smooth"));
  });
});

describe("weightBalance", () => {
  it("round face standard best weight balance", () => {
    expect(weightBalance("round_face_standard")).toBeGreaterThan(weightBalance("ball_peen_texture"));
  });
});

describe("chasingCost", () => {
  it("planishing flat smooth most expensive", () => {
    expect(chasingCost("planishing_flat_smooth")).toBeGreaterThan(chasingCost("round_face_standard"));
  });
});

describe("textureHead", () => {
  it("ball peen texture has texture head", () => {
    expect(textureHead("ball_peen_texture")).toBe(true);
  });
  it("round face standard no texture head", () => {
    expect(textureHead("round_face_standard")).toBe(false);
  });
});

describe("forPlanish", () => {
  it("planishing flat smooth is for planish", () => {
    expect(forPlanish("planishing_flat_smooth")).toBe(true);
  });
  it("round face standard not for planish", () => {
    expect(forPlanish("round_face_standard")).toBe(false);
  });
});

describe("faceShape", () => {
  it("riveting small head uses small round narrow", () => {
    expect(faceShape("riveting_small_head")).toBe("small_round_narrow");
  });
});

describe("bestUse", () => {
  it("ball peen texture best for dimple texture create", () => {
    expect(bestUse("ball_peen_texture")).toBe("dimple_texture_create");
  });
});

describe("chasingHammers", () => {
  it("returns 5 types", () => {
    expect(chasingHammers()).toHaveLength(5);
  });
});
