import { describe, it, expect, vi } from "vitest";
import { debounce, throttle, once, after } from "../debounce-throttle.js";

describe("debounce-throttle", () => {
  describe("debounce", () => {
    it("delays execution", async () => {
      const fn = vi.fn();
      const d = debounce(fn, 20);
      d(); d(); d();
      expect(fn).not.toHaveBeenCalled();
      await new Promise((r) => setTimeout(r, 50));
      expect(fn).toHaveBeenCalledTimes(1);
    });
    it("cancel prevents execution", async () => {
      const fn = vi.fn();
      const d = debounce(fn, 20);
      d();
      d.cancel();
      await new Promise((r) => setTimeout(r, 50));
      expect(fn).not.toHaveBeenCalled();
    });
    it("flush triggers immediately", () => {
      const fn = vi.fn();
      const d = debounce(fn, 1000);
      d(1, 2);
      d.flush();
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("throttle", () => {
    it("limits call rate", async () => {
      const fn = vi.fn();
      const t = throttle(fn, 50);
      t(); t(); t();
      expect(fn).toHaveBeenCalledTimes(1);
      await new Promise((r) => setTimeout(r, 70));
      expect(fn).toHaveBeenCalledTimes(2);
      t.cancel();
    });
  });

  describe("once", () => {
    it("only calls once", () => {
      const fn = vi.fn().mockReturnValue(42);
      const o = once(fn);
      expect(o()).toBe(42);
      expect(o()).toBe(42);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("after", () => {
    it("calls after N invocations", () => {
      const fn = vi.fn().mockReturnValue("done");
      const a = after(3, fn);
      expect(a()).toBeUndefined();
      expect(a()).toBeUndefined();
      expect(a()).toBe("done");
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
