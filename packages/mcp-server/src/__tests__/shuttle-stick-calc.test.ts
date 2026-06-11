import { describe, it, expect } from "vitest";
import {
  throwSpeed, weftControl, loadCapacity, handleBalance,
  shuttleCost, hasRoller, forRag, bodyShape,
  bestUse, shuttleSticks,
} from "../shuttle-stick-calc.js";

describe("throwSpeed", () => {
  it("ski shuttle slim fastest throw", () => {
    expect(throwSpeed("ski_shuttle_slim")).toBeGreaterThan(throwSpeed("rag_shuttle_wide"));
  });
});

describe("weftControl", () => {
  it("end feed tension best weft control", () => {
    expect(weftControl("end_feed_tension")).toBeGreaterThan(weftControl("stick_shuttle_flat"));
  });
});

describe("loadCapacity", () => {
  it("rag shuttle wide highest load capacity", () => {
    expect(loadCapacity("rag_shuttle_wide")).toBeGreaterThan(loadCapacity("ski_shuttle_slim"));
  });
});

describe("handleBalance", () => {
  it("boat shuttle roller best balance", () => {
    expect(handleBalance("boat_shuttle_roller")).toBeGreaterThan(handleBalance("rag_shuttle_wide"));
  });
});

describe("shuttleCost", () => {
  it("end feed tension most expensive", () => {
    expect(shuttleCost("end_feed_tension")).toBeGreaterThan(shuttleCost("stick_shuttle_flat"));
  });
});

describe("hasRoller", () => {
  it("boat shuttle roller has roller", () => {
    expect(hasRoller("boat_shuttle_roller")).toBe(true);
  });
  it("stick shuttle flat no roller", () => {
    expect(hasRoller("stick_shuttle_flat")).toBe(false);
  });
});

describe("forRag", () => {
  it("rag shuttle wide is for rag", () => {
    expect(forRag("rag_shuttle_wide")).toBe(true);
  });
  it("boat shuttle roller not for rag", () => {
    expect(forRag("boat_shuttle_roller")).toBe(false);
  });
});

describe("bodyShape", () => {
  it("ski shuttle slim uses slim ski taper", () => {
    expect(bodyShape("ski_shuttle_slim")).toBe("slim_ski_taper");
  });
});

describe("bestUse", () => {
  it("end feed tension best for even selvedge weave", () => {
    expect(bestUse("end_feed_tension")).toBe("even_selvedge_weave");
  });
});

describe("shuttleSticks", () => {
  it("returns 5 types", () => {
    expect(shuttleSticks()).toHaveLength(5);
  });
});
