import { describe, it, expect } from "vitest";
import {
  chopForce, mortiseClean, controlAccuracy, edgeRetention,
  twibillCost, doubleBlade, forMortise, handleStyle,
  bestUse, twibills,
} from "../twibill-calc.js";

describe("chopForce", () => {
  it("heavy mortise chop strongest", () => {
    expect(chopForce("heavy_mortise_chop")).toBeGreaterThan(chopForce("light_trim_finish"));
  });
});

describe("mortiseClean", () => {
  it("light trim finish cleanest mortise", () => {
    expect(mortiseClean("light_trim_finish")).toBeGreaterThan(mortiseClean("heavy_mortise_chop"));
  });
});

describe("controlAccuracy", () => {
  it("light trim finish most accurate", () => {
    expect(controlAccuracy("light_trim_finish")).toBeGreaterThan(controlAccuracy("heavy_mortise_chop"));
  });
});

describe("edgeRetention", () => {
  it("broad face hewing best edge retention", () => {
    expect(edgeRetention("broad_face_hewing")).toBeGreaterThan(edgeRetention("standard_double_blade"));
  });
});

describe("twibillCost", () => {
  it("offset handle angled most expensive", () => {
    expect(twibillCost("offset_handle_angled")).toBeGreaterThan(twibillCost("light_trim_finish"));
  });
});

describe("doubleBlade", () => {
  it("standard double blade is double blade", () => {
    expect(doubleBlade("standard_double_blade")).toBe(true);
  });
  it("broad face hewing not double blade", () => {
    expect(doubleBlade("broad_face_hewing")).toBe(false);
  });
});

describe("forMortise", () => {
  it("heavy mortise chop is for mortise", () => {
    expect(forMortise("heavy_mortise_chop")).toBe(true);
  });
  it("light trim finish not for mortise", () => {
    expect(forMortise("light_trim_finish")).toBe(false);
  });
});

describe("handleStyle", () => {
  it("offset handle angled uses angled offset grip", () => {
    expect(handleStyle("offset_handle_angled")).toBe("angled_offset_grip");
  });
});

describe("bestUse", () => {
  it("broad face hewing best for face hew flatten", () => {
    expect(bestUse("broad_face_hewing")).toBe("face_hew_flatten");
  });
});

describe("twibills", () => {
  it("returns 5 types", () => {
    expect(twibills()).toHaveLength(5);
  });
});
