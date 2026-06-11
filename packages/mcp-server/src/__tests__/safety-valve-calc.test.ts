import { describe, it, expect } from "vitest";
import {
  capacity, precision, reliability, backPressure,
  svCost, reseat, forSteam, actuator,
  bestUse, safetyValveTypes,
} from "../safety-valve-calc.js";

describe("capacity", () => {
  it("pilot operated highest capacity", () => {
    expect(capacity("pilot_operated_piston")).toBeGreaterThan(capacity("temperature_actuated_thermal"));
  });
});

describe("precision", () => {
  it("pilot operated most precise", () => {
    expect(precision("pilot_operated_piston")).toBeGreaterThan(precision("vacuum_relief_breather"));
  });
});

describe("reliability", () => {
  it("spring loaded high reliability", () => {
    expect(reliability("spring_loaded_conventional")).toBeGreaterThan(reliability("pilot_operated_piston"));
  });
});

describe("backPressure", () => {
  it("pilot operated best back pressure tolerance", () => {
    expect(backPressure("pilot_operated_piston")).toBeGreaterThan(backPressure("spring_loaded_conventional"));
  });
});

describe("svCost", () => {
  it("pilot operated most expensive", () => {
    expect(svCost("pilot_operated_piston")).toBeGreaterThan(svCost("vacuum_relief_breather"));
  });
});

describe("reseat", () => {
  it("all types reseat", () => {
    expect(reseat("spring_loaded_conventional")).toBe(true);
    expect(reseat("pilot_operated_piston")).toBe(true);
  });
});

describe("forSteam", () => {
  it("spring loaded for steam", () => {
    expect(forSteam("spring_loaded_conventional")).toBe(true);
  });
  it("pilot operated not for steam", () => {
    expect(forSteam("pilot_operated_piston")).toBe(false);
  });
});

describe("actuator", () => {
  it("balanced bellows uses bellows balance", () => {
    expect(actuator("balanced_bellows_back")).toBe("bellows_balance_spring_isolate");
  });
});

describe("bestUse", () => {
  it("vacuum relief for storage tank", () => {
    expect(bestUse("vacuum_relief_breather")).toBe("storage_tank_vacuum_protect_vent");
  });
});

describe("safetyValveTypes", () => {
  it("returns 5 types", () => {
    expect(safetyValveTypes()).toHaveLength(5);
  });
});
