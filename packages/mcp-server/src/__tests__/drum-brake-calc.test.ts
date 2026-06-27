import { describe, it, expect } from "vitest";
import {
  torque, response, heatDissipation, selfEnergize,
  drCost, failsafe, forParking, shoe,
  bestUse, drumBrakeTypes,
} from "../drum-brake-calc.js";

describe("torque", () => {
  it("thruster hydraulic highest torque", () => {
    expect(torque("thruster_hydraulic_shoe")).toBeGreaterThan(torque("leading_trailing_simplex"));
  });
});

describe("response", () => {
  it("electromagnetic fastest response", () => {
    expect(response("electromagnetic_dc_coil")).toBeGreaterThan(response("thruster_hydraulic_shoe"));
  });
});

describe("heatDissipation", () => {
  it("thruster hydraulic best dissipation", () => {
    expect(heatDissipation("thruster_hydraulic_shoe")).toBeGreaterThan(heatDissipation("leading_trailing_simplex"));
  });
});

describe("selfEnergize", () => {
  it("duo servo highest self energize", () => {
    expect(selfEnergize("duo_servo_self_energize")).toBeGreaterThan(selfEnergize("electromagnetic_dc_coil"));
  });
});

describe("drCost", () => {
  it("thruster hydraulic most expensive", () => {
    expect(drCost("thruster_hydraulic_shoe")).toBeGreaterThan(drCost("leading_trailing_simplex"));
  });
});

describe("failsafe", () => {
  it("electromagnetic is failsafe", () => {
    expect(failsafe("electromagnetic_dc_coil")).toBe(true);
  });
  it("leading trailing not failsafe", () => {
    expect(failsafe("leading_trailing_simplex")).toBe(false);
  });
});

describe("forParking", () => {
  it("duo servo for parking", () => {
    expect(forParking("duo_servo_self_energize")).toBe(true);
  });
  it("electromagnetic not for parking", () => {
    expect(forParking("electromagnetic_dc_coil")).toBe(false);
  });
});

describe("shoe", () => {
  it("band brake uses woven lining", () => {
    expect(shoe("band_brake_external")).toBe("woven_asbestos_free_band_lining");
  });
});

describe("bestUse", () => {
  it("electromagnetic for motor shaft failsafe", () => {
    expect(bestUse("electromagnetic_dc_coil")).toBe("motor_shaft_conveyor_failsafe_stop");
  });
});

describe("drumBrakeTypes", () => {
  it("returns 5 types", () => {
    expect(drumBrakeTypes()).toHaveLength(5);
  });
});
