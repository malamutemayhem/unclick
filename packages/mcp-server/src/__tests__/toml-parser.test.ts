import { describe, it, expect } from "vitest";
import { parse, stringify } from "../toml-parser.js";

describe("parse", () => {
  it("parses key-value pairs", () => {
    const result = parse('name = "Tom"\nage = 30');
    expect(result.name).toBe("Tom");
    expect(result.age).toBe(30);
  });

  it("parses booleans", () => {
    const result = parse("active = true\ndeleted = false");
    expect(result.active).toBe(true);
    expect(result.deleted).toBe(false);
  });

  it("parses tables", () => {
    const result = parse('[server]\nhost = "localhost"\nport = 8080');
    const server = result.server as Record<string, unknown>;
    expect(server.host).toBe("localhost");
    expect(server.port).toBe(8080);
  });

  it("parses nested tables", () => {
    const result = parse("[a.b]\nvalue = 1");
    const a = result.a as Record<string, unknown>;
    const b = a.b as Record<string, unknown>;
    expect(b.value).toBe(1);
  });

  it("parses arrays", () => {
    const result = parse("ports = [80, 443, 8080]");
    expect(result.ports).toEqual([80, 443, 8080]);
  });

  it("parses floats", () => {
    const result = parse("pi = 3.14");
    expect(result.pi).toBeCloseTo(3.14);
  });

  it("ignores comments", () => {
    const result = parse("# this is a comment\nkey = 1");
    expect(result.key).toBe(1);
  });

  it("handles string escapes", () => {
    const result = parse('msg = "hello\\nworld"');
    expect(result.msg).toBe("hello\nworld");
  });
});

describe("stringify", () => {
  it("serializes simple values", () => {
    const str = stringify({ name: "test", count: 42, active: true });
    expect(str).toContain('name = "test"');
    expect(str).toContain("count = 42");
    expect(str).toContain("active = true");
  });

  it("serializes nested tables", () => {
    const str = stringify({ server: { port: 8080 } });
    expect(str).toContain("[server]");
    expect(str).toContain("port = 8080");
  });
});
