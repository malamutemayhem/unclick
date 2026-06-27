import { describe, it, expect } from "vitest";
import {
  lustReLevel, shrinkageReduction, softness,
  durability, processCost, chemical,
  mechanical, bestFabric, permanence, textileFinishes,
} from "../textile-finish-calc.js";

describe("lustReLevel", () => {
  it("mercerized has highest lustre", () => {
    expect(lustReLevel("mercerized")).toBeGreaterThan(
      lustReLevel("napped")
    );
  });
});

describe("shrinkageReduction", () => {
  it("sanforized reduces shrinkage most", () => {
    expect(shrinkageReduction("sanforized")).toBeGreaterThan(
      shrinkageReduction("calendered")
    );
  });
});

describe("softness", () => {
  it("napped is softest", () => {
    expect(softness("napped")).toBeGreaterThan(
      softness("waterproof")
    );
  });
});

describe("durability", () => {
  it("waterproof is most durable", () => {
    expect(durability("waterproof")).toBeGreaterThan(
      durability("napped")
    );
  });
});

describe("processCost", () => {
  it("waterproof costs most", () => {
    expect(processCost("waterproof")).toBeGreaterThan(
      processCost("napped")
    );
  });
});

describe("chemical", () => {
  it("mercerized is chemical", () => {
    expect(chemical("mercerized")).toBe(true);
  });
  it("sanforized is not", () => {
    expect(chemical("sanforized")).toBe(false);
  });
});

describe("mechanical", () => {
  it("calendered is mechanical", () => {
    expect(mechanical("calendered")).toBe(true);
  });
  it("mercerized is not", () => {
    expect(mechanical("mercerized")).toBe(false);
  });
});

describe("bestFabric", () => {
  it("mercerized for cotton", () => {
    expect(bestFabric("mercerized")).toBe("cotton");
  });
});

describe("permanence", () => {
  it("mercerized is most permanent", () => {
    expect(permanence("mercerized")).toBeGreaterThan(
      permanence("calendered")
    );
  });
});

describe("textileFinishes", () => {
  it("returns 5 types", () => {
    expect(textileFinishes()).toHaveLength(5);
  });
});
