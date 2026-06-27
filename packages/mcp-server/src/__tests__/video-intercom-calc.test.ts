import { describe, it, expect } from "vitest";
import {
  videoQuality, audioClarity, durability, integration,
  viCost, twoWayVideo, forMultiTenant, protocol,
  bestUse, videoIntercomTypes,
} from "../video-intercom-calc.js";

describe("videoQuality", () => {
  it("ip sip best video", () => {
    expect(videoQuality("ip_sip_surface_mount")).toBeGreaterThan(videoQuality("analog_2_wire_flush"));
  });
});

describe("audioClarity", () => {
  it("multi tenant clear audio", () => {
    expect(audioClarity("multi_tenant_lobby")).toBeGreaterThan(audioClarity("wireless_wifi_battery"));
  });
});

describe("durability", () => {
  it("industrial most durable", () => {
    expect(durability("industrial_vandal_proof")).toBeGreaterThan(durability("wireless_wifi_battery"));
  });
});

describe("integration", () => {
  it("ip sip best integration", () => {
    expect(integration("ip_sip_surface_mount")).toBeGreaterThan(integration("analog_2_wire_flush"));
  });
});

describe("viCost", () => {
  it("multi tenant most expensive", () => {
    expect(viCost("multi_tenant_lobby")).toBeGreaterThan(viCost("analog_2_wire_flush"));
  });
});

describe("twoWayVideo", () => {
  it("ip sip has two way video", () => {
    expect(twoWayVideo("ip_sip_surface_mount")).toBe(true);
  });
  it("analog no two way video", () => {
    expect(twoWayVideo("analog_2_wire_flush")).toBe(false);
  });
});

describe("forMultiTenant", () => {
  it("lobby for multi tenant", () => {
    expect(forMultiTenant("multi_tenant_lobby")).toBe(true);
  });
  it("industrial not multi tenant", () => {
    expect(forMultiTenant("industrial_vandal_proof")).toBe(false);
  });
});

describe("protocol", () => {
  it("industrial uses sip stainless", () => {
    expect(protocol("industrial_vandal_proof")).toBe("sip_stainless_ik10_ip66");
  });
});

describe("bestUse", () => {
  it("wireless for diy doorbell", () => {
    expect(bestUse("wireless_wifi_battery")).toBe("diy_doorbell_home_retrofit");
  });
});

describe("videoIntercomTypes", () => {
  it("returns 5 types", () => {
    expect(videoIntercomTypes()).toHaveLength(5);
  });
});
