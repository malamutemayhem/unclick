import { describe, it, expect } from "vitest";
import {
  exfoliation, latherAbility, hygiene, longevity,
  loofahCost, ecoFriendly, reachesBack, bodyMaterial,
  bestSkin, loofahs,
} from "../loofah-calc.js";

describe("exfoliation", () => {
  it("long handle back brush best exfoliation", () => {
    expect(exfoliation("long_handle_back_brush")).toBeGreaterThan(exfoliation("mesh_nylon_puff"));
  });
});

describe("latherAbility", () => {
  it("mesh nylon puff best lather", () => {
    expect(latherAbility("mesh_nylon_puff")).toBeGreaterThan(latherAbility("silicone_scrubber_pad"));
  });
});

describe("hygiene", () => {
  it("silicone scrubber pad most hygienic", () => {
    expect(hygiene("silicone_scrubber_pad")).toBeGreaterThan(hygiene("natural_gourd_sponge"));
  });
});

describe("longevity", () => {
  it("silicone scrubber pad longest lasting", () => {
    expect(longevity("silicone_scrubber_pad")).toBeGreaterThan(longevity("natural_gourd_sponge"));
  });
});

describe("loofahCost", () => {
  it("long handle back brush most expensive", () => {
    expect(loofahCost("long_handle_back_brush")).toBeGreaterThan(loofahCost("mesh_nylon_puff"));
  });
});

describe("ecoFriendly", () => {
  it("natural gourd sponge is eco friendly", () => {
    expect(ecoFriendly("natural_gourd_sponge")).toBe(true);
  });
  it("mesh nylon puff is not", () => {
    expect(ecoFriendly("mesh_nylon_puff")).toBe(false);
  });
});

describe("reachesBack", () => {
  it("long handle back brush reaches back", () => {
    expect(reachesBack("long_handle_back_brush")).toBe(true);
  });
  it("mesh nylon puff does not", () => {
    expect(reachesBack("mesh_nylon_puff")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("natural gourd sponge uses dried luffa gourd plant", () => {
    expect(bodyMaterial("natural_gourd_sponge")).toBe("dried_luffa_gourd_plant");
  });
});

describe("bestSkin", () => {
  it("silicone scrubber pad best for sensitive acne prone", () => {
    expect(bestSkin("silicone_scrubber_pad")).toBe("sensitive_acne_prone");
  });
});

describe("loofahs", () => {
  it("returns 5 types", () => {
    expect(loofahs()).toHaveLength(5);
  });
});
