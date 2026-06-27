import { describe, it, expect } from "vitest";
import {
  heatOutput, ambiance, smokeLevel, setupEase,
  pitCost, needsFuel, portableLightweight, fuelSource,
  bestSetting, firePits,
} from "../fire-pit-calc.js";

describe("heatOutput", () => {
  it("wood burning steel highest heat", () => {
    expect(heatOutput("wood_burning_steel")).toBeGreaterThan(heatOutput("gel_fuel_tabletop"));
  });
});

describe("ambiance", () => {
  it("wood burning steel best ambiance", () => {
    expect(ambiance("wood_burning_steel")).toBeGreaterThan(ambiance("propane_gas_table"));
  });
});

describe("smokeLevel", () => {
  it("wood burning steel most smoke", () => {
    expect(smokeLevel("wood_burning_steel")).toBeGreaterThan(smokeLevel("smokeless_airflow"));
  });
});

describe("setupEase", () => {
  it("gel fuel tabletop easiest setup", () => {
    expect(setupEase("gel_fuel_tabletop")).toBeGreaterThan(setupEase("chiminea_clay"));
  });
});

describe("pitCost", () => {
  it("smokeless airflow most expensive", () => {
    expect(pitCost("smokeless_airflow")).toBeGreaterThan(pitCost("gel_fuel_tabletop"));
  });
});

describe("needsFuel", () => {
  it("wood burning steel needs fuel", () => {
    expect(needsFuel("wood_burning_steel")).toBe(true);
  });
  it("propane gas table needs fuel", () => {
    expect(needsFuel("propane_gas_table")).toBe(true);
  });
});

describe("portableLightweight", () => {
  it("gel fuel tabletop is portable", () => {
    expect(portableLightweight("gel_fuel_tabletop")).toBe(true);
  });
  it("wood burning steel is not", () => {
    expect(portableLightweight("wood_burning_steel")).toBe(false);
  });
});

describe("fuelSource", () => {
  it("propane gas table uses propane tank 20lb", () => {
    expect(fuelSource("propane_gas_table")).toBe("propane_tank_20lb");
  });
});

describe("bestSetting", () => {
  it("gel fuel tabletop for apartment balcony small", () => {
    expect(bestSetting("gel_fuel_tabletop")).toBe("apartment_balcony_small");
  });
});

describe("firePits", () => {
  it("returns 5 types", () => {
    expect(firePits()).toHaveLength(5);
  });
});
