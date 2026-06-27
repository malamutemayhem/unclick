import { describe, it, expect } from "vitest";
import {
  endurance, speed, retention, density,
  mramCost, nonVolatile, forCache, switching,
  bestUse, mramTypes,
} from "../mram-type-calc.js";

describe("endurance", () => {
  it("toggle mram highest endurance", () => {
    expect(endurance("toggle_mram")).toBeGreaterThan(endurance("vcma_mram"));
  });
});

describe("speed", () => {
  it("sot mram fastest speed", () => {
    expect(speed("sot_mram")).toBeGreaterThan(speed("toggle_mram"));
  });
});

describe("retention", () => {
  it("toggle mram best retention", () => {
    expect(retention("toggle_mram")).toBeGreaterThan(retention("vcma_mram"));
  });
});

describe("density", () => {
  it("vcma mram highest density", () => {
    expect(density("vcma_mram")).toBeGreaterThan(density("toggle_mram"));
  });
});

describe("mramCost", () => {
  it("sot mram most expensive", () => {
    expect(mramCost("sot_mram")).toBeGreaterThan(mramCost("toggle_mram"));
  });
});

describe("nonVolatile", () => {
  it("stt mram is non volatile", () => {
    expect(nonVolatile("stt_mram")).toBe(true);
  });
});

describe("forCache", () => {
  it("stt mram is for cache", () => {
    expect(forCache("stt_mram")).toBe(true);
  });
  it("toggle mram not for cache", () => {
    expect(forCache("toggle_mram")).toBe(false);
  });
});

describe("switching", () => {
  it("sot mram uses spin orbit torque", () => {
    expect(switching("sot_mram")).toBe("spin_orbit_torque");
  });
});

describe("bestUse", () => {
  it("embedded emram best for mcu code flash replace", () => {
    expect(bestUse("embedded_emram")).toBe("mcu_code_flash_replace");
  });
});

describe("mramTypes", () => {
  it("returns 5 types", () => {
    expect(mramTypes()).toHaveLength(5);
  });
});
