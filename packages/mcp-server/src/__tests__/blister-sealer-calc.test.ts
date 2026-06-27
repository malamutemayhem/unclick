import { describe, it, expect } from "vitest";
import {
  sealIntegrity, throughput, cavityDepth, materialRange,
  bsCost, childResist, forPharma, sealerConfig,
  bestUse, blisterSealerTypes,
} from "../blister-sealer-calc.js";

describe("sealIntegrity", () => {
  it("cold form best seal integrity", () => {
    expect(sealIntegrity("cold_form_seal")).toBeGreaterThan(sealIntegrity("clamshell_seal"));
  });
});

describe("throughput", () => {
  it("rotary blister highest throughput", () => {
    expect(throughput("rotary_blister")).toBeGreaterThan(throughput("cold_form_seal"));
  });
});

describe("cavityDepth", () => {
  it("skin pack best cavity depth", () => {
    expect(cavityDepth("skin_pack_seal")).toBeGreaterThan(cavityDepth("cold_form_seal"));
  });
});

describe("materialRange", () => {
  it("clamshell best material range", () => {
    expect(materialRange("clamshell_seal")).toBeGreaterThan(materialRange("cold_form_seal"));
  });
});

describe("bsCost", () => {
  it("rotary blister most expensive", () => {
    expect(bsCost("rotary_blister")).toBeGreaterThan(bsCost("clamshell_seal"));
  });
});

describe("childResist", () => {
  it("clamshell is child resistant", () => {
    expect(childResist("clamshell_seal")).toBe(true);
  });
  it("thermoform not child resistant", () => {
    expect(childResist("thermoform_seal")).toBe(false);
  });
});

describe("forPharma", () => {
  it("thermoform for pharma", () => {
    expect(forPharma("thermoform_seal")).toBe(true);
  });
  it("clamshell not for pharma", () => {
    expect(forPharma("clamshell_seal")).toBe(false);
  });
});

describe("sealerConfig", () => {
  it("cold form uses alu alu stamp form moisture barrier", () => {
    expect(sealerConfig("cold_form_seal")).toBe("cold_form_blister_sealer_alu_alu_stamp_form_moisture_barrier");
  });
});

describe("bestUse", () => {
  it("thermoform for tablet pack pvc foil cavity push pop", () => {
    expect(bestUse("thermoform_seal")).toBe("tablet_pack_thermoform_blister_sealer_pvc_foil_cavity_push_pop");
  });
});

describe("blisterSealerTypes", () => {
  it("returns 5 types", () => {
    expect(blisterSealerTypes()).toHaveLength(5);
  });
});
