import { describe, it, expect } from "vitest";
import {
  security, privacy, durability, aesthetic,
  fnCost, maintenance, forCommercial, post,
  bestUse, fenceTypeTypes,
} from "../fence-type-calc.js";

describe("security", () => {
  it("chain link best security", () => {
    expect(security("chain_link_galvanized")).toBeGreaterThan(security("composite_horizontal"));
  });
});

describe("privacy", () => {
  it("wood best privacy", () => {
    expect(privacy("wood_privacy_board")).toBeGreaterThan(privacy("chain_link_galvanized"));
  });
});

describe("durability", () => {
  it("ornamental aluminum most durable", () => {
    expect(durability("ornamental_aluminum")).toBeGreaterThan(durability("wood_privacy_board"));
  });
});

describe("aesthetic", () => {
  it("composite best aesthetic", () => {
    expect(aesthetic("composite_horizontal")).toBeGreaterThan(aesthetic("chain_link_galvanized"));
  });
});

describe("fnCost", () => {
  it("composite most expensive", () => {
    expect(fnCost("composite_horizontal")).toBeGreaterThan(fnCost("chain_link_galvanized"));
  });
});

describe("maintenance", () => {
  it("wood needs maintenance", () => {
    expect(maintenance("wood_privacy_board")).toBe(true);
  });
  it("vinyl no maintenance", () => {
    expect(maintenance("vinyl_pvc_privacy")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("chain link for commercial", () => {
    expect(forCommercial("chain_link_galvanized")).toBe(true);
  });
  it("wood not commercial", () => {
    expect(forCommercial("wood_privacy_board")).toBe(false);
  });
});

describe("post", () => {
  it("vinyl uses aluminum insert", () => {
    expect(post("vinyl_pvc_privacy")).toBe("vinyl_reinforced_aluminum_insert");
  });
});

describe("bestUse", () => {
  it("ornamental for pool enclosure", () => {
    expect(bestUse("ornamental_aluminum")).toBe("pool_enclosure_decorative");
  });
});

describe("fenceTypeTypes", () => {
  it("returns 5 types", () => {
    expect(fenceTypeTypes()).toHaveLength(5);
  });
});
