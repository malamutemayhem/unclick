import { describe, it, expect } from "vitest";
import {
  sealSpeed, gasFlush, filmWaste, shelfLife,
  tsCost_, modified, forFresh, sealConfig,
  bestUse, traySealerTypes,
} from "../tray-sealer-calc.js";

describe("sealSpeed", () => {
  it("full auto map fastest seal speed", () => {
    expect(sealSpeed("full_auto_map")).toBeGreaterThan(sealSpeed("manual_tabletop"));
  });
});

describe("gasFlush", () => {
  it("full auto map best gas flush", () => {
    expect(gasFlush("full_auto_map")).toBeGreaterThan(gasFlush("manual_tabletop"));
  });
});

describe("filmWaste", () => {
  it("full auto map best film waste efficiency", () => {
    expect(filmWaste("full_auto_map")).toBeGreaterThan(filmWaste("manual_tabletop"));
  });
});

describe("shelfLife", () => {
  it("full auto map best shelf life extension", () => {
    expect(shelfLife("full_auto_map")).toBeGreaterThan(shelfLife("manual_tabletop"));
  });
});

describe("tsCost_", () => {
  it("vacuum skin most expensive", () => {
    expect(tsCost_("vacuum_skin")).toBeGreaterThan(tsCost_("manual_tabletop"));
  });
});

describe("modified", () => {
  it("full auto map uses modified atmosphere", () => {
    expect(modified("full_auto_map")).toBe(true);
  });
  it("manual tabletop no modified atmosphere", () => {
    expect(modified("manual_tabletop")).toBe(false);
  });
});

describe("forFresh", () => {
  it("full auto map for fresh product", () => {
    expect(forFresh("full_auto_map")).toBe(true);
  });
  it("vacuum skin not for fresh", () => {
    expect(forFresh("vacuum_skin")).toBe(false);
  });
});

describe("sealConfig", () => {
  it("skin pack uses vacuum skin film drape", () => {
    expect(sealConfig("skin_pack")).toBe("vacuum_skin_film_drape_tray_tight_contour_product_shape_seal");
  });
});

describe("bestUse", () => {
  it("manual tabletop for small deli bakery", () => {
    expect(bestUse("manual_tabletop")).toBe("small_deli_bakery_ready_meal_manual_seal_low_volume_counter");
  });
});

describe("traySealerTypes", () => {
  it("returns 5 types", () => {
    expect(traySealerTypes()).toHaveLength(5);
  });
});
