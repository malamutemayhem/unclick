import { describe, it, expect } from "vitest";
import {
  holdStrength, installEase, viewAngle, compatibility,
  mountCost, chargesPhone, oneHandUse, attachMethod,
  bestDriver, carPhoneMounts,
} from "../car-phone-mount-calc.js";

describe("holdStrength", () => {
  it("cd slot grip strongest hold", () => {
    expect(holdStrength("cd_slot_grip")).toBeGreaterThan(holdStrength("vent_clip_magnetic"));
  });
});

describe("installEase", () => {
  it("vent clip magnetic easiest install", () => {
    expect(installEase("vent_clip_magnetic")).toBeGreaterThan(installEase("rearview_mirror_arm"));
  });
});

describe("viewAngle", () => {
  it("suction cup dash best view angle", () => {
    expect(viewAngle("suction_cup_dash")).toBeGreaterThan(viewAngle("cd_slot_grip"));
  });
});

describe("compatibility", () => {
  it("vent clip magnetic widest compatibility", () => {
    expect(compatibility("vent_clip_magnetic")).toBeGreaterThan(compatibility("cd_slot_grip"));
  });
});

describe("mountCost", () => {
  it("wireless charge cradle most expensive", () => {
    expect(mountCost("wireless_charge_cradle")).toBeGreaterThan(mountCost("vent_clip_magnetic"));
  });
});

describe("chargesPhone", () => {
  it("wireless charge cradle charges phone", () => {
    expect(chargesPhone("wireless_charge_cradle")).toBe(true);
  });
  it("vent clip magnetic does not", () => {
    expect(chargesPhone("vent_clip_magnetic")).toBe(false);
  });
});

describe("oneHandUse", () => {
  it("vent clip magnetic is one hand use", () => {
    expect(oneHandUse("vent_clip_magnetic")).toBe(true);
  });
  it("suction cup dash is not", () => {
    expect(oneHandUse("suction_cup_dash")).toBe(false);
  });
});

describe("attachMethod", () => {
  it("wireless charge cradle uses auto grip qi coil", () => {
    expect(attachMethod("wireless_charge_cradle")).toBe("auto_grip_qi_coil");
  });
});

describe("bestDriver", () => {
  it("suction cup dash for rideshare delivery nav", () => {
    expect(bestDriver("suction_cup_dash")).toBe("rideshare_delivery_nav");
  });
});

describe("carPhoneMounts", () => {
  it("returns 5 types", () => {
    expect(carPhoneMounts()).toHaveLength(5);
  });
});
