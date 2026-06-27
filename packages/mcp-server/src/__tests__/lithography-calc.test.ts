import { describe, it, expect } from "vitest";
import {
  resolution, throughput, overlay, defectivity,
  liCost, maskless, forHvm, source,
  bestUse, lithographies,
} from "../lithography-calc.js";

describe("resolution", () => {
  it("euv highest resolution", () => {
    expect(resolution("euv_13_5nm")).toBeGreaterThan(resolution("duv_193nm_immersion"));
  });
});

describe("throughput", () => {
  it("duv highest throughput", () => {
    expect(throughput("duv_193nm_immersion")).toBeGreaterThan(throughput("ebeam_direct_write"));
  });
});

describe("overlay", () => {
  it("euv best overlay", () => {
    expect(overlay("euv_13_5nm")).toBeGreaterThan(overlay("dsa_directed_self"));
  });
});

describe("defectivity", () => {
  it("ebeam lowest defectivity", () => {
    expect(defectivity("ebeam_direct_write")).toBeGreaterThan(defectivity("dsa_directed_self"));
  });
});

describe("liCost", () => {
  it("euv most expensive", () => {
    expect(liCost("euv_13_5nm")).toBeGreaterThan(liCost("nanoimprint_nil"));
  });
});

describe("maskless", () => {
  it("ebeam is maskless", () => {
    expect(maskless("ebeam_direct_write")).toBe(true);
  });
  it("duv not maskless", () => {
    expect(maskless("duv_193nm_immersion")).toBe(false);
  });
});

describe("forHvm", () => {
  it("duv for hvm", () => {
    expect(forHvm("duv_193nm_immersion")).toBe(true);
  });
  it("ebeam not for hvm", () => {
    expect(forHvm("ebeam_direct_write")).toBe(false);
  });
});

describe("source", () => {
  it("euv uses tin droplet plasma euv", () => {
    expect(source("euv_13_5nm")).toBe("tin_droplet_plasma_euv");
  });
});

describe("bestUse", () => {
  it("euv best for leading edge sub 5nm", () => {
    expect(bestUse("euv_13_5nm")).toBe("leading_edge_sub_5nm_gate");
  });
});

describe("lithographies", () => {
  it("returns 5 types", () => {
    expect(lithographies()).toHaveLength(5);
  });
});
