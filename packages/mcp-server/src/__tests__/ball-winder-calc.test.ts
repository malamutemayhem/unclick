import { describe, it, expect } from "vitest";
import {
  windSpeed, tensionEven, yarnGentle, sizeCapacity,
  winderCost, powered, centerPull, windMethod,
  bestUse, ballWinders,
} from "../ball-winder-calc.js";

describe("windSpeed", () => {
  it("electric motor fast fastest wind", () => {
    expect(windSpeed("electric_motor_fast")).toBeGreaterThan(windSpeed("nostepinne_hand"));
  });
});

describe("tensionEven", () => {
  it("center pull cone most even tension", () => {
    expect(tensionEven("center_pull_cone")).toBeGreaterThan(tensionEven("nostepinne_hand"));
  });
});

describe("yarnGentle", () => {
  it("nostepinne hand gentlest on yarn", () => {
    expect(yarnGentle("nostepinne_hand")).toBeGreaterThan(yarnGentle("electric_motor_fast"));
  });
});

describe("sizeCapacity", () => {
  it("jumbo winder large largest capacity", () => {
    expect(sizeCapacity("jumbo_winder_large")).toBeGreaterThan(sizeCapacity("nostepinne_hand"));
  });
});

describe("winderCost", () => {
  it("electric motor fast most expensive", () => {
    expect(winderCost("electric_motor_fast")).toBeGreaterThan(winderCost("nostepinne_hand"));
  });
});

describe("powered", () => {
  it("electric motor fast is powered", () => {
    expect(powered("electric_motor_fast")).toBe(true);
  });
  it("hand crank standard not powered", () => {
    expect(powered("hand_crank_standard")).toBe(false);
  });
});

describe("centerPull", () => {
  it("hand crank standard is center pull", () => {
    expect(centerPull("hand_crank_standard")).toBe(true);
  });
});

describe("windMethod", () => {
  it("nostepinne hand uses hand wrap stick", () => {
    expect(windMethod("nostepinne_hand")).toBe("hand_wrap_stick");
  });
});

describe("bestUse", () => {
  it("hand crank standard best for general ball wind", () => {
    expect(bestUse("hand_crank_standard")).toBe("general_ball_wind");
  });
});

describe("ballWinders", () => {
  it("returns 5 types", () => {
    expect(ballWinders()).toHaveLength(5);
  });
});
