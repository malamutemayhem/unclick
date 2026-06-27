import { describe, it, expect } from "vitest";
import {
  clampVoltage, peakPower, responseSpeed, capacitance,
  tvsCost, bidirectional, forData, packageType,
  bestUse, tvsDiodes,
} from "../tvs-diode-calc.js";

describe("clampVoltage", () => {
  it("automotive grade best clamp voltage", () => {
    expect(clampVoltage("automotive_grade_high")).toBeGreaterThan(clampVoltage("low_cap_data_line"));
  });
});

describe("peakPower", () => {
  it("automotive grade highest peak power", () => {
    expect(peakPower("automotive_grade_high")).toBeGreaterThan(peakPower("low_cap_data_line"));
  });
});

describe("responseSpeed", () => {
  it("low cap data line fastest response", () => {
    expect(responseSpeed("low_cap_data_line")).toBeGreaterThan(responseSpeed("automotive_grade_high"));
  });
});

describe("capacitance", () => {
  it("low cap data line lowest capacitance score highest", () => {
    expect(capacitance("low_cap_data_line")).toBeGreaterThan(capacitance("automotive_grade_high"));
  });
});

describe("tvsCost", () => {
  it("automotive grade most expensive", () => {
    expect(tvsCost("automotive_grade_high")).toBeGreaterThan(tvsCost("unidirectional_smd"));
  });
});

describe("bidirectional", () => {
  it("bidirectional thru is bidirectional", () => {
    expect(bidirectional("bidirectional_thru")).toBe(true);
  });
  it("unidirectional smd not bidirectional", () => {
    expect(bidirectional("unidirectional_smd")).toBe(false);
  });
});

describe("forData", () => {
  it("tvs array is for data", () => {
    expect(forData("tvs_array_multi_line")).toBe(true);
  });
  it("unidirectional smd not for data", () => {
    expect(forData("unidirectional_smd")).toBe(false);
  });
});

describe("packageType", () => {
  it("automotive grade uses smc high power", () => {
    expect(packageType("automotive_grade_high")).toBe("smc_high_power");
  });
});

describe("bestUse", () => {
  it("low cap data line best for high speed data guard", () => {
    expect(bestUse("low_cap_data_line")).toBe("high_speed_data_guard");
  });
});

describe("tvsDiodes", () => {
  it("returns 5 types", () => {
    expect(tvsDiodes()).toHaveLength(5);
  });
});
