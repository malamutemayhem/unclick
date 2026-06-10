import { describe, it, expect } from "vitest";
import {
  bladeKerfMm, boardFeetPerLog, yieldPercent, cuttingSpeedMPerSec,
  feedRateMPerMin, bladeTensionKn, teethPerCm, sharpeningIntervalHours,
  noiseDbA, dailyOutputM3, sawTypes,
} from "../sawmill-calc.js";

describe("bladeKerfMm", () => {
  it("band saw has thinnest kerf", () => {
    expect(bladeKerfMm("band")).toBeLessThan(bladeKerfMm("circular"));
  });
  it("chainsaw has thickest kerf", () => {
    expect(bladeKerfMm("chainsaw")).toBeGreaterThan(bladeKerfMm("circular"));
  });
});

describe("boardFeetPerLog", () => {
  it("larger log = more board feet", () => {
    expect(boardFeetPerLog(40, 3)).toBeGreaterThan(boardFeetPerLog(30, 3));
  });
  it("longer log = more board feet", () => {
    expect(boardFeetPerLog(30, 5)).toBeGreaterThan(boardFeetPerLog(30, 3));
  });
});

describe("yieldPercent", () => {
  it("band saw highest yield", () => {
    expect(yieldPercent("band")).toBeGreaterThan(yieldPercent("chainsaw"));
  });
});

describe("cuttingSpeedMPerSec", () => {
  it("circular fastest", () => {
    expect(cuttingSpeedMPerSec("circular")).toBeGreaterThan(cuttingSpeedMPerSec("pit_saw"));
  });
});

describe("feedRateMPerMin", () => {
  it("circular has highest feed rate", () => {
    expect(feedRateMPerMin("circular")).toBeGreaterThan(feedRateMPerMin("band"));
  });
});

describe("bladeTensionKn", () => {
  it("circular has no tension", () => {
    expect(bladeTensionKn("circular")).toBe(0);
  });
  it("band has highest tension", () => {
    expect(bladeTensionKn("band")).toBeGreaterThan(bladeTensionKn("frame"));
  });
});

describe("teethPerCm", () => {
  it("chainsaw has most teeth per cm", () => {
    expect(teethPerCm("chainsaw")).toBeGreaterThan(teethPerCm("pit_saw"));
  });
});

describe("sharpeningIntervalHours", () => {
  it("circular lasts longest", () => {
    expect(sharpeningIntervalHours("circular")).toBeGreaterThan(
      sharpeningIntervalHours("chainsaw")
    );
  });
});

describe("noiseDbA", () => {
  it("chainsaw loudest", () => {
    expect(noiseDbA("chainsaw")).toBeGreaterThan(noiseDbA("band"));
  });
  it("pit saw quietest", () => {
    expect(noiseDbA("pit_saw")).toBeLessThan(noiseDbA("frame"));
  });
});

describe("dailyOutputM3", () => {
  it("circular highest output", () => {
    expect(dailyOutputM3("circular")).toBeGreaterThan(dailyOutputM3("pit_saw"));
  });
});

describe("sawTypes", () => {
  it("returns 5 types", () => {
    expect(sawTypes()).toHaveLength(5);
  });
});
