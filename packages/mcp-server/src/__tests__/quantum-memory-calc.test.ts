import { describe, it, expect } from "vitest";
import {
  coherenceTime, readoutFidelity, multimode, operatingTemp,
  qmCost, roomTemp, forRepeater, platform,
  bestUse, quantumMemories,
} from "../quantum-memory-calc.js";

describe("coherenceTime", () => {
  it("rare earth crystal longest coherence", () => {
    expect(coherenceTime("rare_earth_crystal")).toBeGreaterThan(coherenceTime("quantum_dot_spin"));
  });
});

describe("readoutFidelity", () => {
  it("superconducting cavity best readout", () => {
    expect(readoutFidelity("superconducting_cavity")).toBeGreaterThan(readoutFidelity("rare_earth_crystal"));
  });
});

describe("multimode", () => {
  it("rare earth crystal most multimode", () => {
    expect(multimode("rare_earth_crystal")).toBeGreaterThan(multimode("quantum_dot_spin"));
  });
});

describe("operatingTemp", () => {
  it("nitrogen vacancy highest operating temp", () => {
    expect(operatingTemp("nitrogen_vacancy_nv")).toBeGreaterThan(operatingTemp("superconducting_cavity"));
  });
});

describe("qmCost", () => {
  it("superconducting cavity most expensive", () => {
    expect(qmCost("superconducting_cavity")).toBeGreaterThan(qmCost("nitrogen_vacancy_nv"));
  });
});

describe("roomTemp", () => {
  it("nitrogen vacancy is room temp", () => {
    expect(roomTemp("nitrogen_vacancy_nv")).toBe(true);
  });
  it("quantum dot not room temp", () => {
    expect(roomTemp("quantum_dot_spin")).toBe(false);
  });
});

describe("forRepeater", () => {
  it("nitrogen vacancy for repeater", () => {
    expect(forRepeater("nitrogen_vacancy_nv")).toBe(true);
  });
  it("quantum dot not for repeater", () => {
    expect(forRepeater("quantum_dot_spin")).toBe(false);
  });
});

describe("platform", () => {
  it("rare earth uses praseodymium yso crystal", () => {
    expect(platform("rare_earth_crystal")).toBe("praseodymium_yso_crystal");
  });
});

describe("bestUse", () => {
  it("nitrogen vacancy best for quantum network repeater", () => {
    expect(bestUse("nitrogen_vacancy_nv")).toBe("quantum_network_repeater_node");
  });
});

describe("quantumMemories", () => {
  it("returns 5 types", () => {
    expect(quantumMemories()).toHaveLength(5);
  });
});
