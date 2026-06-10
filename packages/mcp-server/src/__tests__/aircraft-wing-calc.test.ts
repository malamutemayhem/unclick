import { describe, it, expect } from "vitest";
import {
  liftEfficiency, highSpeedPerformance, maneuverability,
  structuralWeight, fuelCapacity, supersonicCapable,
  lowSpeedStable, typicalAircraft, aspectRatio, aircraftWings,
} from "../aircraft-wing-calc.js";

describe("liftEfficiency", () => {
  it("straight wing has best lift", () => {
    expect(liftEfficiency("straight")).toBeGreaterThan(
      liftEfficiency("delta")
    );
  });
});

describe("highSpeedPerformance", () => {
  it("delta performs best at speed", () => {
    expect(highSpeedPerformance("delta")).toBeGreaterThan(
      highSpeedPerformance("straight")
    );
  });
});

describe("maneuverability", () => {
  it("forward swept is most maneuverable", () => {
    expect(maneuverability("forward_swept")).toBeGreaterThan(
      maneuverability("straight")
    );
  });
});

describe("structuralWeight", () => {
  it("variable sweep is heaviest", () => {
    expect(structuralWeight("variable_sweep")).toBeGreaterThan(
      structuralWeight("straight")
    );
  });
});

describe("fuelCapacity", () => {
  it("delta holds most fuel", () => {
    expect(fuelCapacity("delta")).toBeGreaterThan(
      fuelCapacity("straight")
    );
  });
});

describe("supersonicCapable", () => {
  it("delta is supersonic capable", () => {
    expect(supersonicCapable("delta")).toBe(true);
  });
  it("straight is not", () => {
    expect(supersonicCapable("straight")).toBe(false);
  });
});

describe("lowSpeedStable", () => {
  it("straight is stable at low speed", () => {
    expect(lowSpeedStable("straight")).toBe(true);
  });
  it("delta is not", () => {
    expect(lowSpeedStable("delta")).toBe(false);
  });
});

describe("typicalAircraft", () => {
  it("delta used by concorde", () => {
    expect(typicalAircraft("delta")).toBe("concorde");
  });
});

describe("aspectRatio", () => {
  it("straight has highest aspect ratio", () => {
    expect(aspectRatio("straight")).toBeGreaterThan(
      aspectRatio("delta")
    );
  });
});

describe("aircraftWings", () => {
  it("returns 5 types", () => {
    expect(aircraftWings()).toHaveLength(5);
  });
});
