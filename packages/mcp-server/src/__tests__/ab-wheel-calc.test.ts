import { describe, it, expect } from "vitest";
import {
  coreActivation, balanceDifficulty, beginnerFriendly, portability,
  wheelCost, hasKneePad, returnAssist, wheelDesign,
  bestUser, abWheels,
} from "../ab-wheel-calc.js";

describe("coreActivation", () => {
  it("single wheel basic highest core activation", () => {
    expect(coreActivation("single_wheel_basic")).toBeGreaterThan(coreActivation("spring_assist"));
  });
});

describe("balanceDifficulty", () => {
  it("single wheel basic hardest to balance", () => {
    expect(balanceDifficulty("single_wheel_basic")).toBeGreaterThan(balanceDifficulty("four_wheel_stable"));
  });
});

describe("beginnerFriendly", () => {
  it("spring assist most beginner friendly", () => {
    expect(beginnerFriendly("spring_assist")).toBeGreaterThan(beginnerFriendly("single_wheel_basic"));
  });
});

describe("portability", () => {
  it("single wheel basic most portable", () => {
    expect(portability("single_wheel_basic")).toBeGreaterThan(portability("roller_slide_track"));
  });
});

describe("wheelCost", () => {
  it("roller slide track most expensive", () => {
    expect(wheelCost("roller_slide_track")).toBeGreaterThan(wheelCost("single_wheel_basic"));
  });
});

describe("hasKneePad", () => {
  it("dual wheel wide has knee pad", () => {
    expect(hasKneePad("dual_wheel_wide")).toBe(true);
  });
  it("single wheel basic does not", () => {
    expect(hasKneePad("single_wheel_basic")).toBe(false);
  });
});

describe("returnAssist", () => {
  it("spring assist has return assist", () => {
    expect(returnAssist("spring_assist")).toBe(true);
  });
  it("dual wheel wide does not", () => {
    expect(returnAssist("dual_wheel_wide")).toBe(false);
  });
});

describe("wheelDesign", () => {
  it("spring assist uses coil rebound center", () => {
    expect(wheelDesign("spring_assist")).toBe("coil_rebound_center");
  });
});

describe("bestUser", () => {
  it("four wheel stable for beginner learning form", () => {
    expect(bestUser("four_wheel_stable")).toBe("beginner_learning_form");
  });
});

describe("abWheels", () => {
  it("returns 5 types", () => {
    expect(abWheels()).toHaveLength(5);
  });
});
