import { describe, it, expect } from "vitest";
import {
  accuracy, bandwidth, isolation, insertionLoss,
  csCost, bidirectional, forMotor, principle,
  bestUse, currentSenses,
} from "../current-sense-calc.js";

describe("accuracy", () => {
  it("fluxgate closed loop most accurate", () => {
    expect(accuracy("fluxgate_closed_loop")).toBeGreaterThan(accuracy("mosfet_rds_on"));
  });
});

describe("bandwidth", () => {
  it("rogowski coil ac widest bandwidth", () => {
    expect(bandwidth("rogowski_coil_ac")).toBeGreaterThan(bandwidth("hall_effect_isolated"));
  });
});

describe("isolation", () => {
  it("fluxgate closed loop highest isolation", () => {
    expect(isolation("fluxgate_closed_loop")).toBeGreaterThan(isolation("shunt_resistor_low"));
  });
});

describe("insertionLoss", () => {
  it("rogowski coil ac lowest insertion loss", () => {
    expect(insertionLoss("rogowski_coil_ac")).toBeGreaterThan(insertionLoss("shunt_resistor_low"));
  });
});

describe("csCost", () => {
  it("fluxgate closed loop most expensive", () => {
    expect(csCost("fluxgate_closed_loop")).toBeGreaterThan(csCost("shunt_resistor_low"));
  });
});

describe("bidirectional", () => {
  it("shunt resistor low is bidirectional", () => {
    expect(bidirectional("shunt_resistor_low")).toBe(true);
  });
  it("rogowski coil ac not bidirectional", () => {
    expect(bidirectional("rogowski_coil_ac")).toBe(false);
  });
});

describe("forMotor", () => {
  it("hall effect isolated for motor", () => {
    expect(forMotor("hall_effect_isolated")).toBe(true);
  });
  it("shunt resistor low not for motor", () => {
    expect(forMotor("shunt_resistor_low")).toBe(false);
  });
});

describe("principle", () => {
  it("rogowski coil ac uses di dt air core integral", () => {
    expect(principle("rogowski_coil_ac")).toBe("di_dt_air_core_integral");
  });
});

describe("bestUse", () => {
  it("fluxgate closed loop best for precision inverter control", () => {
    expect(bestUse("fluxgate_closed_loop")).toBe("precision_inverter_control");
  });
});

describe("currentSenses", () => {
  it("returns 5 types", () => {
    expect(currentSenses()).toHaveLength(5);
  });
});
