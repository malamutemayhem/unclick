import { describe, it, expect } from "vitest";
import {
  resolution, accuracy, durability, responseSpeed,
  encoderCost, absolute, withButton, sensingMethod,
  bestUse, rotaryEncoders,
} from "../rotary-encoder-calc.js";

describe("resolution", () => {
  it("optical high res highest resolution", () => {
    expect(resolution("optical_high_res")).toBeGreaterThan(resolution("mechanical_click_basic"));
  });
});

describe("accuracy", () => {
  it("optical high res most accurate", () => {
    expect(accuracy("optical_high_res")).toBeGreaterThan(accuracy("mechanical_click_basic"));
  });
});

describe("durability", () => {
  it("magnetic absolute most durable", () => {
    expect(durability("magnetic_absolute")).toBeGreaterThan(durability("mechanical_click_basic"));
  });
});

describe("responseSpeed", () => {
  it("optical high res fastest response", () => {
    expect(responseSpeed("optical_high_res")).toBeGreaterThan(responseSpeed("mechanical_click_basic"));
  });
});

describe("encoderCost", () => {
  it("optical high res most expensive", () => {
    expect(encoderCost("optical_high_res")).toBeGreaterThan(encoderCost("mechanical_click_basic"));
  });
});

describe("absolute", () => {
  it("magnetic absolute is absolute", () => {
    expect(absolute("magnetic_absolute")).toBe(true);
  });
  it("mechanical click basic not absolute", () => {
    expect(absolute("mechanical_click_basic")).toBe(false);
  });
});

describe("withButton", () => {
  it("mechanical click basic has button", () => {
    expect(withButton("mechanical_click_basic")).toBe(true);
  });
  it("optical high res no button", () => {
    expect(withButton("optical_high_res")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("capacitive touch enc uses capacitive pad array", () => {
    expect(sensingMethod("capacitive_touch_enc")).toBe("capacitive_pad_array");
  });
});

describe("bestUse", () => {
  it("magnetic absolute best for absolute angle sense", () => {
    expect(bestUse("magnetic_absolute")).toBe("absolute_angle_sense");
  });
});

describe("rotaryEncoders", () => {
  it("returns 5 types", () => {
    expect(rotaryEncoders()).toHaveLength(5);
  });
});
