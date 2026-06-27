import { describe, it, expect } from "vitest";
import {
  panelArea, pieceCount, glassNeeded, sheetsNeeded, solderLength,
  solderWeight, cameLength, copperFoilLength, foilWidth, fluxAmount,
  patinaAmount, cuttingTime, solderingTime, totalProjectTime,
  panelWeight, reinforcementBar, lightTransmission, glassTypes,
} from "../stained-glass.js";

describe("panelArea", () => {
  it("width x height", () => {
    expect(panelArea(30, 40)).toBe(1200);
  });
});

describe("pieceCount", () => {
  it("divides area", () => {
    expect(pieceCount(1200, 25)).toBe(48);
  });

  it("0 for zero piece size", () => {
    expect(pieceCount(1200, 0)).toBe(0);
  });
});

describe("glassNeeded", () => {
  it("adds waste", () => {
    expect(glassNeeded(1000)).toBeGreaterThan(1000);
  });
});

describe("sheetsNeeded", () => {
  it("rounds up", () => {
    expect(sheetsNeeded(4000)).toBeGreaterThan(1);
  });
});

describe("solderLength", () => {
  it("positive for pieces with edges", () => {
    expect(solderLength(48, 20)).toBeGreaterThan(0);
  });
});

describe("solderWeight", () => {
  it("positive for copper foil", () => {
    expect(solderWeight(5, "copper_foil")).toBeGreaterThan(0);
  });

  it("zero for lead came", () => {
    expect(solderWeight(5, "lead_came")).toBe(0);
  });
});

describe("cameLength", () => {
  it("positive meters", () => {
    expect(cameLength(48, 20)).toBeGreaterThan(0);
  });
});

describe("copperFoilLength", () => {
  it("positive meters", () => {
    expect(copperFoilLength(48, 15)).toBeGreaterThan(0);
  });
});

describe("foilWidth", () => {
  it("wider for thicker glass", () => {
    expect(foilWidth(4)).toBeGreaterThan(foilWidth(2));
  });
});

describe("fluxAmount", () => {
  it("10% of solder", () => {
    expect(fluxAmount(100)).toBe(10);
  });
});

describe("patinaAmount", () => {
  it("positive for area", () => {
    expect(patinaAmount(200)).toBeGreaterThan(0);
  });
});

describe("cuttingTime", () => {
  it("complex takes longer", () => {
    expect(cuttingTime(48, "complex")).toBeGreaterThan(cuttingTime(48, "simple"));
  });
});

describe("solderingTime", () => {
  it("copper foil takes longest", () => {
    expect(solderingTime(48, "copper_foil")).toBeGreaterThan(solderingTime(48, "lead_came"));
  });
});

describe("totalProjectTime", () => {
  it("positive hours", () => {
    expect(totalProjectTime(48, "copper_foil", "moderate")).toBeGreaterThan(0);
  });
});

describe("panelWeight", () => {
  it("positive kg", () => {
    expect(panelWeight(5000)).toBeGreaterThan(0);
  });
});

describe("reinforcementBar", () => {
  it("true for tall panels", () => {
    expect(reinforcementBar(80)).toBe(true);
  });

  it("false for small panels", () => {
    expect(reinforcementBar(40)).toBe(false);
  });
});

describe("lightTransmission", () => {
  it("cathedral is most transparent", () => {
    expect(lightTransmission("cathedral")).toBeGreaterThan(lightTransmission("opalescent"));
  });
});

describe("glassTypes", () => {
  it("returns 6 types", () => {
    expect(glassTypes()).toHaveLength(6);
    expect(glassTypes()).toContain("cathedral");
  });
});
