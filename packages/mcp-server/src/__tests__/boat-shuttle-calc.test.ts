import { describe, it, expect } from "vitest";
import {
  throwSpeed, yarnCapacity, tensionControl, aerodynamics,
  shuttleCost, hasTension, forRag, shuttleMaterial,
  bestUse, boatShuttles,
} from "../boat-shuttle-calc.js";

describe("throwSpeed", () => {
  it("end feed tension fastest throw", () => {
    expect(throwSpeed("end_feed_tension")).toBeGreaterThan(throwSpeed("rag_wide_flat"));
  });
});

describe("yarnCapacity", () => {
  it("double bobbin wide most capacity", () => {
    expect(yarnCapacity("double_bobbin_wide")).toBeGreaterThan(yarnCapacity("closed_bottom_slim"));
  });
});

describe("tensionControl", () => {
  it("end feed tension best tension control", () => {
    expect(tensionControl("end_feed_tension")).toBeGreaterThan(tensionControl("open_bottom_basic"));
  });
});

describe("aerodynamics", () => {
  it("closed bottom slim most aerodynamic", () => {
    expect(aerodynamics("closed_bottom_slim")).toBeGreaterThan(aerodynamics("rag_wide_flat"));
  });
});

describe("shuttleCost", () => {
  it("end feed tension most expensive", () => {
    expect(shuttleCost("end_feed_tension")).toBeGreaterThan(shuttleCost("open_bottom_basic"));
  });
});

describe("hasTension", () => {
  it("end feed tension has tension", () => {
    expect(hasTension("end_feed_tension")).toBe(true);
  });
  it("open bottom basic has no tension", () => {
    expect(hasTension("open_bottom_basic")).toBe(false);
  });
});

describe("forRag", () => {
  it("rag wide flat is for rag", () => {
    expect(forRag("rag_wide_flat")).toBe(true);
  });
  it("closed bottom slim is not for rag", () => {
    expect(forRag("closed_bottom_slim")).toBe(false);
  });
});

describe("shuttleMaterial", () => {
  it("end feed tension uses rosewood spring feed", () => {
    expect(shuttleMaterial("end_feed_tension")).toBe("rosewood_spring_feed");
  });
});

describe("bestUse", () => {
  it("closed bottom slim best for fast production weave", () => {
    expect(bestUse("closed_bottom_slim")).toBe("fast_production_weave");
  });
});

describe("boatShuttles", () => {
  it("returns 5 types", () => {
    expect(boatShuttles()).toHaveLength(5);
  });
});
