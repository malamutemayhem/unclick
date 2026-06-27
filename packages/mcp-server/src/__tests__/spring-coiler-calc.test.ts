import { describe, it, expect } from "vitest";
import {
  coilAccuracy, throughput, wireRange, repeatability,
  srCost, cnc, forComplex, coilerConfig,
  bestUse, springCoilerTypes,
} from "../spring-coiler-calc.js";

describe("coilAccuracy", () => {
  it("cnc coiler best coil accuracy", () => {
    expect(coilAccuracy("cnc_coiler")).toBeGreaterThan(coilAccuracy("cam_coiler"));
  });
});

describe("throughput", () => {
  it("cam coiler highest throughput", () => {
    expect(throughput("cam_coiler")).toBeGreaterThan(throughput("wire_former"));
  });
});

describe("wireRange", () => {
  it("wire former widest wire range", () => {
    expect(wireRange("wire_former")).toBeGreaterThan(wireRange("cam_coiler"));
  });
});

describe("repeatability", () => {
  it("cnc coiler best repeatability", () => {
    expect(repeatability("cnc_coiler")).toBeGreaterThan(repeatability("cam_coiler"));
  });
});

describe("srCost", () => {
  it("cnc coiler most expensive", () => {
    expect(srCost("cnc_coiler")).toBeGreaterThan(srCost("cam_coiler"));
  });
});

describe("cnc", () => {
  it("cnc coiler is cnc", () => {
    expect(cnc("cnc_coiler")).toBe(true);
  });
  it("cam coiler not cnc", () => {
    expect(cnc("cam_coiler")).toBe(false);
  });
});

describe("forComplex", () => {
  it("wire former for complex", () => {
    expect(forComplex("wire_former")).toBe(true);
  });
  it("cam coiler not for complex", () => {
    expect(forComplex("cam_coiler")).toBe(false);
  });
});

describe("coilerConfig", () => {
  it("wire former uses multi slide bend cut 3d wire shape", () => {
    expect(coilerConfig("wire_former")).toBe("wire_former_spring_coiler_multi_slide_bend_cut_3d_wire_shape");
  });
});

describe("bestUse", () => {
  it("cnc coiler for precision spring servo variable rate complex shape", () => {
    expect(bestUse("cnc_coiler")).toBe("precision_spring_cnc_coiler_servo_variable_rate_complex_shape");
  });
});

describe("springCoilerTypes", () => {
  it("returns 5 types", () => {
    expect(springCoilerTypes()).toHaveLength(5);
  });
});
