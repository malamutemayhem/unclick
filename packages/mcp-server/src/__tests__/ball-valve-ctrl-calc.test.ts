import { describe, it, expect } from "vitest";
import {
  capacity, shutoff, rangeability, speed,
  bvCost, quarterTurn, forSlurry, ball,
  bestUse, ballValveCtrlTypes,
} from "../ball-valve-ctrl-calc.js";

describe("capacity", () => {
  it("full bore trunnion highest capacity", () => {
    expect(capacity("full_bore_trunnion")).toBeGreaterThan(capacity("v_port_segment"));
  });
});

describe("shutoff", () => {
  it("full bore trunnion best shutoff", () => {
    expect(shutoff("full_bore_trunnion")).toBeGreaterThan(shutoff("metal_seated_high_temp"));
  });
});

describe("rangeability", () => {
  it("v port segment best rangeability", () => {
    expect(rangeability("v_port_segment")).toBeGreaterThan(rangeability("full_bore_trunnion"));
  });
});

describe("speed", () => {
  it("v port segment fastest", () => {
    expect(speed("v_port_segment")).toBeGreaterThan(speed("metal_seated_high_temp"));
  });
});

describe("bvCost", () => {
  it("metal seated most expensive", () => {
    expect(bvCost("metal_seated_high_temp")).toBeGreaterThan(bvCost("v_port_segment"));
  });
});

describe("quarterTurn", () => {
  it("all ball valves are quarter turn", () => {
    expect(quarterTurn("v_port_segment")).toBe(true);
    expect(quarterTurn("full_bore_trunnion")).toBe(true);
  });
});

describe("forSlurry", () => {
  it("cavity filler for slurry", () => {
    expect(forSlurry("cavity_filler_clog")).toBe(true);
  });
  it("v port segment not for slurry", () => {
    expect(forSlurry("v_port_segment")).toBe(false);
  });
});

describe("ball", () => {
  it("metal seated uses stellite chrome", () => {
    expect(ball("metal_seated_high_temp")).toBe("stellite_chrome_metal_seat_high_temp");
  });
});

describe("bestUse", () => {
  it("cavity filler for food pharma flush", () => {
    expect(bestUse("cavity_filler_clog")).toBe("food_pharma_flush_cavity_no_buildup");
  });
});

describe("ballValveCtrlTypes", () => {
  it("returns 5 types", () => {
    expect(ballValveCtrlTypes()).toHaveLength(5);
  });
});
