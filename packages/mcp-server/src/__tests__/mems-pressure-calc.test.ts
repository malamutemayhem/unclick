import { describe, it, expect } from "vitest";
import {
  accuracy, range, tempStability, responseTime,
  presCost, differential, forMedical, sensing,
  bestUse, memsPressures,
} from "../mems-pressure-calc.js";

describe("accuracy", () => {
  it("resonant silicon highest accuracy", () => {
    expect(accuracy("resonant_silicon")).toBeGreaterThan(accuracy("pirani_vacuum"));
  });
});

describe("range", () => {
  it("pirani vacuum widest range", () => {
    expect(range("pirani_vacuum")).toBeGreaterThan(range("barometric_altimeter"));
  });
});

describe("tempStability", () => {
  it("resonant silicon best temp stability", () => {
    expect(tempStability("resonant_silicon")).toBeGreaterThan(tempStability("pirani_vacuum"));
  });
});

describe("responseTime", () => {
  it("barometric altimeter fastest response", () => {
    expect(responseTime("barometric_altimeter")).toBeGreaterThan(responseTime("pirani_vacuum"));
  });
});

describe("presCost", () => {
  it("resonant silicon most expensive", () => {
    expect(presCost("resonant_silicon")).toBeGreaterThan(presCost("barometric_altimeter"));
  });
});

describe("differential", () => {
  it("capacitive membrane is differential", () => {
    expect(differential("capacitive_membrane")).toBe(true);
  });
  it("resonant silicon not differential", () => {
    expect(differential("resonant_silicon")).toBe(false);
  });
});

describe("forMedical", () => {
  it("capacitive membrane for medical", () => {
    expect(forMedical("capacitive_membrane")).toBe(true);
  });
  it("pirani vacuum not for medical", () => {
    expect(forMedical("pirani_vacuum")).toBe(false);
  });
});

describe("sensing", () => {
  it("resonant silicon uses frequency shift beam", () => {
    expect(sensing("resonant_silicon")).toBe("frequency_shift_beam");
  });
});

describe("bestUse", () => {
  it("barometric altimeter best for phone floor detection", () => {
    expect(bestUse("barometric_altimeter")).toBe("phone_floor_detection");
  });
});

describe("memsPressures", () => {
  it("returns 5 types", () => {
    expect(memsPressures()).toHaveLength(5);
  });
});
