import { describe, it, expect } from "vitest";
import {
  stoppingPower, heatDissipation, costScore,
  maintenanceFrequency, fadingResistance, recoversEnergy,
  selfAdjusting, typicalVehicle, activationMechanism, brakeSystems,
} from "../brake-system-calc.js";

describe("stoppingPower", () => {
  it("carbon_ceramic best stopping", () => {
    expect(stoppingPower("carbon_ceramic")).toBeGreaterThan(
      stoppingPower("drum")
    );
  });
});

describe("heatDissipation", () => {
  it("carbon_ceramic best heat dissipation", () => {
    expect(heatDissipation("carbon_ceramic")).toBeGreaterThan(
      heatDissipation("drum")
    );
  });
});

describe("costScore", () => {
  it("carbon_ceramic most expensive", () => {
    expect(costScore("carbon_ceramic")).toBeGreaterThan(
      costScore("drum")
    );
  });
});

describe("maintenanceFrequency", () => {
  it("air_brake needs most maintenance", () => {
    expect(maintenanceFrequency("air_brake")).toBeGreaterThan(
      maintenanceFrequency("regenerative")
    );
  });
});

describe("fadingResistance", () => {
  it("carbon_ceramic best fade resistance", () => {
    expect(fadingResistance("carbon_ceramic")).toBeGreaterThan(
      fadingResistance("drum")
    );
  });
});

describe("recoversEnergy", () => {
  it("regenerative recovers energy", () => {
    expect(recoversEnergy("regenerative")).toBe(true);
  });
  it("disc does not", () => {
    expect(recoversEnergy("disc")).toBe(false);
  });
});

describe("selfAdjusting", () => {
  it("drum is self adjusting", () => {
    expect(selfAdjusting("drum")).toBe(true);
  });
  it("disc is not", () => {
    expect(selfAdjusting("disc")).toBe(false);
  });
});

describe("typicalVehicle", () => {
  it("regenerative for hybrid ev", () => {
    expect(typicalVehicle("regenerative")).toBe("hybrid_ev");
  });
});

describe("activationMechanism", () => {
  it("air_brake uses compressed air", () => {
    expect(activationMechanism("air_brake")).toBe("compressed_air");
  });
});

describe("brakeSystems", () => {
  it("returns 5 systems", () => {
    expect(brakeSystems()).toHaveLength(5);
  });
});
