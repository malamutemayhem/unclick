import { describe, it, expect } from "vitest";
import {
  alphaPreservation, aromaRetention, storageLife, processingSpeed,
  hpCost, cryogenic, forDryHop, pelletConfig,
  bestUse, hopPelletizerTypes,
} from "../hop-pelletizer-calc.js";

describe("alphaPreservation", () => {
  it("cryo separation best alpha preservation", () => {
    expect(alphaPreservation("cryo_separation")).toBeGreaterThan(alphaPreservation("whole_cone_press"));
  });
});

describe("aromaRetention", () => {
  it("cryo separation best aroma retention", () => {
    expect(aromaRetention("cryo_separation")).toBeGreaterThan(aromaRetention("isomerized_extract"));
  });
});

describe("storageLife", () => {
  it("isomerized extract longest storage life", () => {
    expect(storageLife("isomerized_extract")).toBeGreaterThan(storageLife("whole_cone_press"));
  });
});

describe("processingSpeed", () => {
  it("isomerized extract fastest processing speed", () => {
    expect(processingSpeed("isomerized_extract")).toBeGreaterThan(processingSpeed("cryo_separation"));
  });
});

describe("hpCost", () => {
  it("cryo separation most expensive", () => {
    expect(hpCost("cryo_separation")).toBeGreaterThan(hpCost("whole_cone_press"));
  });
});

describe("cryogenic", () => {
  it("cryo separation is cryogenic", () => {
    expect(cryogenic("cryo_separation")).toBe(true);
  });
  it("hammer mill t90 not cryogenic", () => {
    expect(cryogenic("hammer_mill_t90")).toBe(false);
  });
});

describe("forDryHop", () => {
  it("hammer mill t90 for dry hop", () => {
    expect(forDryHop("hammer_mill_t90")).toBe(true);
  });
  it("isomerized extract not for dry hop", () => {
    expect(forDryHop("isomerized_extract")).toBe(false);
  });
});

describe("pelletConfig", () => {
  it("t45 enriched uses sieved enriched pellet", () => {
    expect(pelletConfig("t45_enriched")).toBe("sieved_enriched_pellet_t45_higher_lupulin_ratio_concentrated");
  });
});

describe("bestUse", () => {
  it("whole cone press for traditional brewing", () => {
    expect(bestUse("whole_cone_press")).toBe("traditional_whole_cone_brewing_hop_back_filter_bed_infusion");
  });
});

describe("hopPelletizerTypes", () => {
  it("returns 5 types", () => {
    expect(hopPelletizerTypes()).toHaveLength(5);
  });
});
