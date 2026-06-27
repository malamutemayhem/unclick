import { describe, it, expect } from "vitest";
import {
  reach, speed, clarity, redundancy,
  mnCost, audible, forOutdoor, channel,
  bestUse, massNotifTypes,
} from "../mass-notif-calc.js";

describe("reach", () => {
  it("outdoor siren widest reach", () => {
    expect(reach("outdoor_siren_speaker")).toBeGreaterThan(reach("desktop_alert_software"));
  });
});

describe("speed", () => {
  it("desktop fastest", () => {
    expect(speed("desktop_alert_software")).toBeGreaterThan(speed("cellular_sms_broadcast"));
  });
});

describe("clarity", () => {
  it("digital signage clearest", () => {
    expect(clarity("digital_signage_override")).toBeGreaterThan(clarity("outdoor_siren_speaker"));
  });
});

describe("redundancy", () => {
  it("cellular most redundant", () => {
    expect(redundancy("cellular_sms_broadcast")).toBeGreaterThan(redundancy("desktop_alert_software"));
  });
});

describe("mnCost", () => {
  it("signage most expensive", () => {
    expect(mnCost("digital_signage_override")).toBeGreaterThan(mnCost("desktop_alert_software"));
  });
});

describe("audible", () => {
  it("siren is audible", () => {
    expect(audible("outdoor_siren_speaker")).toBe(true);
  });
  it("desktop not audible", () => {
    expect(audible("desktop_alert_software")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("siren for outdoor", () => {
    expect(forOutdoor("outdoor_siren_speaker")).toBe(true);
  });
  it("strobe not outdoor", () => {
    expect(forOutdoor("indoor_ceiling_strobe_horn")).toBe(false);
  });
});

describe("channel", () => {
  it("cellular uses multi channel", () => {
    expect(channel("cellular_sms_broadcast")).toBe("sms_email_app_push_multi");
  });
});

describe("bestUse", () => {
  it("siren for campus emergency", () => {
    expect(bestUse("outdoor_siren_speaker")).toBe("campus_wide_outdoor_emergency");
  });
});

describe("massNotifTypes", () => {
  it("returns 5 types", () => {
    expect(massNotifTypes()).toHaveLength(5);
  });
});
