import { describe, it, expect } from "vitest";
import {
  bandFrequency, wavelength, dipoleLength, quarterWaveVertical,
  eirp, swr, returnLoss, pathLoss, linkBudget, wattsToDbm,
  dbmToWatts, repeaterOffset, phoneticsForCall, bands,
} from "../ham-radio.js";

describe("bandFrequency", () => {
  it("20m starts at 14MHz", () => {
    expect(bandFrequency("20m").low).toBe(14);
  });
});

describe("wavelength", () => {
  it("300/freq", () => {
    expect(wavelength(14)).toBeCloseTo(21.43, 1);
  });
});

describe("dipoleLength", () => {
  it("143/freq meters", () => {
    expect(dipoleLength(14)).toBeCloseTo(10.21, 1);
  });
});

describe("quarterWaveVertical", () => {
  it("half of dipole", () => {
    expect(quarterWaveVertical(14)).toBeLessThan(dipoleLength(14));
  });
});

describe("eirp", () => {
  it("more than tx power with gain", () => {
    expect(eirp(100, 6, 1)).toBeGreaterThan(100);
  });
});

describe("swr", () => {
  it("1.0 with no reflected", () => {
    expect(swr(100, 0)).toBe(1);
  });

  it("high with reflected", () => {
    expect(swr(100, 25)).toBeGreaterThan(2);
  });
});

describe("returnLoss", () => {
  it("high for low SWR", () => {
    expect(returnLoss(1.5)).toBeGreaterThan(returnLoss(3));
  });
});

describe("pathLoss", () => {
  it("positive dB", () => {
    expect(pathLoss(100, 14)).toBeGreaterThan(0);
  });
});

describe("linkBudget", () => {
  it("returns dB margin", () => {
    expect(linkBudget(47, 6, 6, 120)).toBeLessThan(0);
  });
});

describe("wattsToDbm", () => {
  it("100W = 50dBm", () => {
    expect(wattsToDbm(100)).toBe(50);
  });
});

describe("dbmToWatts", () => {
  it("50dBm = 100W", () => {
    expect(dbmToWatts(50)).toBeCloseTo(100, 0);
  });
});

describe("repeaterOffset", () => {
  it("0.6 for 2m", () => {
    expect(repeaterOffset("2m")).toBe(0.6);
  });

  it("0 for HF", () => {
    expect(repeaterOffset("20m")).toBe(0);
  });
});

describe("phoneticsForCall", () => {
  it("spells out callsign", () => {
    expect(phoneticsForCall("VK3")).toContain("Victor");
  });
});

describe("bands", () => {
  it("returns 9 bands", () => {
    expect(bands()).toHaveLength(9);
  });
});
