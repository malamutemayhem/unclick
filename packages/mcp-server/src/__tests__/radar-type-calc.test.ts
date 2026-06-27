import { describe, it, expect } from "vitest";
import {
  range, resolution, velocity, clutter,
  rdCost, electronic, forTracking, waveform,
  bestUse, radarTypes,
} from "../radar-type-calc.js";

describe("range", () => {
  it("phased array longest range", () => {
    expect(range("phased_array_aesa")).toBeGreaterThan(range("fmcw_automotive_77ghz"));
  });
});

describe("resolution", () => {
  it("sar highest resolution", () => {
    expect(resolution("synthetic_aperture_sar")).toBeGreaterThan(resolution("weather_doppler_sband"));
  });
});

describe("velocity", () => {
  it("pulse doppler best velocity", () => {
    expect(velocity("pulse_doppler_airborne")).toBeGreaterThan(velocity("synthetic_aperture_sar"));
  });
});

describe("clutter", () => {
  it("phased array best clutter rejection", () => {
    expect(clutter("phased_array_aesa")).toBeGreaterThan(clutter("fmcw_automotive_77ghz"));
  });
});

describe("rdCost", () => {
  it("phased array most expensive", () => {
    expect(rdCost("phased_array_aesa")).toBeGreaterThan(rdCost("fmcw_automotive_77ghz"));
  });
});

describe("electronic", () => {
  it("phased array is electronic", () => {
    expect(electronic("phased_array_aesa")).toBe(true);
  });
  it("fmcw not electronic", () => {
    expect(electronic("fmcw_automotive_77ghz")).toBe(false);
  });
});

describe("forTracking", () => {
  it("pulse doppler for tracking", () => {
    expect(forTracking("pulse_doppler_airborne")).toBe(true);
  });
  it("sar not for tracking", () => {
    expect(forTracking("synthetic_aperture_sar")).toBe(false);
  });
});

describe("waveform", () => {
  it("fmcw uses linear chirp sawtooth", () => {
    expect(waveform("fmcw_automotive_77ghz")).toBe("linear_chirp_sawtooth");
  });
});

describe("bestUse", () => {
  it("sar best for terrain mapping", () => {
    expect(bestUse("synthetic_aperture_sar")).toBe("terrain_mapping_satellite_image");
  });
});

describe("radarTypes", () => {
  it("returns 5 types", () => {
    expect(radarTypes()).toHaveLength(5);
  });
});
