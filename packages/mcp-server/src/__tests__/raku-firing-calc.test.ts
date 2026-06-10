import { describe, it, expect } from "vitest";
import {
  peakTempCelsius, reductionTimeMinutes, crackleEffect,
  smokeMarking, glazeRequired, thermalShockRisk,
  colorPalette, functionalUse, costPerFiring, rakuStyles,
} from "../raku-firing-calc.js";

describe("peakTempCelsius", () => {
  it("saggar fires hottest", () => {
    expect(peakTempCelsius("saggar")).toBeGreaterThan(
      peakTempCelsius("horsehair")
    );
  });
});

describe("reductionTimeMinutes", () => {
  it("saggar has longest reduction", () => {
    expect(reductionTimeMinutes("saggar")).toBeGreaterThan(
      reductionTimeMinutes("western")
    );
  });
});

describe("crackleEffect", () => {
  it("naked raku has most crackle", () => {
    expect(crackleEffect("naked_raku")).toBeGreaterThan(
      crackleEffect("horsehair")
    );
  });
});

describe("smokeMarking", () => {
  it("horsehair has most smoke marking", () => {
    expect(smokeMarking("horsehair")).toBeGreaterThan(
      smokeMarking("obvara")
    );
  });
});

describe("glazeRequired", () => {
  it("western needs glaze", () => {
    expect(glazeRequired("western")).toBe(true);
  });
  it("horsehair does not", () => {
    expect(glazeRequired("horsehair")).toBe(false);
  });
});

describe("thermalShockRisk", () => {
  it("naked raku has highest risk", () => {
    expect(thermalShockRisk("naked_raku")).toBeGreaterThan(
      thermalShockRisk("saggar")
    );
  });
});

describe("colorPalette", () => {
  it("western produces metallic lusters", () => {
    expect(colorPalette("western")).toBe("metallic_lusters");
  });
});

describe("functionalUse", () => {
  it("raku is never functional", () => {
    expect(functionalUse("western")).toBe(false);
  });
});

describe("costPerFiring", () => {
  it("saggar is most expensive", () => {
    expect(costPerFiring("saggar")).toBeGreaterThan(
      costPerFiring("horsehair")
    );
  });
});

describe("rakuStyles", () => {
  it("returns 5 styles", () => {
    expect(rakuStyles()).toHaveLength(5);
  });
});
