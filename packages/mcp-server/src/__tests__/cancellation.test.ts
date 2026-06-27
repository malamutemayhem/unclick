import { describe, it, expect } from "vitest";
import { CancellationToken, CancellationError, linked } from "../cancellation.js";

describe("CancellationToken", () => {
  it("starts not cancelled", () => {
    const token = new CancellationToken();
    expect(token.isCancelled).toBe(false);
  });

  it("becomes cancelled after cancel()", () => {
    const token = new CancellationToken();
    token.cancel("user abort");
    expect(token.isCancelled).toBe(true);
    expect(token.cancellationReason).toBe("user abort");
  });

  it("cancel is idempotent", () => {
    const token = new CancellationToken();
    token.cancel("first");
    token.cancel("second");
    expect(token.cancellationReason).toBe("first");
  });

  it("throwIfCancelled throws CancellationError", () => {
    const token = new CancellationToken();
    token.throwIfCancelled();
    token.cancel();
    expect(() => token.throwIfCancelled()).toThrow(CancellationError);
  });

  it("onCancel fires when cancelled", () => {
    const token = new CancellationToken();
    let fired = false;
    token.onCancel(() => { fired = true; });
    token.cancel();
    expect(fired).toBe(true);
  });

  it("onCancel fires immediately if already cancelled", () => {
    const token = new CancellationToken();
    token.cancel();
    let fired = false;
    token.onCancel(() => { fired = true; });
    expect(fired).toBe(true);
  });

  it("unsubscribe prevents callback", () => {
    const token = new CancellationToken();
    let fired = false;
    const unsub = token.onCancel(() => { fired = true; });
    unsub();
    token.cancel();
    expect(fired).toBe(false);
  });

  it("toAbortSignal returns aborted signal if already cancelled", () => {
    const token = new CancellationToken();
    token.cancel();
    const signal = token.toAbortSignal();
    expect(signal.aborted).toBe(true);
  });

  it("toAbortSignal aborts when token is cancelled", () => {
    const token = new CancellationToken();
    const signal = token.toAbortSignal();
    expect(signal.aborted).toBe(false);
    token.cancel();
    expect(signal.aborted).toBe(true);
  });
});

describe("linked", () => {
  it("cancels child when any parent cancels", () => {
    const a = new CancellationToken();
    const b = new CancellationToken();
    const child = linked(a, b);
    a.cancel("from a");
    expect(child.isCancelled).toBe(true);
    expect(child.cancellationReason).toBe("from a");
  });

  it("child starts cancelled if any parent is already cancelled", () => {
    const a = new CancellationToken();
    a.cancel("pre-cancelled");
    const child = linked(a, new CancellationToken());
    expect(child.isCancelled).toBe(true);
  });
});
