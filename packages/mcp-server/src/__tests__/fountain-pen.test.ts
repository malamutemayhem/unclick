import { describe, it, expect } from "vitest";
import {
  nibWidthMm, lineWidthMm, inkCapacity, pagesPerFill,
  writingDistanceM, dryingTimeSec, sheenVisibility, feedChannels,
  cleaningInterval, nibTuning, inkCostPerPage, paperBleedRisk,
  nibGrinds, fillingSystems,
} from "../fountain-pen.js";

describe("nibWidthMm", () => {
  it("broader = wider", () => {
    expect(nibWidthMm("b")).toBeGreaterThan(nibWidthMm("f"));
  });
});

describe("lineWidthMm", () => {
  it("wet is wider", () => {
    expect(lineWidthMm(0.7, "wet")).toBeGreaterThan(lineWidthMm(0.7, "dry"));
  });
});

describe("inkCapacity", () => {
  it("eyedropper largest", () => {
    expect(inkCapacity("eyedropper")).toBeGreaterThan(inkCapacity("converter"));
  });
});

describe("pagesPerFill", () => {
  it("positive count", () => {
    expect(pagesPerFill(1.4)).toBeGreaterThan(0);
  });
});

describe("writingDistanceM", () => {
  it("positive meters", () => {
    expect(writingDistanceM(1.0, 0.5)).toBeGreaterThan(0);
  });
});

describe("dryingTimeSec", () => {
  it("pigmented slowest", () => {
    expect(dryingTimeSec("pigmented")).toBeGreaterThan(dryingTimeSec("dye"));
  });
});

describe("sheenVisibility", () => {
  it("none without sheen ink", () => {
    expect(sheenVisibility(80, false)).toBe("none");
  });

  it("strong on good paper", () => {
    expect(sheenVisibility(90, true)).toBe("strong");
  });
});

describe("feedChannels", () => {
  it("more for wider nibs", () => {
    expect(feedChannels(1.2)).toBeGreaterThan(feedChannels(0.3));
  });
});

describe("cleaningInterval", () => {
  it("iron gall most frequent", () => {
    expect(cleaningInterval("iron_gall")).toBeLessThan(cleaningInterval("dye"));
  });
});

describe("nibTuning", () => {
  it("returns advice", () => {
    expect(nibTuning("narrow")).toContain("tine");
  });
});

describe("inkCostPerPage", () => {
  it("positive cost", () => {
    expect(inkCostPerPage(50, 15)).toBeGreaterThan(0);
  });
});

describe("paperBleedRisk", () => {
  it("low for good paper", () => {
    expect(paperBleedRisk(100, "well")).toBe("low");
  });

  it("high for thin unsized", () => {
    expect(paperBleedRisk(50, "none")).toBe("high");
  });
});

describe("nibGrinds", () => {
  it("returns 6 grinds", () => {
    expect(nibGrinds()).toHaveLength(6);
  });
});

describe("fillingSystems", () => {
  it("returns 6 systems", () => {
    expect(fillingSystems()).toHaveLength(6);
  });
});
