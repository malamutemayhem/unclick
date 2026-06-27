import { describe, it, expect } from "vitest";
import {
  durability, shieldingEff, machinability, weatherResist,
  boxCost, metalBody, forOutdoor, material,
  bestUse, projectBoxes,
} from "../project-box-calc.js";

describe("durability", () => {
  it("die cast ip67 most durable", () => {
    expect(durability("die_cast_ip67")).toBeGreaterThan(durability("clear_acrylic_display"));
  });
});

describe("shieldingEff", () => {
  it("aluminum extruded best shielding", () => {
    expect(shieldingEff("aluminum_extruded")).toBeGreaterThan(shieldingEff("abs_plastic_desktop"));
  });
});

describe("machinability", () => {
  it("abs plastic desktop most machinable", () => {
    expect(machinability("abs_plastic_desktop")).toBeGreaterThan(machinability("die_cast_ip67"));
  });
});

describe("weatherResist", () => {
  it("die cast ip67 best weather resistance", () => {
    expect(weatherResist("die_cast_ip67")).toBeGreaterThan(weatherResist("clear_acrylic_display"));
  });
});

describe("boxCost", () => {
  it("die cast ip67 most expensive", () => {
    expect(boxCost("die_cast_ip67")).toBeGreaterThan(boxCost("abs_plastic_desktop"));
  });
});

describe("metalBody", () => {
  it("aluminum extruded has metal body", () => {
    expect(metalBody("aluminum_extruded")).toBe(true);
  });
  it("abs plastic desktop no metal body", () => {
    expect(metalBody("abs_plastic_desktop")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("die cast ip67 is for outdoor", () => {
    expect(forOutdoor("die_cast_ip67")).toBe(true);
  });
  it("abs plastic desktop not for outdoor", () => {
    expect(forOutdoor("abs_plastic_desktop")).toBe(false);
  });
});

describe("material", () => {
  it("clear acrylic display uses cast acrylic clear", () => {
    expect(material("clear_acrylic_display")).toBe("cast_acrylic_clear");
  });
});

describe("bestUse", () => {
  it("aluminum extruded best for rf shielded enclosure", () => {
    expect(bestUse("aluminum_extruded")).toBe("rf_shielded_enclosure");
  });
});

describe("projectBoxes", () => {
  it("returns 5 types", () => {
    expect(projectBoxes()).toHaveLength(5);
  });
});
