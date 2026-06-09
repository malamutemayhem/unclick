import { describe, it, expect } from "vitest";
import {
  createCrossing, createKnot, crossingNumber, writhe,
  isAlternating, unknottingNumber, bridgeNumber,
  mirror, connectedSum, unknot, trefoil, figureEight,
  hopfLink, isKnot, isLink, formatDiagram,
  genus, seifertCircles,
} from "../knot-theory.js";

describe("createCrossing / createKnot", () => {
  it("creates crossing", () => {
    const c = createCrossing(0, 1, 1);
    expect(c.over).toBe(0);
    expect(c.sign).toBe(1);
  });

  it("creates knot", () => {
    const k = createKnot("test", [createCrossing(0, 1, 1)]);
    expect(k.name).toBe("test");
    expect(k.components).toBe(1);
  });
});

describe("crossingNumber", () => {
  it("trefoil has 3 crossings", () => {
    expect(crossingNumber(trefoil())).toBe(3);
  });

  it("unknot has 0 crossings", () => {
    expect(crossingNumber(unknot())).toBe(0);
  });
});

describe("writhe", () => {
  it("trefoil writhe is 3", () => {
    expect(writhe(trefoil())).toBe(3);
  });

  it("figure-eight writhe is 0", () => {
    expect(writhe(figureEight())).toBe(0);
  });
});

describe("isAlternating", () => {
  it("figure-eight is alternating", () => {
    expect(isAlternating(figureEight())).toBe(true);
  });

  it("trefoil is not alternating", () => {
    expect(isAlternating(trefoil())).toBe(false);
  });
});

describe("unknottingNumber / bridgeNumber", () => {
  it("trefoil unknotting number", () => {
    expect(unknottingNumber(3)).toBe(1);
  });

  it("bridge number for 4 crossings", () => {
    expect(bridgeNumber(4)).toBe(2);
  });
});

describe("mirror", () => {
  it("reverses all signs", () => {
    const m = mirror(trefoil());
    expect(writhe(m)).toBe(-3);
  });
});

describe("connectedSum", () => {
  it("combines crossings", () => {
    const sum = connectedSum(trefoil(), figureEight());
    expect(crossingNumber(sum)).toBe(7);
  });
});

describe("unknot / trefoil / figureEight / hopfLink", () => {
  it("unknot has 0 crossings", () => {
    expect(unknot().crossings.length).toBe(0);
  });

  it("hopf link has 2 components", () => {
    expect(hopfLink().components).toBe(2);
  });
});

describe("isKnot / isLink", () => {
  it("trefoil is a knot", () => {
    expect(isKnot(trefoil())).toBe(true);
  });

  it("hopf link is a link", () => {
    expect(isLink(hopfLink())).toBe(true);
  });
});

describe("genus / seifertCircles", () => {
  it("unknot has genus 0", () => {
    expect(genus(unknot())).toBe(0);
  });

  it("trefoil has genus 1", () => {
    expect(genus(trefoil())).toBe(1);
  });

  it("seifert circles positive", () => {
    expect(seifertCircles(trefoil())).toBeGreaterThan(0);
  });
});

describe("formatDiagram", () => {
  it("formats knot info", () => {
    const s = formatDiagram(trefoil());
    expect(s).toContain("trefoil");
    expect(s).toContain("3c");
  });
});
