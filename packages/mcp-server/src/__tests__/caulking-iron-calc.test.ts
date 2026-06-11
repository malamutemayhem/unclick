import { describe, it, expect } from "vitest";
import {
  packForce, seamReach, controlFeel, edgeProtect,
  caulkCost, bent, forDeepSeam, bladeWidth,
  bestUse, caulkingIrons,
} from "../caulking-iron-calc.js";

describe("packForce", () => {
  it("hawsing iron deep strongest pack", () => {
    expect(packForce("hawsing_iron_deep")).toBeGreaterThan(packForce("making_iron_thin"));
  });
});

describe("seamReach", () => {
  it("bent iron angle best reach", () => {
    expect(seamReach("bent_iron_angle")).toBeGreaterThan(seamReach("reaming_iron_wide"));
  });
});

describe("controlFeel", () => {
  it("making iron thin best control", () => {
    expect(controlFeel("making_iron_thin")).toBeGreaterThan(controlFeel("hawsing_iron_deep"));
  });
});

describe("edgeProtect", () => {
  it("dumb iron set best edge protect", () => {
    expect(edgeProtect("dumb_iron_set")).toBeGreaterThan(edgeProtect("making_iron_thin"));
  });
});

describe("caulkCost", () => {
  it("hawsing iron deep most expensive", () => {
    expect(caulkCost("hawsing_iron_deep")).toBeGreaterThan(caulkCost("making_iron_thin"));
  });
});

describe("bent", () => {
  it("bent iron angle is bent", () => {
    expect(bent("bent_iron_angle")).toBe(true);
  });
  it("making iron thin not bent", () => {
    expect(bent("making_iron_thin")).toBe(false);
  });
});

describe("forDeepSeam", () => {
  it("hawsing iron deep is for deep seam", () => {
    expect(forDeepSeam("hawsing_iron_deep")).toBe(true);
  });
  it("making iron thin not for deep seam", () => {
    expect(forDeepSeam("making_iron_thin")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("dumb iron set uses blunt smooth face", () => {
    expect(bladeWidth("dumb_iron_set")).toBe("blunt_smooth_face");
  });
});

describe("bestUse", () => {
  it("bent iron angle best for curved hull seam", () => {
    expect(bestUse("bent_iron_angle")).toBe("curved_hull_seam");
  });
});

describe("caulkingIrons", () => {
  it("returns 5 types", () => {
    expect(caulkingIrons()).toHaveLength(5);
  });
});
