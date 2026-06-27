import { describe, it, expect } from "vitest";
import {
  accuracy, convergence, powerDraw, multipath,
  receiverCost, correction, forAutonomous, constellation,
  bestUse, gnssReceivers,
} from "../gnss-receiver-calc.js";

describe("accuracy", () => {
  it("rtk centimeter most accurate", () => {
    expect(accuracy("rtk_centimeter")).toBeGreaterThan(accuracy("single_freq_l1"));
  });
});

describe("convergence", () => {
  it("dead reckon imu fastest convergence", () => {
    expect(convergence("dead_reckon_imu")).toBeGreaterThan(convergence("ppp_precise_point"));
  });
});

describe("powerDraw", () => {
  it("single freq l1 lowest power draw", () => {
    expect(powerDraw("single_freq_l1")).toBeGreaterThan(powerDraw("dead_reckon_imu"));
  });
});

describe("multipath", () => {
  it("dead reckon imu best multipath rejection", () => {
    expect(multipath("dead_reckon_imu")).toBeGreaterThan(multipath("single_freq_l1"));
  });
});

describe("receiverCost", () => {
  it("rtk centimeter most expensive", () => {
    expect(receiverCost("rtk_centimeter")).toBeGreaterThan(receiverCost("single_freq_l1"));
  });
});

describe("correction", () => {
  it("rtk centimeter uses correction", () => {
    expect(correction("rtk_centimeter")).toBe(true);
  });
  it("single freq l1 no correction", () => {
    expect(correction("single_freq_l1")).toBe(false);
  });
});

describe("forAutonomous", () => {
  it("rtk centimeter is for autonomous", () => {
    expect(forAutonomous("rtk_centimeter")).toBe(true);
  });
  it("single freq l1 not for autonomous", () => {
    expect(forAutonomous("single_freq_l1")).toBe(false);
  });
});

describe("constellation", () => {
  it("single freq l1 uses gps l1 ca only", () => {
    expect(constellation("single_freq_l1")).toBe("gps_l1_ca_only");
  });
});

describe("bestUse", () => {
  it("rtk centimeter best for precision ag drone", () => {
    expect(bestUse("rtk_centimeter")).toBe("precision_ag_drone");
  });
});

describe("gnssReceivers", () => {
  it("returns 5 types", () => {
    expect(gnssReceivers()).toHaveLength(5);
  });
});
