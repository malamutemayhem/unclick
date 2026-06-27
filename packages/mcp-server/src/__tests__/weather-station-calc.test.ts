import { describe, it, expect } from "vitest";
import {
  sensorCount, dataAccuracy, transmissionReliability, installComplexity,
  systemCost, requiresPower, disposable, communicationMethod,
  bestDeployment, weatherStations,
} from "../weather-station-calc.js";

describe("sensorCount", () => {
  it("airport asos most sensors", () => {
    expect(sensorCount("airport_asos")).toBeGreaterThan(sensorCount("home_consumer"));
  });
});

describe("dataAccuracy", () => {
  it("airport asos most accurate", () => {
    expect(dataAccuracy("airport_asos")).toBeGreaterThan(dataAccuracy("home_consumer"));
  });
});

describe("transmissionReliability", () => {
  it("airport asos most reliable transmission", () => {
    expect(transmissionReliability("airport_asos")).toBeGreaterThan(transmissionReliability("radiosonde"));
  });
});

describe("installComplexity", () => {
  it("airport asos most complex install", () => {
    expect(installComplexity("airport_asos")).toBeGreaterThan(installComplexity("home_consumer"));
  });
});

describe("systemCost", () => {
  it("airport asos most expensive", () => {
    expect(systemCost("airport_asos")).toBeGreaterThan(systemCost("home_consumer"));
  });
});

describe("requiresPower", () => {
  it("all stations require power", () => {
    expect(requiresPower("home_consumer")).toBe(true);
    expect(requiresPower("radiosonde")).toBe(true);
  });
});

describe("disposable", () => {
  it("radiosonde is disposable", () => {
    expect(disposable("radiosonde")).toBe(true);
  });
  it("professional aws is not", () => {
    expect(disposable("professional_aws")).toBe(false);
  });
});

describe("communicationMethod", () => {
  it("radiosonde uses uhf radio balloon ascent", () => {
    expect(communicationMethod("radiosonde")).toBe("uhf_radio_balloon_ascent");
  });
});

describe("bestDeployment", () => {
  it("marine buoy for ocean coastal monitoring", () => {
    expect(bestDeployment("marine_buoy")).toBe("ocean_coastal_monitoring");
  });
});

describe("weatherStations", () => {
  it("returns 5 station types", () => {
    expect(weatherStations()).toHaveLength(5);
  });
});
