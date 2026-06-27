import { describe, it, expect } from "vitest";
import {
  heatSpeed, tempAccuracy, tipVariety, portability,
  ironCost, adjustable, cordless, heatingElement,
  bestProject, solderIrons,
} from "../solder-iron-calc.js";

describe("heatSpeed", () => {
  it("gun trigger fast fastest heating", () => {
    expect(heatSpeed("gun_trigger_fast")).toBeGreaterThan(heatSpeed("resistance_tweezer"));
  });
});

describe("tempAccuracy", () => {
  it("temp control station most accurate", () => {
    expect(tempAccuracy("temp_control_station")).toBeGreaterThan(tempAccuracy("butane_torch_port"));
  });
});

describe("tipVariety", () => {
  it("temp control station most tip variety", () => {
    expect(tipVariety("temp_control_station")).toBeGreaterThan(tipVariety("gun_trigger_fast"));
  });
});

describe("portability", () => {
  it("butane torch port most portable", () => {
    expect(portability("butane_torch_port")).toBeGreaterThan(portability("temp_control_station"));
  });
});

describe("ironCost", () => {
  it("temp control station most expensive", () => {
    expect(ironCost("temp_control_station")).toBeGreaterThan(ironCost("pencil_iron_fixed"));
  });
});

describe("adjustable", () => {
  it("temp control station is adjustable", () => {
    expect(adjustable("temp_control_station")).toBe(true);
  });
  it("pencil iron fixed is not adjustable", () => {
    expect(adjustable("pencil_iron_fixed")).toBe(false);
  });
});

describe("cordless", () => {
  it("butane torch port is cordless", () => {
    expect(cordless("butane_torch_port")).toBe(true);
  });
  it("temp control station is not cordless", () => {
    expect(cordless("temp_control_station")).toBe(false);
  });
});

describe("heatingElement", () => {
  it("gun trigger fast uses transformer loop tip", () => {
    expect(heatingElement("gun_trigger_fast")).toBe("transformer_loop_tip");
  });
});

describe("bestProject", () => {
  it("temp control station best for stained glass panel", () => {
    expect(bestProject("temp_control_station")).toBe("stained_glass_panel");
  });
});

describe("solderIrons", () => {
  it("returns 5 types", () => {
    expect(solderIrons()).toHaveLength(5);
  });
});
