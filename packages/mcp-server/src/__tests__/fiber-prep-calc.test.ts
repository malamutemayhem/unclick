import { describe, it, expect } from "vitest";
import {
  waterTempCelsius, timePerKgMinutes, wastePercent, fiberAlignment,
  bestForFiber, chemicalsRequired, toolWeight, outputForm,
  costPerKg, fiberPrepMethods,
} from "../fiber-prep-calc.js";

describe("waterTempCelsius", () => {
  it("degumming uses hottest water", () => {
    expect(waterTempCelsius("degumming")).toBeGreaterThan(
      waterTempCelsius("scouring")
    );
  });
});

describe("timePerKgMinutes", () => {
  it("degumming takes longest", () => {
    expect(timePerKgMinutes("degumming")).toBeGreaterThan(
      timePerKgMinutes("carding")
    );
  });
});

describe("wastePercent", () => {
  it("scouring produces most waste", () => {
    expect(wastePercent("scouring")).toBeGreaterThan(
      wastePercent("carding")
    );
  });
});

describe("fiberAlignment", () => {
  it("combing produces parallel fibers", () => {
    expect(fiberAlignment("combing")).toBe("parallel");
  });
  it("carding produces random fibers", () => {
    expect(fiberAlignment("carding")).toBe("random");
  });
});

describe("bestForFiber", () => {
  it("hackling is best for flax", () => {
    expect(bestForFiber("hackling")).toBe("flax");
  });
});

describe("chemicalsRequired", () => {
  it("scouring needs chemicals", () => {
    expect(chemicalsRequired("scouring")).toBe(true);
  });
  it("carding does not need chemicals", () => {
    expect(chemicalsRequired("carding")).toBe(false);
  });
});

describe("toolWeight", () => {
  it("combing tools are heavy", () => {
    expect(toolWeight("combing")).toBe("heavy");
  });
});

describe("outputForm", () => {
  it("carding produces rolags", () => {
    expect(outputForm("carding")).toBe("rolag");
  });
});

describe("costPerKg", () => {
  it("combing is most expensive", () => {
    expect(costPerKg("combing")).toBeGreaterThan(costPerKg("scouring"));
  });
});

describe("fiberPrepMethods", () => {
  it("returns 5 methods", () => {
    expect(fiberPrepMethods()).toHaveLength(5);
  });
});
