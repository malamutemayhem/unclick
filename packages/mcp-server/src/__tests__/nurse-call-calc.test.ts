import { describe, it, expect } from "vitest";
import {
  response, integration, coverage, reliability,
  ncCost, wireless, forAcuteCare, communication,
  bestUse, nurseCallTypes,
} from "../nurse-call-calc.js";

describe("response", () => {
  it("enterprise fastest response", () => {
    expect(response("enterprise_rtls_integrated")).toBeGreaterThan(response("basic_light_buzzer"));
  });
});

describe("integration", () => {
  it("enterprise best integration", () => {
    expect(integration("enterprise_rtls_integrated")).toBeGreaterThan(integration("basic_light_buzzer"));
  });
});

describe("coverage", () => {
  it("wireless widest coverage", () => {
    expect(coverage("wireless_pendant_mobile")).toBeGreaterThan(coverage("basic_light_buzzer"));
  });
});

describe("reliability", () => {
  it("enterprise most reliable", () => {
    expect(reliability("enterprise_rtls_integrated")).toBeGreaterThan(reliability("wireless_pendant_mobile"));
  });
});

describe("ncCost", () => {
  it("enterprise most expensive", () => {
    expect(ncCost("enterprise_rtls_integrated")).toBeGreaterThan(ncCost("basic_light_buzzer"));
  });
});

describe("wireless", () => {
  it("pendant is wireless", () => {
    expect(wireless("wireless_pendant_mobile")).toBe(true);
  });
  it("basic not wireless", () => {
    expect(wireless("basic_light_buzzer")).toBe(false);
  });
});

describe("forAcuteCare", () => {
  it("intercom for acute care", () => {
    expect(forAcuteCare("audio_visual_intercom")).toBe(true);
  });
  it("basic not acute care", () => {
    expect(forAcuteCare("basic_light_buzzer")).toBe(false);
  });
});

describe("communication", () => {
  it("enterprise uses rtls", () => {
    expect(communication("enterprise_rtls_integrated")).toBe("rtls_badge_workflow_emr_link");
  });
});

describe("bestUse", () => {
  it("pendant for memory care", () => {
    expect(bestUse("wireless_pendant_mobile")).toBe("memory_care_wander_management");
  });
});

describe("nurseCallTypes", () => {
  it("returns 5 types", () => {
    expect(nurseCallTypes()).toHaveLength(5);
  });
});
