import { describe, it, expect } from "vitest";
import {
  hewFlat, edgeKeep, controlSwing, surfaceFinish,
  axeCost, singleBevel, forBeam, headProfile,
  bestUse, sideAxes,
} from "../side-axe-calc.js";

describe("hewFlat", () => {
  it("broad axe large flattest hew", () => {
    expect(hewFlat("broad_axe_large")).toBeGreaterThan(hewFlat("hewing_hatchet_small"));
  });
});

describe("edgeKeep", () => {
  it("broad axe large good edge keep", () => {
    expect(edgeKeep("broad_axe_large")).toBeGreaterThan(edgeKeep("goosewing_curved"));
  });
});

describe("controlSwing", () => {
  it("hewing hatchet small best control swing", () => {
    expect(controlSwing("hewing_hatchet_small")).toBeGreaterThan(controlSwing("broad_axe_large"));
  });
});

describe("surfaceFinish", () => {
  it("ship adze handle best surface finish", () => {
    expect(surfaceFinish("ship_adze_handle")).toBeGreaterThan(surfaceFinish("kent_broad_medium"));
  });
});

describe("axeCost", () => {
  it("goosewing curved most expensive", () => {
    expect(axeCost("goosewing_curved")).toBeGreaterThan(axeCost("hewing_hatchet_small"));
  });
});

describe("singleBevel", () => {
  it("broad axe large has single bevel", () => {
    expect(singleBevel("broad_axe_large")).toBe(true);
  });
  it("all side axes have single bevel", () => {
    expect(singleBevel("hewing_hatchet_small")).toBe(true);
  });
});

describe("forBeam", () => {
  it("broad axe large is for beam", () => {
    expect(forBeam("broad_axe_large")).toBe(true);
  });
  it("hewing hatchet small not for beam", () => {
    expect(forBeam("hewing_hatchet_small")).toBe(false);
  });
});

describe("headProfile", () => {
  it("goosewing curved uses curved wing face", () => {
    expect(headProfile("goosewing_curved")).toBe("curved_wing_face");
  });
});

describe("bestUse", () => {
  it("broad axe large best for beam face hew", () => {
    expect(bestUse("broad_axe_large")).toBe("beam_face_hew");
  });
});

describe("sideAxes", () => {
  it("returns 5 types", () => {
    expect(sideAxes()).toHaveLength(5);
  });
});
