import { describe, it, expect } from "vitest";
import { PermissionFlags } from "../permission-flags.js";

const READ = 1;
const WRITE = 2;
const EXEC = 4;
const ADMIN = 8;

describe("PermissionFlags", () => {
  it("has checks for flags", () => {
    const p = new PermissionFlags(READ | WRITE);
    expect(p.has(READ)).toBe(true);
    expect(p.has(WRITE)).toBe(true);
    expect(p.has(EXEC)).toBe(false);
  });

  it("add adds a flag", () => {
    const p = new PermissionFlags(READ).add(WRITE);
    expect(p.has(READ)).toBe(true);
    expect(p.has(WRITE)).toBe(true);
  });

  it("remove removes a flag", () => {
    const p = new PermissionFlags(READ | WRITE).remove(WRITE);
    expect(p.has(READ)).toBe(true);
    expect(p.has(WRITE)).toBe(false);
  });

  it("toggle flips a flag", () => {
    const p = new PermissionFlags(READ);
    expect(p.toggle(WRITE).has(WRITE)).toBe(true);
    expect(p.toggle(READ).has(READ)).toBe(false);
  });

  it("combine merges two sets", () => {
    const a = new PermissionFlags(READ);
    const b = new PermissionFlags(WRITE);
    const c = a.combine(b);
    expect(c.has(READ)).toBe(true);
    expect(c.has(WRITE)).toBe(true);
  });

  it("toArray returns flag names", () => {
    const map = { read: READ, write: WRITE, exec: EXEC, admin: ADMIN };
    const p = new PermissionFlags(READ | EXEC);
    expect(p.toArray(map)).toEqual(["read", "exec"]);
  });

  it("from creates from array", () => {
    const p = PermissionFlags.from([READ, EXEC]);
    expect(p.has(READ)).toBe(true);
    expect(p.has(EXEC)).toBe(true);
    expect(p.has(WRITE)).toBe(false);
  });

  it("fromNames creates from string array", () => {
    const map = { read: READ, write: WRITE };
    const p = PermissionFlags.fromNames(["read", "write"], map);
    expect(p.has(READ)).toBe(true);
    expect(p.has(WRITE)).toBe(true);
  });
});
