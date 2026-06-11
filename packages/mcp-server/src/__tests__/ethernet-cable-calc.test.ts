import { describe, it, expect } from "vitest";
import {
  bandwidth, maxLength, shielding, flexibility,
  cableCost, shielded, forOutdoor, jacketType,
  bestUse, ethernetCables,
} from "../ethernet-cable-calc.js";

describe("bandwidth", () => {
  it("cat8 shielded 25g highest bandwidth", () => {
    expect(bandwidth("cat8_shielded_25g")).toBeGreaterThan(bandwidth("cat5e_utp_patch"));
  });
});

describe("maxLength", () => {
  it("cat6a stp longer than cat8", () => {
    expect(maxLength("cat6a_stp_shielded")).toBeGreaterThan(maxLength("cat8_shielded_25g"));
  });
});

describe("shielding", () => {
  it("cat8 best shielding", () => {
    expect(shielding("cat8_shielded_25g")).toBeGreaterThan(shielding("cat5e_utp_patch"));
  });
});

describe("flexibility", () => {
  it("cat5e most flexible", () => {
    expect(flexibility("cat5e_utp_patch")).toBeGreaterThan(flexibility("cat8_shielded_25g"));
  });
});

describe("cableCost", () => {
  it("cat8 most expensive", () => {
    expect(cableCost("cat8_shielded_25g")).toBeGreaterThan(cableCost("cat5e_utp_patch"));
  });
});

describe("shielded", () => {
  it("cat6a is shielded", () => {
    expect(shielded("cat6a_stp_shielded")).toBe(true);
  });
  it("cat5e not shielded", () => {
    expect(shielded("cat5e_utp_patch")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("cat5e not for outdoor", () => {
    expect(forOutdoor("cat5e_utp_patch")).toBe(false);
  });
});

describe("jacketType", () => {
  it("cat7 uses dual shield lszh", () => {
    expect(jacketType("cat7_sftp_datacenter")).toBe("dual_shield_lszh");
  });
});

describe("bestUse", () => {
  it("cat6 best for office horizontal run", () => {
    expect(bestUse("cat6_utp_solid")).toBe("office_horizontal_run");
  });
});

describe("ethernetCables", () => {
  it("returns 5 types", () => {
    expect(ethernetCables()).toHaveLength(5);
  });
});
