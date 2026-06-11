import { describe, it, expect } from "vitest";
import {
  holeClean, alignTrue, speedBore, sizeRange,
  borerCost, powered, adjustable, cutterType,
  bestUse, naveborers,
} from "../nave-borer-calc.js";

describe("holeClean", () => {
  it("shell bore smooth cleanest hole", () => {
    expect(holeClean("shell_bore_smooth")).toBeGreaterThan(holeClean("expansion_bore_adjust"));
  });
});

describe("alignTrue", () => {
  it("hand reamer finish truest alignment", () => {
    expect(alignTrue("hand_reamer_finish")).toBeGreaterThan(alignTrue("power_bore_electric"));
  });
});

describe("speedBore", () => {
  it("power bore electric fastest bore", () => {
    expect(speedBore("power_bore_electric")).toBeGreaterThan(speedBore("hand_reamer_finish"));
  });
});

describe("sizeRange", () => {
  it("expansion bore adjust best size range", () => {
    expect(sizeRange("expansion_bore_adjust")).toBeGreaterThan(sizeRange("hand_reamer_finish"));
  });
});

describe("borerCost", () => {
  it("power bore electric most expensive", () => {
    expect(borerCost("power_bore_electric")).toBeGreaterThan(borerCost("tapered_auger_standard"));
  });
});

describe("powered", () => {
  it("power bore electric is powered", () => {
    expect(powered("power_bore_electric")).toBe(true);
  });
  it("tapered auger standard not powered", () => {
    expect(powered("tapered_auger_standard")).toBe(false);
  });
});

describe("adjustable", () => {
  it("expansion bore adjust is adjustable", () => {
    expect(adjustable("expansion_bore_adjust")).toBe(true);
  });
  it("shell bore smooth not adjustable", () => {
    expect(adjustable("shell_bore_smooth")).toBe(false);
  });
});

describe("cutterType", () => {
  it("shell bore smooth uses smooth shell edge", () => {
    expect(cutterType("shell_bore_smooth")).toBe("smooth_shell_edge");
  });
});

describe("bestUse", () => {
  it("tapered auger standard best for general nave bore", () => {
    expect(bestUse("tapered_auger_standard")).toBe("general_nave_bore");
  });
});

describe("naveborers", () => {
  it("returns 5 types", () => {
    expect(naveborers()).toHaveLength(5);
  });
});
