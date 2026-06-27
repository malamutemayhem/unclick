import { describe, it, expect } from "vitest";
import {
  focalLengthMm, fieldOfViewDegrees, minFocusDistanceCm,
  distortionLevel, bokehQuality, zoomCapable,
  weatherSealed, bestSubject, averagePriceUsd, lensTypes,
} from "../lens-type-calc.js";

describe("focalLengthMm", () => {
  it("telephoto has longest focal length", () => {
    expect(focalLengthMm("telephoto")).toBeGreaterThan(
      focalLengthMm("wide_angle")
    );
  });
});

describe("fieldOfViewDegrees", () => {
  it("fisheye has widest field of view", () => {
    expect(fieldOfViewDegrees("fisheye")).toBeGreaterThan(
      fieldOfViewDegrees("telephoto")
    );
  });
});

describe("minFocusDistanceCm", () => {
  it("macro has shortest focus distance", () => {
    expect(minFocusDistanceCm("macro")).toBeLessThan(
      minFocusDistanceCm("telephoto")
    );
  });
});

describe("distortionLevel", () => {
  it("fisheye has most distortion", () => {
    expect(distortionLevel("fisheye")).toBeGreaterThan(
      distortionLevel("standard")
    );
  });
});

describe("bokehQuality", () => {
  it("telephoto has best bokeh", () => {
    expect(bokehQuality("telephoto")).toBeGreaterThan(
      bokehQuality("fisheye")
    );
  });
});

describe("zoomCapable", () => {
  it("telephoto can zoom", () => {
    expect(zoomCapable("telephoto")).toBe(true);
  });
  it("standard cannot", () => {
    expect(zoomCapable("standard")).toBe(false);
  });
});

describe("weatherSealed", () => {
  it("telephoto is weather sealed", () => {
    expect(weatherSealed("telephoto")).toBe(true);
  });
  it("fisheye is not", () => {
    expect(weatherSealed("fisheye")).toBe(false);
  });
});

describe("bestSubject", () => {
  it("macro best for insects", () => {
    expect(bestSubject("macro")).toBe("insects");
  });
});

describe("averagePriceUsd", () => {
  it("telephoto is most expensive", () => {
    expect(averagePriceUsd("telephoto")).toBeGreaterThan(
      averagePriceUsd("standard")
    );
  });
});

describe("lensTypes", () => {
  it("returns 5 types", () => {
    expect(lensTypes()).toHaveLength(5);
  });
});
