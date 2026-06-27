import { describe, it, expect } from "vitest";
import {
  dielectricConst, thermalResist, mechStrength, moistureAbsorb,
  lamCost, highFreq, forFlex, resinSystem,
  bestUse, pcbLaminates,
} from "../pcb-laminate-calc.js";

describe("dielectricConst", () => {
  it("rogers ptfe rf best dielectric control", () => {
    expect(dielectricConst("rogers_ptfe_rf")).toBeGreaterThan(dielectricConst("cem3_single_side"));
  });
});

describe("thermalResist", () => {
  it("polyimide flex best thermal resist", () => {
    expect(thermalResist("polyimide_flex")).toBeGreaterThan(thermalResist("cem3_single_side"));
  });
});

describe("mechStrength", () => {
  it("high tg fr4 best mech strength", () => {
    expect(mechStrength("high_tg_fr4")).toBeGreaterThan(mechStrength("cem3_single_side"));
  });
});

describe("moistureAbsorb", () => {
  it("rogers ptfe rf best moisture resistance", () => {
    expect(moistureAbsorb("rogers_ptfe_rf")).toBeGreaterThan(moistureAbsorb("cem3_single_side"));
  });
});

describe("lamCost", () => {
  it("rogers ptfe rf most expensive", () => {
    expect(lamCost("rogers_ptfe_rf")).toBeGreaterThan(lamCost("cem3_single_side"));
  });
});

describe("highFreq", () => {
  it("rogers ptfe rf is high freq", () => {
    expect(highFreq("rogers_ptfe_rf")).toBe(true);
  });
  it("fr4 standard glass not high freq", () => {
    expect(highFreq("fr4_standard_glass")).toBe(false);
  });
});

describe("forFlex", () => {
  it("polyimide flex is for flex", () => {
    expect(forFlex("polyimide_flex")).toBe(true);
  });
  it("fr4 standard glass not for flex", () => {
    expect(forFlex("fr4_standard_glass")).toBe(false);
  });
});

describe("resinSystem", () => {
  it("rogers ptfe rf uses ceramic filled ptfe", () => {
    expect(resinSystem("rogers_ptfe_rf")).toBe("ceramic_filled_ptfe");
  });
});

describe("bestUse", () => {
  it("fr4 standard glass best for general purpose rigid pcb", () => {
    expect(bestUse("fr4_standard_glass")).toBe("general_purpose_rigid_pcb");
  });
});

describe("pcbLaminates", () => {
  it("returns 5 types", () => {
    expect(pcbLaminates()).toHaveLength(5);
  });
});
