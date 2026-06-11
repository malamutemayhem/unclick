import { describe, it, expect } from "vitest";
import {
  maxPower, efficiency, availability, bidirectional,
  chgCost, plugless, forFleet, standard,
  bestUse, chargerProtocols,
} from "../charger-protocol-calc.js";

describe("maxPower", () => {
  it("megawatt mcs highest power", () => {
    expect(maxPower("megawatt_mcs")).toBeGreaterThan(maxPower("wireless_qi2_mag"));
  });
});

describe("efficiency", () => {
  it("tesla nacs highest efficiency", () => {
    expect(efficiency("tesla_nacs")).toBeGreaterThan(efficiency("wireless_qi2_mag"));
  });
});

describe("availability", () => {
  it("ccs combo dc highest availability", () => {
    expect(availability("ccs_combo_dc")).toBeGreaterThan(availability("megawatt_mcs"));
  });
});

describe("bidirectional", () => {
  it("chademo v2 best bidirectional", () => {
    expect(bidirectional("chademo_v2")).toBeGreaterThan(bidirectional("wireless_qi2_mag"));
  });
});

describe("chgCost", () => {
  it("megawatt mcs most expensive", () => {
    expect(chgCost("megawatt_mcs")).toBeGreaterThan(chgCost("chademo_v2"));
  });
});

describe("plugless", () => {
  it("wireless qi2 mag is plugless", () => {
    expect(plugless("wireless_qi2_mag")).toBe(true);
  });
  it("ccs combo dc not plugless", () => {
    expect(plugless("ccs_combo_dc")).toBe(false);
  });
});

describe("forFleet", () => {
  it("megawatt mcs for fleet", () => {
    expect(forFleet("megawatt_mcs")).toBe(true);
  });
  it("tesla nacs not for fleet", () => {
    expect(forFleet("tesla_nacs")).toBe(false);
  });
});

describe("standard", () => {
  it("megawatt mcs uses charin mcs 3 75mw", () => {
    expect(standard("megawatt_mcs")).toBe("charin_mcs_3_75mw");
  });
});

describe("bestUse", () => {
  it("wireless qi2 mag best for autonomous taxi pad charge", () => {
    expect(bestUse("wireless_qi2_mag")).toBe("autonomous_taxi_pad_charge");
  });
});

describe("chargerProtocols", () => {
  it("returns 5 types", () => {
    expect(chargerProtocols()).toHaveLength(5);
  });
});
