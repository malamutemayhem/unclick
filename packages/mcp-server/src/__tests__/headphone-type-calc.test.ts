import { describe, it, expect } from "vitest";
import {
  soundstage, isolation, comfort, portability,
  hpCost, wireless, forMixing, driver,
  bestUse, headphoneTypes,
} from "../headphone-type-calc.js";

describe("soundstage", () => {
  it("open back widest soundstage", () => {
    expect(soundstage("over_ear_open_back")).toBeGreaterThan(soundstage("in_ear_monitor_iem"));
  });
});

describe("isolation", () => {
  it("iem best isolation", () => {
    expect(isolation("in_ear_monitor_iem")).toBeGreaterThan(isolation("over_ear_open_back"));
  });
});

describe("comfort", () => {
  it("open back most comfortable", () => {
    expect(comfort("over_ear_open_back")).toBeGreaterThan(comfort("on_ear_supra_aural"));
  });
});

describe("portability", () => {
  it("iem most portable", () => {
    expect(portability("in_ear_monitor_iem")).toBeGreaterThan(portability("over_ear_open_back"));
  });
});

describe("hpCost", () => {
  it("open back most expensive", () => {
    expect(hpCost("over_ear_open_back")).toBeGreaterThan(hpCost("bone_conduction_vibration"));
  });
});

describe("wireless", () => {
  it("bone conduction is wireless", () => {
    expect(wireless("bone_conduction_vibration")).toBe(true);
  });
  it("open back not wireless", () => {
    expect(wireless("over_ear_open_back")).toBe(false);
  });
});

describe("forMixing", () => {
  it("open back for mixing", () => {
    expect(forMixing("over_ear_open_back")).toBe(true);
  });
  it("iem not for mixing", () => {
    expect(forMixing("in_ear_monitor_iem")).toBe(false);
  });
});

describe("driver", () => {
  it("iem uses balanced armature", () => {
    expect(driver("in_ear_monitor_iem")).toBe("balanced_armature_multi_driver");
  });
});

describe("bestUse", () => {
  it("bone conduction for outdoor sport", () => {
    expect(bestUse("bone_conduction_vibration")).toBe("outdoor_sport_situational_aware");
  });
});

describe("headphoneTypes", () => {
  it("returns 5 types", () => {
    expect(headphoneTypes()).toHaveLength(5);
  });
});
