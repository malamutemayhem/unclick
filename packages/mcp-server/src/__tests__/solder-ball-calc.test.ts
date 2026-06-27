import { describe, it, expect } from "vitest";
import {
  reliability, pitch, thermalCycle, electromigration,
  ballCost, leadFree, forFinePitch, composition,
  bestUse, solderBalls,
} from "../solder-ball-calc.js";

describe("reliability", () => {
  it("copper pillar most reliable", () => {
    expect(reliability("copper_pillar")).toBeGreaterThan(reliability("solder_paste_print"));
  });
});

describe("pitch", () => {
  it("micro bump cu finest pitch", () => {
    expect(pitch("micro_bump_cu")).toBeGreaterThan(pitch("sac_305_leadfree"));
  });
});

describe("thermalCycle", () => {
  it("copper pillar best thermal cycle", () => {
    expect(thermalCycle("copper_pillar")).toBeGreaterThan(thermalCycle("micro_bump_cu"));
  });
});

describe("electromigration", () => {
  it("copper pillar best electromigration", () => {
    expect(electromigration("copper_pillar")).toBeGreaterThan(electromigration("solder_paste_print"));
  });
});

describe("ballCost", () => {
  it("micro bump cu most expensive", () => {
    expect(ballCost("micro_bump_cu")).toBeGreaterThan(ballCost("solder_paste_print"));
  });
});

describe("leadFree", () => {
  it("sac 305 leadfree is lead free", () => {
    expect(leadFree("sac_305_leadfree")).toBe(true);
  });
  it("snpb eutectic not lead free", () => {
    expect(leadFree("snpb_eutectic")).toBe(false);
  });
});

describe("forFinePitch", () => {
  it("copper pillar is for fine pitch", () => {
    expect(forFinePitch("copper_pillar")).toBe(true);
  });
  it("sac 305 leadfree not for fine pitch", () => {
    expect(forFinePitch("sac_305_leadfree")).toBe(false);
  });
});

describe("composition", () => {
  it("micro bump cu uses cu sn micro 10um", () => {
    expect(composition("micro_bump_cu")).toBe("cu_sn_micro_10um");
  });
});

describe("bestUse", () => {
  it("micro bump cu best for hbm die stack", () => {
    expect(bestUse("micro_bump_cu")).toBe("hbm_die_stack");
  });
});

describe("solderBalls", () => {
  it("returns 5 types", () => {
    expect(solderBalls()).toHaveLength(5);
  });
});
