import { describe, it, expect } from "vitest";
import {
  throughput, latency, scalability, flexibility,
  swCost, programmable, forDataCenter, plane,
  bestUse, switchingTypes,
} from "../switching-type-calc.js";

describe("throughput", () => {
  it("optical cross connect highest throughput", () => {
    expect(throughput("optical_cross_connect")).toBeGreaterThan(throughput("circuit_tdm_legacy"));
  });
});

describe("latency", () => {
  it("circuit tdm lowest latency", () => {
    expect(latency("circuit_tdm_legacy")).toBeGreaterThan(latency("packet_ip_router"));
  });
});

describe("scalability", () => {
  it("sdn most scalable", () => {
    expect(scalability("software_defined_sdn")).toBeGreaterThan(scalability("circuit_tdm_legacy"));
  });
});

describe("flexibility", () => {
  it("sdn most flexible", () => {
    expect(flexibility("software_defined_sdn")).toBeGreaterThan(flexibility("circuit_tdm_legacy"));
  });
});

describe("swCost", () => {
  it("optical cross connect most expensive", () => {
    expect(swCost("optical_cross_connect")).toBeGreaterThan(swCost("circuit_tdm_legacy"));
  });
});

describe("programmable", () => {
  it("sdn is programmable", () => {
    expect(programmable("software_defined_sdn")).toBe(true);
  });
  it("circuit tdm not programmable", () => {
    expect(programmable("circuit_tdm_legacy")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("sdn for data center", () => {
    expect(forDataCenter("software_defined_sdn")).toBe(true);
  });
  it("circuit tdm not for data center", () => {
    expect(forDataCenter("circuit_tdm_legacy")).toBe(false);
  });
});

describe("plane", () => {
  it("mpls uses label push swap pop", () => {
    expect(plane("label_mpls_tunnel")).toBe("label_push_swap_pop_path");
  });
});

describe("bestUse", () => {
  it("optical cross connect best for roadm wavelength route", () => {
    expect(bestUse("optical_cross_connect")).toBe("long_haul_roadm_wavelength_route");
  });
});

describe("switchingTypes", () => {
  it("returns 5 types", () => {
    expect(switchingTypes()).toHaveLength(5);
  });
});
