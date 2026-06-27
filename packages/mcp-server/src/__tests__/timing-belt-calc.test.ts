import { describe, it, expect } from "vitest";
import {
  torque, speed, precision, life,
  tbCost, doubleSided, forServo, tooth,
  bestUse, timingBeltTypes,
} from "../timing-belt-calc.js";

describe("torque", () => {
  it("AT polyurethane highest torque", () => {
    expect(torque("at_metric_polyurethane")).toBeGreaterThan(torque("xl_trapezoidal_light"));
  });
});

describe("speed", () => {
  it("XL trapezoidal fastest", () => {
    expect(speed("xl_trapezoidal_light")).toBeGreaterThan(speed("at_metric_polyurethane"));
  });
});

describe("precision", () => {
  it("GT3 most precise", () => {
    expect(precision("gt3_modified_curvilinear")).toBeGreaterThan(precision("xl_trapezoidal_light"));
  });
});

describe("life", () => {
  it("AT polyurethane longest life", () => {
    expect(life("at_metric_polyurethane")).toBeGreaterThan(life("xl_trapezoidal_light"));
  });
});

describe("tbCost", () => {
  it("AT polyurethane most expensive", () => {
    expect(tbCost("at_metric_polyurethane")).toBeGreaterThan(tbCost("xl_trapezoidal_light"));
  });
});

describe("doubleSided", () => {
  it("STPD is double sided", () => {
    expect(doubleSided("stpd_double_sided")).toBe(true);
  });
  it("GT3 not double sided", () => {
    expect(doubleSided("gt3_modified_curvilinear")).toBe(false);
  });
});

describe("forServo", () => {
  it("GT3 for servo", () => {
    expect(forServo("gt3_modified_curvilinear")).toBe(true);
  });
  it("XL not for servo", () => {
    expect(forServo("xl_trapezoidal_light")).toBe(false);
  });
});

describe("tooth", () => {
  it("HTD uses curvilinear 8mm", () => {
    expect(tooth("htd_curvilinear_8m")).toBe("curvilinear_8mm_pitch_neoprene");
  });
});

describe("bestUse", () => {
  it("GT3 for servo axis cnc", () => {
    expect(bestUse("gt3_modified_curvilinear")).toBe("servo_axis_cnc_precision_index");
  });
});

describe("timingBeltTypes", () => {
  it("returns 5 types", () => {
    expect(timingBeltTypes()).toHaveLength(5);
  });
});
