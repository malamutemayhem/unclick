import { describe, it, expect } from "vitest";
import {
  scalability, reliability, latency, flexibility,
  dcCost, redundant, forCritical, topology,
  bestUse, dcsArchs,
} from "../dcs-arch-calc.js";

describe("scalability", () => {
  it("cloud scada most scalable", () => {
    expect(scalability("cloud_scada_saas")).toBeGreaterThan(scalability("centralized_plc_rack"));
  });
});

describe("reliability", () => {
  it("distributed rio most reliable", () => {
    expect(reliability("distributed_rio_node")).toBeGreaterThan(reliability("cloud_scada_saas"));
  });
});

describe("latency", () => {
  it("centralized plc lowest latency", () => {
    expect(latency("centralized_plc_rack")).toBeGreaterThan(latency("cloud_scada_saas"));
  });
});

describe("flexibility", () => {
  it("edge fog most flexible", () => {
    expect(flexibility("edge_fog_compute")).toBeGreaterThan(flexibility("centralized_plc_rack"));
  });
});

describe("dcCost", () => {
  it("cloud scada most expensive", () => {
    expect(dcCost("cloud_scada_saas")).toBeGreaterThan(dcCost("centralized_plc_rack"));
  });
});

describe("redundant", () => {
  it("distributed rio is redundant", () => {
    expect(redundant("distributed_rio_node")).toBe(true);
  });
  it("centralized plc not redundant", () => {
    expect(redundant("centralized_plc_rack")).toBe(false);
  });
});

describe("forCritical", () => {
  it("pac hybrid for critical", () => {
    expect(forCritical("pac_hybrid_controller")).toBe(true);
  });
  it("edge fog not for critical", () => {
    expect(forCritical("edge_fog_compute")).toBe(false);
  });
});

describe("topology", () => {
  it("cloud scada uses mqtt broker cloud ingest", () => {
    expect(topology("cloud_scada_saas")).toBe("mqtt_broker_cloud_ingest");
  });
});

describe("bestUse", () => {
  it("distributed rio best for refinery control", () => {
    expect(bestUse("distributed_rio_node")).toBe("refinery_unit_area_control");
  });
});

describe("dcsArchs", () => {
  it("returns 5 types", () => {
    expect(dcsArchs()).toHaveLength(5);
  });
});
