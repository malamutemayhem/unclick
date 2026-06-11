import { describe, it, expect } from "vitest";
import {
  accuracy, dataRate, range, interop,
  tpCost, gpsRequired, forCommercial, encoding,
  bestUse, transponderTypes,
} from "../transponder-type-calc.js";

describe("accuracy", () => {
  it("ads_b most accurate", () => {
    expect(accuracy("ads_b_out_1090")).toBeGreaterThan(accuracy("mode_a_c_legacy"));
  });
});

describe("dataRate", () => {
  it("military highest data rate", () => {
    expect(dataRate("military_iff_mode_5")).toBeGreaterThan(dataRate("mode_a_c_legacy"));
  });
});

describe("range", () => {
  it("military longest range", () => {
    expect(range("military_iff_mode_5")).toBeGreaterThan(range("uat_978_mhz"));
  });
});

describe("interop", () => {
  it("ads_b best interop", () => {
    expect(interop("ads_b_out_1090")).toBeGreaterThan(interop("military_iff_mode_5"));
  });
});

describe("tpCost", () => {
  it("military most expensive", () => {
    expect(tpCost("military_iff_mode_5")).toBeGreaterThan(tpCost("mode_a_c_legacy"));
  });
});

describe("gpsRequired", () => {
  it("ads_b requires gps", () => {
    expect(gpsRequired("ads_b_out_1090")).toBe(true);
  });
  it("mode_a_c does not require gps", () => {
    expect(gpsRequired("mode_a_c_legacy")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("mode_s for commercial", () => {
    expect(forCommercial("mode_s_selective")).toBe(true);
  });
  it("uat not for commercial", () => {
    expect(forCommercial("uat_978_mhz")).toBe(false);
  });
});

describe("encoding", () => {
  it("ads_b uses extended squitter", () => {
    expect(encoding("ads_b_out_1090")).toBe("extended_squitter_1090es");
  });
});

describe("bestUse", () => {
  it("mode_a_c for legacy vfr", () => {
    expect(bestUse("mode_a_c_legacy")).toBe("legacy_vfr_atc_identification");
  });
});

describe("transponderTypes", () => {
  it("returns 5 types", () => {
    expect(transponderTypes()).toHaveLength(5);
  });
});
