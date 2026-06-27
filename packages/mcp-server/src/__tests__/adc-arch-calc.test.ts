import { describe, it, expect } from "vitest";
import {
  resolution, speed, powerEff, area,
  adcCost, calibrated, forComms, technique,
  bestUse, adcArchs,
} from "../adc-arch-calc.js";

describe("resolution", () => {
  it("sigma delta highest resolution", () => {
    expect(resolution("sigma_delta_oversampling")).toBeGreaterThan(resolution("flash_parallel"));
  });
});

describe("speed", () => {
  it("flash parallel highest speed", () => {
    expect(speed("flash_parallel")).toBeGreaterThan(speed("sigma_delta_oversampling"));
  });
});

describe("powerEff", () => {
  it("sar successive best power efficiency", () => {
    expect(powerEff("sar_successive")).toBeGreaterThan(powerEff("flash_parallel"));
  });
});

describe("area", () => {
  it("sar successive smallest area", () => {
    expect(area("sar_successive")).toBeGreaterThan(area("flash_parallel"));
  });
});

describe("adcCost", () => {
  it("time interleaved most expensive", () => {
    expect(adcCost("time_interleaved")).toBeGreaterThan(adcCost("sar_successive"));
  });
});

describe("calibrated", () => {
  it("sar successive is calibrated", () => {
    expect(calibrated("sar_successive")).toBe(true);
  });
  it("sigma delta not calibrated", () => {
    expect(calibrated("sigma_delta_oversampling")).toBe(false);
  });
});

describe("forComms", () => {
  it("time interleaved for comms", () => {
    expect(forComms("time_interleaved")).toBe(true);
  });
  it("sar successive not for comms", () => {
    expect(forComms("sar_successive")).toBe(false);
  });
});

describe("technique", () => {
  it("sigma delta uses noise shaping decimation", () => {
    expect(technique("sigma_delta_oversampling")).toBe("noise_shaping_decimation");
  });
});

describe("bestUse", () => {
  it("time interleaved best for 112g serdes receiver", () => {
    expect(bestUse("time_interleaved")).toBe("112g_serdes_receiver");
  });
});

describe("adcArchs", () => {
  it("returns 5 types", () => {
    expect(adcArchs()).toHaveLength(5);
  });
});
