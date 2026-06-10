import { describe, it, expect } from "vitest";
import {
  liftCapacity, reachRadius, mobilityScore, setupTime,
  operatorSkillLevel, requiresFoundation, outdoorUse,
  primaryIndustry, powerSource, craneTypes,
} from "../crane-type-calc.js";

describe("liftCapacity", () => {
  it("gantry highest lift capacity", () => {
    expect(liftCapacity("gantry")).toBeGreaterThan(liftCapacity("jib"));
  });
});

describe("reachRadius", () => {
  it("tower longest reach", () => {
    expect(reachRadius("tower")).toBeGreaterThan(reachRadius("jib"));
  });
});

describe("mobilityScore", () => {
  it("mobile most mobile", () => {
    expect(mobilityScore("mobile")).toBeGreaterThan(mobilityScore("tower"));
  });
});

describe("setupTime", () => {
  it("tower longest setup", () => {
    expect(setupTime("tower")).toBeGreaterThan(setupTime("mobile"));
  });
});

describe("operatorSkillLevel", () => {
  it("tower requires most skill", () => {
    expect(operatorSkillLevel("tower")).toBeGreaterThan(operatorSkillLevel("jib"));
  });
});

describe("requiresFoundation", () => {
  it("tower requires foundation", () => {
    expect(requiresFoundation("tower")).toBe(true);
  });
  it("mobile does not", () => {
    expect(requiresFoundation("mobile")).toBe(false);
  });
});

describe("outdoorUse", () => {
  it("tower used outdoors", () => {
    expect(outdoorUse("tower")).toBe(true);
  });
  it("overhead not for outdoor", () => {
    expect(outdoorUse("overhead")).toBe(false);
  });
});

describe("primaryIndustry", () => {
  it("gantry for shipyard", () => {
    expect(primaryIndustry("gantry")).toBe("shipyard_container_port");
  });
});

describe("powerSource", () => {
  it("mobile uses diesel hydraulic", () => {
    expect(powerSource("mobile")).toBe("diesel_hydraulic");
  });
});

describe("craneTypes", () => {
  it("returns 5 types", () => {
    expect(craneTypes()).toHaveLength(5);
  });
});
