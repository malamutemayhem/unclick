import { describe, it, expect } from "vitest";
import {
  sensitivity, multiTouch, durability, opticalClarity,
  touchCost, gloveFriendly, forIndustrial, detection,
  bestUse, touchSensors,
} from "../touch-sensor-calc.js";

describe("sensitivity", () => {
  it("projected cap mutual most sensitive", () => {
    expect(sensitivity("projected_cap_mutual")).toBeGreaterThan(sensitivity("resistive_4wire"));
  });
});

describe("multiTouch", () => {
  it("projected cap mutual best multi touch", () => {
    expect(multiTouch("projected_cap_mutual")).toBeGreaterThan(multiTouch("resistive_4wire"));
  });
});

describe("durability", () => {
  it("infrared grid most durable", () => {
    expect(durability("infrared_grid")).toBeGreaterThan(durability("resistive_4wire"));
  });
});

describe("opticalClarity", () => {
  it("surface acoustic wave best optical clarity", () => {
    expect(opticalClarity("surface_acoustic_wave")).toBeGreaterThan(opticalClarity("resistive_4wire"));
  });
});

describe("touchCost", () => {
  it("infrared grid most expensive", () => {
    expect(touchCost("infrared_grid")).toBeGreaterThan(touchCost("resistive_4wire"));
  });
});

describe("gloveFriendly", () => {
  it("resistive 4wire is glove friendly", () => {
    expect(gloveFriendly("resistive_4wire")).toBe(true);
  });
  it("projected cap mutual not glove friendly", () => {
    expect(gloveFriendly("projected_cap_mutual")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("resistive 4wire is for industrial", () => {
    expect(forIndustrial("resistive_4wire")).toBe(true);
  });
  it("projected cap mutual not for industrial", () => {
    expect(forIndustrial("projected_cap_mutual")).toBe(false);
  });
});

describe("detection", () => {
  it("projected cap mutual uses mutual cap matrix", () => {
    expect(detection("projected_cap_mutual")).toBe("mutual_cap_matrix");
  });
});

describe("bestUse", () => {
  it("projected cap mutual best for smartphone tablet", () => {
    expect(bestUse("projected_cap_mutual")).toBe("smartphone_tablet");
  });
});

describe("touchSensors", () => {
  it("returns 5 types", () => {
    expect(touchSensors()).toHaveLength(5);
  });
});
