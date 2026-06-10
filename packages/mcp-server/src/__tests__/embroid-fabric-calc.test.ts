import { describe, it, expect } from "vitest";
import {
  stitchGrid, drapeFeel, needleFriendly, washDurable,
  fabricCost, countedWork, noHoopNeeded, weaveType,
  bestStitch, embroidFabrics,
} from "../embroid-fabric-calc.js";

describe("stitchGrid", () => {
  it("aida cloth count best stitch grid", () => {
    expect(stitchGrid("aida_cloth_count")).toBeGreaterThan(stitchGrid("felt_wool_thick"));
  });
});

describe("drapeFeel", () => {
  it("silk dupioni sheen best drape feel", () => {
    expect(drapeFeel("silk_dupioni_sheen")).toBeGreaterThan(drapeFeel("felt_wool_thick"));
  });
});

describe("needleFriendly", () => {
  it("aida cloth count most needle friendly", () => {
    expect(needleFriendly("aida_cloth_count")).toBeGreaterThan(needleFriendly("silk_dupioni_sheen"));
  });
});

describe("washDurable", () => {
  it("muslin cotton plain most wash durable", () => {
    expect(washDurable("muslin_cotton_plain")).toBeGreaterThan(washDurable("silk_dupioni_sheen"));
  });
});

describe("fabricCost", () => {
  it("silk dupioni sheen most expensive", () => {
    expect(fabricCost("silk_dupioni_sheen")).toBeGreaterThan(fabricCost("muslin_cotton_plain"));
  });
});

describe("countedWork", () => {
  it("aida cloth count is for counted work", () => {
    expect(countedWork("aida_cloth_count")).toBe(true);
  });
  it("muslin cotton plain is not for counted work", () => {
    expect(countedWork("muslin_cotton_plain")).toBe(false);
  });
});

describe("noHoopNeeded", () => {
  it("felt wool thick needs no hoop", () => {
    expect(noHoopNeeded("felt_wool_thick")).toBe(true);
  });
  it("aida cloth count needs hoop", () => {
    expect(noHoopNeeded("aida_cloth_count")).toBe(false);
  });
});

describe("weaveType", () => {
  it("felt wool thick is non woven pressed", () => {
    expect(weaveType("felt_wool_thick")).toBe("non_woven_pressed");
  });
});

describe("bestStitch", () => {
  it("aida cloth count best for cross stitch beginner", () => {
    expect(bestStitch("aida_cloth_count")).toBe("cross_stitch_beginner");
  });
});

describe("embroidFabrics", () => {
  it("returns 5 types", () => {
    expect(embroidFabrics()).toHaveLength(5);
  });
});
