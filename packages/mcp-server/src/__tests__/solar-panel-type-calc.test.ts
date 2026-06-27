import { describe, it, expect } from "vitest";
import {
  efficiency, powerDensity, deployability, degradation,
  spCost, tracking, forSmallsat, cell,
  bestUse, solarPanelTypes,
} from "../solar-panel-type-calc.js";

describe("efficiency", () => {
  it("concentrator most efficient", () => {
    expect(efficiency("concentrator_fresnel_lens")).toBeGreaterThan(efficiency("thin_film_cigs_flex"));
  });
});

describe("powerDensity", () => {
  it("flexible rollout highest power density", () => {
    expect(powerDensity("flexible_rollout_array")).toBeGreaterThan(powerDensity("body_mounted_gaas"));
  });
});

describe("deployability", () => {
  it("body mounted most deployable", () => {
    expect(deployability("body_mounted_gaas")).toBeGreaterThan(deployability("concentrator_fresnel_lens"));
  });
});

describe("degradation", () => {
  it("rigid deployable lowest degradation", () => {
    expect(degradation("rigid_deployable_wing")).toBeGreaterThan(degradation("thin_film_cigs_flex"));
  });
});

describe("spCost", () => {
  it("concentrator most expensive", () => {
    expect(spCost("concentrator_fresnel_lens")).toBeGreaterThan(spCost("thin_film_cigs_flex"));
  });
});

describe("tracking", () => {
  it("rigid deployable has tracking", () => {
    expect(tracking("rigid_deployable_wing")).toBe(true);
  });
  it("body mounted no tracking", () => {
    expect(tracking("body_mounted_gaas")).toBe(false);
  });
});

describe("forSmallsat", () => {
  it("body mounted for smallsat", () => {
    expect(forSmallsat("body_mounted_gaas")).toBe(true);
  });
  it("rigid deployable not for smallsat", () => {
    expect(forSmallsat("rigid_deployable_wing")).toBe(false);
  });
});

describe("cell", () => {
  it("concentrator uses quad junction concentrated", () => {
    expect(cell("concentrator_fresnel_lens")).toBe("quad_junction_concentrated");
  });
});

describe("bestUse", () => {
  it("flexible rollout best for iss power", () => {
    expect(bestUse("flexible_rollout_array")).toBe("iss_power_augmentation_rosa");
  });
});

describe("solarPanelTypes", () => {
  it("returns 5 types", () => {
    expect(solarPanelTypes()).toHaveLength(5);
  });
});
