import { describe, it, expect } from "vitest";
import {
  holdStrength, flexOpen, decorativeValue, bindSpeed,
  linkCost, raisedSpine, forLarge, supportType,
  bestUse, frenchLinks,
} from "../french-link-calc.js";

describe("holdStrength", () => {
  it("double link strong strongest hold", () => {
    expect(holdStrength("double_link_strong")).toBeGreaterThan(holdStrength("basic_link_standard"));
  });
});

describe("flexOpen", () => {
  it("tape link flat most flexible open", () => {
    expect(flexOpen("tape_link_flat")).toBeGreaterThan(flexOpen("double_link_strong"));
  });
});

describe("decorativeValue", () => {
  it("raised band classic most decorative", () => {
    expect(decorativeValue("raised_band_classic")).toBeGreaterThan(decorativeValue("tape_link_flat"));
  });
});

describe("bindSpeed", () => {
  it("tape link flat fastest bind", () => {
    expect(bindSpeed("tape_link_flat")).toBeGreaterThan(bindSpeed("double_link_strong"));
  });
});

describe("linkCost", () => {
  it("raised band classic most expensive", () => {
    expect(linkCost("raised_band_classic")).toBeGreaterThan(linkCost("tape_link_flat"));
  });
});

describe("raisedSpine", () => {
  it("raised band classic has raised spine", () => {
    expect(raisedSpine("raised_band_classic")).toBe(true);
  });
  it("tape link flat no raised spine", () => {
    expect(raisedSpine("tape_link_flat")).toBe(false);
  });
});

describe("forLarge", () => {
  it("recessed cord flush is for large", () => {
    expect(forLarge("recessed_cord_flush")).toBe(true);
  });
  it("basic link standard not for large", () => {
    expect(forLarge("basic_link_standard")).toBe(false);
  });
});

describe("supportType", () => {
  it("double link strong uses double chain link", () => {
    expect(supportType("double_link_strong")).toBe("double_chain_link");
  });
});

describe("bestUse", () => {
  it("basic link standard best for general journal bind", () => {
    expect(bestUse("basic_link_standard")).toBe("general_journal_bind");
  });
});

describe("frenchLinks", () => {
  it("returns 5 types", () => {
    expect(frenchLinks()).toHaveLength(5);
  });
});
