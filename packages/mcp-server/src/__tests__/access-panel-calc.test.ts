import { describe, it, expect } from "vitest";
import {
  capacity, reliability, scalability, integration,
  apCost, cloudManaged, forEnterprise, protocol,
  bestUse, accessPanelTypes,
} from "../access-panel-calc.js";

describe("capacity", () => {
  it("ip based highest capacity", () => {
    expect(capacity("ip_based_poe_panel")).toBeGreaterThan(capacity("single_door_controller"));
  });
});

describe("reliability", () => {
  it("multi door very reliable", () => {
    expect(reliability("multi_door_4_reader")).toBeGreaterThan(reliability("wireless_cloud_managed"));
  });
});

describe("scalability", () => {
  it("wireless most scalable", () => {
    expect(scalability("wireless_cloud_managed")).toBeGreaterThan(scalability("single_door_controller"));
  });
});

describe("integration", () => {
  it("ip based best integration", () => {
    expect(integration("ip_based_poe_panel")).toBeGreaterThan(integration("single_door_controller"));
  });
});

describe("apCost", () => {
  it("ip based most expensive", () => {
    expect(apCost("ip_based_poe_panel")).toBeGreaterThan(apCost("single_door_controller"));
  });
});

describe("cloudManaged", () => {
  it("wireless is cloud managed", () => {
    expect(cloudManaged("wireless_cloud_managed")).toBe(true);
  });
  it("multi door not cloud managed", () => {
    expect(cloudManaged("multi_door_4_reader")).toBe(false);
  });
});

describe("forEnterprise", () => {
  it("ip based for enterprise", () => {
    expect(forEnterprise("ip_based_poe_panel")).toBe(true);
  });
  it("single door not enterprise", () => {
    expect(forEnterprise("single_door_controller")).toBe(false);
  });
});

describe("protocol", () => {
  it("multi door uses osdp", () => {
    expect(protocol("multi_door_4_reader")).toBe("osdp_v2_rs485_encrypted");
  });
});

describe("bestUse", () => {
  it("elevator for floor lock", () => {
    expect(bestUse("elevator_floor_control")).toBe("high_rise_elevator_floor_lock");
  });
});

describe("accessPanelTypes", () => {
  it("returns 5 types", () => {
    expect(accessPanelTypes()).toHaveLength(5);
  });
});
