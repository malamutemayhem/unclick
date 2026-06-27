import { describe, it, expect } from "vitest";
import {
  bandwidthEfficiency, clockRecovery, dcBalance, errorDetection,
  implementationSimplicity, bipolar, multilevel, signalLevels,
  typicalApplication, lineCodings,
} from "../line-coding-calc.js";

describe("bandwidthEfficiency", () => {
  it("pam4 most bandwidth efficient", () => {
    expect(bandwidthEfficiency("pam4")).toBeGreaterThan(bandwidthEfficiency("manchester"));
  });
});

describe("clockRecovery", () => {
  it("manchester best clock recovery", () => {
    expect(clockRecovery("manchester")).toBeGreaterThan(clockRecovery("nrz"));
  });
});

describe("dcBalance", () => {
  it("manchester best dc balance", () => {
    expect(dcBalance("manchester")).toBeGreaterThan(dcBalance("nrz"));
  });
});

describe("errorDetection", () => {
  it("ami best error detection", () => {
    expect(errorDetection("ami")).toBeGreaterThan(errorDetection("nrz"));
  });
});

describe("implementationSimplicity", () => {
  it("nrz simplest", () => {
    expect(implementationSimplicity("nrz")).toBeGreaterThan(implementationSimplicity("pam4"));
  });
});

describe("bipolar", () => {
  it("ami is bipolar", () => {
    expect(bipolar("ami")).toBe(true);
  });
  it("nrz is not", () => {
    expect(bipolar("nrz")).toBe(false);
  });
});

describe("multilevel", () => {
  it("pam4 is multilevel", () => {
    expect(multilevel("pam4")).toBe(true);
  });
  it("manchester is not", () => {
    expect(multilevel("manchester")).toBe(false);
  });
});

describe("signalLevels", () => {
  it("pam4 has four level amplitude", () => {
    expect(signalLevels("pam4")).toBe("four_level_amplitude");
  });
});

describe("typicalApplication", () => {
  it("manchester for ethernet 10base", () => {
    expect(typicalApplication("manchester")).toBe("ethernet_10base");
  });
});

describe("lineCodings", () => {
  it("returns 5 codings", () => {
    expect(lineCodings()).toHaveLength(5);
  });
});
