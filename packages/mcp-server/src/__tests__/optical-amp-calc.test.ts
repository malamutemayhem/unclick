import { describe, it, expect } from "vitest";
import {
  gain, noiseFigure, bandwidth, saturationPower,
  oaCost, distributed, forCband, medium,
  bestUse, opticalAmps,
} from "../optical-amp-calc.js";

describe("gain", () => {
  it("hybrid raman edfa highest gain", () => {
    expect(gain("hybrid_raman_edfa")).toBeGreaterThan(gain("soa_semiconductor"));
  });
});

describe("noiseFigure", () => {
  it("raman distributed best noise figure", () => {
    expect(noiseFigure("raman_distributed")).toBeGreaterThan(noiseFigure("soa_semiconductor"));
  });
});

describe("bandwidth", () => {
  it("tdfa thulium widest bandwidth", () => {
    expect(bandwidth("tdfa_thulium_fiber")).toBeGreaterThan(bandwidth("edfa_erbium_fiber"));
  });
});

describe("saturationPower", () => {
  it("raman distributed highest saturation power", () => {
    expect(saturationPower("raman_distributed")).toBeGreaterThan(saturationPower("soa_semiconductor"));
  });
});

describe("oaCost", () => {
  it("hybrid raman edfa most expensive", () => {
    expect(oaCost("hybrid_raman_edfa")).toBeGreaterThan(oaCost("soa_semiconductor"));
  });
});

describe("distributed", () => {
  it("raman distributed is distributed", () => {
    expect(distributed("raman_distributed")).toBe(true);
  });
  it("edfa not distributed", () => {
    expect(distributed("edfa_erbium_fiber")).toBe(false);
  });
});

describe("forCband", () => {
  it("edfa for c band", () => {
    expect(forCband("edfa_erbium_fiber")).toBe(true);
  });
  it("soa not for c band", () => {
    expect(forCband("soa_semiconductor")).toBe(false);
  });
});

describe("medium", () => {
  it("raman uses transmission fiber itself", () => {
    expect(medium("raman_distributed")).toBe("transmission_fiber_itself");
  });
});

describe("bestUse", () => {
  it("hybrid raman edfa best for transoceanic", () => {
    expect(bestUse("hybrid_raman_edfa")).toBe("transoceanic_max_reach");
  });
});

describe("opticalAmps", () => {
  it("returns 5 types", () => {
    expect(opticalAmps()).toHaveLength(5);
  });
});
