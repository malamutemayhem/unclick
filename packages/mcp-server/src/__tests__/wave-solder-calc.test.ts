import { describe, it, expect } from "vitest";
import {
  throughput, jointQuality, defectRate, flexibility,
  machineCost, leadFree, selective, waveType,
  bestUse, waveSolders,
} from "../wave-solder-calc.js";

describe("throughput", () => {
  it("dual wave smd highest throughput", () => {
    expect(throughput("dual_wave_smd")).toBeGreaterThan(throughput("selective_mini_wave"));
  });
});

describe("jointQuality", () => {
  it("selective mini wave best joint quality", () => {
    expect(jointQuality("selective_mini_wave")).toBeGreaterThan(jointQuality("single_wave_basic"));
  });
});

describe("defectRate", () => {
  it("selective mini wave lowest defect rate", () => {
    expect(defectRate("selective_mini_wave")).toBeGreaterThan(defectRate("single_wave_basic"));
  });
});

describe("flexibility", () => {
  it("selective mini wave most flexible", () => {
    expect(flexibility("selective_mini_wave")).toBeGreaterThan(flexibility("single_wave_basic"));
  });
});

describe("machineCost", () => {
  it("selective mini wave most expensive", () => {
    expect(machineCost("selective_mini_wave")).toBeGreaterThan(machineCost("single_wave_basic"));
  });
});

describe("leadFree", () => {
  it("nitrogen inert wave is lead free", () => {
    expect(leadFree("nitrogen_inert_wave")).toBe(true);
  });
  it("single wave basic not lead free", () => {
    expect(leadFree("single_wave_basic")).toBe(false);
  });
});

describe("selective", () => {
  it("selective mini wave is selective", () => {
    expect(selective("selective_mini_wave")).toBe(true);
  });
  it("dual wave smd not selective", () => {
    expect(selective("dual_wave_smd")).toBe(false);
  });
});

describe("waveType", () => {
  it("nitrogen inert uses n2 blanketed wave", () => {
    expect(waveType("nitrogen_inert_wave")).toBe("n2_blanketed_wave");
  });
});

describe("bestUse", () => {
  it("dual wave smd best for mixed tech board solder", () => {
    expect(bestUse("dual_wave_smd")).toBe("mixed_tech_board_solder");
  });
});

describe("waveSolders", () => {
  it("returns 5 types", () => {
    expect(waveSolders()).toHaveLength(5);
  });
});
