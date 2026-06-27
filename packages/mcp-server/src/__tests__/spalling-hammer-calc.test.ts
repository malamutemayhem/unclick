import { describe, it, expect } from "vitest";
import {
  chipClean, forceStrike, controlAim, faceLife,
  hammerCost, powered, crossPeen, faceShape,
  bestUse, spallingHammers,
} from "../spalling-hammer-calc.js";

describe("chipClean", () => {
  it("carbide face hard cleanest chip", () => {
    expect(chipClean("carbide_face_hard")).toBeGreaterThan(chipClean("round_face_dome"));
  });
});

describe("forceStrike", () => {
  it("pneumatic spall power strongest strike", () => {
    expect(forceStrike("pneumatic_spall_power")).toBeGreaterThan(forceStrike("cross_peen_spall"));
  });
});

describe("controlAim", () => {
  it("flat face standard best control aim", () => {
    expect(controlAim("flat_face_standard")).toBeGreaterThan(controlAim("pneumatic_spall_power"));
  });
});

describe("faceLife", () => {
  it("carbide face hard best face life", () => {
    expect(faceLife("carbide_face_hard")).toBeGreaterThan(faceLife("pneumatic_spall_power"));
  });
});

describe("hammerCost", () => {
  it("pneumatic spall power most expensive", () => {
    expect(hammerCost("pneumatic_spall_power")).toBeGreaterThan(hammerCost("flat_face_standard"));
  });
});

describe("powered", () => {
  it("pneumatic spall power is powered", () => {
    expect(powered("pneumatic_spall_power")).toBe(true);
  });
  it("flat face standard not powered", () => {
    expect(powered("flat_face_standard")).toBe(false);
  });
});

describe("crossPeen", () => {
  it("cross peen spall has cross peen", () => {
    expect(crossPeen("cross_peen_spall")).toBe(true);
  });
  it("flat face standard not cross peen", () => {
    expect(crossPeen("flat_face_standard")).toBe(false);
  });
});

describe("faceShape", () => {
  it("round face dome uses domed round face", () => {
    expect(faceShape("round_face_dome")).toBe("domed_round_face");
  });
});

describe("bestUse", () => {
  it("flat face standard best for general chip remove", () => {
    expect(bestUse("flat_face_standard")).toBe("general_chip_remove");
  });
});

describe("spallingHammers", () => {
  it("returns 5 types", () => {
    expect(spallingHammers()).toHaveLength(5);
  });
});
