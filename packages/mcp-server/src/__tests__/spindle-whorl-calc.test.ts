import { describe, it, expect } from "vitest";
import {
  weightGrams, diameterCm, spinDurationSeconds,
  threadFineness, durabilityRating, decorated,
  archaeologicalFrequency, bestForFiber, costEstimate, whorlMaterials,
} from "../spindle-whorl-calc.js";

describe("weightGrams", () => {
  it("stone is heaviest", () => {
    expect(weightGrams("stone")).toBeGreaterThan(
      weightGrams("wood")
    );
  });
});

describe("diameterCm", () => {
  it("wood has largest diameter", () => {
    expect(diameterCm("wood")).toBeGreaterThan(
      diameterCm("bone")
    );
  });
});

describe("spinDurationSeconds", () => {
  it("stone spins longest", () => {
    expect(spinDurationSeconds("stone")).toBeGreaterThan(
      spinDurationSeconds("wood")
    );
  });
});

describe("threadFineness", () => {
  it("metal produces finest thread", () => {
    expect(threadFineness("metal")).toBeGreaterThan(
      threadFineness("wood")
    );
  });
});

describe("durabilityRating", () => {
  it("metal is most durable", () => {
    expect(durabilityRating("metal")).toBeGreaterThan(
      durabilityRating("wood")
    );
  });
});

describe("decorated", () => {
  it("clay whorls are decorated", () => {
    expect(decorated("clay")).toBe(true);
  });
  it("wood whorls are not", () => {
    expect(decorated("wood")).toBe(false);
  });
});

describe("archaeologicalFrequency", () => {
  it("clay is found most often", () => {
    expect(archaeologicalFrequency("clay")).toBeGreaterThan(
      archaeologicalFrequency("wood")
    );
  });
});

describe("bestForFiber", () => {
  it("bone is best for silk", () => {
    expect(bestForFiber("bone")).toBe("silk");
  });
});

describe("costEstimate", () => {
  it("metal costs most", () => {
    expect(costEstimate("metal")).toBeGreaterThan(
      costEstimate("wood")
    );
  });
});

describe("whorlMaterials", () => {
  it("returns 5 materials", () => {
    expect(whorlMaterials()).toHaveLength(5);
  });
});
