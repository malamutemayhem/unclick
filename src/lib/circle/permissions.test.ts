import { describe, expect, it } from "vitest";
import {
  EMPTY_SHARE,
  cellKey,
  countShared,
  deriveVisual,
  getShare,
  isFullyShared,
  isPartiallyShared,
  isSharedWith,
  setYourShare,
  toggleMaster,
  toggleYourShare,
  type ShareLedger,
} from "./permissions";

describe("circle permissions engine", () => {
  it("derives every visual from the bit pair", () => {
    expect(deriveVisual({ youShares: false, peerShares: false })).toBe("off");
    expect(deriveVisual({ youShares: true, peerShares: false })).toBe("out");
    expect(deriveVisual({ youShares: false, peerShares: true })).toBe("in");
    expect(deriveVisual({ youShares: true, peerShares: true })).toBe("both");
  });

  it("defaults missing cells to EMPTY_SHARE", () => {
    expect(getShare({}, cellKey("t", "r", "m"))).toBe(EMPTY_SHARE);
  });

  it("isSharedWith reads only the outbound bit", () => {
    const ledger: ShareLedger = {
      [cellKey("t", "r", "out")]: { youShares: true, peerShares: false },
      [cellKey("t", "r", "in")]: { youShares: false, peerShares: true },
    };
    expect(isSharedWith(ledger, "t", "r", "out")).toBe(true);
    // An inbound-only request must NOT count as you sharing out.
    expect(isSharedWith(ledger, "t", "r", "in")).toBe(false);
    expect(isSharedWith(ledger, "t", "r", "absent")).toBe(false);
  });

  it("toggleYourShare flips the outbound bit and preserves the peer bit", () => {
    const key = cellKey("t", "r", "m");
    const start: ShareLedger = { [key]: { youShares: false, peerShares: true } };
    const on = toggleYourShare(start, key);
    expect(on[key]).toEqual({ youShares: true, peerShares: true });
    const off = toggleYourShare(on, key);
    expect(off[key]).toEqual({ youShares: false, peerShares: true });
  });

  it("setYourShare writes many cells while keeping each peer bit", () => {
    const a = cellKey("t", "r", "a");
    const b = cellKey("t", "r", "b");
    const start: ShareLedger = { [b]: { youShares: false, peerShares: true } };
    const next = setYourShare(start, [a, b], true);
    expect(next[a]).toEqual({ youShares: true, peerShares: false });
    expect(next[b]).toEqual({ youShares: true, peerShares: true });
  });

  it("counts, full and partial share predicates agree", () => {
    const keys = [cellKey("t", "r", "a"), cellKey("t", "r", "b"), cellKey("t", "r", "c")];
    const ledger = setYourShare({}, [keys[0]], true);
    expect(countShared(ledger, keys)).toBe(1);
    expect(isPartiallyShared(ledger, keys)).toBe(true);
    expect(isFullyShared(ledger, keys)).toBe(false);

    const all = setYourShare(ledger, keys, true);
    expect(isFullyShared(all, keys)).toBe(true);
    expect(isPartiallyShared(all, keys)).toBe(false);
  });

  it("toggleMaster turns a partial row fully on", () => {
    const keys = [cellKey("t", "r", "a"), cellKey("t", "r", "b")];
    const partial = setYourShare({}, [keys[0]], true);
    const next = toggleMaster(partial, keys);
    expect(isFullyShared(next, keys)).toBe(true);
  });

  it("toggleMaster turns a full row off but keeps inbound peer bits", () => {
    const a = cellKey("t", "r", "a");
    const b = cellKey("t", "r", "b");
    const full: ShareLedger = {
      [a]: { youShares: true, peerShares: false },
      [b]: { youShares: true, peerShares: true },
    };
    const next = toggleMaster(full, [a, b]);
    expect(deriveVisual(next[a])).toBe("off");
    // b had an inbound peer bit; turning the master off must leave it as "in".
    expect(deriveVisual(next[b])).toBe("in");
  });

  it("never mutates the input ledger", () => {
    const key = cellKey("t", "r", "m");
    const start: ShareLedger = { [key]: { youShares: false, peerShares: false } };
    const snapshot = JSON.stringify(start);
    toggleYourShare(start, key);
    setYourShare(start, [key], true);
    toggleMaster(start, [key]);
    expect(JSON.stringify(start)).toBe(snapshot);
  });

  it("keeps EMPTY_SHARE frozen", () => {
    expect(Object.isFrozen(EMPTY_SHARE)).toBe(true);
  });

  it("is deterministic: identical input gives identical output", () => {
    const keys = [cellKey("t", "r", "a"), cellKey("t", "r", "b")];
    const base = setYourShare({}, [keys[0]], true);
    expect(toggleMaster(base, keys)).toEqual(toggleMaster(base, keys));
  });
});
