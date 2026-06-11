import { describe, it, expect } from "vitest";
import {
  density, speed, powerEff, reconfigurable,
  fpgaCost, instantOn, forPrototype, config,
  bestUse, fpgaFamilies,
} from "../fpga-family-calc.js";

describe("density", () => {
  it("sram lut based highest density", () => {
    expect(density("sram_lut_based")).toBeGreaterThan(density("eprom_uv_erase"));
  });
});

describe("speed", () => {
  it("sram lut based fastest", () => {
    expect(speed("sram_lut_based")).toBeGreaterThan(speed("eprom_uv_erase"));
  });
});

describe("powerEff", () => {
  it("antifuse otp most power efficient", () => {
    expect(powerEff("antifuse_otp")).toBeGreaterThan(powerEff("sram_lut_based"));
  });
});

describe("reconfigurable", () => {
  it("sram lut based most reconfigurable", () => {
    expect(reconfigurable("sram_lut_based")).toBeGreaterThan(reconfigurable("antifuse_otp"));
  });
});

describe("fpgaCost", () => {
  it("soc fpga hybrid most expensive", () => {
    expect(fpgaCost("soc_fpga_hybrid")).toBeGreaterThan(fpgaCost("eprom_uv_erase"));
  });
});

describe("instantOn", () => {
  it("flash non volatile is instant on", () => {
    expect(instantOn("flash_non_volatile")).toBe(true);
  });
  it("sram lut based not instant on", () => {
    expect(instantOn("sram_lut_based")).toBe(false);
  });
});

describe("forPrototype", () => {
  it("sram lut based for prototype", () => {
    expect(forPrototype("sram_lut_based")).toBe(true);
  });
  it("antifuse otp not for prototype", () => {
    expect(forPrototype("antifuse_otp")).toBe(false);
  });
});

describe("config", () => {
  it("antifuse otp uses one time fuse blow", () => {
    expect(config("antifuse_otp")).toBe("one_time_fuse_blow");
  });
});

describe("bestUse", () => {
  it("soc fpga hybrid best for embedded vision edge", () => {
    expect(bestUse("soc_fpga_hybrid")).toBe("embedded_vision_edge");
  });
});

describe("fpgaFamilies", () => {
  it("returns 5 types", () => {
    expect(fpgaFamilies()).toHaveLength(5);
  });
});
