import { describe, it, expect } from "vitest";
import {
  bladeLengthCm, versatility, precision,
  weightGrams, edgeRetention, rocksOnBoard,
  serrated, bestTask, originRegion, knifeTypes,
} from "../knife-type-calc.js";

describe("bladeLengthCm", () => {
  it("chef knife longest", () => {
    expect(bladeLengthCm("chef")).toBeGreaterThan(
      bladeLengthCm("paring")
    );
  });
});

describe("versatility", () => {
  it("chef most versatile", () => {
    expect(versatility("chef")).toBeGreaterThan(
      versatility("bread")
    );
  });
});

describe("precision", () => {
  it("paring most precise", () => {
    expect(precision("paring")).toBeGreaterThan(
      precision("cleaver")
    );
  });
});

describe("weightGrams", () => {
  it("cleaver heaviest", () => {
    expect(weightGrams("cleaver")).toBeGreaterThan(
      weightGrams("paring")
    );
  });
});

describe("edgeRetention", () => {
  it("bread knife retains edge longest", () => {
    expect(edgeRetention("bread")).toBeGreaterThan(
      edgeRetention("cleaver")
    );
  });
});

describe("rocksOnBoard", () => {
  it("chef knife rocks", () => {
    expect(rocksOnBoard("chef")).toBe(true);
  });
  it("santoku does not", () => {
    expect(rocksOnBoard("santoku")).toBe(false);
  });
});

describe("serrated", () => {
  it("bread knife is serrated", () => {
    expect(serrated("bread")).toBe(true);
  });
  it("chef is not", () => {
    expect(serrated("chef")).toBe(false);
  });
});

describe("bestTask", () => {
  it("paring for peeling", () => {
    expect(bestTask("paring")).toBe("peeling");
  });
});

describe("originRegion", () => {
  it("santoku from japan", () => {
    expect(originRegion("santoku")).toBe("japan");
  });
});

describe("knifeTypes", () => {
  it("returns 5 types", () => {
    expect(knifeTypes()).toHaveLength(5);
  });
});
