import { describe, it, expect } from "vitest";
import {
  clarityFinish, buildSpeed, adhesion, repairEase,
  shellacCost, dewaxed, dark, flakeGrade,
  bestUse, shellacCoats,
} from "../shellac-coat-calc.js";

describe("clarityFinish", () => {
  it("blonde shellac light clearest finish", () => {
    expect(clarityFinish("blonde_shellac_light")).toBeGreaterThan(clarityFinish("garnet_shellac_dark"));
  });
});

describe("buildSpeed", () => {
  it("amber shellac warm fastest build", () => {
    expect(buildSpeed("amber_shellac_warm")).toBeGreaterThan(buildSpeed("button_shellac_natural"));
  });
});

describe("adhesion", () => {
  it("dewaxed shellac seal best adhesion", () => {
    expect(adhesion("dewaxed_shellac_seal")).toBeGreaterThan(adhesion("blonde_shellac_light"));
  });
});

describe("repairEase", () => {
  it("button shellac natural easiest repair", () => {
    expect(repairEase("button_shellac_natural")).toBeGreaterThan(repairEase("dewaxed_shellac_seal"));
  });
});

describe("shellacCost", () => {
  it("dewaxed shellac seal most expensive", () => {
    expect(shellacCost("dewaxed_shellac_seal")).toBeGreaterThan(shellacCost("button_shellac_natural"));
  });
});

describe("dewaxed", () => {
  it("dewaxed shellac seal is dewaxed", () => {
    expect(dewaxed("dewaxed_shellac_seal")).toBe(true);
  });
  it("amber shellac warm not dewaxed", () => {
    expect(dewaxed("amber_shellac_warm")).toBe(false);
  });
});

describe("dark", () => {
  it("garnet shellac dark is dark", () => {
    expect(dark("garnet_shellac_dark")).toBe(true);
  });
  it("blonde shellac light not dark", () => {
    expect(dark("blonde_shellac_light")).toBe(false);
  });
});

describe("flakeGrade", () => {
  it("amber shellac warm uses amber flake natural", () => {
    expect(flakeGrade("amber_shellac_warm")).toBe("amber_flake_natural");
  });
});

describe("bestUse", () => {
  it("button shellac natural best for traditional french polish", () => {
    expect(bestUse("button_shellac_natural")).toBe("traditional_french_polish");
  });
});

describe("shellacCoats", () => {
  it("returns 5 types", () => {
    expect(shellacCoats()).toHaveLength(5);
  });
});
