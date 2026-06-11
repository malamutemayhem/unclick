import { describe, it, expect } from "vitest";
import {
  density, insertionLoss, durability, ease,
  fcCost, multiFiber, forDataCenter, ferrule,
  bestUse, fiberConnectorTypes,
} from "../fiber-connector-calc.js";

describe("density", () => {
  it("mpo mtp highest density", () => {
    expect(density("mpo_mtp_multi_fiber")).toBeGreaterThan(density("fc_threaded_ferrule"));
  });
});

describe("insertionLoss", () => {
  it("lc lowest insertion loss", () => {
    expect(insertionLoss("lc_small_form_factor")).toBeGreaterThan(insertionLoss("mpo_mtp_multi_fiber"));
  });
});

describe("durability", () => {
  it("fc threaded most durable", () => {
    expect(durability("fc_threaded_ferrule")).toBeGreaterThan(durability("mpo_mtp_multi_fiber"));
  });
});

describe("ease", () => {
  it("sc easiest to use", () => {
    expect(ease("sc_square_push_pull")).toBeGreaterThan(ease("fc_threaded_ferrule"));
  });
});

describe("fcCost", () => {
  it("mpo most expensive", () => {
    expect(fcCost("mpo_mtp_multi_fiber")).toBeGreaterThan(fcCost("sc_square_push_pull"));
  });
});

describe("multiFiber", () => {
  it("mpo mtp is multi fiber", () => {
    expect(multiFiber("mpo_mtp_multi_fiber")).toBe(true);
  });
  it("lc not multi fiber", () => {
    expect(multiFiber("lc_small_form_factor")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("lc for data center", () => {
    expect(forDataCenter("lc_small_form_factor")).toBe(true);
  });
  it("fc not for data center", () => {
    expect(forDataCenter("fc_threaded_ferrule")).toBe(false);
  });
});

describe("ferrule", () => {
  it("mpo uses mt ferrule ribbon", () => {
    expect(ferrule("mpo_mtp_multi_fiber")).toBe("mt_ferrule_12_24_ribbon");
  });
});

describe("bestUse", () => {
  it("st best for campus lan legacy", () => {
    expect(bestUse("st_bayonet_twist")).toBe("campus_lan_multimode_legacy");
  });
});

describe("fiberConnectorTypes", () => {
  it("returns 5 types", () => {
    expect(fiberConnectorTypes()).toHaveLength(5);
  });
});
