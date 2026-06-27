import { describe, it, expect } from "vitest";
import {
  accuracy, speed, forceRange, portability,
  htCost, portable, forMicro, indenter,
  bestUse, hardnessTesterTypes,
} from "../hardness-tester-calc.js";

describe("accuracy", () => {
  it("vickers most accurate", () => {
    expect(accuracy("vickers_diamond_pyramid")).toBeGreaterThan(accuracy("leeb_rebound_portable"));
  });
});

describe("speed", () => {
  it("rockwell fastest", () => {
    expect(speed("rockwell_diamond_cone")).toBeGreaterThan(speed("knoop_micro_indent"));
  });
});

describe("forceRange", () => {
  it("vickers widest force range", () => {
    expect(forceRange("vickers_diamond_pyramid")).toBeGreaterThan(forceRange("leeb_rebound_portable"));
  });
});

describe("portability", () => {
  it("leeb most portable", () => {
    expect(portability("leeb_rebound_portable")).toBeGreaterThan(portability("knoop_micro_indent"));
  });
});

describe("htCost", () => {
  it("knoop most expensive", () => {
    expect(htCost("knoop_micro_indent")).toBeGreaterThan(htCost("leeb_rebound_portable"));
  });
});

describe("portable", () => {
  it("leeb is portable", () => {
    expect(portable("leeb_rebound_portable")).toBe(true);
  });
  it("rockwell not portable", () => {
    expect(portable("rockwell_diamond_cone")).toBe(false);
  });
});

describe("forMicro", () => {
  it("knoop for micro", () => {
    expect(forMicro("knoop_micro_indent")).toBe(true);
  });
  it("brinell not for micro", () => {
    expect(forMicro("brinell_carbide_ball")).toBe(false);
  });
});

describe("indenter", () => {
  it("brinell uses tungsten carbide ball", () => {
    expect(indenter("brinell_carbide_ball")).toBe("tungsten_carbide_ball_10mm");
  });
});

describe("bestUse", () => {
  it("rockwell for production floor qa", () => {
    expect(bestUse("rockwell_diamond_cone")).toBe("heat_treat_qa_production_floor");
  });
});

describe("hardnessTesterTypes", () => {
  it("returns 5 types", () => {
    expect(hardnessTesterTypes()).toHaveLength(5);
  });
});
