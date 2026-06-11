import { describe, it, expect } from "vitest";
import {
  accuracy, response, stability, range,
  rsCost, threeWire, forSanitary, element,
  bestUse, rtdSensorTypes,
} from "../rtd-sensor-calc.js";

describe("accuracy", () => {
  it("Pt100 wire wound most accurate", () => {
    expect(accuracy("pt100_wire_wound")).toBeGreaterThan(accuracy("copper_10_motor"));
  });
});

describe("response", () => {
  it("nickel 120 fastest response", () => {
    expect(response("nickel_120_fast")).toBeGreaterThan(response("pt100_wire_wound"));
  });
});

describe("stability", () => {
  it("Pt100 wire wound most stable", () => {
    expect(stability("pt100_wire_wound")).toBeGreaterThan(stability("copper_10_motor"));
  });
});

describe("range", () => {
  it("Pt100 wire wound widest range", () => {
    expect(range("pt100_wire_wound")).toBeGreaterThan(range("copper_10_motor"));
  });
});

describe("rsCost", () => {
  it("sanitary tri-clamp most expensive", () => {
    expect(rsCost("pt100_sanitary_tri_clamp")).toBeGreaterThan(rsCost("copper_10_motor"));
  });
});

describe("threeWire", () => {
  it("Pt100 wire wound is three-wire", () => {
    expect(threeWire("pt100_wire_wound")).toBe(true);
  });
  it("Pt1000 thin film not three-wire", () => {
    expect(threeWire("pt1000_thin_film")).toBe(false);
  });
});

describe("forSanitary", () => {
  it("tri-clamp for sanitary", () => {
    expect(forSanitary("pt100_sanitary_tri_clamp")).toBe(true);
  });
  it("wire wound not for sanitary", () => {
    expect(forSanitary("pt100_wire_wound")).toBe(false);
  });
});

describe("element", () => {
  it("copper 10 uses copper motor embedded", () => {
    expect(element("copper_10_motor")).toBe("copper_10_ohm_motor_embedded");
  });
});

describe("bestUse", () => {
  it("Pt1000 thin film for HVAC process general", () => {
    expect(bestUse("pt1000_thin_film")).toBe("hvac_process_general_two_wire");
  });
});

describe("rtdSensorTypes", () => {
  it("returns 5 types", () => {
    expect(rtdSensorTypes()).toHaveLength(5);
  });
});
