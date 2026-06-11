import { describe, it, expect } from "vitest";
import {
  heatSafe, aesthetic, durability, sizeRange,
  containerCost, transparent, natural, vesselMaterial,
  bestUse, containerWaxs,
} from "../container-wax-calc.js";

describe("heatSafe", () => {
  it("concrete vessel heavy most heat safe", () => {
    expect(heatSafe("concrete_vessel_heavy")).toBeGreaterThan(heatSafe("coconut_shell_natural"));
  });
});

describe("aesthetic", () => {
  it("ceramic pot opaque highest aesthetic", () => {
    expect(aesthetic("ceramic_pot_opaque")).toBeGreaterThan(aesthetic("tin_vessel_metal"));
  });
});

describe("durability", () => {
  it("concrete vessel heavy most durable", () => {
    expect(durability("concrete_vessel_heavy")).toBeGreaterThan(durability("coconut_shell_natural"));
  });
});

describe("sizeRange", () => {
  it("glass jar clear widest size range", () => {
    expect(sizeRange("glass_jar_clear")).toBeGreaterThan(sizeRange("coconut_shell_natural"));
  });
});

describe("containerCost", () => {
  it("ceramic pot opaque most expensive", () => {
    expect(containerCost("ceramic_pot_opaque")).toBeGreaterThan(containerCost("tin_vessel_metal"));
  });
});

describe("transparent", () => {
  it("glass jar clear is transparent", () => {
    expect(transparent("glass_jar_clear")).toBe(true);
  });
  it("tin vessel metal not transparent", () => {
    expect(transparent("tin_vessel_metal")).toBe(false);
  });
});

describe("natural", () => {
  it("coconut shell natural is natural", () => {
    expect(natural("coconut_shell_natural")).toBe(true);
  });
  it("glass jar clear not natural", () => {
    expect(natural("glass_jar_clear")).toBe(false);
  });
});

describe("vesselMaterial", () => {
  it("concrete vessel heavy uses cast concrete cup", () => {
    expect(vesselMaterial("concrete_vessel_heavy")).toBe("cast_concrete_cup");
  });
});

describe("bestUse", () => {
  it("glass jar clear best for clear display candle", () => {
    expect(bestUse("glass_jar_clear")).toBe("clear_display_candle");
  });
});

describe("containerWaxs", () => {
  it("returns 5 types", () => {
    expect(containerWaxs()).toHaveLength(5);
  });
});
