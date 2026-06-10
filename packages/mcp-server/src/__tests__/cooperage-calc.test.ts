import { describe, it, expect } from "vitest";
import {
  volumeLiters, charLevel, vanillinContribution,
  tanninLevel, usableFills, angelsSharePercent,
  colorImparted, bestSpirit, costPerBarrel, barrelTypes,
} from "../cooperage-calc.js";

describe("volumeLiters", () => {
  it("port barrel is largest", () => {
    expect(volumeLiters("port")).toBeGreaterThan(
      volumeLiters("american_oak")
    );
  });
});

describe("charLevel", () => {
  it("american oak has highest char", () => {
    expect(charLevel("american_oak")).toBeGreaterThan(
      charLevel("sherry")
    );
  });
});

describe("vanillinContribution", () => {
  it("american oak gives most vanillin", () => {
    expect(vanillinContribution("american_oak")).toBeGreaterThan(
      vanillinContribution("sherry")
    );
  });
});

describe("tanninLevel", () => {
  it("french oak has most tannin", () => {
    expect(tanninLevel("french_oak")).toBeGreaterThan(
      tanninLevel("bourbon")
    );
  });
});

describe("usableFills", () => {
  it("french oak has most fills", () => {
    expect(usableFills("french_oak")).toBeGreaterThan(
      usableFills("bourbon")
    );
  });
});

describe("angelsSharePercent", () => {
  it("port loses most to angels share", () => {
    expect(angelsSharePercent("port")).toBeGreaterThan(
      angelsSharePercent("american_oak")
    );
  });
});

describe("colorImparted", () => {
  it("sherry imparts mahogany", () => {
    expect(colorImparted("sherry")).toBe("mahogany");
  });
});

describe("bestSpirit", () => {
  it("french oak best for cognac", () => {
    expect(bestSpirit("french_oak")).toBe("cognac");
  });
});

describe("costPerBarrel", () => {
  it("sherry barrels cost most", () => {
    expect(costPerBarrel("sherry")).toBeGreaterThan(
      costPerBarrel("bourbon")
    );
  });
});

describe("barrelTypes", () => {
  it("returns 5 types", () => {
    expect(barrelTypes()).toHaveLength(5);
  });
});
