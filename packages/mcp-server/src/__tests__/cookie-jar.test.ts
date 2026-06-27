import { describe, it, expect } from "vitest";
import { CookieJar } from "../cookie-jar.js";

describe("CookieJar", () => {
  it("sets and gets cookies", () => {
    const jar = new CookieJar();
    jar.set({ name: "session", value: "abc123" });
    const c = jar.get("session");
    expect(c).not.toBeNull();
    expect(c!.value).toBe("abc123");
  });

  it("returns null for missing cookie", () => {
    const jar = new CookieJar();
    expect(jar.get("nope")).toBeNull();
  });

  it("removes cookies", () => {
    const jar = new CookieJar();
    jar.set({ name: "token", value: "xyz" });
    expect(jar.remove("token")).toBe(true);
    expect(jar.get("token")).toBeNull();
    expect(jar.remove("token")).toBe(false);
  });

  it("gets cookies for domain", () => {
    const jar = new CookieJar();
    jar.set({ name: "a", value: "1", domain: "example.com" });
    jar.set({ name: "b", value: "2", domain: "other.com" });
    const results = jar.getForDomain("example.com");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("a");
  });

  it("matches subdomain cookies", () => {
    const jar = new CookieJar();
    jar.set({ name: "a", value: "1", domain: "example.com" });
    const results = jar.getForDomain("sub.example.com");
    expect(results).toHaveLength(1);
  });

  it("filters by path and secure flag", () => {
    const jar = new CookieJar();
    jar.set({ name: "a", value: "1", domain: "example.com", path: "/api", secure: true });
    expect(jar.getForUrl("example.com", "/api/data", true)).toHaveLength(1);
    expect(jar.getForUrl("example.com", "/api/data", false)).toHaveLength(0);
    expect(jar.getForUrl("example.com", "/other", true)).toHaveLength(0);
  });

  it("removes expired cookies", () => {
    const jar = new CookieJar();
    jar.set({ name: "old", value: "x", expires: 1000 });
    jar.set({ name: "fresh", value: "y", expires: 9999999999999 });
    const removed = jar.removeExpired(5000);
    expect(removed).toBe(1);
    expect(jar.size()).toBe(1);
  });

  it("builds cookie header string", () => {
    const jar = new CookieJar();
    const cookies = [
      { name: "a", value: "1" },
      { name: "b", value: "2" },
    ];
    expect(jar.toCookieHeader(cookies)).toBe("a=1; b=2");
  });

  it("generates set-cookie headers", () => {
    const jar = new CookieJar();
    jar.set({ name: "token", value: "abc", secure: true, httpOnly: true, path: "/" });
    const headers = jar.toSetCookieHeaders();
    expect(headers).toHaveLength(1);
    expect(headers[0]).toContain("token=abc");
    expect(headers[0]).toContain("Secure");
    expect(headers[0]).toContain("HttpOnly");
  });

  it("clears all cookies", () => {
    const jar = new CookieJar();
    jar.set({ name: "a", value: "1" });
    jar.set({ name: "b", value: "2" });
    jar.clear();
    expect(jar.size()).toBe(0);
  });

  it("lists all cookie names", () => {
    const jar = new CookieJar();
    jar.set({ name: "x", value: "1" });
    jar.set({ name: "y", value: "2" });
    expect(jar.names()).toContain("x");
    expect(jar.names()).toContain("y");
  });

  it("parses cookie header string", () => {
    const result = CookieJar.parse("name=value; session=abc");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: "name", value: "value" });
    expect(result[1]).toEqual({ name: "session", value: "abc" });
  });
});
