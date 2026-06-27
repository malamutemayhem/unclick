import { describe, it, expect } from "vitest";
import {
  grindFineness, throughput, mediaWear, tempControl,
  amCost, wetGrind, forCeramic, millConfig,
  bestUse, attritionMillTypes,
} from "../attrition-mill-calc.js";

describe("grindFineness", () => {
  it("horizontal attritor best grind fineness", () => {
    expect(grindFineness("horizontal_attritor")).toBeGreaterThan(grindFineness("single_runner"));
  });
});

describe("throughput", () => {
  it("single runner highest throughput", () => {
    expect(throughput("single_runner")).toBeGreaterThan(throughput("vertical_attritor"));
  });
});

describe("mediaWear", () => {
  it("circulation attritor highest media wear", () => {
    expect(mediaWear("circulation_attritor")).toBeGreaterThan(mediaWear("single_runner"));
  });
});

describe("tempControl", () => {
  it("horizontal attritor best temp control", () => {
    expect(tempControl("horizontal_attritor")).toBeGreaterThan(tempControl("single_runner"));
  });
});

describe("amCost", () => {
  it("circulation attritor most expensive", () => {
    expect(amCost("circulation_attritor")).toBeGreaterThan(amCost("single_runner"));
  });
});

describe("wetGrind", () => {
  it("vertical attritor uses wet grind", () => {
    expect(wetGrind("vertical_attritor")).toBe(true);
  });
  it("single runner no wet grind", () => {
    expect(wetGrind("single_runner")).toBe(false);
  });
});

describe("forCeramic", () => {
  it("vertical attritor for ceramic", () => {
    expect(forCeramic("vertical_attritor")).toBe(true);
  });
  it("circulation attritor not for ceramic", () => {
    expect(forCeramic("circulation_attritor")).toBe(false);
  });
});

describe("millConfig", () => {
  it("double runner uses two disc counter rotate intense shear", () => {
    expect(millConfig("double_runner")).toBe("double_runner_attrition_mill_two_disc_counter_rotate_intense_shear");
  });
});

describe("bestUse", () => {
  it("horizontal attritor for ink pigment disc stir jacket cool fine", () => {
    expect(bestUse("horizontal_attritor")).toBe("ink_pigment_horizontal_attritor_mill_disc_stir_jacket_cool_fine");
  });
});

describe("attritionMillTypes", () => {
  it("returns 5 types", () => {
    expect(attritionMillTypes()).toHaveLength(5);
  });
});
