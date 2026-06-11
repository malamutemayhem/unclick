import { describe, it, expect } from "vitest";
import {
  surfaceFlat, controlStrike, coverArea, finishQuality,
  flatterCost, powered, offset, faceShape,
  bestUse, flatterForges,
} from "../flatter-forge-calc.js";

describe("surfaceFlat", () => {
  it("power hammer die flattest surface", () => {
    expect(surfaceFlat("power_hammer_die")).toBeGreaterThan(surfaceFlat("planishing_round_face"));
  });
});

describe("controlStrike", () => {
  it("set hammer square best control strike", () => {
    expect(controlStrike("set_hammer_square")).toBeGreaterThan(controlStrike("power_hammer_die"));
  });
});

describe("coverArea", () => {
  it("power hammer die best cover area", () => {
    expect(coverArea("power_hammer_die")).toBeGreaterThan(coverArea("set_hammer_square"));
  });
});

describe("finishQuality", () => {
  it("planishing round face best finish quality", () => {
    expect(finishQuality("planishing_round_face")).toBeGreaterThan(finishQuality("set_hammer_square"));
  });
});

describe("flatterCost", () => {
  it("power hammer die most expensive", () => {
    expect(flatterCost("power_hammer_die")).toBeGreaterThan(flatterCost("set_hammer_square"));
  });
});

describe("powered", () => {
  it("power hammer die is powered", () => {
    expect(powered("power_hammer_die")).toBe(true);
  });
  it("hand flatter standard not powered", () => {
    expect(powered("hand_flatter_standard")).toBe(false);
  });
});

describe("offset", () => {
  it("dog head offset is offset", () => {
    expect(offset("dog_head_offset")).toBe(true);
  });
  it("hand flatter standard not offset", () => {
    expect(offset("hand_flatter_standard")).toBe(false);
  });
});

describe("faceShape", () => {
  it("planishing round face has slight crown round", () => {
    expect(faceShape("planishing_round_face")).toBe("slight_crown_round");
  });
});

describe("bestUse", () => {
  it("power hammer die best for production flatten", () => {
    expect(bestUse("power_hammer_die")).toBe("production_flatten");
  });
});

describe("flatterForges", () => {
  it("returns 5 types", () => {
    expect(flatterForges()).toHaveLength(5);
  });
});
