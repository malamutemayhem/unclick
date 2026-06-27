import { describe, it, expect } from "vitest";
import {
  aggression, speed, dustControl, surfaceFinish,
  abCost, noResidual, forHeavy, media,
  bestUse, abrasiveBlastTypes,
} from "../abrasive-blast-calc.js";

describe("aggression", () => {
  it("pressure pot most aggressive", () => {
    expect(aggression("pressure_pot_dry")).toBeGreaterThan(aggression("dry_ice_blast_co2"));
  });
});

describe("speed", () => {
  it("wheel blast fastest", () => {
    expect(speed("wheel_blast_centrifugal")).toBeGreaterThan(speed("dry_ice_blast_co2"));
  });
});

describe("dustControl", () => {
  it("wet blast best dust control", () => {
    expect(dustControl("wet_blast_slurry")).toBeGreaterThan(dustControl("pressure_pot_dry"));
  });
});

describe("surfaceFinish", () => {
  it("wet blast best surface finish", () => {
    expect(surfaceFinish("wet_blast_slurry")).toBeGreaterThan(surfaceFinish("pressure_pot_dry"));
  });
});

describe("abCost", () => {
  it("dry ice most expensive", () => {
    expect(abCost("dry_ice_blast_co2")).toBeGreaterThan(abCost("wheel_blast_centrifugal"));
  });
});

describe("noResidual", () => {
  it("dry ice leaves no residual", () => {
    expect(noResidual("dry_ice_blast_co2")).toBe(true);
  });
  it("pressure pot leaves residual", () => {
    expect(noResidual("pressure_pot_dry")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("wheel blast for heavy duty", () => {
    expect(forHeavy("wheel_blast_centrifugal")).toBe(true);
  });
  it("dry ice not for heavy", () => {
    expect(forHeavy("dry_ice_blast_co2")).toBe(false);
  });
});

describe("media", () => {
  it("dry ice uses co2 pellet", () => {
    expect(media("dry_ice_blast_co2")).toBe("co2_dry_ice_pellet_sublimate");
  });
});

describe("bestUse", () => {
  it("wheel blast for casting descale", () => {
    expect(bestUse("wheel_blast_centrifugal")).toBe("casting_forging_plate_descale");
  });
});

describe("abrasiveBlastTypes", () => {
  it("returns 5 types", () => {
    expect(abrasiveBlastTypes()).toHaveLength(5);
  });
});
