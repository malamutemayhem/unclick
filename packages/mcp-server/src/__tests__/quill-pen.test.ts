import { describe, it, expect } from "vitest";
import {
  featherLength, nibCutAngle, temperingTime, temperingTemp,
  inkViscosity, dryingTime, inkPerPage, dipFrequency,
  writingSpeed, pageTime, nibLifePages, sandDrying, featherTypes,
} from "../quill-pen.js";

describe("featherLength", () => {
  it("ostrich longest", () => {
    expect(featherLength("ostrich")).toBeGreaterThan(featherLength("crow"));
  });
});

describe("nibCutAngle", () => {
  it("italic = 45 degrees", () => {
    expect(nibCutAngle("italic")).toBe(45);
  });
});

describe("temperingTime", () => {
  it("positive minutes", () => {
    expect(temperingTime("goose")).toBeGreaterThan(0);
  });
});

describe("temperingTemp", () => {
  it("is 60C", () => {
    expect(temperingTemp()).toBe(60);
  });
});

describe("inkViscosity", () => {
  it("india is thick", () => {
    expect(inkViscosity("india")).toBe("thick");
  });
  it("iron gall is thin", () => {
    expect(inkViscosity("iron_gall")).toBe("thin");
  });
});

describe("dryingTime", () => {
  it("india ink dries slowest", () => {
    expect(dryingTime("india")).toBeGreaterThan(dryingTime("walnut"));
  });
});

describe("inkPerPage", () => {
  it("positive ml", () => {
    expect(inkPerPage(30, 60)).toBeGreaterThan(0);
  });
});

describe("dipFrequency", () => {
  it("large nib = fewer dips", () => {
    expect(dipFrequency("large")).toBeGreaterThan(dipFrequency("small"));
  });
});

describe("writingSpeed", () => {
  it("master fastest", () => {
    expect(writingSpeed("master")).toBeGreaterThan(writingSpeed("beginner"));
  });
});

describe("pageTime", () => {
  it("positive minutes", () => {
    expect(pageTime(200, 10)).toBeGreaterThan(0);
  });
  it("zero wpm returns 0", () => {
    expect(pageTime(200, 0)).toBe(0);
  });
});

describe("nibLifePages", () => {
  it("ostrich lasts longest", () => {
    expect(nibLifePages("ostrich")).toBeGreaterThan(nibLifePages("crow"));
  });
});

describe("sandDrying", () => {
  it("needed returns sand or blotting", () => {
    expect(sandDrying(true)).toContain("sand");
  });
  it("not needed is air dry", () => {
    expect(sandDrying(false)).toContain("air dry");
  });
});

describe("featherTypes", () => {
  it("returns 5 types", () => {
    expect(featherTypes()).toHaveLength(5);
  });
});
