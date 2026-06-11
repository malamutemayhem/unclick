import { describe, it, expect } from "vitest";
import {
  cutPrecision, throughput, materialRange, nestUtilization,
  pcCost_, automated, forDryFabric, cutterConfig,
  bestUse, plyCutterTypes,
} from "../ply-cutter-calc.js";

describe("cutPrecision", () => {
  it("gerber single best cut precision", () => {
    expect(cutPrecision("gerber_single")).toBeGreaterThan(cutPrecision("manual_template"));
  });
});

describe("throughput", () => {
  it("gerber multi highest throughput", () => {
    expect(throughput("gerber_multi")).toBeGreaterThan(throughput("manual_template"));
  });
});

describe("materialRange", () => {
  it("zund modular best material range", () => {
    expect(materialRange("zund_modular")).toBeGreaterThan(materialRange("gerber_multi"));
  });
});

describe("nestUtilization", () => {
  it("zund modular best nest utilization", () => {
    expect(nestUtilization("zund_modular")).toBeGreaterThan(nestUtilization("manual_template"));
  });
});

describe("pcCost_", () => {
  it("zund modular most expensive", () => {
    expect(pcCost_("zund_modular")).toBeGreaterThan(pcCost_("manual_template"));
  });
});

describe("automated", () => {
  it("gerber single is automated", () => {
    expect(automated("gerber_single")).toBe(true);
  });
  it("manual template not automated", () => {
    expect(automated("manual_template")).toBe(false);
  });
});

describe("forDryFabric", () => {
  it("gerber single for dry fabric", () => {
    expect(forDryFabric("gerber_single")).toBe(true);
  });
  it("eastman conveyor not for dry fabric", () => {
    expect(forDryFabric("eastman_conveyor")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("eastman conveyor uses continuous feed roll to cut inline", () => {
    expect(cutterConfig("eastman_conveyor")).toBe("eastman_conveyor_ply_cutter_continuous_feed_roll_to_cut_inline");
  });
});

describe("bestUse", () => {
  it("zund modular for mixed media multi tool flexible setup", () => {
    expect(bestUse("zund_modular")).toBe("mixed_media_zund_modular_ply_cutter_multi_tool_flexible_setup");
  });
});

describe("plyCutterTypes", () => {
  it("returns 5 types", () => {
    expect(plyCutterTypes()).toHaveLength(5);
  });
});
