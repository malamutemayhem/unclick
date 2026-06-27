import { describe, it, expect } from "vitest";
import {
  liftCapacity, depthCapability, operationSpeed, environmentalRisk,
  projectCost, requiresDivers, preservesHull, primaryEquipment,
  bestScenario, salvageMethods,
} from "../salvage-method-calc.js";

describe("liftCapacity", () => {
  it("crane barge highest lift capacity", () => {
    expect(liftCapacity("crane_barge")).toBeGreaterThan(liftCapacity("compressed_air"));
  });
});

describe("depthCapability", () => {
  it("compressed air deepest capability", () => {
    expect(depthCapability("compressed_air")).toBeGreaterThan(depthCapability("cofferdam"));
  });
});

describe("operationSpeed", () => {
  it("crane barge fastest operation", () => {
    expect(operationSpeed("crane_barge")).toBeGreaterThan(operationSpeed("cofferdam"));
  });
});

describe("environmentalRisk", () => {
  it("cutting parbuckle highest risk", () => {
    expect(environmentalRisk("cutting_parbuckle")).toBeGreaterThan(environmentalRisk("cofferdam"));
  });
});

describe("projectCost", () => {
  it("cofferdam most expensive project", () => {
    expect(projectCost("cofferdam")).toBeGreaterThan(projectCost("compressed_air"));
  });
});

describe("requiresDivers", () => {
  it("all methods require divers", () => {
    expect(requiresDivers("crane_barge")).toBe(true);
    expect(requiresDivers("compressed_air")).toBe(true);
  });
});

describe("preservesHull", () => {
  it("pontoon lift preserves hull", () => {
    expect(preservesHull("pontoon_lift")).toBe(true);
  });
  it("cutting parbuckle does not", () => {
    expect(preservesHull("cutting_parbuckle")).toBe(false);
  });
});

describe("primaryEquipment", () => {
  it("cofferdam uses steel watertight enclosure", () => {
    expect(primaryEquipment("cofferdam")).toBe("steel_watertight_enclosure");
  });
});

describe("bestScenario", () => {
  it("compressed air for intact hull refloat", () => {
    expect(bestScenario("compressed_air")).toBe("intact_hull_refloat");
  });
});

describe("salvageMethods", () => {
  it("returns 5 methods", () => {
    expect(salvageMethods()).toHaveLength(5);
  });
});
