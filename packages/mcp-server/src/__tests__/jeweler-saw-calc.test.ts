import { describe, it, expect } from "vitest";
import {
  cutPrecision, bladeVariety, piercingAccess, easeOfUse,
  sawCost, adjustableFrame, forInterior, frameStyle,
  bestCut, jewelerSaws,
} from "../jeweler-saw-calc.js";

describe("cutPrecision", () => {
  it("deep throat piercing most precise", () => {
    expect(cutPrecision("deep_throat_piercing")).toBeGreaterThan(cutPrecision("coping_saw_heavy"));
  });
});

describe("bladeVariety", () => {
  it("adjustable frame standard most blade variety", () => {
    expect(bladeVariety("adjustable_frame_standard")).toBeGreaterThan(bladeVariety("coping_saw_heavy"));
  });
});

describe("piercingAccess", () => {
  it("deep throat piercing best piercing access", () => {
    expect(piercingAccess("deep_throat_piercing")).toBeGreaterThan(piercingAccess("fixed_frame_student"));
  });
});

describe("easeOfUse", () => {
  it("fixed frame student easiest to use", () => {
    expect(easeOfUse("fixed_frame_student")).toBeGreaterThan(easeOfUse("wire_saw_flexible"));
  });
});

describe("sawCost", () => {
  it("deep throat piercing most expensive", () => {
    expect(sawCost("deep_throat_piercing")).toBeGreaterThan(sawCost("fixed_frame_student"));
  });
});

describe("adjustableFrame", () => {
  it("adjustable frame standard has adjustable frame", () => {
    expect(adjustableFrame("adjustable_frame_standard")).toBe(true);
  });
  it("fixed frame student has no adjustable frame", () => {
    expect(adjustableFrame("fixed_frame_student")).toBe(false);
  });
});

describe("forInterior", () => {
  it("deep throat piercing is for interior", () => {
    expect(forInterior("deep_throat_piercing")).toBe(true);
  });
  it("fixed frame student is not for interior", () => {
    expect(forInterior("fixed_frame_student")).toBe(false);
  });
});

describe("frameStyle", () => {
  it("coping saw heavy uses d handle heavy", () => {
    expect(frameStyle("coping_saw_heavy")).toBe("d_handle_heavy");
  });
});

describe("bestCut", () => {
  it("deep throat piercing best for interior piercing work", () => {
    expect(bestCut("deep_throat_piercing")).toBe("interior_piercing_work");
  });
});

describe("jewelerSaws", () => {
  it("returns 5 types", () => {
    expect(jewelerSaws()).toHaveLength(5);
  });
});
