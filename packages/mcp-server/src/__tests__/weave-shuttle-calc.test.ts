import { describe, it, expect } from "vitest";
import {
  throwSpeed, yarnCapacity, tensionControl, easeOfUse,
  shuttleCost, usesBobbin, forWideLoom, shuttleShape,
  bestWeave, weaveShuttles,
} from "../weave-shuttle-calc.js";

describe("throwSpeed", () => {
  it("boat shuttle bobbin fastest throw", () => {
    expect(throwSpeed("boat_shuttle_bobbin")).toBeGreaterThan(throwSpeed("stick_shuttle_flat"));
  });
});

describe("yarnCapacity", () => {
  it("rag shuttle wide most yarn capacity", () => {
    expect(yarnCapacity("rag_shuttle_wide")).toBeGreaterThan(yarnCapacity("stick_shuttle_flat"));
  });
});

describe("tensionControl", () => {
  it("end feed tension best tension control", () => {
    expect(tensionControl("end_feed_tension")).toBeGreaterThan(tensionControl("stick_shuttle_flat"));
  });
});

describe("easeOfUse", () => {
  it("stick shuttle flat easiest to use", () => {
    expect(easeOfUse("stick_shuttle_flat")).toBeGreaterThan(easeOfUse("end_feed_tension"));
  });
});

describe("shuttleCost", () => {
  it("end feed tension most expensive", () => {
    expect(shuttleCost("end_feed_tension")).toBeGreaterThan(shuttleCost("stick_shuttle_flat"));
  });
});

describe("usesBobbin", () => {
  it("boat shuttle bobbin uses bobbin", () => {
    expect(usesBobbin("boat_shuttle_bobbin")).toBe(true);
  });
  it("stick shuttle flat does not use bobbin", () => {
    expect(usesBobbin("stick_shuttle_flat")).toBe(false);
  });
});

describe("forWideLoom", () => {
  it("ski shuttle long is for wide loom", () => {
    expect(forWideLoom("ski_shuttle_long")).toBe(true);
  });
  it("stick shuttle flat is not for wide loom", () => {
    expect(forWideLoom("stick_shuttle_flat")).toBe(false);
  });
});

describe("shuttleShape", () => {
  it("boat shuttle bobbin is curved boat hollow", () => {
    expect(shuttleShape("boat_shuttle_bobbin")).toBe("curved_boat_hollow");
  });
});

describe("bestWeave", () => {
  it("rag shuttle wide best for rag rug strip", () => {
    expect(bestWeave("rag_shuttle_wide")).toBe("rag_rug_strip");
  });
});

describe("weaveShuttles", () => {
  it("returns 5 types", () => {
    expect(weaveShuttles()).toHaveLength(5);
  });
});
