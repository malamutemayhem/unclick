import { describe, it, expect } from "vitest";
import {
  capacity, speed, loadTime, haul,
  scCost, selfLoading, forEarthwork, bowl,
  bestUse, scraperTypes,
} from "../scraper-type-calc.js";

describe("capacity", () => {
  it("twin engine highest capacity", () => {
    expect(capacity("twin_engine_push_pull")).toBeGreaterThan(capacity("pull_behind_towed"));
  });
});

describe("speed", () => {
  it("single engine fast", () => {
    expect(speed("single_engine_open_bowl")).toBeGreaterThan(speed("pull_behind_towed"));
  });
});

describe("loadTime", () => {
  it("elevating fastest load", () => {
    expect(loadTime("elevating_self_loading")).toBeGreaterThan(loadTime("single_engine_open_bowl"));
  });
});

describe("haul", () => {
  it("single engine best haul", () => {
    expect(haul("single_engine_open_bowl")).toBeGreaterThan(haul("pull_behind_towed"));
  });
});

describe("scCost", () => {
  it("twin engine most expensive", () => {
    expect(scCost("twin_engine_push_pull")).toBeGreaterThan(scCost("pull_behind_towed"));
  });
});

describe("selfLoading", () => {
  it("elevating is self loading", () => {
    expect(selfLoading("elevating_self_loading")).toBe(true);
  });
  it("single engine not self loading", () => {
    expect(selfLoading("single_engine_open_bowl")).toBe(false);
  });
});

describe("forEarthwork", () => {
  it("single engine for earthwork", () => {
    expect(forEarthwork("single_engine_open_bowl")).toBe(true);
  });
  it("pull behind not for earthwork", () => {
    expect(forEarthwork("pull_behind_towed")).toBe(false);
  });
});

describe("bowl", () => {
  it("elevating uses flight chain", () => {
    expect(bowl("elevating_self_loading")).toBe("elevator_flight_chain_self_load");
  });
});

describe("bestUse", () => {
  it("single engine for large cut fill", () => {
    expect(bestUse("single_engine_open_bowl")).toBe("large_cut_fill_with_pusher");
  });
});

describe("scraperTypes", () => {
  it("returns 5 types", () => {
    expect(scraperTypes()).toHaveLength(5);
  });
});
