import { describe, it, expect } from "vitest";
import {
  airflowControl, energyEfficiency, comfortLevel, noiseOutput,
  unitCost, humidityControl, residentialCommon, motorType,
  bestClimate, airHandlers,
} from "../air-handler-calc.js";

describe("airflowControl", () => {
  it("variable speed best airflow control", () => {
    expect(airflowControl("variable_speed")).toBeGreaterThan(airflowControl("single_speed"));
  });
});

describe("energyEfficiency", () => {
  it("variable speed most efficient", () => {
    expect(energyEfficiency("variable_speed")).toBeGreaterThan(energyEfficiency("constant_volume"));
  });
});

describe("comfortLevel", () => {
  it("variable speed most comfortable", () => {
    expect(comfortLevel("variable_speed")).toBeGreaterThan(comfortLevel("single_speed"));
  });
});

describe("noiseOutput", () => {
  it("single speed noisiest", () => {
    expect(noiseOutput("single_speed")).toBeGreaterThan(noiseOutput("variable_speed"));
  });
});

describe("unitCost", () => {
  it("variable speed most expensive", () => {
    expect(unitCost("variable_speed")).toBeGreaterThan(unitCost("single_speed"));
  });
});

describe("humidityControl", () => {
  it("variable speed has humidity control", () => {
    expect(humidityControl("variable_speed")).toBe(true);
  });
  it("single speed does not", () => {
    expect(humidityControl("single_speed")).toBe(false);
  });
});

describe("residentialCommon", () => {
  it("single speed is residential common", () => {
    expect(residentialCommon("single_speed")).toBe(true);
  });
  it("constant volume is not", () => {
    expect(residentialCommon("constant_volume")).toBe(false);
  });
});

describe("motorType", () => {
  it("variable speed uses ecm bldc motor", () => {
    expect(motorType("variable_speed")).toBe("ecm_bldc_motor");
  });
});

describe("bestClimate", () => {
  it("dual fuel for extreme cold heat", () => {
    expect(bestClimate("dual_fuel")).toBe("extreme_cold_heat");
  });
});

describe("airHandlers", () => {
  it("returns 5 handlers", () => {
    expect(airHandlers()).toHaveLength(5);
  });
});
