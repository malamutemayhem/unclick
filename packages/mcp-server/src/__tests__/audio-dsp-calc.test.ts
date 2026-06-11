import { describe, it, expect } from "vitest";
import {
  channels, processing, flexibility, latency,
  adCost, networked, forLive, protocol,
  bestUse, audioDspTypes,
} from "../audio-dsp-calc.js";

describe("channels", () => {
  it("live venue most channels", () => {
    expect(channels("live_venue_matrix")).toBeGreaterThan(channels("conference_room_aec"));
  });
});

describe("processing", () => {
  it("live venue best processing", () => {
    expect(processing("live_venue_matrix")).toBeGreaterThan(processing("paging_zone_mixer"));
  });
});

describe("flexibility", () => {
  it("dante most flexible", () => {
    expect(flexibility("dante_networked_pro")).toBeGreaterThan(flexibility("paging_zone_mixer"));
  });
});

describe("latency", () => {
  it("live venue lowest latency", () => {
    expect(latency("live_venue_matrix")).toBeGreaterThan(latency("paging_zone_mixer"));
  });
});

describe("adCost", () => {
  it("live venue most expensive", () => {
    expect(adCost("live_venue_matrix")).toBeGreaterThan(adCost("paging_zone_mixer"));
  });
});

describe("networked", () => {
  it("dante is networked", () => {
    expect(networked("dante_networked_pro")).toBe(true);
  });
  it("paging not networked", () => {
    expect(networked("paging_zone_mixer")).toBe(false);
  });
});

describe("forLive", () => {
  it("live venue for live", () => {
    expect(forLive("live_venue_matrix")).toBe(true);
  });
  it("conference not live", () => {
    expect(forLive("conference_room_aec")).toBe(false);
  });
});

describe("protocol", () => {
  it("dante uses ethernet", () => {
    expect(protocol("dante_networked_pro")).toBe("dante_avb_64x64_ethernet");
  });
});

describe("bestUse", () => {
  it("paging for school hospital", () => {
    expect(bestUse("paging_zone_mixer")).toBe("school_hospital_paging_system");
  });
});

describe("audioDspTypes", () => {
  it("returns 5 types", () => {
    expect(audioDspTypes()).toHaveLength(5);
  });
});
