import { describe, it, expect } from "vitest";
import {
  reliability, thermal, pitch, reworkability,
  sjCost, leadFree, forAutomotive, composition,
  bestUse, solderJoints,
} from "../solder-joint-calc.js";

describe("reliability", () => {
  it("sintered silver most reliable", () => {
    expect(reliability("sintered_silver")).toBeGreaterThan(reliability("anisotropic_conductive"));
  });
});

describe("thermal", () => {
  it("sintered silver best thermal", () => {
    expect(thermal("sintered_silver")).toBeGreaterThan(thermal("sac305_lead_free"));
  });
});

describe("pitch", () => {
  it("copper pillar finest pitch", () => {
    expect(pitch("copper_pillar")).toBeGreaterThan(pitch("sac305_lead_free"));
  });
});

describe("reworkability", () => {
  it("snpb eutectic most reworkable", () => {
    expect(reworkability("snpb_eutectic")).toBeGreaterThan(reworkability("sintered_silver"));
  });
});

describe("sjCost", () => {
  it("sintered silver most expensive", () => {
    expect(sjCost("sintered_silver")).toBeGreaterThan(sjCost("snpb_eutectic"));
  });
});

describe("leadFree", () => {
  it("sac305 lead free is lead free", () => {
    expect(leadFree("sac305_lead_free")).toBe(true);
  });
  it("snpb eutectic not lead free", () => {
    expect(leadFree("snpb_eutectic")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("sintered silver for automotive", () => {
    expect(forAutomotive("sintered_silver")).toBe(true);
  });
  it("copper pillar not for automotive", () => {
    expect(forAutomotive("copper_pillar")).toBe(false);
  });
});

describe("composition", () => {
  it("copper pillar uses cu pillar sn cap", () => {
    expect(composition("copper_pillar")).toBe("cu_pillar_sn_cap");
  });
});

describe("bestUse", () => {
  it("sintered silver best for sic power module attach", () => {
    expect(bestUse("sintered_silver")).toBe("sic_power_module_attach");
  });
});

describe("solderJoints", () => {
  it("returns 5 types", () => {
    expect(solderJoints()).toHaveLength(5);
  });
});
