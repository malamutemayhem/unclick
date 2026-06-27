import { describe, it, expect } from "vitest";
import {
  channels, storage, reliability, scalability,
  nrCost, redundant, forEnterprise, recording,
  bestUse, nvrTypes,
} from "../nvr-type-calc.js";

describe("channels", () => {
  it("rack mount most channels", () => {
    expect(channels("rack_mount_enterprise")).toBeGreaterThan(channels("embedded_standalone_box"));
  });
});

describe("storage", () => {
  it("rack mount most storage", () => {
    expect(storage("rack_mount_enterprise")).toBeGreaterThan(storage("poe_switch_integrated"));
  });
});

describe("reliability", () => {
  it("rack mount most reliable", () => {
    expect(reliability("rack_mount_enterprise")).toBeGreaterThan(reliability("poe_switch_integrated"));
  });
});

describe("scalability", () => {
  it("cloud hybrid most scalable", () => {
    expect(scalability("cloud_hybrid_bridge")).toBeGreaterThan(scalability("embedded_standalone_box"));
  });
});

describe("nrCost", () => {
  it("rack mount most expensive", () => {
    expect(nrCost("rack_mount_enterprise")).toBeGreaterThan(nrCost("poe_switch_integrated"));
  });
});

describe("redundant", () => {
  it("rack mount is redundant", () => {
    expect(redundant("rack_mount_enterprise")).toBe(true);
  });
  it("embedded not redundant", () => {
    expect(redundant("embedded_standalone_box")).toBe(false);
  });
});

describe("forEnterprise", () => {
  it("rack mount for enterprise", () => {
    expect(forEnterprise("rack_mount_enterprise")).toBe(true);
  });
  it("poe not enterprise", () => {
    expect(forEnterprise("poe_switch_integrated")).toBe(false);
  });
});

describe("recording", () => {
  it("cloud uses hybrid offload", () => {
    expect(recording("cloud_hybrid_bridge")).toBe("cloud_edge_hybrid_offload");
  });
});

describe("bestUse", () => {
  it("virtual for it managed", () => {
    expect(bestUse("virtual_software_server")).toBe("it_managed_virtualized_infra");
  });
});

describe("nvrTypes", () => {
  it("returns 5 types", () => {
    expect(nvrTypes()).toHaveLength(5);
  });
});
