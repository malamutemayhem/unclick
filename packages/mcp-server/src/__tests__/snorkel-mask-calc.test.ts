import { describe, it, expect } from "vitest";
import {
  fieldOfView, sealQuality, diveDepth, breathingEase,
  maskCost, fogResistant, noseEqualize, lensType,
  bestUse, snorkelMasks,
} from "../snorkel-mask-calc.js";

describe("fieldOfView", () => {
  it("full face panoramic widest view", () => {
    expect(fieldOfView("full_face_panoramic")).toBeGreaterThan(fieldOfView("kid_junior_fit"));
  });
});

describe("sealQuality", () => {
  it("low volume freedive best seal", () => {
    expect(sealQuality("low_volume_freedive")).toBeGreaterThan(sealQuality("kid_junior_fit"));
  });
});

describe("diveDepth", () => {
  it("low volume freedive deepest", () => {
    expect(diveDepth("low_volume_freedive")).toBeGreaterThan(diveDepth("full_face_panoramic"));
  });
});

describe("breathingEase", () => {
  it("full face panoramic easiest breathing", () => {
    expect(breathingEase("full_face_panoramic")).toBeGreaterThan(breathingEase("low_volume_freedive"));
  });
});

describe("maskCost", () => {
  it("prescription corrective most expensive", () => {
    expect(maskCost("prescription_corrective")).toBeGreaterThan(maskCost("traditional_two_piece"));
  });
});

describe("fogResistant", () => {
  it("full face panoramic is fog resistant", () => {
    expect(fogResistant("full_face_panoramic")).toBe(true);
  });
  it("traditional two piece is not", () => {
    expect(fogResistant("traditional_two_piece")).toBe(false);
  });
});

describe("noseEqualize", () => {
  it("traditional two piece allows nose equalize", () => {
    expect(noseEqualize("traditional_two_piece")).toBe(true);
  });
  it("full face panoramic does not", () => {
    expect(noseEqualize("full_face_panoramic")).toBe(false);
  });
});

describe("lensType", () => {
  it("prescription corrective uses optical lens custom diopter", () => {
    expect(lensType("prescription_corrective")).toBe("optical_lens_custom_diopter");
  });
});

describe("bestUse", () => {
  it("low volume freedive for deep freedive spearfish", () => {
    expect(bestUse("low_volume_freedive")).toBe("deep_freedive_spearfish");
  });
});

describe("snorkelMasks", () => {
  it("returns 5 types", () => {
    expect(snorkelMasks()).toHaveLength(5);
  });
});
