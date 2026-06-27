import { describe, it, expect } from "vitest";
import {
  fillAccuracy, throughput, capsuleRange, dustControl,
  cfCost, automated, forPowder, fillerConfig,
  bestUse, capsuleFillerTypes,
} from "../capsule-filler-calc.js";

describe("fillAccuracy", () => {
  it("dosator nozzle best fill accuracy", () => {
    expect(fillAccuracy("dosator_nozzle")).toBeGreaterThan(fillAccuracy("semi_automatic"));
  });
});

describe("throughput", () => {
  it("dosator nozzle highest throughput", () => {
    expect(throughput("dosator_nozzle")).toBeGreaterThan(throughput("manual_hand"));
  });
});

describe("capsuleRange", () => {
  it("automatic tamping widest capsule range", () => {
    expect(capsuleRange("automatic_tamping")).toBeGreaterThanOrEqual(capsuleRange("manual_hand"));
  });
});

describe("dustControl", () => {
  it("liquid fill best dust control", () => {
    expect(dustControl("liquid_fill")).toBeGreaterThan(dustControl("manual_hand"));
  });
});

describe("cfCost", () => {
  it("dosator nozzle most expensive", () => {
    expect(cfCost("dosator_nozzle")).toBeGreaterThan(cfCost("manual_hand"));
  });
});

describe("automated", () => {
  it("automatic tamping is automated", () => {
    expect(automated("automatic_tamping")).toBe(true);
  });
  it("manual hand not automated", () => {
    expect(automated("manual_hand")).toBe(false);
  });
});

describe("forPowder", () => {
  it("semi automatic for powder", () => {
    expect(forPowder("semi_automatic")).toBe(true);
  });
  it("liquid fill not for powder", () => {
    expect(forPowder("liquid_fill")).toBe(false);
  });
});

describe("fillerConfig", () => {
  it("dosator nozzle uses plug form transfer eject precise", () => {
    expect(fillerConfig("dosator_nozzle")).toBe("dosator_nozzle_capsule_filler_plug_form_transfer_eject_precise");
  });
});

describe("bestUse", () => {
  it("liquid fill for nutraceutical oil suspension sealed dose", () => {
    expect(bestUse("liquid_fill")).toBe("nutraceutical_liquid_capsule_filler_oil_suspension_sealed_dose");
  });
});

describe("capsuleFillerTypes", () => {
  it("returns 5 types", () => {
    expect(capsuleFillerTypes()).toHaveLength(5);
  });
});
