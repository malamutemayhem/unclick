import { describe, it, expect } from "vitest";
import {
  wettability, jointStrength, meltTemp, reliability,
  wireCost, leadFree, rosinCore, alloyType,
  bestUse, solderWires,
} from "../solder-wire-calc.js";

describe("wettability", () => {
  it("sn63 pb37 leaded best wettability", () => {
    expect(wettability("sn63_pb37_leaded")).toBeGreaterThan(wettability("bismuth_low_temp"));
  });
});

describe("jointStrength", () => {
  it("sn62 pb36 ag2 silver strongest joint", () => {
    expect(jointStrength("sn62_pb36_ag2_silver")).toBeGreaterThan(jointStrength("bismuth_low_temp"));
  });
});

describe("meltTemp", () => {
  it("sn96 sac305 higher melt temp than leaded", () => {
    expect(meltTemp("sn96_sac305_leadfree")).toBeGreaterThan(meltTemp("sn63_pb37_leaded"));
  });
});

describe("reliability", () => {
  it("sn62 pb36 ag2 silver most reliable", () => {
    expect(reliability("sn62_pb36_ag2_silver")).toBeGreaterThan(reliability("bismuth_low_temp"));
  });
});

describe("wireCost", () => {
  it("sn62 pb36 ag2 silver most expensive", () => {
    expect(wireCost("sn62_pb36_ag2_silver")).toBeGreaterThan(wireCost("sn63_pb37_leaded"));
  });
});

describe("leadFree", () => {
  it("sn96 sac305 is lead free", () => {
    expect(leadFree("sn96_sac305_leadfree")).toBe(true);
  });
  it("sn63 pb37 not lead free", () => {
    expect(leadFree("sn63_pb37_leaded")).toBe(false);
  });
});

describe("rosinCore", () => {
  it("sn63 pb37 is rosin core", () => {
    expect(rosinCore("sn63_pb37_leaded")).toBe(true);
  });
  it("bismuth low temp not rosin core", () => {
    expect(rosinCore("bismuth_low_temp")).toBe(false);
  });
});

describe("alloyType", () => {
  it("sn96 sac305 uses sac tin silver copper", () => {
    expect(alloyType("sn96_sac305_leadfree")).toBe("sac_tin_silver_copper");
  });
});

describe("bestUse", () => {
  it("bismuth low temp best for heat sensitive rework", () => {
    expect(bestUse("bismuth_low_temp")).toBe("heat_sensitive_rework");
  });
});

describe("solderWires", () => {
  it("returns 5 types", () => {
    expect(solderWires()).toHaveLength(5);
  });
});
