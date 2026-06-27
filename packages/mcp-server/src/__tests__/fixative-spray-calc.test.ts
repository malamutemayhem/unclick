import { describe, it, expect } from "vitest";
import {
  protectionLevel, smudgeResist, reworkAbility, colorShift,
  sprayCost, archivalGrade, matteFinish, sprayBase,
  bestMedium, fixativeSprays,
} from "../fixative-spray-calc.js";

describe("protectionLevel", () => {
  it("final permanent seal best protection level", () => {
    expect(protectionLevel("final_permanent_seal")).toBeGreaterThan(protectionLevel("workable_rework_light"));
  });
});

describe("smudgeResist", () => {
  it("final permanent seal best smudge resist", () => {
    expect(smudgeResist("final_permanent_seal")).toBeGreaterThan(smudgeResist("workable_rework_light"));
  });
});

describe("reworkAbility", () => {
  it("workable rework light best rework ability", () => {
    expect(reworkAbility("workable_rework_light")).toBeGreaterThan(reworkAbility("final_permanent_seal"));
  });
});

describe("colorShift", () => {
  it("uv protect archival least color shift", () => {
    expect(colorShift("uv_protect_archival")).toBeLessThan(colorShift("gloss_shine_finish"));
  });
});

describe("sprayCost", () => {
  it("uv protect archival most expensive", () => {
    expect(sprayCost("uv_protect_archival")).toBeGreaterThan(sprayCost("workable_rework_light"));
  });
});

describe("archivalGrade", () => {
  it("uv protect archival is archival grade", () => {
    expect(archivalGrade("uv_protect_archival")).toBe(true);
  });
  it("workable rework light is not archival grade", () => {
    expect(archivalGrade("workable_rework_light")).toBe(false);
  });
});

describe("matteFinish", () => {
  it("matte no gloss flat has matte finish", () => {
    expect(matteFinish("matte_no_gloss_flat")).toBe(true);
  });
  it("gloss shine finish has no matte finish", () => {
    expect(matteFinish("gloss_shine_finish")).toBe(false);
  });
});

describe("sprayBase", () => {
  it("uv protect archival uses uv inhibitor varnish", () => {
    expect(sprayBase("uv_protect_archival")).toBe("uv_inhibitor_varnish");
  });
});

describe("bestMedium", () => {
  it("workable rework light best for charcoal pastel wip", () => {
    expect(bestMedium("workable_rework_light")).toBe("charcoal_pastel_wip");
  });
});

describe("fixativeSprays", () => {
  it("returns 5 types", () => {
    expect(fixativeSprays()).toHaveLength(5);
  });
});
