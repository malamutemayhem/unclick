import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, thickness, adhesion,
  epCost, selective, forPrecision, platerConfig,
  bestUse, electroplaterTypes,
} from "../electroplater-calc.js";

describe("coatUniformity", () => {
  it("pulse plate best coat uniformity", () => {
    expect(coatUniformity("pulse_plate")).toBeGreaterThan(coatUniformity("barrel_plate"));
  });
});

describe("throughput", () => {
  it("barrel plate highest throughput", () => {
    expect(throughput("barrel_plate")).toBeGreaterThan(throughput("brush_plate"));
  });
});

describe("thickness", () => {
  it("pulse plate best thickness", () => {
    expect(thickness("pulse_plate")).toBeGreaterThan(thickness("barrel_plate"));
  });
});

describe("adhesion", () => {
  it("pulse plate best adhesion", () => {
    expect(adhesion("pulse_plate")).toBeGreaterThan(adhesion("barrel_plate"));
  });
});

describe("epCost", () => {
  it("pulse plate most expensive", () => {
    expect(epCost("pulse_plate")).toBeGreaterThan(epCost("barrel_plate"));
  });
});

describe("selective", () => {
  it("brush plate is selective", () => {
    expect(selective("brush_plate")).toBe(true);
  });
  it("rack plate not selective", () => {
    expect(selective("rack_plate")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("pulse plate for precision", () => {
    expect(forPrecision("pulse_plate")).toBe(true);
  });
  it("rack plate not for precision", () => {
    expect(forPrecision("rack_plate")).toBe(false);
  });
});

describe("platerConfig", () => {
  it("electroless plate uses chemical reduce no current uniform complex", () => {
    expect(platerConfig("electroless_plate")).toBe("electroless_plater_chemical_reduce_no_current_uniform_complex");
  });
});

describe("bestUse", () => {
  it("pulse plate for pcb via periodic reverse fine grain fill", () => {
    expect(bestUse("pulse_plate")).toBe("pcb_via_pulse_electroplater_periodic_reverse_fine_grain_fill");
  });
});

describe("electroplaterTypes", () => {
  it("returns 5 types", () => {
    expect(electroplaterTypes()).toHaveLength(5);
  });
});
