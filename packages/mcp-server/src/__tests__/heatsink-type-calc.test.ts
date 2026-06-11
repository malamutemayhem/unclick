import { describe, it, expect } from "vitest";
import {
  thermalRes, airflow, weight, formFactor,
  sinkCost, active, forDatacenter, finType,
  bestUse, heatsinkTypes,
} from "../heatsink-type-calc.js";

describe("thermalRes", () => {
  it("heat pipe tower best thermal resistance", () => {
    expect(thermalRes("heat_pipe_tower")).toBeGreaterThan(thermalRes("extruded_aluminum"));
  });
});

describe("airflow", () => {
  it("heat pipe tower best airflow handling", () => {
    expect(airflow("heat_pipe_tower")).toBeGreaterThan(airflow("extruded_aluminum"));
  });
});

describe("weight", () => {
  it("heat pipe tower heaviest", () => {
    expect(weight("heat_pipe_tower")).toBeGreaterThan(weight("extruded_aluminum"));
  });
});

describe("formFactor", () => {
  it("vapor chamber best form factor", () => {
    expect(formFactor("vapor_chamber")).toBeGreaterThan(formFactor("heat_pipe_tower"));
  });
});

describe("sinkCost", () => {
  it("vapor chamber most expensive", () => {
    expect(sinkCost("vapor_chamber")).toBeGreaterThan(sinkCost("extruded_aluminum"));
  });
});

describe("active", () => {
  it("heat pipe tower is active", () => {
    expect(active("heat_pipe_tower")).toBe(true);
  });
  it("extruded aluminum not active", () => {
    expect(active("extruded_aluminum")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("skived copper is for datacenter", () => {
    expect(forDatacenter("skived_copper")).toBe(true);
  });
  it("extruded aluminum not for datacenter", () => {
    expect(forDatacenter("extruded_aluminum")).toBe(false);
  });
});

describe("finType", () => {
  it("vapor chamber uses flat 2phase spread", () => {
    expect(finType("vapor_chamber")).toBe("flat_2phase_spread");
  });
});

describe("bestUse", () => {
  it("heat pipe tower best for desktop cpu air tower", () => {
    expect(bestUse("heat_pipe_tower")).toBe("desktop_cpu_air_tower");
  });
});

describe("heatsinkTypes", () => {
  it("returns 5 types", () => {
    expect(heatsinkTypes()).toHaveLength(5);
  });
});
