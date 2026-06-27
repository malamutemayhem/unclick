import { describe, it, expect } from "vitest";
import {
  dosePrecision, uniformity, throughput, energyRange,
  imCost, conformal, forWell, species,
  bestUse, implants,
} from "../implant-calc.js";

describe("dosePrecision", () => {
  it("focused ion beam best dose precision", () => {
    expect(dosePrecision("focused_ion_beam_fib")).toBeGreaterThan(dosePrecision("plasma_doping_plad"));
  });
});

describe("uniformity", () => {
  it("beamline best uniformity", () => {
    expect(uniformity("beamline_medium_current")).toBeGreaterThan(uniformity("focused_ion_beam_fib"));
  });
});

describe("throughput", () => {
  it("high current batch highest throughput", () => {
    expect(throughput("high_current_batch")).toBeGreaterThan(throughput("focused_ion_beam_fib"));
  });
});

describe("energyRange", () => {
  it("high energy mev widest energy range", () => {
    expect(energyRange("high_energy_mev")).toBeGreaterThan(energyRange("plasma_doping_plad"));
  });
});

describe("imCost", () => {
  it("focused ion beam most expensive", () => {
    expect(imCost("focused_ion_beam_fib")).toBeGreaterThan(imCost("high_current_batch"));
  });
});

describe("conformal", () => {
  it("plasma doping is conformal", () => {
    expect(conformal("plasma_doping_plad")).toBe(true);
  });
  it("beamline not conformal", () => {
    expect(conformal("beamline_medium_current")).toBe(false);
  });
});

describe("forWell", () => {
  it("high energy mev for well", () => {
    expect(forWell("high_energy_mev")).toBe(true);
  });
  it("high current batch not for well", () => {
    expect(forWell("high_current_batch")).toBe(false);
  });
});

describe("species", () => {
  it("plasma doping uses bf3 conformal ultra shallow", () => {
    expect(species("plasma_doping_plad")).toBe("bf3_conformal_ultra_shallow");
  });
});

describe("bestUse", () => {
  it("high current batch best for source drain", () => {
    expect(bestUse("high_current_batch")).toBe("source_drain_heavy_dope");
  });
});

describe("implants", () => {
  it("returns 5 types", () => {
    expect(implants()).toHaveLength(5);
  });
});
