import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, powerDraw, density,
  ifCost, ecc, forAi, busWidth,
  bestUse, memoryInterfaces,
} from "../memory-interface-calc.js";

describe("bandwidth", () => {
  it("hbm3 stack highest bandwidth", () => {
    expect(bandwidth("hbm3_stack")).toBeGreaterThan(bandwidth("ddr4_sdram"));
  });
});

describe("latency", () => {
  it("hbm3 stack lowest latency", () => {
    expect(latency("hbm3_stack")).toBeGreaterThan(latency("gddr6x_graphics"));
  });
});

describe("powerDraw", () => {
  it("gddr6x graphics highest power draw", () => {
    expect(powerDraw("gddr6x_graphics")).toBeGreaterThan(powerDraw("lpddr5x_mobile"));
  });
});

describe("density", () => {
  it("hbm3 stack highest density", () => {
    expect(density("hbm3_stack")).toBeGreaterThan(density("ddr4_sdram"));
  });
});

describe("ifCost", () => {
  it("hbm3 stack most expensive", () => {
    expect(ifCost("hbm3_stack")).toBeGreaterThan(ifCost("ddr4_sdram"));
  });
});

describe("ecc", () => {
  it("ddr5 sdram has ecc", () => {
    expect(ecc("ddr5_sdram")).toBe(true);
  });
  it("lpddr5x mobile no ecc", () => {
    expect(ecc("lpddr5x_mobile")).toBe(false);
  });
});

describe("forAi", () => {
  it("hbm3 stack is for ai", () => {
    expect(forAi("hbm3_stack")).toBe(true);
  });
  it("ddr4 sdram not for ai", () => {
    expect(forAi("ddr4_sdram")).toBe(false);
  });
});

describe("busWidth", () => {
  it("hbm3 stack uses 1024bit tsv stack", () => {
    expect(busWidth("hbm3_stack")).toBe("1024bit_tsv_stack");
  });
});

describe("bestUse", () => {
  it("hbm3 stack best for ai training accelerator", () => {
    expect(bestUse("hbm3_stack")).toBe("ai_training_accelerator");
  });
});

describe("memoryInterfaces", () => {
  it("returns 5 types", () => {
    expect(memoryInterfaces()).toHaveLength(5);
  });
});
