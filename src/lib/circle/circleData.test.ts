import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cellKey, getShare } from "./permissions";
import {
  DAVID_APPS_TABLE,
  MEMORY_TABLE,
  PEERS,
  STORAGE_KEY,
  YOU,
  buildDefaultLedger,
  clearLedger,
  isCellEditable,
  loadLedger,
  rowEditableMemberIds,
  rowMasterKeys,
  saveLedger,
  tableMasterKeys,
} from "./circleData";

describe("circle editability policy", () => {
  it("you-owned table: peers are editable, you are not", () => {
    expect(isCellEditable(MEMORY_TABLE, YOU)).toBe(false);
    for (const peer of PEERS) {
      expect(isCellEditable(MEMORY_TABLE, peer)).toBe(true);
    }
  });

  it("peer-owned table: only your own column is editable", () => {
    expect(isCellEditable(DAVID_APPS_TABLE, YOU)).toBe(true);
    for (const peer of PEERS) {
      expect(isCellEditable(DAVID_APPS_TABLE, peer)).toBe(false);
    }
  });

  it("rowEditableMemberIds returns peers for you-owned, ['you'] for peer-owned", () => {
    expect(rowEditableMemberIds(MEMORY_TABLE)).toEqual(PEERS.map((m) => m.id));
    expect(rowEditableMemberIds(DAVID_APPS_TABLE)).toEqual(["you"]);
  });

  it("row master keys cover one cell per editable peer", () => {
    const keys = rowMasterKeys(MEMORY_TABLE, MEMORY_TABLE.rows[0]);
    expect(keys).toHaveLength(PEERS.length);
    expect(keys[0]).toBe(cellKey(MEMORY_TABLE.id, MEMORY_TABLE.rows[0].id, PEERS[0].id));
  });

  it("table master keys cover every editable cell in the table", () => {
    const keys = tableMasterKeys(MEMORY_TABLE);
    expect(keys).toHaveLength(MEMORY_TABLE.rows.length * PEERS.length);
  });
});

describe("circle ledger persistence", () => {
  beforeEach(() => clearLedger());
  afterEach(() => clearLedger());

  it("buildDefaultLedger produces a non-empty ledger of valid share states", () => {
    const ledger = buildDefaultLedger();
    const entries = Object.values(ledger);
    expect(entries.length).toBeGreaterThan(0);
    for (const state of entries) {
      expect(typeof state.youShares).toBe("boolean");
      expect(typeof state.peerShares).toBe("boolean");
    }
  });

  it("loadLedger layers saved entries over the defaults", () => {
    const key = cellKey("your-apps", "github", "leo");
    // Not in the seed, so default is off. Save an override and reload.
    saveLedger({ [key]: { youShares: true, peerShares: false } });
    const loaded = loadLedger();
    expect(getShare(loaded, key).youShares).toBe(true);
    // A default seed entry is still present after the merge.
    expect(getShare(loaded, cellKey("memory", "saved-facts", "priya")).youShares).toBe(true);
  });

  it("loadLedger sanitizes malformed stored entries and keeps the defaults", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        "bad::entry::one": "nope",
        "bad::entry::two": { youShares: "yes" },
        "your-apps::github::leo": { youShares: true, peerShares: false },
      }),
    );
    const loaded = loadLedger();
    expect(getShare(loaded, "bad::entry::one").youShares).toBe(false);
    expect(getShare(loaded, "bad::entry::two").youShares).toBe(false);
    expect(getShare(loaded, "your-apps::github::leo").youShares).toBe(true);
    // Defaults survive a malformed payload.
    expect(getShare(loaded, cellKey("memory", "saved-facts", "priya")).youShares).toBe(true);
  });

  it("clearLedger drops the override so defaults return", () => {
    const key = cellKey("your-apps", "github", "leo");
    saveLedger({ [key]: { youShares: true, peerShares: false } });
    expect(getShare(loadLedger(), key).youShares).toBe(true);
    clearLedger();
    expect(getShare(loadLedger(), key).youShares).toBe(false);
  });
});
