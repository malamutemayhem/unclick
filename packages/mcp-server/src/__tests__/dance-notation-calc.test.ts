import { describe, it, expect } from "vitest";
import {
  precisionLevel, learningDifficulty, adoptionLevel,
  notationSpeed, bodyPartDetail, usesStaffSystem,
  suitableForTeaching, primaryUse, creator, danceNotations,
} from "../dance-notation-calc.js";

describe("precisionLevel", () => {
  it("labanotation most precise", () => {
    expect(precisionLevel("labanotation")).toBeGreaterThan(
      precisionLevel("motif")
    );
  });
});

describe("learningDifficulty", () => {
  it("labanotation hardest to learn", () => {
    expect(learningDifficulty("labanotation")).toBeGreaterThan(
      learningDifficulty("motif")
    );
  });
});

describe("adoptionLevel", () => {
  it("labanotation most adopted", () => {
    expect(adoptionLevel("labanotation")).toBeGreaterThan(
      adoptionLevel("eshkol_wachman")
    );
  });
});

describe("notationSpeed", () => {
  it("motif fastest notation", () => {
    expect(notationSpeed("motif")).toBeGreaterThan(
      notationSpeed("labanotation")
    );
  });
});

describe("bodyPartDetail", () => {
  it("labanotation most body part detail", () => {
    expect(bodyPartDetail("labanotation")).toBeGreaterThan(
      bodyPartDetail("motif")
    );
  });
});

describe("usesStaffSystem", () => {
  it("labanotation uses staff system", () => {
    expect(usesStaffSystem("labanotation")).toBe(true);
  });
  it("motif does not", () => {
    expect(usesStaffSystem("motif")).toBe(false);
  });
});

describe("suitableForTeaching", () => {
  it("motif suitable for teaching", () => {
    expect(suitableForTeaching("motif")).toBe(true);
  });
  it("labanotation is not", () => {
    expect(suitableForTeaching("labanotation")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("benesh for ballet companies", () => {
    expect(primaryUse("benesh")).toBe("ballet_companies");
  });
});

describe("creator", () => {
  it("labanotation by rudolf laban", () => {
    expect(creator("labanotation")).toBe("rudolf_laban");
  });
});

describe("danceNotations", () => {
  it("returns 5 notations", () => {
    expect(danceNotations()).toHaveLength(5);
  });
});
