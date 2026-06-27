import { describe, it, expect } from "vitest";
import {
  mohsHardness, toolRecommendation, prepTime, consolidantAmount,
  adhesiveType, acidPrepSafe, fieldJacketPlaster, storageBoxSize,
  labelInfo, photographyScale, insuranceValue, fossilTypes,
} from "../fossil-prep.js";

describe("mohsHardness", () => {
  it("sandstone hardest matrix", () => {
    expect(mohsHardness("sandstone")).toBeGreaterThan(mohsHardness("shale"));
  });
});

describe("toolRecommendation", () => {
  it("returns string", () => {
    expect(typeof toolRecommendation("limestone")).toBe("string");
  });
});

describe("prepTime", () => {
  it("harder matrix = more time", () => {
    expect(prepTime(10, 6)).toBeGreaterThan(prepTime(10, 2));
  });
});

describe("consolidantAmount", () => {
  it("positive ml", () => {
    expect(consolidantAmount(10)).toBeGreaterThan(0);
  });
});

describe("adhesiveType", () => {
  it("soft matrix = PVA", () => {
    expect(adhesiveType(2)).toBe("PVA glue");
  });
  it("hard matrix = epoxy", () => {
    expect(adhesiveType(6)).toBe("epoxy");
  });
});

describe("acidPrepSafe", () => {
  it("safe for trilobite in limestone", () => {
    expect(acidPrepSafe("limestone", "trilobite")).toBe(true);
  });
  it("not safe for ammonite in limestone", () => {
    expect(acidPrepSafe("limestone", "ammonite")).toBe(false);
  });
  it("not safe in sandstone", () => {
    expect(acidPrepSafe("sandstone", "trilobite")).toBe(false);
  });
});

describe("fieldJacketPlaster", () => {
  it("positive kg", () => {
    expect(fieldJacketPlaster(100)).toBeGreaterThan(0);
  });
});

describe("storageBoxSize", () => {
  it("larger than fossil", () => {
    expect(storageBoxSize(10)).toBeGreaterThan(10);
  });
});

describe("labelInfo", () => {
  it("includes species and locality", () => {
    const info = labelInfo();
    expect(info).toContain("species");
    expect(info).toContain("locality");
  });
});

describe("photographyScale", () => {
  it("tiny needs macro", () => {
    expect(photographyScale(1)).toContain("macro");
  });
  it("large is standard", () => {
    expect(photographyScale(20)).toContain("standard");
  });
});

describe("insuranceValue", () => {
  it("dinosaur bone most valuable", () => {
    expect(insuranceValue("dinosaur_bone", 100)).toBeGreaterThan(insuranceValue("brachiopod", 100));
  });
  it("lower condition = lower value", () => {
    expect(insuranceValue("trilobite", 50)).toBeLessThan(insuranceValue("trilobite", 100));
  });
});

describe("fossilTypes", () => {
  it("returns 6 types", () => {
    expect(fossilTypes()).toHaveLength(6);
  });
});
