import { describe, it, expect } from "vitest";
import {
  throughput, pinCount, complexity, compatibility,
  spiCost, ddrCapable, forFlash, dataLines,
  bestUse, spiModes,
} from "../spi-mode-calc.js";

describe("throughput", () => {
  it("octal ddr highest throughput", () => {
    expect(throughput("octal_ddr")).toBeGreaterThan(throughput("standard_single"));
  });
});

describe("pinCount", () => {
  it("standard single fewest pins needed", () => {
    expect(pinCount("standard_single")).toBeGreaterThan(pinCount("octal_ddr"));
  });
});

describe("complexity", () => {
  it("octal ddr most complex", () => {
    expect(complexity("octal_ddr")).toBeGreaterThan(complexity("standard_single"));
  });
});

describe("compatibility", () => {
  it("standard single most compatible", () => {
    expect(compatibility("standard_single")).toBeGreaterThan(compatibility("octal_ddr"));
  });
});

describe("spiCost", () => {
  it("octal ddr most expensive", () => {
    expect(spiCost("octal_ddr")).toBeGreaterThan(spiCost("standard_single"));
  });
});

describe("ddrCapable", () => {
  it("quad io is ddr capable", () => {
    expect(ddrCapable("quad_io")).toBe(true);
  });
  it("standard single not ddr capable", () => {
    expect(ddrCapable("standard_single")).toBe(false);
  });
});

describe("forFlash", () => {
  it("quad io for flash", () => {
    expect(forFlash("quad_io")).toBe(true);
  });
  it("standard single not for flash", () => {
    expect(forFlash("standard_single")).toBe(false);
  });
});

describe("dataLines", () => {
  it("octal ddr uses bidirectional 8bit ddr", () => {
    expect(dataLines("octal_ddr")).toBe("bidirectional_8bit_ddr");
  });
});

describe("bestUse", () => {
  it("qspi xip best for mcu code execute flash", () => {
    expect(bestUse("qspi_xip")).toBe("mcu_code_execute_flash");
  });
});

describe("spiModes", () => {
  it("returns 5 types", () => {
    expect(spiModes()).toHaveLength(5);
  });
});
