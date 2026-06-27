import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, powerDraw, density,
  ddrCost, onDieEcc, forMobile, interface_,
  bestUse, ddrGens,
} from "../ddr-gen-calc.js";

describe("bandwidth", () => {
  it("gddr6x 21gbps highest bandwidth", () => {
    expect(bandwidth("gddr6x_21gbps")).toBeGreaterThan(bandwidth("ddr4_3200"));
  });
});

describe("latency", () => {
  it("ddr4 3200 best latency", () => {
    expect(latency("ddr4_3200")).toBeGreaterThan(latency("ddr5_6400"));
  });
});

describe("powerDraw", () => {
  it("lpddr5x 8533 lowest power", () => {
    expect(powerDraw("lpddr5x_8533")).toBeGreaterThan(powerDraw("gddr6x_21gbps"));
  });
});

describe("density", () => {
  it("lpddr5x 8533 highest density", () => {
    expect(density("lpddr5x_8533")).toBeGreaterThan(density("ddr4_3200"));
  });
});

describe("ddrCost", () => {
  it("lpddr5x 8533 most expensive", () => {
    expect(ddrCost("lpddr5x_8533")).toBeGreaterThan(ddrCost("ddr4_3200"));
  });
});

describe("onDieEcc", () => {
  it("ddr5 6400 has on die ecc", () => {
    expect(onDieEcc("ddr5_6400")).toBe(true);
  });
  it("ddr4 3200 no on die ecc", () => {
    expect(onDieEcc("ddr4_3200")).toBe(false);
  });
});

describe("forMobile", () => {
  it("lpddr5 6400 is for mobile", () => {
    expect(forMobile("lpddr5_6400")).toBe(true);
  });
  it("ddr4 3200 not for mobile", () => {
    expect(forMobile("ddr4_3200")).toBe(false);
  });
});

describe("interface_", () => {
  it("gddr6x 21gbps uses 32bit pam4 1v35", () => {
    expect(interface_("gddr6x_21gbps")).toBe("32bit_pam4_1v35");
  });
});

describe("bestUse", () => {
  it("lpddr5x 8533 best for on device ai phone", () => {
    expect(bestUse("lpddr5x_8533")).toBe("on_device_ai_phone");
  });
});

describe("ddrGens", () => {
  it("returns 5 types", () => {
    expect(ddrGens()).toHaveLength(5);
  });
});
