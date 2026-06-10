import { describe, it, expect } from "vitest";
import {
  meltingTempCelsius, impressionDetail, brittleness,
  colorRange, adhesion, mailSafe,
  wickRequired, bestUse, costPerStick, sealWaxes,
} from "../seal-wax-calc.js";

describe("meltingTempCelsius", () => {
  it("glue gun melts at highest temp", () => {
    expect(meltingTempCelsius("glue_gun")).toBeGreaterThan(
      meltingTempCelsius("beeswax_blend")
    );
  });
});

describe("impressionDetail", () => {
  it("traditional has best detail", () => {
    expect(impressionDetail("traditional")).toBeGreaterThan(
      impressionDetail("glue_gun")
    );
  });
});

describe("brittleness", () => {
  it("traditional is most brittle", () => {
    expect(brittleness("traditional")).toBeGreaterThan(
      brittleness("flexible")
    );
  });
});

describe("colorRange", () => {
  it("glue gun has widest color range", () => {
    expect(colorRange("glue_gun")).toBeGreaterThan(
      colorRange("beeswax_blend")
    );
  });
});

describe("adhesion", () => {
  it("shellac adheres best", () => {
    expect(adhesion("shellac")).toBeGreaterThan(
      adhesion("beeswax_blend")
    );
  });
});

describe("mailSafe", () => {
  it("flexible is mail safe", () => {
    expect(mailSafe("flexible")).toBe(true);
  });
  it("traditional is not", () => {
    expect(mailSafe("traditional")).toBe(false);
  });
});

describe("wickRequired", () => {
  it("traditional needs wick", () => {
    expect(wickRequired("traditional")).toBe(true);
  });
  it("glue gun does not", () => {
    expect(wickRequired("glue_gun")).toBe(false);
  });
});

describe("bestUse", () => {
  it("shellac best for legal document", () => {
    expect(bestUse("shellac")).toBe("legal_document");
  });
});

describe("costPerStick", () => {
  it("shellac costs most", () => {
    expect(costPerStick("shellac")).toBeGreaterThan(
      costPerStick("glue_gun")
    );
  });
});

describe("sealWaxes", () => {
  it("returns 5 types", () => {
    expect(sealWaxes()).toHaveLength(5);
  });
});
