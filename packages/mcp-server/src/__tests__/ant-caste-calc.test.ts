import { describe, it, expect } from "vitest";
import {
  lifespan, colonyImportance, bodySize, mandibleStrength,
  populationPercent, canReproduce, hasWings, primaryRole,
  developmentPath, antCastes,
} from "../ant-caste-calc.js";

describe("lifespan", () => {
  it("queen lives longest", () => {
    expect(lifespan("queen")).toBeGreaterThan(lifespan("drone"));
  });
});

describe("colonyImportance", () => {
  it("queen most important", () => {
    expect(colonyImportance("queen")).toBeGreaterThan(colonyImportance("drone"));
  });
});

describe("bodySize", () => {
  it("queen largest body", () => {
    expect(bodySize("queen")).toBeGreaterThan(bodySize("worker"));
  });
});

describe("mandibleStrength", () => {
  it("soldier strongest mandibles", () => {
    expect(mandibleStrength("soldier")).toBeGreaterThan(mandibleStrength("drone"));
  });
});

describe("populationPercent", () => {
  it("worker most common", () => {
    expect(populationPercent("worker")).toBeGreaterThan(populationPercent("queen"));
  });
});

describe("canReproduce", () => {
  it("queen can reproduce", () => {
    expect(canReproduce("queen")).toBe(true);
  });
  it("worker cannot", () => {
    expect(canReproduce("worker")).toBe(false);
  });
});

describe("hasWings", () => {
  it("drone has wings", () => {
    expect(hasWings("drone")).toBe(true);
  });
  it("soldier does not", () => {
    expect(hasWings("soldier")).toBe(false);
  });
});

describe("primaryRole", () => {
  it("soldier for colony defense", () => {
    expect(primaryRole("soldier")).toBe("colony_defense");
  });
});

describe("developmentPath", () => {
  it("drone from unfertilized egg", () => {
    expect(developmentPath("drone")).toBe("unfertilized_egg");
  });
});

describe("antCastes", () => {
  it("returns 5 castes", () => {
    expect(antCastes()).toHaveLength(5);
  });
});
