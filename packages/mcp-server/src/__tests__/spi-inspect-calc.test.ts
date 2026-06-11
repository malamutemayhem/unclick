import { describe, it, expect } from "vitest";
import {
  volumeAccuracy, throughput, heightResolution, coverage,
  systemCost, threeD, inline, measureMethod,
  bestUse, spiInspects,
} from "../spi-inspect-calc.js";

describe("volumeAccuracy", () => {
  it("high speed phase best volume accuracy", () => {
    expect(volumeAccuracy("high_speed_phase")).toBeGreaterThan(volumeAccuracy("portable_sample"));
  });
});

describe("throughput", () => {
  it("high speed phase highest throughput", () => {
    expect(throughput("high_speed_phase")).toBeGreaterThan(throughput("portable_sample"));
  });
});

describe("heightResolution", () => {
  it("high speed phase best height resolution", () => {
    expect(heightResolution("high_speed_phase")).toBeGreaterThan(heightResolution("offline_2d_camera"));
  });
});

describe("coverage", () => {
  it("dual head inline widest coverage", () => {
    expect(coverage("dual_head_inline")).toBeGreaterThan(coverage("portable_sample"));
  });
});

describe("systemCost", () => {
  it("high speed phase most expensive", () => {
    expect(systemCost("high_speed_phase")).toBeGreaterThan(systemCost("portable_sample"));
  });
});

describe("threeD", () => {
  it("inline 3d laser is 3d", () => {
    expect(threeD("inline_3d_laser")).toBe(true);
  });
  it("offline 2d camera not 3d", () => {
    expect(threeD("offline_2d_camera")).toBe(false);
  });
});

describe("inline", () => {
  it("inline 3d laser is inline", () => {
    expect(inline("inline_3d_laser")).toBe(true);
  });
  it("portable sample not inline", () => {
    expect(inline("portable_sample")).toBe(false);
  });
});

describe("measureMethod", () => {
  it("high speed phase uses phase shift moire", () => {
    expect(measureMethod("high_speed_phase")).toBe("phase_shift_moire");
  });
});

describe("bestUse", () => {
  it("portable sample best for npi first article check", () => {
    expect(bestUse("portable_sample")).toBe("npi_first_article_check");
  });
});

describe("spiInspects", () => {
  it("returns 5 types", () => {
    expect(spiInspects()).toHaveLength(5);
  });
});
