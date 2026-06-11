import { describe, it, expect } from "vitest";
import {
  beamEnergy, throughput, beamUniformity, ionCurrent,
  ibCost, gridless, forEtching, sourceConfig,
  bestUse, ionBeamSourceTypes,
} from "../ion-beam-source-calc.js";

describe("beamEnergy", () => {
  it("ecr best beam energy", () => {
    expect(beamEnergy("ecr_ion_source")).toBeGreaterThan(beamEnergy("hollow_cathode"));
  });
});

describe("throughput", () => {
  it("end hall highest throughput", () => {
    expect(throughput("end_hall_ion")).toBeGreaterThan(throughput("rf_ion_source"));
  });
});

describe("beamUniformity", () => {
  it("kaufman best beam uniformity", () => {
    expect(beamUniformity("kaufman_ion")).toBeGreaterThan(beamUniformity("hollow_cathode"));
  });
});

describe("ionCurrent", () => {
  it("ecr best ion current", () => {
    expect(ionCurrent("ecr_ion_source")).toBeGreaterThan(ionCurrent("hollow_cathode"));
  });
});

describe("ibCost", () => {
  it("ecr most expensive", () => {
    expect(ibCost("ecr_ion_source")).toBeGreaterThan(ibCost("hollow_cathode"));
  });
});

describe("gridless", () => {
  it("end hall is gridless", () => {
    expect(gridless("end_hall_ion")).toBe(true);
  });
  it("kaufman not gridless", () => {
    expect(gridless("kaufman_ion")).toBe(false);
  });
});

describe("forEtching", () => {
  it("kaufman for etching", () => {
    expect(forEtching("kaufman_ion")).toBe(true);
  });
  it("end hall not for etching", () => {
    expect(forEtching("end_hall_ion")).toBe(false);
  });
});

describe("sourceConfig", () => {
  it("rf ion uses inductively coupled no filament reactive gas", () => {
    expect(sourceConfig("rf_ion_source")).toBe("rf_ion_source_inductively_coupled_no_filament_reactive_gas_ok");
  });
});

describe("bestUse", () => {
  it("ecr for ion implant high charge state multiply ionized", () => {
    expect(bestUse("ecr_ion_source")).toBe("ion_implant_ecr_ion_source_high_charge_state_multiply_ionized");
  });
});

describe("ionBeamSourceTypes", () => {
  it("returns 5 types", () => {
    expect(ionBeamSourceTypes()).toHaveLength(5);
  });
});
