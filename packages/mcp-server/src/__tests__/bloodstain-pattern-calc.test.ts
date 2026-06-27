import { describe, it, expect } from "vitest";
import {
  velocityIndicator, interpretationDifficulty, sceneReconstructionValue,
  dropletSize, directionalInfo, requiresExpertWitness,
  indicatesMovement, mechanism, typicalShape, bloodstainPatterns,
} from "../bloodstain-pattern-calc.js";

describe("velocityIndicator", () => {
  it("impact spatter highest velocity", () => {
    expect(velocityIndicator("impact_spatter")).toBeGreaterThan(
      velocityIndicator("passive_drop")
    );
  });
});

describe("interpretationDifficulty", () => {
  it("void hardest to interpret", () => {
    expect(interpretationDifficulty("void")).toBeGreaterThan(
      interpretationDifficulty("passive_drop")
    );
  });
});

describe("sceneReconstructionValue", () => {
  it("impact spatter highest reconstruction value", () => {
    expect(sceneReconstructionValue("impact_spatter")).toBeGreaterThan(
      sceneReconstructionValue("passive_drop")
    );
  });
});

describe("dropletSize", () => {
  it("passive drop largest droplets", () => {
    expect(dropletSize("passive_drop")).toBeGreaterThan(
      dropletSize("impact_spatter")
    );
  });
});

describe("directionalInfo", () => {
  it("cast off most directional info", () => {
    expect(directionalInfo("cast_off")).toBeGreaterThan(
      directionalInfo("void")
    );
  });
});

describe("requiresExpertWitness", () => {
  it("impact spatter requires expert", () => {
    expect(requiresExpertWitness("impact_spatter")).toBe(true);
  });
  it("passive drop does not", () => {
    expect(requiresExpertWitness("passive_drop")).toBe(false);
  });
});

describe("indicatesMovement", () => {
  it("cast off indicates movement", () => {
    expect(indicatesMovement("cast_off")).toBe(true);
  });
  it("passive drop does not", () => {
    expect(indicatesMovement("passive_drop")).toBe(false);
  });
});

describe("mechanism", () => {
  it("cast off from swinging object", () => {
    expect(mechanism("cast_off")).toBe("swinging_object");
  });
});

describe("typicalShape", () => {
  it("void is absence pattern", () => {
    expect(typicalShape("void")).toBe("absence_pattern");
  });
});

describe("bloodstainPatterns", () => {
  it("returns 5 patterns", () => {
    expect(bloodstainPatterns()).toHaveLength(5);
  });
});
