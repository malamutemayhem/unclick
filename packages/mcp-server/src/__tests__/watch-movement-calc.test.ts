import { describe, it, expect } from "vitest";
import {
  accuracyPerDay, powerReserve, maintenanceCost, craftsmanshipValue,
  thickness, requiresBattery, sweepSecondHand, energySource,
  serviceInterval, watchMovements,
} from "../watch-movement-calc.js";

describe("accuracyPerDay", () => {
  it("spring drive most accurate", () => {
    expect(accuracyPerDay("spring_drive")).toBeGreaterThan(accuracyPerDay("manual_wind"));
  });
});

describe("powerReserve", () => {
  it("solar longest power reserve", () => {
    expect(powerReserve("solar")).toBeGreaterThan(powerReserve("manual_wind"));
  });
});

describe("maintenanceCost", () => {
  it("spring drive highest maintenance", () => {
    expect(maintenanceCost("spring_drive")).toBeGreaterThan(maintenanceCost("quartz"));
  });
});

describe("craftsmanshipValue", () => {
  it("manual wind highest craftsmanship", () => {
    expect(craftsmanshipValue("manual_wind")).toBeGreaterThan(craftsmanshipValue("quartz"));
  });
});

describe("thickness", () => {
  it("automatic thickest due to rotor", () => {
    expect(thickness("automatic")).toBeGreaterThan(thickness("quartz"));
  });
});

describe("requiresBattery", () => {
  it("quartz requires battery", () => {
    expect(requiresBattery("quartz")).toBe(true);
  });
  it("automatic does not", () => {
    expect(requiresBattery("automatic")).toBe(false);
  });
});

describe("sweepSecondHand", () => {
  it("automatic has sweep second hand", () => {
    expect(sweepSecondHand("automatic")).toBe(true);
  });
  it("quartz does not", () => {
    expect(sweepSecondHand("quartz")).toBe(false);
  });
});

describe("energySource", () => {
  it("solar uses light rechargeable cell", () => {
    expect(energySource("solar")).toBe("light_rechargeable_cell");
  });
});

describe("serviceInterval", () => {
  it("solar has 10 plus years interval", () => {
    expect(serviceInterval("solar")).toBe("10_plus_years");
  });
});

describe("watchMovements", () => {
  it("returns 5 movements", () => {
    expect(watchMovements()).toHaveLength(5);
  });
});
