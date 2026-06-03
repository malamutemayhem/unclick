import { describe, it, expect } from "vitest";
import { runPreflight, classifyEndpoint, resolveMode } from "./preflight.js";

describe("resolveMode", () => {
  it("is off by default", () => {
    expect(resolveMode({})).toBe("off");
  });
  it("is shadow when enforce is on without an explicit mode", () => {
    expect(resolveMode({ enforce: true })).toBe("shadow");
  });
  it("honors explicit block", () => {
    expect(resolveMode({ mode: "block" })).toBe("block");
  });
});

describe("classifyEndpoint", () => {
  it("classifies SQL execution endpoints", () => {
    const c = classifyEndpoint("neon.execute_sql", { sql: "DROP TABLE users" });
    expect(c?.class).toBe("sql");
    expect(c?.raw).toContain("DROP TABLE");
  });
  it("classifies deploy endpoints as ship", () => {
    expect(classifyEndpoint("vercel.deploy", {})?.class).toBe("ship");
  });
  it("classifies send endpoints", () => {
    expect(classifyEndpoint("email.send", { to: "x" })?.class).toBe("send");
  });
  it("returns null for ordinary reads (not gated)", () => {
    expect(classifyEndpoint("weather.current", { city: "x" })).toBeNull();
  });
});

describe("runPreflight", () => {
  it("proceeds without evaluating when enforcement is off", () => {
    const out = runPreflight("neon.execute_sql", { sql: "DROP TABLE users" });
    expect(out.proceed).toBe(true);
    expect(out.mode).toBe("off");
  });

  it("proceeds for unclassified endpoints even when enforcing", () => {
    const out = runPreflight("weather.current", { city: "x" }, { enforce: true });
    expect(out.proceed).toBe(true);
    expect(out.verdict).toBe("allow");
  });

  it("shadow mode reports a block but still proceeds", () => {
    const out = runPreflight(
      "neon.execute_sql",
      { sql: "DROP TABLE users" },
      { mode: "shadow", environment: "prod" },
    );
    expect(out.proceed).toBe(true);
    expect(out.shadowed).toBe(true);
    expect(["deny", "ask"]).toContain(out.verdict);
  });

  it("block mode stops a destructive SQL action", () => {
    const out = runPreflight(
      "neon.execute_sql",
      { sql: "DROP TABLE users" },
      { mode: "block", environment: "prod" },
    );
    expect(out.proceed).toBe(false);
    expect(["deny", "ask"]).toContain(out.verdict);
    expect(out.gate).toBeDefined();
    expect(out.ruleId).toBeDefined();
  });

  it("block mode allows a safe classified action (scoped select)", () => {
    const out = runPreflight(
      "neon.execute_sql",
      { sql: "SELECT id FROM users WHERE id = 1" },
      { mode: "block", environment: "prod" },
    );
    expect(out.proceed).toBe(true);
  });

  it("never throws on malformed params", () => {
    expect(() =>
      runPreflight("neon.execute_sql", { sql: { not: "a string" } as unknown as string }, { mode: "block" }),
    ).not.toThrow();
  });
});
