import { describe, it, expect } from "vitest";
import {
  partQuality, throughput, fiberVolume, surfaceFinish,
  rmCost_, closedMold, forHighVolume, molderConfig,
  bestUse, rtmMolderTypes,
} from "../rtm-molder-calc.js";

describe("partQuality", () => {
  it("high pressure rtm best part quality", () => {
    expect(partQuality("high_pressure_rtm")).toBeGreaterThan(partQuality("vartm_infusion"));
  });
});

describe("throughput", () => {
  it("high pressure rtm highest throughput", () => {
    expect(throughput("high_pressure_rtm")).toBeGreaterThan(throughput("vartm_infusion"));
  });
});

describe("fiberVolume", () => {
  it("high pressure rtm best fiber volume", () => {
    expect(fiberVolume("high_pressure_rtm")).toBeGreaterThan(fiberVolume("structural_rim"));
  });
});

describe("surfaceFinish", () => {
  it("standard rtm best surface finish", () => {
    expect(surfaceFinish("standard_rtm")).toBeGreaterThan(surfaceFinish("vartm_infusion"));
  });
});

describe("rmCost_", () => {
  it("high pressure rtm most expensive", () => {
    expect(rmCost_("high_pressure_rtm")).toBeGreaterThan(rmCost_("vartm_infusion"));
  });
});

describe("closedMold", () => {
  it("standard rtm is closed mold", () => {
    expect(closedMold("standard_rtm")).toBe(true);
  });
  it("vartm infusion not closed mold", () => {
    expect(closedMold("vartm_infusion")).toBe(false);
  });
});

describe("forHighVolume", () => {
  it("high pressure rtm for high volume", () => {
    expect(forHighVolume("high_pressure_rtm")).toBe(true);
  });
  it("standard rtm not for high volume", () => {
    expect(forHighVolume("standard_rtm")).toBe(false);
  });
});

describe("molderConfig", () => {
  it("vartm infusion uses vacuum bag flow media large part boat", () => {
    expect(molderConfig("vartm_infusion")).toBe("vartm_infusion_molder_vacuum_bag_flow_media_large_part_boat");
  });
});

describe("bestUse", () => {
  it("high pressure rtm for carbon roof fast inject short cycle", () => {
    expect(bestUse("high_pressure_rtm")).toBe("carbon_roof_high_pressure_rtm_molder_fast_inject_short_cycle");
  });
});

describe("rtmMolderTypes", () => {
  it("returns 5 types", () => {
    expect(rtmMolderTypes()).toHaveLength(5);
  });
});
