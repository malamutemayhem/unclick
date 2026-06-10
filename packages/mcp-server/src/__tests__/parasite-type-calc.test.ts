import { describe, it, expect } from "vitest";
import {
  hostRange, lifecycleDays, diseaseTransmissionRisk,
  treatmentDifficulty, prevalenceScore, internal,
  zoonotic, primaryTreatment, transmittedDisease, parasiteTypes,
} from "../parasite-type-calc.js";

describe("hostRange", () => {
  it("tick widest host range", () => {
    expect(hostRange("tick")).toBeGreaterThan(
      hostRange("tapeworm")
    );
  });
});

describe("lifecycleDays", () => {
  it("tick longest lifecycle", () => {
    expect(lifecycleDays("tick")).toBeGreaterThan(
      lifecycleDays("mite")
    );
  });
});

describe("diseaseTransmissionRisk", () => {
  it("tick highest disease risk", () => {
    expect(diseaseTransmissionRisk("tick")).toBeGreaterThan(
      diseaseTransmissionRisk("tapeworm")
    );
  });
});

describe("treatmentDifficulty", () => {
  it("mite hardest to treat", () => {
    expect(treatmentDifficulty("mite")).toBeGreaterThan(
      treatmentDifficulty("roundworm")
    );
  });
});

describe("prevalenceScore", () => {
  it("flea most prevalent", () => {
    expect(prevalenceScore("flea")).toBeGreaterThan(
      prevalenceScore("tapeworm")
    );
  });
});

describe("internal", () => {
  it("roundworm is internal", () => {
    expect(internal("roundworm")).toBe(true);
  });
  it("flea is not", () => {
    expect(internal("flea")).toBe(false);
  });
});

describe("zoonotic", () => {
  it("tick is zoonotic", () => {
    expect(zoonotic("tick")).toBe(true);
  });
  it("flea is not", () => {
    expect(zoonotic("flea")).toBe(false);
  });
});

describe("primaryTreatment", () => {
  it("tick treated with permethrin", () => {
    expect(primaryTreatment("tick")).toBe("permethrin");
  });
});

describe("transmittedDisease", () => {
  it("tick transmits lyme disease", () => {
    expect(transmittedDisease("tick")).toBe("lyme_disease");
  });
});

describe("parasiteTypes", () => {
  it("returns 5 types", () => {
    expect(parasiteTypes()).toHaveLength(5);
  });
});
