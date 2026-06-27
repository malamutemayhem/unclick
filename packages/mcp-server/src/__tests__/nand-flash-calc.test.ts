import { describe, it, expect } from "vitest";
import {
  endurance, readSpeed, writeSpeed, density,
  flashCost, enterpriseGrade, forDatacenter, cellType,
  bestUse, nandFlashes,
} from "../nand-flash-calc.js";

describe("endurance", () => {
  it("slc single level best endurance", () => {
    expect(endurance("slc_single_level")).toBeGreaterThan(endurance("qlc_quad_level"));
  });
});

describe("readSpeed", () => {
  it("slc single level fastest read", () => {
    expect(readSpeed("slc_single_level")).toBeGreaterThan(readSpeed("plc_penta_level"));
  });
});

describe("writeSpeed", () => {
  it("slc single level fastest write", () => {
    expect(writeSpeed("slc_single_level")).toBeGreaterThan(writeSpeed("plc_penta_level"));
  });
});

describe("density", () => {
  it("plc penta level highest density", () => {
    expect(density("plc_penta_level")).toBeGreaterThan(density("slc_single_level"));
  });
});

describe("flashCost", () => {
  it("slc single level most expensive", () => {
    expect(flashCost("slc_single_level")).toBeGreaterThan(flashCost("plc_penta_level"));
  });
});

describe("enterpriseGrade", () => {
  it("slc single level is enterprise grade", () => {
    expect(enterpriseGrade("slc_single_level")).toBe(true);
  });
  it("qlc quad level not enterprise grade", () => {
    expect(enterpriseGrade("qlc_quad_level")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("mlc multi level is for datacenter", () => {
    expect(forDatacenter("mlc_multi_level")).toBe(true);
  });
  it("qlc quad level not for datacenter", () => {
    expect(forDatacenter("qlc_quad_level")).toBe(false);
  });
});

describe("cellType", () => {
  it("slc single level uses 1bit per cell", () => {
    expect(cellType("slc_single_level")).toBe("1bit_per_cell");
  });
});

describe("bestUse", () => {
  it("tlc triple level best for consumer nvme ssd", () => {
    expect(bestUse("tlc_triple_level")).toBe("consumer_nvme_ssd");
  });
});

describe("nandFlashes", () => {
  it("returns 5 types", () => {
    expect(nandFlashes()).toHaveLength(5);
  });
});
