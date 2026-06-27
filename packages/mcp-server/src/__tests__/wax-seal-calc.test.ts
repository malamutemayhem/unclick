import { describe, it, expect } from "vitest";
import {
  sealQuality, easeOfUse, batchSpeed, colorRange,
  sealCost, mailSafe, openFlame, meltMethod,
  bestProject, waxSeals,
} from "../wax-seal-calc.js";

describe("sealQuality", () => {
  it("electric melter best seal quality", () => {
    expect(sealQuality("electric_melter")).toBeGreaterThan(sealQuality("self_adhesive"));
  });
});

describe("easeOfUse", () => {
  it("self adhesive easiest to use", () => {
    expect(easeOfUse("self_adhesive")).toBeGreaterThan(easeOfUse("traditional_stick"));
  });
});

describe("batchSpeed", () => {
  it("self adhesive fastest batch", () => {
    expect(batchSpeed("self_adhesive")).toBeGreaterThan(batchSpeed("traditional_stick"));
  });
});

describe("colorRange", () => {
  it("glue gun bead widest color range", () => {
    expect(colorRange("glue_gun_bead")).toBeGreaterThan(colorRange("wicked_candle"));
  });
});

describe("sealCost", () => {
  it("electric melter most expensive", () => {
    expect(sealCost("electric_melter")).toBeGreaterThan(sealCost("wicked_candle"));
  });
});

describe("mailSafe", () => {
  it("glue gun bead is mail safe", () => {
    expect(mailSafe("glue_gun_bead")).toBe(true);
  });
  it("traditional stick is not", () => {
    expect(mailSafe("traditional_stick")).toBe(false);
  });
});

describe("openFlame", () => {
  it("traditional stick uses open flame", () => {
    expect(openFlame("traditional_stick")).toBe(true);
  });
  it("electric melter does not", () => {
    expect(openFlame("electric_melter")).toBe(false);
  });
});

describe("meltMethod", () => {
  it("electric melter uses spoon furnace pour", () => {
    expect(meltMethod("electric_melter")).toBe("spoon_furnace_pour");
  });
});

describe("bestProject", () => {
  it("glue gun bead for wedding invitation bulk", () => {
    expect(bestProject("glue_gun_bead")).toBe("wedding_invitation_bulk");
  });
});

describe("waxSeals", () => {
  it("returns 5 types", () => {
    expect(waxSeals()).toHaveLength(5);
  });
});
