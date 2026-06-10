import { describe, it, expect } from "vitest";
import {
  forceOutput, positionAccuracy, speedOfResponse,
  energyEfficiency, maintenanceNeed, requiresFluid,
  continuousRotation, controlMethod, typicalApplication, actuatorTypes,
} from "../actuator-type-calc.js";

describe("forceOutput", () => {
  it("hydraulic highest force", () => {
    expect(forceOutput("hydraulic")).toBeGreaterThan(
      forceOutput("piezoelectric")
    );
  });
});

describe("positionAccuracy", () => {
  it("piezoelectric most accurate", () => {
    expect(positionAccuracy("piezoelectric")).toBeGreaterThan(
      positionAccuracy("pneumatic")
    );
  });
});

describe("speedOfResponse", () => {
  it("piezoelectric fastest response", () => {
    expect(speedOfResponse("piezoelectric")).toBeGreaterThan(
      speedOfResponse("hydraulic")
    );
  });
});

describe("energyEfficiency", () => {
  it("piezoelectric most efficient", () => {
    expect(energyEfficiency("piezoelectric")).toBeGreaterThan(
      energyEfficiency("pneumatic")
    );
  });
});

describe("maintenanceNeed", () => {
  it("hydraulic most maintenance", () => {
    expect(maintenanceNeed("hydraulic")).toBeGreaterThan(
      maintenanceNeed("piezoelectric")
    );
  });
});

describe("requiresFluid", () => {
  it("hydraulic requires fluid", () => {
    expect(requiresFluid("hydraulic")).toBe(true);
  });
  it("servo motor does not", () => {
    expect(requiresFluid("servo_motor")).toBe(false);
  });
});

describe("continuousRotation", () => {
  it("stepper motor has continuous rotation", () => {
    expect(continuousRotation("stepper_motor")).toBe(true);
  });
  it("piezoelectric does not", () => {
    expect(continuousRotation("piezoelectric")).toBe(false);
  });
});

describe("controlMethod", () => {
  it("stepper motor uses open loop pulse", () => {
    expect(controlMethod("stepper_motor")).toBe("open_loop_pulse");
  });
});

describe("typicalApplication", () => {
  it("hydraulic for heavy machinery", () => {
    expect(typicalApplication("hydraulic")).toBe("heavy_machinery");
  });
});

describe("actuatorTypes", () => {
  it("returns 5 types", () => {
    expect(actuatorTypes()).toHaveLength(5);
  });
});
