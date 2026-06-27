import { describe, it, expect } from "vitest";
import {
  convergence, scalability, stability, complexity,
  rpCost, classless, forIsp, metric,
  bestUse, routingProtocols,
} from "../routing-protocol-calc.js";

describe("convergence", () => {
  it("eigrp fastest convergence", () => {
    expect(convergence("eigrp_hybrid_cisco")).toBeGreaterThan(convergence("rip_distance_vector"));
  });
});

describe("scalability", () => {
  it("bgp most scalable", () => {
    expect(scalability("bgp_path_vector")).toBeGreaterThan(scalability("rip_distance_vector"));
  });
});

describe("stability", () => {
  it("bgp most stable", () => {
    expect(stability("bgp_path_vector")).toBeGreaterThan(stability("rip_distance_vector"));
  });
});

describe("complexity", () => {
  it("bgp most complex", () => {
    expect(complexity("bgp_path_vector")).toBeGreaterThan(complexity("rip_distance_vector"));
  });
});

describe("rpCost", () => {
  it("bgp most expensive", () => {
    expect(rpCost("bgp_path_vector")).toBeGreaterThan(rpCost("rip_distance_vector"));
  });
});

describe("classless", () => {
  it("ospf is classless", () => {
    expect(classless("ospf_link_state")).toBe(true);
  });
  it("rip not classless", () => {
    expect(classless("rip_distance_vector")).toBe(false);
  });
});

describe("forIsp", () => {
  it("bgp for isp", () => {
    expect(forIsp("bgp_path_vector")).toBe(true);
  });
  it("ospf not for isp", () => {
    expect(forIsp("ospf_link_state")).toBe(false);
  });
});

describe("metric", () => {
  it("bgp uses path attribute policy based", () => {
    expect(metric("bgp_path_vector")).toBe("path_attribute_policy_based");
  });
});

describe("bestUse", () => {
  it("is is best for isp core mpls", () => {
    expect(bestUse("is_is_link_state")).toBe("isp_core_mpls_underlay");
  });
});

describe("routingProtocols", () => {
  it("returns 5 types", () => {
    expect(routingProtocols()).toHaveLength(5);
  });
});
