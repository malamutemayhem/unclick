import { describe, it, expect } from "vitest";
import {
  documentCapacity, security, accessibility, slimProfile,
  walletCost, rfidBlocking, concealed, closureStyle,
  bestTrip, travelWallets,
} from "../travel-wallet-calc.js";

describe("documentCapacity", () => {
  it("family document holder most document capacity", () => {
    expect(documentCapacity("family_document_holder")).toBeGreaterThan(documentCapacity("rfid_blocking_slim"));
  });
});

describe("security", () => {
  it("neck pouch hidden best security", () => {
    expect(security("neck_pouch_hidden")).toBeGreaterThan(security("family_document_holder"));
  });
});

describe("accessibility", () => {
  it("rfid blocking slim best accessibility", () => {
    expect(accessibility("rfid_blocking_slim")).toBeGreaterThan(accessibility("neck_pouch_hidden"));
  });
});

describe("slimProfile", () => {
  it("rfid blocking slim slimmest profile", () => {
    expect(slimProfile("rfid_blocking_slim")).toBeGreaterThan(slimProfile("family_document_holder"));
  });
});

describe("walletCost", () => {
  it("tech cable passport combo most expensive", () => {
    expect(walletCost("tech_cable_passport_combo")).toBeGreaterThan(walletCost("rfid_blocking_slim"));
  });
});

describe("rfidBlocking", () => {
  it("rfid blocking slim has rfid blocking", () => {
    expect(rfidBlocking("rfid_blocking_slim")).toBe(true);
  });
  it("passport organizer zip has no rfid blocking", () => {
    expect(rfidBlocking("passport_organizer_zip")).toBe(false);
  });
});

describe("concealed", () => {
  it("neck pouch hidden is concealed", () => {
    expect(concealed("neck_pouch_hidden")).toBe(true);
  });
  it("rfid blocking slim is not concealed", () => {
    expect(concealed("rfid_blocking_slim")).toBe(false);
  });
});

describe("closureStyle", () => {
  it("neck pouch hidden uses zip top lanyard", () => {
    expect(closureStyle("neck_pouch_hidden")).toBe("zip_top_lanyard");
  });
});

describe("bestTrip", () => {
  it("family document holder best for family vacation group", () => {
    expect(bestTrip("family_document_holder")).toBe("family_vacation_group");
  });
});

describe("travelWallets", () => {
  it("returns 5 types", () => {
    expect(travelWallets()).toHaveLength(5);
  });
});
