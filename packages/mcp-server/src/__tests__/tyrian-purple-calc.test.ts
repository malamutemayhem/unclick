import { describe, it, expect } from "vitest";
import {
  snailsPerGram, colorShade, lightfastness,
  processingDays, sunExposureRequired, odorIntensity,
  washFastness, historicalRegion, costPerGram, purpleSources,
} from "../tyrian-purple-calc.js";

describe("snailsPerGram", () => {
  it("plicopurpura needs most snails", () => {
    expect(snailsPerGram("plicopurpura")).toBeGreaterThan(
      snailsPerGram("murex_trunculus")
    );
  });
});

describe("colorShade", () => {
  it("murex brandaris produces royal purple", () => {
    expect(colorShade("murex_brandaris")).toBe("royal_purple");
  });
});

describe("lightfastness", () => {
  it("murex brandaris has best lightfastness", () => {
    expect(lightfastness("murex_brandaris")).toBeGreaterThan(
      lightfastness("plicopurpura")
    );
  });
});

describe("processingDays", () => {
  it("murex brandaris takes longest", () => {
    expect(processingDays("murex_brandaris")).toBeGreaterThan(
      processingDays("plicopurpura")
    );
  });
});

describe("sunExposureRequired", () => {
  it("murex trunculus needs sun exposure", () => {
    expect(sunExposureRequired("murex_trunculus")).toBe(true);
  });
  it("murex brandaris does not", () => {
    expect(sunExposureRequired("murex_brandaris")).toBe(false);
  });
});

describe("odorIntensity", () => {
  it("murex brandaris has strongest odor", () => {
    expect(odorIntensity("murex_brandaris")).toBeGreaterThan(
      odorIntensity("plicopurpura")
    );
  });
});

describe("washFastness", () => {
  it("murex brandaris has best wash fastness", () => {
    expect(washFastness("murex_brandaris")).toBeGreaterThan(
      washFastness("plicopurpura")
    );
  });
});

describe("historicalRegion", () => {
  it("murex brandaris is from phoenicia", () => {
    expect(historicalRegion("murex_brandaris")).toBe("phoenicia");
  });
});

describe("costPerGram", () => {
  it("plicopurpura is most expensive", () => {
    expect(costPerGram("plicopurpura")).toBeGreaterThan(
      costPerGram("thais_haemastoma")
    );
  });
});

describe("purpleSources", () => {
  it("returns 5 sources", () => {
    expect(purpleSources()).toHaveLength(5);
  });
});
