import { describe, it, expect } from "vitest";
import {
  hardness, latherQuality, cureTime, beginnerSafe,
  lyeCost, needsCure, handlesLye, processType,
  bestSoap, soapLyes,
} from "../soap-lye-calc.js";

describe("hardness", () => {
  it("sodium hydroxide bar hardest soap", () => {
    expect(hardness("sodium_hydroxide_bar")).toBeGreaterThan(hardness("potassium_hydroxide_liquid"));
  });
});

describe("latherQuality", () => {
  it("potassium hydroxide liquid best lather", () => {
    expect(latherQuality("potassium_hydroxide_liquid")).toBeGreaterThan(latherQuality("melt_pour_base"));
  });
});

describe("cureTime", () => {
  it("melt pour base fastest cure", () => {
    expect(cureTime("melt_pour_base")).toBeGreaterThan(cureTime("sodium_hydroxide_bar"));
  });
});

describe("beginnerSafe", () => {
  it("melt pour base safest for beginners", () => {
    expect(beginnerSafe("melt_pour_base")).toBeGreaterThan(beginnerSafe("potassium_hydroxide_liquid"));
  });
});

describe("lyeCost", () => {
  it("melt pour base most expensive", () => {
    expect(lyeCost("melt_pour_base")).toBeGreaterThan(lyeCost("sodium_hydroxide_bar"));
  });
});

describe("needsCure", () => {
  it("sodium hydroxide bar needs cure", () => {
    expect(needsCure("sodium_hydroxide_bar")).toBe(true);
  });
  it("melt pour base does not need cure", () => {
    expect(needsCure("melt_pour_base")).toBe(false);
  });
});

describe("handlesLye", () => {
  it("sodium hydroxide bar handles lye", () => {
    expect(handlesLye("sodium_hydroxide_bar")).toBe(true);
  });
  it("rebatch grate melt does not handle lye", () => {
    expect(handlesLye("rebatch_grate_melt")).toBe(false);
  });
});

describe("processType", () => {
  it("dual lye blend uses cream soap blend", () => {
    expect(processType("dual_lye_blend")).toBe("cream_soap_blend");
  });
});

describe("bestSoap", () => {
  it("melt pour base best for decorative embed gift", () => {
    expect(bestSoap("melt_pour_base")).toBe("decorative_embed_gift");
  });
});

describe("soapLyes", () => {
  it("returns 5 types", () => {
    expect(soapLyes()).toHaveLength(5);
  });
});
