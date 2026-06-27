import { describe, it, expect } from "vitest";
import {
  vinegarMlPerKg, sugarGPerKg, saltGPerKg, processingTempCelsius,
  fermentationDays, jarSizeMl, shelfLifeMonths, headspaceMm,
  costPerJar, pickleMethods,
} from "../pickling-calc.js";

describe("vinegarMlPerKg", () => {
  it("vinegar method uses most vinegar", () => {
    expect(vinegarMlPerKg("vinegar")).toBeGreaterThan(vinegarMlPerKg("chutney"));
  });
  it("lacto ferment uses no vinegar", () => {
    expect(vinegarMlPerKg("lacto_ferment")).toBe(0);
  });
});

describe("sugarGPerKg", () => {
  it("chutney uses most sugar", () => {
    expect(sugarGPerKg("chutney")).toBeGreaterThan(sugarGPerKg("vinegar"));
  });
});

describe("saltGPerKg", () => {
  it("lacto ferment uses most salt", () => {
    expect(saltGPerKg("lacto_ferment")).toBeGreaterThan(saltGPerKg("chutney"));
  });
});

describe("processingTempCelsius", () => {
  it("lacto ferment is coolest", () => {
    expect(processingTempCelsius("lacto_ferment")).toBeLessThan(
      processingTempCelsius("chutney")
    );
  });
});

describe("fermentationDays", () => {
  it("only lacto ferment has fermentation", () => {
    expect(fermentationDays("lacto_ferment")).toBeGreaterThan(0);
    expect(fermentationDays("vinegar")).toBe(0);
  });
});

describe("jarSizeMl", () => {
  it("lacto ferment uses largest jars", () => {
    expect(jarSizeMl("lacto_ferment")).toBeGreaterThan(jarSizeMl("quick"));
  });
});

describe("shelfLifeMonths", () => {
  it("chutney lasts longest", () => {
    expect(shelfLifeMonths("chutney")).toBeGreaterThan(shelfLifeMonths("quick"));
  });
});

describe("headspaceMm", () => {
  it("lacto ferment needs most headspace", () => {
    expect(headspaceMm("lacto_ferment")).toBeGreaterThan(headspaceMm("quick"));
  });
});

describe("costPerJar", () => {
  it("chutney is most expensive", () => {
    expect(costPerJar("chutney")).toBeGreaterThan(costPerJar("lacto_ferment"));
  });
});

describe("pickleMethods", () => {
  it("returns 5 methods", () => {
    expect(pickleMethods()).toHaveLength(5);
  });
});
