import { describe, it, expect } from "vitest";
import {
  grainSizeMm, sortingEase, permeability,
  compactionPotential, transportDistance, cohesive,
  windTransportable, bestDeposit, settlingVelocity, sedimentTypes,
} from "../sediment-type-calc.js";

describe("grainSizeMm", () => {
  it("cobble has largest grain", () => {
    expect(grainSizeMm("cobble")).toBeGreaterThan(
      grainSizeMm("clay")
    );
  });
});

describe("sortingEase", () => {
  it("cobble is easiest to sort", () => {
    expect(sortingEase("cobble")).toBeGreaterThan(
      sortingEase("clay")
    );
  });
});

describe("permeability", () => {
  it("gravel is most permeable", () => {
    expect(permeability("gravel")).toBeGreaterThan(
      permeability("clay")
    );
  });
});

describe("compactionPotential", () => {
  it("clay compacts most", () => {
    expect(compactionPotential("clay")).toBeGreaterThan(
      compactionPotential("cobble")
    );
  });
});

describe("transportDistance", () => {
  it("clay travels farthest", () => {
    expect(transportDistance("clay")).toBeGreaterThan(
      transportDistance("cobble")
    );
  });
});

describe("cohesive", () => {
  it("clay is cohesive", () => {
    expect(cohesive("clay")).toBe(true);
  });
  it("sand is not", () => {
    expect(cohesive("sand")).toBe(false);
  });
});

describe("windTransportable", () => {
  it("sand is wind transportable", () => {
    expect(windTransportable("sand")).toBe(true);
  });
  it("gravel is not", () => {
    expect(windTransportable("gravel")).toBe(false);
  });
});

describe("bestDeposit", () => {
  it("sand deposited on beach", () => {
    expect(bestDeposit("sand")).toBe("beach");
  });
});

describe("settlingVelocity", () => {
  it("cobble settles fastest", () => {
    expect(settlingVelocity("cobble")).toBeGreaterThan(
      settlingVelocity("clay")
    );
  });
});

describe("sedimentTypes", () => {
  it("returns 5 types", () => {
    expect(sedimentTypes()).toHaveLength(5);
  });
});
