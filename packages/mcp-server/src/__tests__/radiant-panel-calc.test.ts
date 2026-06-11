import { describe, it, expect } from "vitest";
import {
  comfort, efficiency, response, aesthetic,
  rpCost, hydronic, forCooling, emitter,
  bestUse, radiantPanelTypes,
} from "../radiant-panel-calc.js";

describe("comfort", () => {
  it("floor pex most comfortable", () => {
    expect(comfort("floor_embedded_pex")).toBeGreaterThan(comfort("wall_mounted_electric"));
  });
});

describe("efficiency", () => {
  it("chilled beam most efficient", () => {
    expect(efficiency("chilled_beam_passive")).toBeGreaterThan(efficiency("wall_mounted_electric"));
  });
});

describe("response", () => {
  it("wall electric fastest response", () => {
    expect(response("wall_mounted_electric")).toBeGreaterThan(response("floor_embedded_pex"));
  });
});

describe("aesthetic", () => {
  it("floor pex best aesthetic", () => {
    expect(aesthetic("floor_embedded_pex")).toBeGreaterThan(aesthetic("wall_mounted_electric"));
  });
});

describe("rpCost", () => {
  it("chilled beam most expensive", () => {
    expect(rpCost("chilled_beam_passive")).toBeGreaterThan(rpCost("wall_mounted_electric"));
  });
});

describe("hydronic", () => {
  it("ceiling hydronic is hydronic", () => {
    expect(hydronic("ceiling_hydronic_panel")).toBe(true);
  });
  it("wall electric not hydronic", () => {
    expect(hydronic("wall_mounted_electric")).toBe(false);
  });
});

describe("forCooling", () => {
  it("ceiling hydronic for cooling", () => {
    expect(forCooling("ceiling_hydronic_panel")).toBe(true);
  });
  it("floor pex not for cooling", () => {
    expect(forCooling("floor_embedded_pex")).toBe(false);
  });
});

describe("emitter", () => {
  it("floor pex uses pex tubing", () => {
    expect(emitter("floor_embedded_pex")).toBe("pex_tubing_concrete_slab");
  });
});

describe("bestUse", () => {
  it("chilled beam for office", () => {
    expect(bestUse("chilled_beam_passive")).toBe("office_low_energy_chilled_beam");
  });
});

describe("radiantPanelTypes", () => {
  it("returns 5 types", () => {
    expect(radiantPanelTypes()).toHaveLength(5);
  });
});
