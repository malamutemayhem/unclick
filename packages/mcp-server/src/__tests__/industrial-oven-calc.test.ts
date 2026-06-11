import { describe, it, expect } from "vitest";
import {
  temperature, uniformity, throughput, energy,
  ioCost, continuous, forCuring, heating,
  bestUse, industrialOvenTypes,
} from "../industrial-oven-calc.js";

describe("temperature", () => {
  it("vacuum highest temperature", () => {
    expect(temperature("vacuum_degassing")).toBeGreaterThan(temperature("cleanroom_class_100"));
  });
});

describe("uniformity", () => {
  it("cleanroom best uniformity", () => {
    expect(uniformity("cleanroom_class_100")).toBeGreaterThan(uniformity("infrared_rapid_cure"));
  });
});

describe("throughput", () => {
  it("continuous conveyor highest throughput", () => {
    expect(throughput("continuous_conveyor_gas")).toBeGreaterThan(throughput("batch_cabinet_electric"));
  });
});

describe("energy", () => {
  it("infrared most energy efficient", () => {
    expect(energy("infrared_rapid_cure")).toBeGreaterThan(energy("vacuum_degassing"));
  });
});

describe("ioCost", () => {
  it("cleanroom most expensive", () => {
    expect(ioCost("cleanroom_class_100")).toBeGreaterThan(ioCost("batch_cabinet_electric"));
  });
});

describe("continuous", () => {
  it("conveyor is continuous", () => {
    expect(continuous("continuous_conveyor_gas")).toBe(true);
  });
  it("batch not continuous", () => {
    expect(continuous("batch_cabinet_electric")).toBe(false);
  });
});

describe("forCuring", () => {
  it("batch for curing", () => {
    expect(forCuring("batch_cabinet_electric")).toBe(true);
  });
  it("vacuum not curing", () => {
    expect(forCuring("vacuum_degassing")).toBe(false);
  });
});

describe("heating", () => {
  it("cleanroom uses hepa filtered", () => {
    expect(heating("cleanroom_class_100")).toBe("hepa_filtered_laminar_electric");
  });
});

describe("bestUse", () => {
  it("vacuum for aerospace", () => {
    expect(bestUse("vacuum_degassing")).toBe("aerospace_composite_autoclave");
  });
});

describe("industrialOvenTypes", () => {
  it("returns 5 types", () => {
    expect(industrialOvenTypes()).toHaveLength(5);
  });
});
