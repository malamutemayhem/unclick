import { describe, it, expect } from "vitest";
import {
  colorIntensity, lightReflect, cutEase, durability,
  smaltiCost, hasGoldLeaf, iridescent, glassOrigin,
  bestProject, smaltis,
} from "../smalti-calc.js";

describe("colorIntensity", () => {
  it("venetian opaque bright most color intensity", () => {
    expect(colorIntensity("venetian_opaque_bright")).toBeGreaterThan(colorIntensity("filati_thin_strand"));
  });
});

describe("lightReflect", () => {
  it("byzantine gold leaf best light reflect", () => {
    expect(lightReflect("byzantine_gold_leaf")).toBeGreaterThan(lightReflect("mexican_uncut_rough"));
  });
});

describe("cutEase", () => {
  it("mexican uncut rough easiest to cut", () => {
    expect(cutEase("mexican_uncut_rough")).toBeGreaterThan(cutEase("byzantine_gold_leaf"));
  });
});

describe("durability", () => {
  it("mexican uncut rough most durable", () => {
    expect(durability("mexican_uncut_rough")).toBeGreaterThan(durability("filati_thin_strand"));
  });
});

describe("smaltiCost", () => {
  it("byzantine gold leaf more expensive than mexican uncut", () => {
    expect(smaltiCost("byzantine_gold_leaf")).toBeGreaterThan(smaltiCost("mexican_uncut_rough"));
  });
});

describe("hasGoldLeaf", () => {
  it("byzantine gold leaf has gold leaf", () => {
    expect(hasGoldLeaf("byzantine_gold_leaf")).toBe(true);
  });
  it("venetian opaque bright does not have gold leaf", () => {
    expect(hasGoldLeaf("venetian_opaque_bright")).toBe(false);
  });
});

describe("iridescent", () => {
  it("orsini iridescent sheen is iridescent", () => {
    expect(iridescent("orsini_iridescent_sheen")).toBe(true);
  });
  it("venetian opaque bright is not iridescent", () => {
    expect(iridescent("venetian_opaque_bright")).toBe(false);
  });
});

describe("glassOrigin", () => {
  it("venetian opaque bright from murano italy furnace", () => {
    expect(glassOrigin("venetian_opaque_bright")).toBe("murano_italy_furnace");
  });
});

describe("bestProject", () => {
  it("byzantine gold leaf best for church icon sacred", () => {
    expect(bestProject("byzantine_gold_leaf")).toBe("church_icon_sacred");
  });
});

describe("smaltis", () => {
  it("returns 5 types", () => {
    expect(smaltis()).toHaveLength(5);
  });
});
