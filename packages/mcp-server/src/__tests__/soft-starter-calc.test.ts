import { describe, it, expect } from "vitest";
import {
  currentLimit, torqueControl, efficiency, protection,
  ssCost, electronic, forLargeMotor, method,
  bestUse, softStarterTypes,
} from "../soft-starter-calc.js";

describe("currentLimit", () => {
  it("thyristor best current limit", () => {
    expect(currentLimit("thyristor_scr_standard")).toBeGreaterThan(currentLimit("star_delta_mechanical"));
  });
});

describe("torqueControl", () => {
  it("thyristor best torque control", () => {
    expect(torqueControl("thyristor_scr_standard")).toBeGreaterThan(torqueControl("star_delta_mechanical"));
  });
});

describe("efficiency", () => {
  it("thyristor bypass most efficient", () => {
    expect(efficiency("thyristor_bypass_contactor")).toBeGreaterThan(efficiency("thyristor_scr_standard"));
  });
});

describe("protection", () => {
  it("thyristor bypass best protection", () => {
    expect(protection("thyristor_bypass_contactor")).toBeGreaterThan(protection("star_delta_mechanical"));
  });
});

describe("ssCost", () => {
  it("thyristor bypass most expensive", () => {
    expect(ssCost("thyristor_bypass_contactor")).toBeGreaterThan(ssCost("star_delta_mechanical"));
  });
});

describe("electronic", () => {
  it("thyristor is electronic", () => {
    expect(electronic("thyristor_scr_standard")).toBe(true);
  });
  it("star delta not electronic", () => {
    expect(electronic("star_delta_mechanical")).toBe(false);
  });
});

describe("forLargeMotor", () => {
  it("thyristor for large motor", () => {
    expect(forLargeMotor("thyristor_scr_standard")).toBe(true);
  });
  it("star delta not for large motor", () => {
    expect(forLargeMotor("star_delta_mechanical")).toBe(false);
  });
});

describe("method", () => {
  it("star delta uses star connection start", () => {
    expect(method("star_delta_mechanical")).toBe("star_connection_start_delta_switch_run");
  });
});

describe("bestUse", () => {
  it("thyristor bypass for continuous duty", () => {
    expect(bestUse("thyristor_bypass_contactor")).toBe("continuous_duty_motor_energy_efficient_run");
  });
});

describe("softStarterTypes", () => {
  it("returns 5 types", () => {
    expect(softStarterTypes()).toHaveLength(5);
  });
});
