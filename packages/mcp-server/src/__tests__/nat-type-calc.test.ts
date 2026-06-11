import { describe, it, expect } from "vitest";
import {
  connectivity, security, p2pCompat, scalability,
  ntCost, hairpin, forVoip, mapping,
  bestUse, natTypes,
} from "../nat-type-calc.js";

describe("connectivity", () => {
  it("full cone best connectivity", () => {
    expect(connectivity("full_cone_static")).toBeGreaterThan(connectivity("symmetric_random"));
  });
});

describe("security", () => {
  it("symmetric random most secure", () => {
    expect(security("symmetric_random")).toBeGreaterThan(security("full_cone_static"));
  });
});

describe("p2pCompat", () => {
  it("full cone best p2p compat", () => {
    expect(p2pCompat("full_cone_static")).toBeGreaterThan(p2pCompat("symmetric_random"));
  });
});

describe("scalability", () => {
  it("cgnat most scalable", () => {
    expect(scalability("cgnat_carrier_grade")).toBeGreaterThan(scalability("full_cone_static"));
  });
});

describe("ntCost", () => {
  it("cgnat most expensive", () => {
    expect(ntCost("cgnat_carrier_grade")).toBeGreaterThan(ntCost("port_restricted_cone"));
  });
});

describe("hairpin", () => {
  it("full cone supports hairpin", () => {
    expect(hairpin("full_cone_static")).toBe(true);
  });
  it("symmetric random no hairpin", () => {
    expect(hairpin("symmetric_random")).toBe(false);
  });
});

describe("forVoip", () => {
  it("full cone for voip", () => {
    expect(forVoip("full_cone_static")).toBe(true);
  });
  it("symmetric random not for voip", () => {
    expect(forVoip("symmetric_random")).toBe(false);
  });
});

describe("mapping", () => {
  it("cgnat uses deterministic pool block alloc", () => {
    expect(mapping("cgnat_carrier_grade")).toBe("deterministic_pool_block_alloc");
  });
});

describe("bestUse", () => {
  it("cgnat best for isp ipv4 exhaustion", () => {
    expect(bestUse("cgnat_carrier_grade")).toBe("isp_ipv4_address_exhaustion");
  });
});

describe("natTypes", () => {
  it("returns 5 types", () => {
    expect(natTypes()).toHaveLength(5);
  });
});
