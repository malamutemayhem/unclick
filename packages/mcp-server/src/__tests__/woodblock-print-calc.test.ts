import { describe, it, expect } from "vitest";
import {
  blockThicknessMm, carvingHoursPerCm2, impressionsPerBlock,
  inkCoverageMlPerPrint, pressurePsi, registrationMarksCount,
  paperDampeningMinutes, dryingTimeBetweenColorsHours, gougeSetCount,
  costPerBlock, blockWoods,
} from "../woodblock-print-calc.js";

describe("blockThicknessMm", () => {
  it("linden is thickest", () => {
    expect(blockThicknessMm("linden")).toBeGreaterThan(blockThicknessMm("boxwood"));
  });
});

describe("carvingHoursPerCm2", () => {
  it("boxwood takes longest to carve", () => {
    expect(carvingHoursPerCm2("boxwood")).toBeGreaterThan(carvingHoursPerCm2("linden"));
  });
});

describe("impressionsPerBlock", () => {
  it("boxwood lasts longest", () => {
    expect(impressionsPerBlock("boxwood")).toBeGreaterThan(impressionsPerBlock("linden"));
  });
});

describe("inkCoverageMlPerPrint", () => {
  it("larger area = more ink", () => {
    expect(inkCoverageMlPerPrint(500)).toBeGreaterThan(inkCoverageMlPerPrint(200));
  });
});

describe("pressurePsi", () => {
  it("press has most pressure", () => {
    expect(pressurePsi("press")).toBeGreaterThan(pressurePsi("hand"));
  });
});

describe("registrationMarksCount", () => {
  it("multi-color needs registration marks", () => {
    expect(registrationMarksCount(3)).toBe(2);
  });
  it("single color has no marks", () => {
    expect(registrationMarksCount(1)).toBe(0);
  });
});

describe("paperDampeningMinutes", () => {
  it("rag paper soaks longest", () => {
    expect(paperDampeningMinutes("rag")).toBeGreaterThan(
      paperDampeningMinutes("newsprint")
    );
  });
});

describe("dryingTimeBetweenColorsHours", () => {
  it("oil ink takes longer", () => {
    expect(dryingTimeBetweenColorsHours("oil")).toBeGreaterThan(
      dryingTimeBetweenColorsHours("water")
    );
  });
});

describe("gougeSetCount", () => {
  it("extra fine needs most gouges", () => {
    expect(gougeSetCount("extra_fine")).toBeGreaterThan(gougeSetCount("coarse"));
  });
});

describe("costPerBlock", () => {
  it("boxwood most expensive", () => {
    expect(costPerBlock("boxwood", 10)).toBeGreaterThan(costPerBlock("linden", 10));
  });
});

describe("blockWoods", () => {
  it("returns 5 woods", () => {
    expect(blockWoods()).toHaveLength(5);
  });
});
