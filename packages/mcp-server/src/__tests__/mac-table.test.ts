import { describe, it, expect } from "vitest";
import { MacTable } from "../mac-table.js";

describe("MacTable", () => {
  it("learns and looks up MAC", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:FF", 1);
    expect(mt.lookup("AA:BB:CC:DD:EE:FF")).toBe(1);
  });

  it("lookup is case-insensitive", () => {
    const mt = new MacTable();
    mt.learn("aa:bb:cc:dd:ee:ff", 1);
    expect(mt.lookup("AA:BB:CC:DD:EE:FF")).toBe(1);
  });

  it("returns null for unknown MAC", () => {
    const mt = new MacTable();
    expect(mt.lookup("AA:BB:CC:DD:EE:FF")).toBeNull();
  });

  it("updates port on re-learn", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:FF", 1);
    mt.learn("AA:BB:CC:DD:EE:FF", 2);
    expect(mt.lookup("AA:BB:CC:DD:EE:FF")).toBe(2);
  });

  it("static entry cannot be overwritten by learn", () => {
    const mt = new MacTable();
    mt.addStatic("AA:BB:CC:DD:EE:FF", 1);
    mt.learn("AA:BB:CC:DD:EE:FF", 2);
    expect(mt.lookup("AA:BB:CC:DD:EE:FF")).toBe(1);
  });

  it("remove deletes entry", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:FF", 1);
    expect(mt.remove("AA:BB:CC:DD:EE:FF")).toBe(true);
    expect(mt.lookup("AA:BB:CC:DD:EE:FF")).toBeNull();
  });

  it("remove returns false for missing", () => {
    const mt = new MacTable();
    expect(mt.remove("AA:BB:CC:DD:EE:FF")).toBe(false);
  });

  it("flushPort removes dynamic entries on port", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:01", 1);
    mt.learn("AA:BB:CC:DD:EE:02", 1);
    mt.addStatic("AA:BB:CC:DD:EE:03", 1);
    expect(mt.flushPort(1)).toBe(2);
  });

  it("age removes old entries", () => {
    const mt = new MacTable(1);
    mt.learn("AA:BB:CC:DD:EE:FF", 1, 1, 0);
    const removed = mt.age(2000);
    expect(removed).toBe(1);
    expect(mt.size).toBe(0);
  });

  it("age preserves static entries", () => {
    const mt = new MacTable(1);
    mt.addStatic("AA:BB:CC:DD:EE:FF", 1);
    mt.age(Date.now() + 100000);
    expect(mt.size).toBe(1);
  });

  it("getByPort returns entries on a port", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:01", 1);
    mt.learn("AA:BB:CC:DD:EE:02", 1);
    mt.learn("AA:BB:CC:DD:EE:03", 2);
    expect(mt.getByPort(1)).toHaveLength(2);
  });

  it("getByVlan filters by VLAN", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:01", 1, 10);
    mt.learn("AA:BB:CC:DD:EE:02", 2, 20);
    expect(mt.getByVlan(10)).toHaveLength(1);
  });

  it("clear removes all", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:01", 1);
    mt.addStatic("AA:BB:CC:DD:EE:02", 2);
    mt.clear();
    expect(mt.size).toBe(0);
  });

  it("clear by type", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:01", 1);
    mt.addStatic("AA:BB:CC:DD:EE:02", 2);
    mt.clear("dynamic");
    expect(mt.size).toBe(1);
  });

  it("size tracks count", () => {
    const mt = new MacTable();
    expect(mt.size).toBe(0);
    mt.learn("AA:BB:CC:DD:EE:FF", 1);
    expect(mt.size).toBe(1);
  });

  it("max entries enforced", () => {
    const mt = new MacTable(300, 2);
    mt.learn("AA:BB:CC:DD:EE:01", 1);
    mt.learn("AA:BB:CC:DD:EE:02", 2);
    expect(mt.learn("AA:BB:CC:DD:EE:03", 3)).toBe(false);
  });

  it("getEntry returns full entry", () => {
    const mt = new MacTable();
    mt.learn("AA:BB:CC:DD:EE:FF", 5, 10);
    const entry = mt.getEntry("AA:BB:CC:DD:EE:FF", 10)!;
    expect(entry.port).toBe(5);
    expect(entry.vlan).toBe(10);
    expect(entry.type).toBe("dynamic");
  });
});
