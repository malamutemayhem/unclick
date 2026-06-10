import { describe, it, expect } from "vitest";
import {
  rangeOfMotion, stabilityScore, injuryRisk,
  axesOfMovement, loadCapacity, allowsRotation,
  synovial, exampleJoint, replacementFrequency, jointTypes,
} from "../joint-type-calc.js";

describe("rangeOfMotion", () => {
  it("ball socket has most range", () => {
    expect(rangeOfMotion("ball_socket")).toBeGreaterThan(
      rangeOfMotion("gliding")
    );
  });
});

describe("stabilityScore", () => {
  it("gliding is most stable", () => {
    expect(stabilityScore("gliding")).toBeGreaterThan(
      stabilityScore("ball_socket")
    );
  });
});

describe("injuryRisk", () => {
  it("ball socket has highest injury risk", () => {
    expect(injuryRisk("ball_socket")).toBeGreaterThan(
      injuryRisk("gliding")
    );
  });
});

describe("axesOfMovement", () => {
  it("ball socket has 3 axes", () => {
    expect(axesOfMovement("ball_socket")).toBe(3);
  });
  it("hinge has 1 axis", () => {
    expect(axesOfMovement("hinge")).toBe(1);
  });
});

describe("loadCapacity", () => {
  it("ball socket bears most load", () => {
    expect(loadCapacity("ball_socket")).toBeGreaterThan(
      loadCapacity("gliding")
    );
  });
});

describe("allowsRotation", () => {
  it("pivot allows rotation", () => {
    expect(allowsRotation("pivot")).toBe(true);
  });
  it("hinge does not", () => {
    expect(allowsRotation("hinge")).toBe(false);
  });
});

describe("synovial", () => {
  it("all listed joints are synovial", () => {
    expect(synovial("ball_socket")).toBe(true);
    expect(synovial("gliding")).toBe(true);
  });
});

describe("exampleJoint", () => {
  it("ball socket example is hip", () => {
    expect(exampleJoint("ball_socket")).toBe("hip");
  });
});

describe("replacementFrequency", () => {
  it("ball socket replaced most", () => {
    expect(replacementFrequency("ball_socket")).toBeGreaterThan(
      replacementFrequency("gliding")
    );
  });
});

describe("jointTypes", () => {
  it("returns 5 types", () => {
    expect(jointTypes()).toHaveLength(5);
  });
});
