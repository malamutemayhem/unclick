import { describe, it, expect } from "vitest";
import {
  slipWidthCm, slipLengthCm, charactersPerSlip,
  bindingCordMaterial, slipsPerBundle, prepTreatment,
  inkType, archivalDurabilityYears, costPerBundle, bambooSlipEras,
} from "../bamboo-slip-calc.js";

describe("slipWidthCm", () => {
  it("shang has widest slips", () => {
    expect(slipWidthCm("shang")).toBeGreaterThan(
      slipWidthCm("han")
    );
  });
});

describe("slipLengthCm", () => {
  it("zhou slips are longer than shang", () => {
    expect(slipLengthCm("zhou")).toBeGreaterThan(
      slipLengthCm("shang")
    );
  });
});

describe("charactersPerSlip", () => {
  it("han fits most characters", () => {
    expect(charactersPerSlip("han")).toBeGreaterThan(
      charactersPerSlip("shang")
    );
  });
});

describe("bindingCordMaterial", () => {
  it("han uses silk", () => {
    expect(bindingCordMaterial("han")).toBe("silk");
  });
});

describe("slipsPerBundle", () => {
  it("han has most slips per bundle", () => {
    expect(slipsPerBundle("han")).toBeGreaterThan(
      slipsPerBundle("shang")
    );
  });
});

describe("prepTreatment", () => {
  it("zhou has prep treatment", () => {
    expect(prepTreatment("zhou")).toBe(true);
  });
  it("shang does not", () => {
    expect(prepTreatment("shang")).toBe(false);
  });
});

describe("inkType", () => {
  it("warring states uses lacquer ink", () => {
    expect(inkType("warring_states")).toBe("lacquer_ink");
  });
});

describe("archivalDurabilityYears", () => {
  it("han lasts longest", () => {
    expect(archivalDurabilityYears("han")).toBeGreaterThan(
      archivalDurabilityYears("shang")
    );
  });
});

describe("costPerBundle", () => {
  it("han costs most", () => {
    expect(costPerBundle("han")).toBeGreaterThan(
      costPerBundle("shang")
    );
  });
});

describe("bambooSlipEras", () => {
  it("returns 5 eras", () => {
    expect(bambooSlipEras()).toHaveLength(5);
  });
});
