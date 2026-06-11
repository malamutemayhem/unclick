import { describe, it, expect } from "vitest";
import {
  textureEven, coverSpeed, depthControl, faceLife,
  bushCost, powered, forDetail, pointCount,
  bestUse, bushHammers,
} from "../bush-hammer-calc.js";

describe("textureEven", () => {
  it("pneumatic air power most even texture", () => {
    expect(textureEven("pneumatic_air_power")).toBeGreaterThan(textureEven("heavy_head_rough"));
  });
});

describe("coverSpeed", () => {
  it("pneumatic air power fastest cover", () => {
    expect(coverSpeed("pneumatic_air_power")).toBeGreaterThan(coverSpeed("fine_point_detail"));
  });
});

describe("depthControl", () => {
  it("fine point detail best depth control", () => {
    expect(depthControl("fine_point_detail")).toBeGreaterThan(depthControl("heavy_head_rough"));
  });
});

describe("faceLife", () => {
  it("heavy head rough longest face life", () => {
    expect(faceLife("heavy_head_rough")).toBeGreaterThan(faceLife("fine_point_detail"));
  });
});

describe("bushCost", () => {
  it("pneumatic air power most expensive", () => {
    expect(bushCost("pneumatic_air_power")).toBeGreaterThan(bushCost("hand_held_standard"));
  });
});

describe("powered", () => {
  it("pneumatic air power is powered", () => {
    expect(powered("pneumatic_air_power")).toBe(true);
  });
  it("hand held standard not powered", () => {
    expect(powered("hand_held_standard")).toBe(false);
  });
});

describe("forDetail", () => {
  it("fine point detail is for detail", () => {
    expect(forDetail("fine_point_detail")).toBe(true);
  });
  it("hand held standard not for detail", () => {
    expect(forDetail("hand_held_standard")).toBe(false);
  });
});

describe("pointCount", () => {
  it("heavy head rough uses four point heavy", () => {
    expect(pointCount("heavy_head_rough")).toBe("four_point_heavy");
  });
});

describe("bestUse", () => {
  it("pneumatic air power best for large area texture", () => {
    expect(bestUse("pneumatic_air_power")).toBe("large_area_texture");
  });
});

describe("bushHammers", () => {
  it("returns 5 types", () => {
    expect(bushHammers()).toHaveLength(5);
  });
});
