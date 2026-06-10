import { describe, it, expect } from "vitest";
import {
  reuptakeSpeed, moodInfluence, concentrationInBrain,
  synapseDuration, addictionPotential, excitatory,
  aminoAcidDerived, primaryRole, deficiencyDisorder, neurotransmitterTypes,
} from "../neurotransmitter-calc.js";

describe("reuptakeSpeed", () => {
  it("glutamate has fastest reuptake", () => {
    expect(reuptakeSpeed("glutamate")).toBeGreaterThan(
      reuptakeSpeed("serotonin")
    );
  });
});

describe("moodInfluence", () => {
  it("serotonin has most mood influence", () => {
    expect(moodInfluence("serotonin")).toBeGreaterThan(
      moodInfluence("glutamate")
    );
  });
});

describe("concentrationInBrain", () => {
  it("glutamate most concentrated", () => {
    expect(concentrationInBrain("glutamate")).toBeGreaterThan(
      concentrationInBrain("dopamine")
    );
  });
});

describe("synapseDuration", () => {
  it("serotonin lasts longest", () => {
    expect(synapseDuration("serotonin")).toBeGreaterThan(
      synapseDuration("glutamate")
    );
  });
});

describe("addictionPotential", () => {
  it("dopamine highest addiction potential", () => {
    expect(addictionPotential("dopamine")).toBeGreaterThan(
      addictionPotential("serotonin")
    );
  });
});

describe("excitatory", () => {
  it("glutamate is excitatory", () => {
    expect(excitatory("glutamate")).toBe(true);
  });
  it("gaba is not", () => {
    expect(excitatory("gaba")).toBe(false);
  });
});

describe("aminoAcidDerived", () => {
  it("dopamine is amino acid derived", () => {
    expect(aminoAcidDerived("dopamine")).toBe(true);
  });
  it("acetylcholine is not", () => {
    expect(aminoAcidDerived("acetylcholine")).toBe(false);
  });
});

describe("primaryRole", () => {
  it("dopamine for reward", () => {
    expect(primaryRole("dopamine")).toBe("reward");
  });
});

describe("deficiencyDisorder", () => {
  it("serotonin deficiency causes depression", () => {
    expect(deficiencyDisorder("serotonin")).toBe("depression");
  });
});

describe("neurotransmitterTypes", () => {
  it("returns 5 types", () => {
    expect(neurotransmitterTypes()).toHaveLength(5);
  });
});
