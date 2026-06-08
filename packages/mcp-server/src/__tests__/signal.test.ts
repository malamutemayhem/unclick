import { describe, it, expect } from "vitest";
import { SignalController, race } from "../signal.js";

describe("Signal", () => {
  it("starts unaborted", () => {
    const ctrl = new SignalController();
    expect(ctrl.signal.aborted).toBe(false);
  });

  it("abort sets aborted", () => {
    const ctrl = new SignalController();
    ctrl.abort();
    expect(ctrl.signal.aborted).toBe(true);
  });

  it("onAbort fires on abort", () => {
    const ctrl = new SignalController();
    let called = false;
    ctrl.signal.onAbort(() => { called = true; });
    ctrl.abort();
    expect(called).toBe(true);
  });

  it("onAbort fires immediately if already aborted", () => {
    const ctrl = new SignalController();
    ctrl.abort();
    let called = false;
    ctrl.signal.onAbort(() => { called = true; });
    expect(called).toBe(true);
  });

  it("throwIfAborted throws when aborted", () => {
    const ctrl = new SignalController();
    ctrl.signal.throwIfAborted();
    ctrl.abort("cancelled");
    expect(() => ctrl.signal.throwIfAborted()).toThrow();
  });

  it("reason is preserved", () => {
    const ctrl = new SignalController();
    ctrl.abort("my reason");
    expect(ctrl.signal.reason).toBe("my reason");
  });

  it("double abort is ignored", () => {
    const ctrl = new SignalController();
    ctrl.abort("first");
    ctrl.abort("second");
    expect(ctrl.signal.reason).toBe("first");
  });
});

describe("race", () => {
  it("aborts when first signal aborts", () => {
    const a = new SignalController();
    const b = new SignalController();
    const raced = race(a.signal, b.signal);
    a.abort("a won");
    expect(raced.aborted).toBe(true);
    expect(raced.reason).toBe("a won");
  });

  it("already aborted signal wins immediately", () => {
    const a = new SignalController();
    a.abort("already");
    const b = new SignalController();
    const raced = race(a.signal, b.signal);
    expect(raced.aborted).toBe(true);
  });
});
