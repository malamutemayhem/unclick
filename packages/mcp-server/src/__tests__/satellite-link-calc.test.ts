import { describe, it, expect } from "vitest";
import {
  bandwidth, rainFade, antennaSize, throughput,
  slkCost, mobile, forBroadband, frequency,
  bestUse, satelliteLinks,
} from "../satellite-link-calc.js";

describe("bandwidth", () => {
  it("v band highest bandwidth", () => {
    expect(bandwidth("v_band_ngso")).toBeGreaterThan(bandwidth("l_band_mobile"));
  });
});

describe("rainFade", () => {
  it("l band best rain fade tolerance", () => {
    expect(rainFade("l_band_mobile")).toBeGreaterThan(rainFade("v_band_ngso"));
  });
});

describe("antennaSize", () => {
  it("l band smallest antenna", () => {
    expect(antennaSize("l_band_mobile")).toBeGreaterThan(antennaSize("c_band_vsat"));
  });
});

describe("throughput", () => {
  it("ka band highest throughput", () => {
    expect(throughput("ka_band_hts")).toBeGreaterThan(throughput("c_band_vsat"));
  });
});

describe("slkCost", () => {
  it("v band most expensive", () => {
    expect(slkCost("v_band_ngso")).toBeGreaterThan(slkCost("ku_band_broadcast"));
  });
});

describe("mobile", () => {
  it("l band is mobile", () => {
    expect(mobile("l_band_mobile")).toBe(true);
  });
  it("c band not mobile", () => {
    expect(mobile("c_band_vsat")).toBe(false);
  });
});

describe("forBroadband", () => {
  it("ka band for broadband", () => {
    expect(forBroadband("ka_band_hts")).toBe(true);
  });
  it("l band not for broadband", () => {
    expect(forBroadband("l_band_mobile")).toBe(false);
  });
});

describe("frequency", () => {
  it("ka band uses 26 to 40 ghz", () => {
    expect(frequency("ka_band_hts")).toBe("26_to_40_ghz_band");
  });
});

describe("bestUse", () => {
  it("ku band best for direct to home tv", () => {
    expect(bestUse("ku_band_broadcast")).toBe("direct_to_home_tv_broadcast");
  });
});

describe("satelliteLinks", () => {
  it("returns 5 types", () => {
    expect(satelliteLinks()).toHaveLength(5);
  });
});
