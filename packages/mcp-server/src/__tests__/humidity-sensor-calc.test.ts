import { describe, it, expect } from "vitest";
import {
  accuracy, humidRange, responseTime, stability,
  sensorCost, digital, forDewPoint, sensingElement,
  bestUse, humiditySensors,
} from "../humidity-sensor-calc.js";

describe("accuracy", () => {
  it("chilled mirror dew best accuracy", () => {
    expect(accuracy("chilled_mirror_dew")).toBeGreaterThan(accuracy("resistive_ceramic"));
  });
});

describe("humidRange", () => {
  it("chilled mirror dew widest range", () => {
    expect(humidRange("chilled_mirror_dew")).toBeGreaterThan(humidRange("resistive_ceramic"));
  });
});

describe("responseTime", () => {
  it("mems integrated fastest response", () => {
    expect(responseTime("mems_integrated")).toBeGreaterThan(responseTime("chilled_mirror_dew"));
  });
});

describe("stability", () => {
  it("chilled mirror dew best stability", () => {
    expect(stability("chilled_mirror_dew")).toBeGreaterThan(stability("resistive_ceramic"));
  });
});

describe("sensorCost", () => {
  it("chilled mirror dew most expensive", () => {
    expect(sensorCost("chilled_mirror_dew")).toBeGreaterThan(sensorCost("resistive_ceramic"));
  });
});

describe("digital", () => {
  it("capacitive polymer is digital", () => {
    expect(digital("capacitive_polymer")).toBe(true);
  });
  it("resistive ceramic not digital", () => {
    expect(digital("resistive_ceramic")).toBe(false);
  });
});

describe("forDewPoint", () => {
  it("chilled mirror dew is for dew point", () => {
    expect(forDewPoint("chilled_mirror_dew")).toBe(true);
  });
  it("capacitive polymer not for dew point", () => {
    expect(forDewPoint("capacitive_polymer")).toBe(false);
  });
});

describe("sensingElement", () => {
  it("mems integrated uses mems capacitive chip", () => {
    expect(sensingElement("mems_integrated")).toBe("mems_capacitive_chip");
  });
});

describe("bestUse", () => {
  it("chilled mirror dew best for metrology lab reference", () => {
    expect(bestUse("chilled_mirror_dew")).toBe("metrology_lab_reference");
  });
});

describe("humiditySensors", () => {
  it("returns 5 types", () => {
    expect(humiditySensors()).toHaveLength(5);
  });
});
