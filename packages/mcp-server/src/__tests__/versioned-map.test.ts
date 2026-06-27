import { describe, it, expect } from "vitest";
import { VersionedMap } from "../versioned-map.js";

describe("VersionedMap", () => {
  it("sets and gets values", () => {
    const vm = new VersionedMap<string, number>();
    vm.set("a", 1);
    expect(vm.get("a")).toBe(1);
  });

  it("returns undefined for missing keys", () => {
    const vm = new VersionedMap<string, number>();
    expect(vm.get("missing")).toBeUndefined();
  });

  it("tracks versions", () => {
    const vm = new VersionedMap<string, string>();
    const v1 = vm.set("key", "v1");
    const v2 = vm.set("key", "v2");
    expect(v1).toBe(1);
    expect(v2).toBe(2);
    expect(vm.version()).toBe(2);
  });

  it("retrieves value at specific version", () => {
    const vm = new VersionedMap<string, string>();
    const v1 = vm.set("key", "first");
    vm.set("key", "second");
    expect(vm.getAt("key", v1)).toBe("first");
  });

  it("deletes keys", () => {
    const vm = new VersionedMap<string, number>();
    vm.set("a", 1);
    expect(vm.delete("a")).toBe(true);
    expect(vm.has("a")).toBe(false);
  });

  it("delete returns false for missing", () => {
    const vm = new VersionedMap<string, number>();
    expect(vm.delete("missing")).toBe(false);
  });

  it("provides history", () => {
    const vm = new VersionedMap<string, string>();
    vm.set("key", "v1");
    vm.set("key", "v2");
    const hist = vm.history("key");
    expect(hist.length).toBe(2);
    expect(hist[0].value).toBe("v1");
    expect(hist[1].value).toBe("v2");
  });

  it("creates snapshots", () => {
    const vm = new VersionedMap<string, number>();
    vm.set("a", 1);
    const v = vm.version();
    vm.set("b", 2);
    vm.set("a", 10);
    const snap = vm.snapshot(v);
    expect(snap.get("a")).toBe(1);
    expect(snap.has("b")).toBe(false);
  });

  it("lists active keys", () => {
    const vm = new VersionedMap<string, number>();
    vm.set("a", 1);
    vm.set("b", 2);
    vm.delete("a");
    expect(vm.keys()).toEqual(["b"]);
  });

  it("tracks size", () => {
    const vm = new VersionedMap<string, number>();
    vm.set("a", 1);
    vm.set("b", 2);
    expect(vm.size()).toBe(2);
    vm.delete("a");
    expect(vm.size()).toBe(1);
  });

  it("counts total version entries", () => {
    const vm = new VersionedMap<string, string>();
    vm.set("key", "v1");
    vm.set("key", "v2");
    vm.set("other", "x");
    expect(vm.totalVersions()).toBe(3);
  });

  it("rolls back to previous version", () => {
    const vm = new VersionedMap<string, string>();
    const v1 = vm.set("key", "original");
    vm.set("key", "modified");
    expect(vm.rollback("key", v1)).toBe(true);
    expect(vm.get("key")).toBe("original");
  });
});
