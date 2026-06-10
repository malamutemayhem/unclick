import { describe, it, expect } from "vitest";
import {
  connectionStrength, installSpeed, flowRate, reliability,
  fittingCost, noSpecialTool, deMountable, ringMaterial,
  bestScenario, pexFittings,
} from "../pex-fitting-calc.js";

describe("connectionStrength", () => {
  it("expansion propex strongest connection", () => {
    expect(connectionStrength("expansion_propex")).toBeGreaterThan(connectionStrength("push_fit_sharkbite"));
  });
});

describe("installSpeed", () => {
  it("push fit sharkbite fastest install", () => {
    expect(installSpeed("push_fit_sharkbite")).toBeGreaterThan(installSpeed("expansion_propex"));
  });
});

describe("flowRate", () => {
  it("expansion propex best flow rate", () => {
    expect(flowRate("expansion_propex")).toBeGreaterThan(flowRate("push_fit_sharkbite"));
  });
});

describe("reliability", () => {
  it("expansion propex most reliable", () => {
    expect(reliability("expansion_propex")).toBeGreaterThan(reliability("push_fit_sharkbite"));
  });
});

describe("fittingCost", () => {
  it("press viega jaw most expensive", () => {
    expect(fittingCost("press_viega_jaw")).toBeGreaterThan(fittingCost("crimp_ring_copper"));
  });
});

describe("noSpecialTool", () => {
  it("push fit sharkbite needs no special tool", () => {
    expect(noSpecialTool("push_fit_sharkbite")).toBe(true);
  });
  it("crimp ring copper does need special tool", () => {
    expect(noSpecialTool("crimp_ring_copper")).toBe(false);
  });
});

describe("deMountable", () => {
  it("push fit sharkbite is demountable", () => {
    expect(deMountable("push_fit_sharkbite")).toBe(true);
  });
  it("expansion propex is not", () => {
    expect(deMountable("expansion_propex")).toBe(false);
  });
});

describe("ringMaterial", () => {
  it("expansion propex uses pex expansion ring", () => {
    expect(ringMaterial("expansion_propex")).toBe("pex_expansion_ring");
  });
});

describe("bestScenario", () => {
  it("push fit sharkbite best for diy quick repair", () => {
    expect(bestScenario("push_fit_sharkbite")).toBe("diy_quick_repair");
  });
});

describe("pexFittings", () => {
  it("returns 5 types", () => {
    expect(pexFittings()).toHaveLength(5);
  });
});
