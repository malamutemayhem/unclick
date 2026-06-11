import { describe, it, expect } from "vitest";
import {
  speed, quality, versatility, registration,
  fpCost, rotary, forPackaging, plate,
  bestUse, flexographicPrintTypes,
} from "../flexographic-print-calc.js";

describe("speed", () => {
  it("ci drum fastest", () => {
    expect(speed("ci_central_impression")).toBeGreaterThan(speed("stack_type_vertical"));
  });
});

describe("quality", () => {
  it("sleeve best quality", () => {
    expect(quality("sleeve_seamless_cylinder")).toBeGreaterThan(quality("stack_type_vertical"));
  });
});

describe("versatility", () => {
  it("inline most versatile", () => {
    expect(versatility("inline_horizontal_web")).toBeGreaterThan(versatility("sleeve_seamless_cylinder"));
  });
});

describe("registration", () => {
  it("ci best registration", () => {
    expect(registration("ci_central_impression")).toBeGreaterThan(registration("stack_type_vertical"));
  });
});

describe("fpCost", () => {
  it("sleeve most expensive", () => {
    expect(fpCost("sleeve_seamless_cylinder")).toBeGreaterThan(fpCost("stack_type_vertical"));
  });
});

describe("rotary", () => {
  it("ci is rotary", () => {
    expect(rotary("ci_central_impression")).toBe(true);
  });
});

describe("forPackaging", () => {
  it("ci for packaging", () => {
    expect(forPackaging("ci_central_impression")).toBe(true);
  });
  it("inline not for packaging", () => {
    expect(forPackaging("inline_horizontal_web")).toBe(false);
  });
});

describe("plate", () => {
  it("sleeve uses seamless laser", () => {
    expect(plate("sleeve_seamless_cylinder")).toBe("seamless_sleeve_laser_engrave");
  });
});

describe("bestUse", () => {
  it("ci for film packaging", () => {
    expect(bestUse("ci_central_impression")).toBe("film_packaging_multicolor_register");
  });
});

describe("flexographicPrintTypes", () => {
  it("returns 5 types", () => {
    expect(flexographicPrintTypes()).toHaveLength(5);
  });
});
