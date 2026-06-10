import { describe, it, expect } from "vitest";
import {
  linePrecision, leadBreakResist, writingComfort, versatility,
  pencilCost, hasEraser, retractableTip, leadAdvance,
  bestUse, mechanicalPencils,
} from "../mechanical-pencil-calc.js";

describe("linePrecision", () => {
  it("drafting 05mm precise most precise", () => {
    expect(linePrecision("drafting_05mm_precise")).toBeGreaterThan(linePrecision("clutch_2mm_lead_holder"));
  });
});

describe("leadBreakResist", () => {
  it("clutch 2mm lead holder most break resistant", () => {
    expect(leadBreakResist("clutch_2mm_lead_holder")).toBeGreaterThan(leadBreakResist("multipen_pencil_combo"));
  });
});

describe("writingComfort", () => {
  it("writing 07mm standard most comfortable", () => {
    expect(writingComfort("writing_07mm_standard")).toBeGreaterThan(writingComfort("clutch_2mm_lead_holder"));
  });
});

describe("versatility", () => {
  it("multipen pencil combo most versatile", () => {
    expect(versatility("multipen_pencil_combo")).toBeGreaterThan(versatility("drafting_05mm_precise"));
  });
});

describe("pencilCost", () => {
  it("multipen pencil combo most expensive", () => {
    expect(pencilCost("multipen_pencil_combo")).toBeGreaterThan(pencilCost("writing_07mm_standard"));
  });
});

describe("hasEraser", () => {
  it("writing 07mm standard has eraser", () => {
    expect(hasEraser("writing_07mm_standard")).toBe(true);
  });
  it("drafting 05mm precise does not", () => {
    expect(hasEraser("drafting_05mm_precise")).toBe(false);
  });
});

describe("retractableTip", () => {
  it("drafting 05mm precise has retractable tip", () => {
    expect(retractableTip("drafting_05mm_precise")).toBe(true);
  });
  it("writing 07mm standard does not", () => {
    expect(retractableTip("writing_07mm_standard")).toBe(false);
  });
});

describe("leadAdvance", () => {
  it("auto advance shake uses automatic shake advance", () => {
    expect(leadAdvance("auto_advance_shake")).toBe("automatic_shake_advance");
  });
});

describe("bestUse", () => {
  it("drafting 05mm precise best for technical drawing cad", () => {
    expect(bestUse("drafting_05mm_precise")).toBe("technical_drawing_cad");
  });
});

describe("mechanicalPencils", () => {
  it("returns 5 types", () => {
    expect(mechanicalPencils()).toHaveLength(5);
  });
});
