import { describe, it, expect } from "vitest";
import {
  attachStrength, releaseClean, heatRetain, controlSpin,
  puntyCost, cleanBreak, forHollow, tipMaterial,
  bestUse, puntyRods,
} from "../punty-rod-calc.js";

describe("attachStrength", () => {
  it("cup punty attach strongest attach", () => {
    expect(attachStrength("cup_punty_attach")).toBeGreaterThan(attachStrength("spring_punty_snap"));
  });
});

describe("releaseClean", () => {
  it("spring punty snap cleanest release", () => {
    expect(releaseClean("spring_punty_snap")).toBeGreaterThan(releaseClean("solid_steel_basic"));
  });
});

describe("heatRetain", () => {
  it("graphite tip release best heat retain", () => {
    expect(heatRetain("graphite_tip_release")).toBeGreaterThan(heatRetain("spring_punty_snap"));
  });
});

describe("controlSpin", () => {
  it("hollow blow through best spin control", () => {
    expect(controlSpin("hollow_blow_through")).toBeGreaterThan(controlSpin("cup_punty_attach"));
  });
});

describe("puntyCost", () => {
  it("spring punty snap most expensive", () => {
    expect(puntyCost("spring_punty_snap")).toBeGreaterThan(puntyCost("solid_steel_basic"));
  });
});

describe("cleanBreak", () => {
  it("graphite tip release has clean break", () => {
    expect(cleanBreak("graphite_tip_release")).toBe(true);
  });
  it("solid steel basic no clean break", () => {
    expect(cleanBreak("solid_steel_basic")).toBe(false);
  });
});

describe("forHollow", () => {
  it("hollow blow through is for hollow", () => {
    expect(forHollow("hollow_blow_through")).toBe(true);
  });
  it("solid steel basic not for hollow", () => {
    expect(forHollow("solid_steel_basic")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("graphite tip release uses graphite carbon pad", () => {
    expect(tipMaterial("graphite_tip_release")).toBe("graphite_carbon_pad");
  });
});

describe("bestUse", () => {
  it("spring punty snap best for clean snap release", () => {
    expect(bestUse("spring_punty_snap")).toBe("clean_snap_release");
  });
});

describe("puntyRods", () => {
  it("returns 5 types", () => {
    expect(puntyRods()).toHaveLength(5);
  });
});
