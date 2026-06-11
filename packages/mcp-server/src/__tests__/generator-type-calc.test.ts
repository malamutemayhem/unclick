import { describe, it, expect } from "vitest";
import {
  efficiency, power, reliability, control,
  gnCost, brushless, forWind, excitation,
  bestUse, generatorTypes,
} from "../generator-type-calc.js";

describe("efficiency", () => {
  it("permanent magnet most efficient", () => {
    expect(efficiency("permanent_magnet_direct")).toBeGreaterThan(efficiency("linear_free_piston"));
  });
});

describe("power", () => {
  it("synchronous wound highest power", () => {
    expect(power("synchronous_wound_rotor")).toBeGreaterThan(power("linear_free_piston"));
  });
});

describe("reliability", () => {
  it("induction squirrel cage most reliable", () => {
    expect(reliability("induction_squirrel_cage")).toBeGreaterThan(reliability("linear_free_piston"));
  });
});

describe("control", () => {
  it("synchronous wound best control", () => {
    expect(control("synchronous_wound_rotor")).toBeGreaterThan(control("induction_squirrel_cage"));
  });
});

describe("gnCost", () => {
  it("permanent magnet most expensive", () => {
    expect(gnCost("permanent_magnet_direct")).toBeGreaterThan(gnCost("induction_squirrel_cage"));
  });
});

describe("brushless", () => {
  it("induction squirrel cage is brushless", () => {
    expect(brushless("induction_squirrel_cage")).toBe(true);
  });
  it("synchronous wound not brushless", () => {
    expect(brushless("synchronous_wound_rotor")).toBe(false);
  });
});

describe("forWind", () => {
  it("permanent magnet for wind", () => {
    expect(forWind("permanent_magnet_direct")).toBe(true);
  });
  it("synchronous wound not for wind", () => {
    expect(forWind("synchronous_wound_rotor")).toBe(false);
  });
});

describe("excitation", () => {
  it("permanent magnet uses rare earth magnet rotor", () => {
    expect(excitation("permanent_magnet_direct")).toBe("rare_earth_magnet_rotor");
  });
});

describe("bestUse", () => {
  it("doubly fed best for onshore wind", () => {
    expect(bestUse("doubly_fed_induction")).toBe("onshore_wind_variable_speed");
  });
});

describe("generatorTypes", () => {
  it("returns 5 types", () => {
    expect(generatorTypes()).toHaveLength(5);
  });
});
