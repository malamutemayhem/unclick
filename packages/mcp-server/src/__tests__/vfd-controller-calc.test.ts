import { describe, it, expect } from "vitest";
import {
  speedAccuracy, throughput, torqueResponse, energySaving,
  vcCost, encoderRequired, forPump, controllerConfig,
  bestUse, vfdControllerTypes,
} from "../vfd-controller-calc.js";

describe("speedAccuracy", () => {
  it("closed loop best speed accuracy", () => {
    expect(speedAccuracy("closed_loop_vector")).toBeGreaterThan(speedAccuracy("volts_per_hz"));
  });
});

describe("throughput", () => {
  it("direct torque highest throughput", () => {
    expect(throughput("direct_torque")).toBeGreaterThan(throughput("volts_per_hz"));
  });
});

describe("torqueResponse", () => {
  it("direct torque best torque response", () => {
    expect(torqueResponse("direct_torque")).toBeGreaterThan(torqueResponse("volts_per_hz"));
  });
});

describe("energySaving", () => {
  it("regenerative vfd best energy saving", () => {
    expect(energySaving("regenerative_vfd")).toBeGreaterThan(energySaving("volts_per_hz"));
  });
});

describe("vcCost", () => {
  it("direct torque most expensive", () => {
    expect(vcCost("direct_torque")).toBeGreaterThan(vcCost("volts_per_hz"));
  });
});

describe("encoderRequired", () => {
  it("closed loop requires encoder", () => {
    expect(encoderRequired("closed_loop_vector")).toBe(true);
  });
  it("sensorless vector no encoder required", () => {
    expect(encoderRequired("sensorless_vector")).toBe(false);
  });
});

describe("forPump", () => {
  it("volts per hz for pump", () => {
    expect(forPump("volts_per_hz")).toBe(true);
  });
  it("closed loop not for pump", () => {
    expect(forPump("closed_loop_vector")).toBe(false);
  });
});

describe("controllerConfig", () => {
  it("regenerative uses active front end brake energy return", () => {
    expect(controllerConfig("regenerative_vfd")).toBe("regenerative_vfd_controller_active_front_end_brake_energy_return");
  });
});

describe("bestUse", () => {
  it("direct torque for crane hoist instant torque response", () => {
    expect(bestUse("direct_torque")).toBe("crane_hoist_direct_torque_vfd_controller_instant_torque_response");
  });
});

describe("vfdControllerTypes", () => {
  it("returns 5 types", () => {
    expect(vfdControllerTypes()).toHaveLength(5);
  });
});
