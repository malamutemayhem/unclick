import { describe, it, expect } from "vitest";
import {
  clockRecovery, bandwidthEfficiency, errorDetection,
  implementationEase, signalLevels, dcBalanced,
  selfClocking, commonMedium, transitionRate, signalEncodings,
} from "../signal-encoding-calc.js";

describe("clockRecovery", () => {
  it("manchester best clock recovery", () => {
    expect(clockRecovery("manchester")).toBeGreaterThan(
      clockRecovery("nrz")
    );
  });
});

describe("bandwidthEfficiency", () => {
  it("nrz most bandwidth efficient", () => {
    expect(bandwidthEfficiency("nrz")).toBeGreaterThan(
      bandwidthEfficiency("manchester")
    );
  });
});

describe("errorDetection", () => {
  it("eight_b_ten_b best error detection", () => {
    expect(errorDetection("eight_b_ten_b")).toBeGreaterThan(
      errorDetection("nrz")
    );
  });
});

describe("implementationEase", () => {
  it("nrz easiest to implement", () => {
    expect(implementationEase("nrz")).toBeGreaterThan(
      implementationEase("pam4")
    );
  });
});

describe("signalLevels", () => {
  it("pam4 has 4 levels", () => {
    expect(signalLevels("pam4")).toBe(4);
  });
  it("manchester has 2 levels", () => {
    expect(signalLevels("manchester")).toBe(2);
  });
});

describe("dcBalanced", () => {
  it("manchester is dc balanced", () => {
    expect(dcBalanced("manchester")).toBe(true);
  });
  it("nrz is not", () => {
    expect(dcBalanced("nrz")).toBe(false);
  });
});

describe("selfClocking", () => {
  it("manchester is self-clocking", () => {
    expect(selfClocking("manchester")).toBe(true);
  });
  it("nrz is not", () => {
    expect(selfClocking("nrz")).toBe(false);
  });
});

describe("commonMedium", () => {
  it("eight_b_ten_b for gigabit ethernet", () => {
    expect(commonMedium("eight_b_ten_b")).toBe("gigabit_ethernet");
  });
});

describe("transitionRate", () => {
  it("manchester transitions every bit", () => {
    expect(transitionRate("manchester")).toBe("every_bit");
  });
});

describe("signalEncodings", () => {
  it("returns 5 encodings", () => {
    expect(signalEncodings()).toHaveLength(5);
  });
});
