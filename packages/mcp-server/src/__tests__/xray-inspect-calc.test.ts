import { describe, it, expect } from "vitest";
import {
  resolution, throughput, penetration, analysis,
  systemCost, threeD, inline, sourceType,
  bestUse, xrayInspects,
} from "../xray-inspect-calc.js";

describe("resolution", () => {
  it("micro ct lab best resolution", () => {
    expect(resolution("micro_ct_lab")).toBeGreaterThan(resolution("real_time_fluoro"));
  });
});

describe("throughput", () => {
  it("real time fluoro highest throughput", () => {
    expect(throughput("real_time_fluoro")).toBeGreaterThan(throughput("micro_ct_lab"));
  });
});

describe("penetration", () => {
  it("3d ct inline best penetration", () => {
    expect(penetration("3d_ct_inline")).toBeGreaterThan(penetration("micro_ct_lab"));
  });
});

describe("analysis", () => {
  it("3d ct inline best analysis", () => {
    expect(analysis("3d_ct_inline")).toBeGreaterThan(analysis("real_time_fluoro"));
  });
});

describe("systemCost", () => {
  it("3d ct inline most expensive", () => {
    expect(systemCost("3d_ct_inline")).toBeGreaterThan(systemCost("real_time_fluoro"));
  });
});

describe("threeD", () => {
  it("micro ct lab is 3d", () => {
    expect(threeD("micro_ct_lab")).toBe(true);
  });
  it("2d xray cabinet not 3d", () => {
    expect(threeD("2d_xray_cabinet")).toBe(false);
  });
});

describe("inline", () => {
  it("3d ct inline is inline", () => {
    expect(inline("3d_ct_inline")).toBe(true);
  });
  it("micro ct lab not inline", () => {
    expect(inline("micro_ct_lab")).toBe(false);
  });
});

describe("sourceType", () => {
  it("micro ct lab uses nano focus tube", () => {
    expect(sourceType("micro_ct_lab")).toBe("nano_focus_tube");
  });
});

describe("bestUse", () => {
  it("real time fluoro best for rework live monitor", () => {
    expect(bestUse("real_time_fluoro")).toBe("rework_live_monitor");
  });
});

describe("xrayInspects", () => {
  it("returns 5 types", () => {
    expect(xrayInspects()).toHaveLength(5);
  });
});
