import { describe, it, expect } from "vitest";
import {
  durationSeconds, capacityItems, retrievalSpeed,
  encodingEffort, decayRate, conscious,
  declarative, brainRegion, exampleTask, memoryTypeKinds,
} from "../memory-type-calc.js";

describe("durationSeconds", () => {
  it("long term lasts longest", () => {
    expect(durationSeconds("long_term")).toBeGreaterThan(
      durationSeconds("sensory")
    );
  });
});

describe("capacityItems", () => {
  it("sensory holds most items briefly", () => {
    expect(capacityItems("sensory")).toBeGreaterThan(
      capacityItems("short_term")
    );
  });
});

describe("retrievalSpeed", () => {
  it("sensory fastest retrieval", () => {
    expect(retrievalSpeed("sensory")).toBeGreaterThan(
      retrievalSpeed("long_term")
    );
  });
});

describe("encodingEffort", () => {
  it("procedural needs most encoding effort", () => {
    expect(encodingEffort("procedural")).toBeGreaterThan(
      encodingEffort("sensory")
    );
  });
});

describe("decayRate", () => {
  it("sensory decays fastest", () => {
    expect(decayRate("sensory")).toBeGreaterThan(
      decayRate("procedural")
    );
  });
});

describe("conscious", () => {
  it("short term is conscious", () => {
    expect(conscious("short_term")).toBe(true);
  });
  it("procedural is not", () => {
    expect(conscious("procedural")).toBe(false);
  });
});

describe("declarative", () => {
  it("episodic is declarative", () => {
    expect(declarative("episodic")).toBe(true);
  });
  it("procedural is not", () => {
    expect(declarative("procedural")).toBe(false);
  });
});

describe("brainRegion", () => {
  it("procedural in basal ganglia", () => {
    expect(brainRegion("procedural")).toBe("basal_ganglia");
  });
});

describe("exampleTask", () => {
  it("procedural example is riding bicycle", () => {
    expect(exampleTask("procedural")).toBe("riding_bicycle");
  });
});

describe("memoryTypeKinds", () => {
  it("returns 5 types", () => {
    expect(memoryTypeKinds()).toHaveLength(5);
  });
});
