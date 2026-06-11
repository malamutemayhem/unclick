import { describe, it, expect } from "vitest";
import {
  problemSize, speed, solutionQuality, programmability,
  isingCost, continuous, forCombinatorial, substrate,
  bestUse, isingMachines,
} from "../ising-machine-calc.js";

describe("problemSize", () => {
  it("quantum annealer largest problem size", () => {
    expect(problemSize("quantum_annealer")).toBeGreaterThan(problemSize("memristor_hopfield"));
  });
});

describe("speed", () => {
  it("memristor hopfield fastest", () => {
    expect(speed("memristor_hopfield")).toBeGreaterThan(speed("quantum_annealer"));
  });
});

describe("solutionQuality", () => {
  it("quantum annealer best solution quality", () => {
    expect(solutionQuality("quantum_annealer")).toBeGreaterThan(solutionQuality("memristor_hopfield"));
  });
});

describe("programmability", () => {
  it("fpga parallel sa most programmable", () => {
    expect(programmability("fpga_parallel_sa")).toBeGreaterThan(programmability("memristor_hopfield"));
  });
});

describe("isingCost", () => {
  it("quantum annealer most expensive", () => {
    expect(isingCost("quantum_annealer")).toBeGreaterThan(isingCost("fpga_parallel_sa"));
  });
});

describe("continuous", () => {
  it("coherent ising opl is continuous", () => {
    expect(continuous("coherent_ising_opl")).toBe(true);
  });
  it("quantum annealer not continuous", () => {
    expect(continuous("quantum_annealer")).toBe(false);
  });
});

describe("forCombinatorial", () => {
  it("digital simulated bifurc for combinatorial", () => {
    expect(forCombinatorial("digital_simulated_bifurc")).toBe(true);
  });
  it("memristor hopfield not for combinatorial", () => {
    expect(forCombinatorial("memristor_hopfield")).toBe(false);
  });
});

describe("substrate", () => {
  it("coherent ising uses optical parametric oscillator", () => {
    expect(substrate("coherent_ising_opl")).toBe("optical_parametric_oscillator");
  });
});

describe("bestUse", () => {
  it("fpga parallel sa best for scheduling constraint sat", () => {
    expect(bestUse("fpga_parallel_sa")).toBe("scheduling_constraint_sat");
  });
});

describe("isingMachines", () => {
  it("returns 5 types", () => {
    expect(isingMachines()).toHaveLength(5);
  });
});
