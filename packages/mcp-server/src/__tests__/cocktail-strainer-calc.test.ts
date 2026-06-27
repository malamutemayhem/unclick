import { describe, it, expect } from "vitest";
import {
  strainPrecision, flowSpeed, easeOfUse, iceControl,
  strainerCost, fitsAllGlasses, catchesPulp, meshType,
  bestDrink, cocktailStrainers,
} from "../cocktail-strainer-calc.js";

describe("strainPrecision", () => {
  it("fine mesh conical most precise strain", () => {
    expect(strainPrecision("fine_mesh_conical")).toBeGreaterThan(strainPrecision("built_in_shaker_lid"));
  });
});

describe("flowSpeed", () => {
  it("built in shaker lid fastest flow", () => {
    expect(flowSpeed("built_in_shaker_lid")).toBeGreaterThan(flowSpeed("double_strain_combo"));
  });
});

describe("easeOfUse", () => {
  it("built in shaker lid easiest to use", () => {
    expect(easeOfUse("built_in_shaker_lid")).toBeGreaterThan(easeOfUse("double_strain_combo"));
  });
});

describe("iceControl", () => {
  it("hawthorne coil spring best ice control", () => {
    expect(iceControl("hawthorne_coil_spring")).toBeGreaterThan(iceControl("built_in_shaker_lid"));
  });
});

describe("strainerCost", () => {
  it("double strain combo most expensive", () => {
    expect(strainerCost("double_strain_combo")).toBeGreaterThan(strainerCost("built_in_shaker_lid"));
  });
});

describe("fitsAllGlasses", () => {
  it("hawthorne coil spring fits all glasses", () => {
    expect(fitsAllGlasses("hawthorne_coil_spring")).toBe(true);
  });
  it("julep perforated cap does not", () => {
    expect(fitsAllGlasses("julep_perforated_cap")).toBe(false);
  });
});

describe("catchesPulp", () => {
  it("fine mesh conical catches pulp", () => {
    expect(catchesPulp("fine_mesh_conical")).toBe(true);
  });
  it("hawthorne coil spring does not", () => {
    expect(catchesPulp("hawthorne_coil_spring")).toBe(false);
  });
});

describe("meshType", () => {
  it("double strain combo uses hawthorne plus fine mesh", () => {
    expect(meshType("double_strain_combo")).toBe("hawthorne_plus_fine_mesh");
  });
});

describe("bestDrink", () => {
  it("fine mesh conical best for citrus egg white foam", () => {
    expect(bestDrink("fine_mesh_conical")).toBe("citrus_egg_white_foam");
  });
});

describe("cocktailStrainers", () => {
  it("returns 5 types", () => {
    expect(cocktailStrainers()).toHaveLength(5);
  });
});
