import { describe, it, expect } from "vitest";
import {
  glossLevel, smoothness, bulkPreserve, lineSpeed,
  pcCost, online, forCoated, calenderConfig,
  bestUse, paperCalenderTypes,
} from "../paper-calender-calc.js";

describe("glossLevel", () => {
  it("supercalender highest gloss level", () => {
    expect(glossLevel("supercalender")).toBeGreaterThan(glossLevel("machine_calender"));
  });
});

describe("smoothness", () => {
  it("supercalender best smoothness", () => {
    expect(smoothness("supercalender")).toBeGreaterThan(smoothness("machine_calender"));
  });
});

describe("bulkPreserve", () => {
  it("machine calender best bulk preserve", () => {
    expect(bulkPreserve("machine_calender")).toBeGreaterThan(bulkPreserve("supercalender"));
  });
});

describe("lineSpeed", () => {
  it("machine calender fastest line speed", () => {
    expect(lineSpeed("machine_calender")).toBeGreaterThan(lineSpeed("supercalender"));
  });
});

describe("pcCost", () => {
  it("shoe calender most expensive", () => {
    expect(pcCost("shoe_calender")).toBeGreaterThan(pcCost("machine_calender"));
  });
});

describe("online", () => {
  it("soft nip is online", () => {
    expect(online("soft_nip")).toBe(true);
  });
  it("supercalender not online", () => {
    expect(online("supercalender")).toBe(false);
  });
});

describe("forCoated", () => {
  it("supercalender for coated", () => {
    expect(forCoated("supercalender")).toBe(true);
  });
  it("machine calender not for coated", () => {
    expect(forCoated("machine_calender")).toBe(false);
  });
});

describe("calenderConfig", () => {
  it("shoe calender uses extended nip wide contact zone", () => {
    expect(calenderConfig("shoe_calender")).toBe("shoe_calender_extended_nip_wide_contact_zone_bulk_gloss_both");
  });
});

describe("bestUse", () => {
  it("supercalender for high gloss magazine", () => {
    expect(bestUse("supercalender")).toBe("high_gloss_magazine_coated_paper_supercalender_offline_premium");
  });
});

describe("paperCalenderTypes", () => {
  it("returns 5 types", () => {
    expect(paperCalenderTypes()).toHaveLength(5);
  });
});
