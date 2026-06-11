import { describe, it, expect } from "vitest";
import {
  cutAccuracy, alignStrength, setupSpeed, portability,
  joinerCost, cordless, forThick, bladeType,
  bestUse, biscuitJoiners,
} from "../biscuit-joiner-calc.js";

describe("cutAccuracy", () => {
  it("laminate trim biscuit most accurate cut", () => {
    expect(cutAccuracy("laminate_trim_biscuit")).toBeGreaterThan(cutAccuracy("cordless_biscuit_port"));
  });
});

describe("alignStrength", () => {
  it("heavy duty joiner strongest alignment", () => {
    expect(alignStrength("heavy_duty_joiner")).toBeGreaterThan(alignStrength("laminate_trim_biscuit"));
  });
});

describe("setupSpeed", () => {
  it("cordless biscuit port fastest setup", () => {
    expect(setupSpeed("cordless_biscuit_port")).toBeGreaterThan(setupSpeed("heavy_duty_joiner"));
  });
});

describe("portability", () => {
  it("cordless biscuit port most portable", () => {
    expect(portability("cordless_biscuit_port")).toBeGreaterThan(portability("heavy_duty_joiner"));
  });
});

describe("joinerCost", () => {
  it("heavy duty joiner most expensive", () => {
    expect(joinerCost("heavy_duty_joiner")).toBeGreaterThan(joinerCost("mini_biscuit_detail"));
  });
});

describe("cordless", () => {
  it("cordless biscuit port is cordless", () => {
    expect(cordless("cordless_biscuit_port")).toBe(true);
  });
  it("standard plate joiner not cordless", () => {
    expect(cordless("standard_plate_joiner")).toBe(false);
  });
});

describe("forThick", () => {
  it("heavy duty joiner is for thick", () => {
    expect(forThick("heavy_duty_joiner")).toBe(true);
  });
  it("mini biscuit detail not for thick", () => {
    expect(forThick("mini_biscuit_detail")).toBe(false);
  });
});

describe("bladeType", () => {
  it("laminate trim biscuit uses flush trim blade", () => {
    expect(bladeType("laminate_trim_biscuit")).toBe("flush_trim_blade");
  });
});

describe("bestUse", () => {
  it("cordless biscuit port best for site work joint", () => {
    expect(bestUse("cordless_biscuit_port")).toBe("site_work_joint");
  });
});

describe("biscuitJoiners", () => {
  it("returns 5 types", () => {
    expect(biscuitJoiners()).toHaveLength(5);
  });
});
