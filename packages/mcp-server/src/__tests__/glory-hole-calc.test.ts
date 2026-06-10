import { describe, it, expect } from "vitest";
import {
  heatSpeed, tempControl, fuelEfficiency, openingSize,
  gloryCost, electric, portable, fuelType,
  bestUse, gloryHoles,
} from "../glory-hole-calc.js";

describe("heatSpeed", () => {
  it("variable temp digital fastest heat", () => {
    expect(heatSpeed("variable_temp_digital")).toBeGreaterThan(heatSpeed("electric_element_box"));
  });
});

describe("tempControl", () => {
  it("variable temp digital best temp control", () => {
    expect(tempControl("variable_temp_digital")).toBeGreaterThan(tempControl("portable_torch_mount"));
  });
});

describe("fuelEfficiency", () => {
  it("electric element box most efficient", () => {
    expect(fuelEfficiency("electric_element_box")).toBeGreaterThan(fuelEfficiency("portable_torch_mount"));
  });
});

describe("openingSize", () => {
  it("dual port shared largest opening", () => {
    expect(openingSize("dual_port_shared")).toBeGreaterThan(openingSize("portable_torch_mount"));
  });
});

describe("gloryCost", () => {
  it("variable temp digital most expensive", () => {
    expect(gloryCost("variable_temp_digital")).toBeGreaterThan(gloryCost("portable_torch_mount"));
  });
});

describe("electric", () => {
  it("electric element box is electric", () => {
    expect(electric("electric_element_box")).toBe(true);
  });
  it("gas fired standard not electric", () => {
    expect(electric("gas_fired_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("portable torch mount is portable", () => {
    expect(portable("portable_torch_mount")).toBe(true);
  });
  it("gas fired standard not portable", () => {
    expect(portable("gas_fired_standard")).toBe(false);
  });
});

describe("fuelType", () => {
  it("variable temp digital uses electric digital pid", () => {
    expect(fuelType("variable_temp_digital")).toBe("electric_digital_pid");
  });
});

describe("bestUse", () => {
  it("variable temp digital best for color work precision", () => {
    expect(bestUse("variable_temp_digital")).toBe("color_work_precision");
  });
});

describe("gloryHoles", () => {
  it("returns 5 types", () => {
    expect(gloryHoles()).toHaveLength(5);
  });
});
