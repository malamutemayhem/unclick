import { describe, it, expect } from "vitest";
import {
  clarification, throughput, gForce, hygiene,
  dsCost, solidsDischarge, forBiotech, bowl,
  bestUse, discStackCentrifugeTypes,
} from "../disc-stack-centrifuge-calc.js";

describe("clarification", () => {
  it("clarifier best clarification", () => {
    expect(clarification("clarifier_no_solids")).toBeGreaterThan(clarification("nozzle_discharge_conc"));
  });
});

describe("throughput", () => {
  it("nozzle discharge highest throughput", () => {
    expect(throughput("nozzle_discharge_conc")).toBeGreaterThan(throughput("hermetic_sealed_hyg"));
  });
});

describe("gForce", () => {
  it("clarifier highest g force", () => {
    expect(gForce("clarifier_no_solids")).toBeGreaterThan(gForce("nozzle_discharge_conc"));
  });
});

describe("hygiene", () => {
  it("hermetic sealed best hygiene", () => {
    expect(hygiene("hermetic_sealed_hyg")).toBeGreaterThan(hygiene("nozzle_discharge_conc"));
  });
});

describe("dsCost", () => {
  it("hermetic sealed most expensive", () => {
    expect(dsCost("hermetic_sealed_hyg")).toBeGreaterThan(dsCost("nozzle_discharge_conc"));
  });
});

describe("solidsDischarge", () => {
  it("self cleaning has solids discharge", () => {
    expect(solidsDischarge("self_cleaning_solids")).toBe(true);
  });
  it("clarifier no solids discharge", () => {
    expect(solidsDischarge("clarifier_no_solids")).toBe(false);
  });
});

describe("forBiotech", () => {
  it("hermetic sealed for biotech", () => {
    expect(forBiotech("hermetic_sealed_hyg")).toBe(true);
  });
  it("self cleaning not for biotech", () => {
    expect(forBiotech("self_cleaning_solids")).toBe(false);
  });
});

describe("bowl", () => {
  it("purifier uses gravity disc", () => {
    expect(bowl("purifier_two_liquid")).toBe("gravity_disc_two_liquid_phase_interface_adjust");
  });
});

describe("bestUse", () => {
  it("nozzle discharge for starch yeast", () => {
    expect(bestUse("nozzle_discharge_conc")).toBe("starch_yeast_kaolin_continuous_concentration");
  });
});

describe("discStackCentrifugeTypes", () => {
  it("returns 5 types", () => {
    expect(discStackCentrifugeTypes()).toHaveLength(5);
  });
});
