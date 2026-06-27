import { describe, it, expect } from "vitest";
import {
  holdStrength, flexibility, removeEase, durability,
  meshCost, transparent, selfAdhesive, meshBase,
  bestUse, mosaicMeshs,
} from "../mosaic-mesh-calc.js";

describe("holdStrength", () => {
  it("adhesive mesh sticky strongest hold", () => {
    expect(holdStrength("adhesive_mesh_sticky")).toBeGreaterThan(holdStrength("paper_face_peel"));
  });
});

describe("flexibility", () => {
  it("fabric mesh flex most flexible", () => {
    expect(flexibility("fabric_mesh_flex")).toBeGreaterThan(flexibility("paper_face_peel"));
  });
});

describe("removeEase", () => {
  it("contact sheet clear easiest remove", () => {
    expect(removeEase("contact_sheet_clear")).toBeGreaterThan(removeEase("adhesive_mesh_sticky"));
  });
});

describe("durability", () => {
  it("fiberglass mesh standard most durable", () => {
    expect(durability("fiberglass_mesh_standard")).toBeGreaterThan(durability("paper_face_peel"));
  });
});

describe("meshCost", () => {
  it("adhesive mesh sticky most expensive", () => {
    expect(meshCost("adhesive_mesh_sticky")).toBeGreaterThan(meshCost("paper_face_peel"));
  });
});

describe("transparent", () => {
  it("contact sheet clear is transparent", () => {
    expect(transparent("contact_sheet_clear")).toBe(true);
  });
  it("fiberglass mesh standard not transparent", () => {
    expect(transparent("fiberglass_mesh_standard")).toBe(false);
  });
});

describe("selfAdhesive", () => {
  it("adhesive mesh sticky is self adhesive", () => {
    expect(selfAdhesive("adhesive_mesh_sticky")).toBe(true);
  });
  it("fiberglass mesh standard not self adhesive", () => {
    expect(selfAdhesive("fiberglass_mesh_standard")).toBe(false);
  });
});

describe("meshBase", () => {
  it("fabric mesh flex uses stretch polyester net", () => {
    expect(meshBase("fabric_mesh_flex")).toBe("stretch_polyester_net");
  });
});

describe("bestUse", () => {
  it("fiberglass mesh standard best for general indirect method", () => {
    expect(bestUse("fiberglass_mesh_standard")).toBe("general_indirect_method");
  });
});

describe("mosaicMeshs", () => {
  it("returns 5 types", () => {
    expect(mosaicMeshs()).toHaveLength(5);
  });
});
