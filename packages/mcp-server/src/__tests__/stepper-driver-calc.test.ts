import { describe, it, expect } from "vitest";
import {
  resolution, torque, noise, efficiency,
  driverCost, closedLoop, for3dPrint, drive,
  bestUse, stepperDrivers,
} from "../stepper-driver-calc.js";

describe("resolution", () => {
  it("closed loop servo highest resolution", () => {
    expect(resolution("closed_loop_servo")).toBeGreaterThan(resolution("full_step_wave"));
  });
});

describe("torque", () => {
  it("closed loop servo highest torque", () => {
    expect(torque("closed_loop_servo")).toBeGreaterThan(torque("microstep_256"));
  });
});

describe("noise", () => {
  it("silent stealthchop lowest noise", () => {
    expect(noise("silent_stealthchop")).toBeGreaterThan(noise("full_step_wave"));
  });
});

describe("efficiency", () => {
  it("closed loop servo highest efficiency", () => {
    expect(efficiency("closed_loop_servo")).toBeGreaterThan(efficiency("full_step_wave"));
  });
});

describe("driverCost", () => {
  it("closed loop servo most expensive", () => {
    expect(driverCost("closed_loop_servo")).toBeGreaterThan(driverCost("full_step_wave"));
  });
});

describe("closedLoop", () => {
  it("closed loop servo is closed loop", () => {
    expect(closedLoop("closed_loop_servo")).toBe(true);
  });
  it("microstep 256 not closed loop", () => {
    expect(closedLoop("microstep_256")).toBe(false);
  });
});

describe("for3dPrint", () => {
  it("microstep 256 is for 3d print", () => {
    expect(for3dPrint("microstep_256")).toBe(true);
  });
  it("full step wave not for 3d print", () => {
    expect(for3dPrint("full_step_wave")).toBe(false);
  });
});

describe("drive", () => {
  it("silent stealthchop uses voltage mode spread", () => {
    expect(drive("silent_stealthchop")).toBe("voltage_mode_spread");
  });
});

describe("bestUse", () => {
  it("silent stealthchop best for desktop 3d printer", () => {
    expect(bestUse("silent_stealthchop")).toBe("desktop_3d_printer");
  });
});

describe("stepperDrivers", () => {
  it("returns 5 types", () => {
    expect(stepperDrivers()).toHaveLength(5);
  });
});
