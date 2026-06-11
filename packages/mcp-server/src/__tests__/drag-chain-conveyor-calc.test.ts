import { describe, it, expect } from "vitest";
import {
  capacity, chainSpeed, wearResistance, sealIntegrity,
  dccCost, enclosed, forBulkSolid, flightType,
  bestUse, dragChainConveyorTypes,
} from "../drag-chain-conveyor-calc.js";

describe("capacity", () => {
  it("scraper reclaim highest capacity", () => {
    expect(capacity("scraper_reclaim")).toBeGreaterThan(capacity("tubular_drag"));
  });
});

describe("chainSpeed", () => {
  it("paddle flight fastest chain speed", () => {
    expect(chainSpeed("paddle_flight")).toBeGreaterThan(chainSpeed("submerged_redler"));
  });
});

describe("wearResistance", () => {
  it("scraper reclaim best wear resistance", () => {
    expect(wearResistance("scraper_reclaim")).toBeGreaterThan(wearResistance("paddle_flight"));
  });
});

describe("sealIntegrity", () => {
  it("tubular drag best seal integrity", () => {
    expect(sealIntegrity("tubular_drag")).toBeGreaterThan(sealIntegrity("scraper_reclaim"));
  });
});

describe("dccCost", () => {
  it("tubular drag most expensive", () => {
    expect(dccCost("tubular_drag")).toBeGreaterThan(dccCost("paddle_flight"));
  });
});

describe("enclosed", () => {
  it("en masse is enclosed", () => {
    expect(enclosed("en_masse")).toBe(true);
  });
  it("scraper reclaim not enclosed", () => {
    expect(enclosed("scraper_reclaim")).toBe(false);
  });
});

describe("forBulkSolid", () => {
  it("all types for bulk solids", () => {
    expect(forBulkSolid("en_masse")).toBe(true);
    expect(forBulkSolid("tubular_drag")).toBe(true);
  });
});

describe("flightType", () => {
  it("tubular drag uses disc puck on chain", () => {
    expect(flightType("tubular_drag")).toBe("disc_puck_on_chain_inside_tube_gentle_3d_routing_flexible");
  });
});

describe("bestUse", () => {
  it("scraper reclaim for coal yard stockpile", () => {
    expect(bestUse("scraper_reclaim")).toBe("coal_yard_stockpile_reclaim_port_terminal_bulk_aggregate");
  });
});

describe("dragChainConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(dragChainConveyorTypes()).toHaveLength(5);
  });
});
