import { describe, expect, it } from "vitest";
import { dataGate } from "./data-gate";
import type { ActionDescriptor, Environment, GateContext } from "../types.js";

type CtxOpts = {
  env?: Environment;
  targetEnv?: Environment;
  cls?: ActionDescriptor["class"];
  autonomy?: GateContext["autonomyLevel"];
};

// Default environment is prod so the headline destructive cases are judged
// strictly; individual tests override env to exercise the environment axis.
function ctx(raw: string, opts: CtxOpts = {}): GateContext {
  const action: ActionDescriptor = {
    class: opts.cls ?? "sql",
    raw,
    tool: "neon_execute_sql",
  };
  if (opts.targetEnv) action.targetEnv = opts.targetEnv;
  return {
    action,
    environment: opts.env ?? "prod",
    autonomyLevel: opts.autonomy ?? "interactive",
    now: 1_700_000_000_000,
  };
}

const VERDICTS = ["allow", "deny", "ask", "rewrite"];

describe("dataGate - required headline cases", () => {
  it("blocks DROP TABLE", () => {
    const r = dataGate(ctx("DROP TABLE users;"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_drop");
    expect(r.gate).toBe("DataGate");
  });

  it("blocks DELETE FROM users with no WHERE", () => {
    const r = dataGate(ctx("DELETE FROM users"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("blocks COMMIT; DROP SCHEMA public CASCADE; (stacked-query bypass) even in dev", () => {
    const r = dataGate(ctx("COMMIT; DROP SCHEMA public CASCADE;", { env: "dev" }));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.multi_statement");
  });

  it("allows a plain SELECT", () => {
    const r = dataGate(ctx("SELECT id, email FROM users WHERE active = true LIMIT 10"));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.read");
  });

  it("allows UPDATE ... WHERE id = 1", () => {
    const r = dataGate(ctx("UPDATE users SET active = false WHERE id = 1"));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.scoped_dml");
  });
});

describe("dataGate - environment axis", () => {
  it("asks (not denies) on DROP in dev", () => {
    const r = dataGate(ctx("DROP TABLE staging_scratch", { env: "dev" }));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.ddl_drop");
  });

  it("denies DROP when the session is dev but the action targets prod", () => {
    const r = dataGate(ctx("DROP TABLE users", { env: "dev", targetEnv: "prod" }));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_drop");
  });

  it("does not let a dev targetEnv relax a prod session", () => {
    const r = dataGate(ctx("DROP TABLE users", { env: "prod", targetEnv: "dev" }));
    expect(r.verdict).toBe("deny");
  });

  it("denies TRUNCATE in prod", () => {
    const r = dataGate(ctx("TRUNCATE TABLE sessions"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_truncate");
  });

  it("denies ALTER ... DROP COLUMN in prod", () => {
    const r = dataGate(ctx("ALTER TABLE users DROP COLUMN email"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_alter_drop");
  });

  it("unscoped DELETE is denied even in dev", () => {
    const r = dataGate(ctx("DELETE FROM users", { env: "dev" }));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("treats additive schema change as allow in dev, ask in prod", () => {
    const dev = dataGate(ctx("CREATE TABLE widgets (id int)", { env: "dev" }));
    expect(dev.verdict).toBe("allow");
    expect(dev.ruleId).toBe("sql.ddl_other");

    const prod = dataGate(ctx("CREATE TABLE widgets (id int)", { env: "prod" }));
    expect(prod.verdict).toBe("ask");
    expect(prod.ruleId).toBe("sql.ddl_other");
  });
});

describe("dataGate - parses, does not regex", () => {
  it("denies an UPDATE with no top-level WHERE", () => {
    const r = dataGate(ctx("UPDATE users SET active = false"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("does not count a WHERE that only appears inside a subquery", () => {
    const r = dataGate(
      ctx("UPDATE users SET rank = (SELECT max(id) FROM scores WHERE scores.k = 1)"),
    );
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("does not count a WHERE that only appears inside a string literal", () => {
    const r = dataGate(ctx("UPDATE accounts SET note = 'reset where clause now'"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("does not split on a semicolon inside a string literal", () => {
    const r = dataGate(ctx("INSERT INTO logs (msg) VALUES ('done; then cleanup')"));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.insert");
  });

  it("does not split on a semicolon inside a WHERE string", () => {
    const r = dataGate(ctx("DELETE FROM logs WHERE msg = 'a;b;c'"));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.scoped_dml");
  });

  it("strips a block comment hiding the DROP keyword", () => {
    const r = dataGate(ctx("DROP/*sneaky*/TABLE users"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_drop");
  });

  it("strips a leading line comment", () => {
    const r = dataGate(ctx("-- nightly cleanup\nDROP TABLE users"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_drop");
  });

  it("sees the real verb behind a CTE: unscoped DELETE is denied", () => {
    const r = dataGate(ctx("WITH recent AS (SELECT 1) DELETE FROM users"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("sees the real verb behind a CTE: scoped DELETE is allowed", () => {
    const r = dataGate(ctx("WITH recent AS (SELECT 1) DELETE FROM users WHERE id = 1"));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.scoped_dml");
  });

  it("unwraps EXPLAIN ANALYZE (which executes) to the inner verb", () => {
    const r = dataGate(ctx("EXPLAIN ANALYZE DELETE FROM users"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.unscoped_dml");
  });

  it("treats a plain EXPLAIN (no ANALYZE) as a read", () => {
    const r = dataGate(ctx("EXPLAIN DELETE FROM users WHERE id = 1"));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.read");
  });

  it("does not see a DROP hidden inside a dollar-quoted body, and asks on DO", () => {
    const r = dataGate(ctx("DO $$ BEGIN DROP TABLE users; END $$;"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.review");
  });
});

describe("dataGate - multi-statement handling", () => {
  it("allows multiple read-only statements", () => {
    const r = dataGate(ctx("SELECT 1; SELECT 2"));
    expect(r.verdict).toBe("allow");
  });

  it("allows a transaction-wrapped scoped update", () => {
    const r = dataGate(ctx("BEGIN; UPDATE users SET a = 1 WHERE id = 2; COMMIT;"));
    expect(r.verdict).toBe("allow");
  });

  it("denies a stacked statement carrying an unscoped DELETE", () => {
    const r = dataGate(ctx("SELECT 1; DELETE FROM users"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.multi_statement");
  });

  it("does not treat trailing empty separators as extra statements", () => {
    const r = dataGate(ctx("DROP TABLE users; ; ;"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.ddl_drop");
  });
});

describe("dataGate - fail closed on doubt", () => {
  it("asks on an unterminated string literal", () => {
    const r = dataGate(ctx("SELECT * FROM users WHERE name = 'oops"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.unparseable");
  });

  it("asks on an unterminated block comment", () => {
    const r = dataGate(ctx("SELECT 1 /* not closed"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.unparseable");
  });

  it("asks on unbalanced parentheses", () => {
    const r = dataGate(ctx("SELECT (1, 2"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.unparseable");
  });

  it("asks on empty SQL", () => {
    const r = dataGate(ctx("   "));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.unparseable");
  });

  it("asks on comment-only input", () => {
    const r = dataGate(ctx("-- just a note, nothing to run"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.unparseable");
  });

  it("asks on GRANT/REVOKE privilege changes", () => {
    const r = dataGate(ctx("GRANT ALL ON users TO public"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.privilege");
  });

  it("asks on an unrecognised command", () => {
    const r = dataGate(ctx("FROBNICATE the_table"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("sql.unknown_command");
  });
});

describe("dataGate - abstains on non-SQL actions", () => {
  it("allows (abstains) when the action class is not sql", () => {
    const r = dataGate(ctx("DROP TABLE users", { cls: "shell" }));
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("sql.not_applicable");
  });
});

describe("dataGate - purity and safety", () => {
  it("never throws and always returns a valid verdict on adversarial input", () => {
    const inputs = [
      "",
      "   ",
      ";;;",
      ")(",
      "'",
      '"',
      "/*",
      "$$",
      "$tag$ unterminated",
      "SELECT",
      "DROP;;;",
      "((((",
      ")))",
      "\u{1F525}\u{1F525}\u{1F525}",
      "x".repeat(5000),
      "SELECT 1;".repeat(500),
    ];
    for (const input of inputs) {
      expect(() => dataGate(ctx(input))).not.toThrow();
      const r = dataGate(ctx(input));
      expect(VERDICTS).toContain(r.verdict);
      expect(r.gate).toBe("DataGate");
      expect(typeof r.ruleId).toBe("string");
      expect(Array.isArray(r.evidence)).toBe(true);
    }
  });

  it("never throws on a malformed context", () => {
    expect(() => dataGate({} as unknown as GateContext)).not.toThrow();
    expect(() => dataGate(undefined as unknown as GateContext)).not.toThrow();
    const r = dataGate({} as unknown as GateContext);
    expect(VERDICTS).toContain(r.verdict);
  });

  it("is deterministic for the same input", () => {
    const a = dataGate(ctx("DROP TABLE users"));
    const b = dataGate(ctx("DROP TABLE users"));
    expect(a).toEqual(b);
  });
});

describe("dataGate - never leaks secrets in evidence", () => {
  it("masks a credential carried in a destructive multi-statement", () => {
    const secret = "ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const r = dataGate(
      ctx(`INSERT INTO creds (k) VALUES ('${secret}'); DROP TABLE creds;`),
    );
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("sql.multi_statement");
    const joined = r.evidence.join(" | ");
    expect(joined).not.toContain(secret);
  });

  it("redacts a credential left in an unparseable snippet", () => {
    const r = dataGate(ctx("SELECT * FROM t WHERE k = 'AKIAIOSFODNN7EXAMPLEKEY"));
    expect(r.verdict).toBe("ask");
    const joined = r.evidence.join(" | ");
    expect(joined).not.toContain("AKIAIOSFODNN7EXAMPLEKEY");
  });

  it("masks string and dollar-quote bodies in scoped-DML evidence", () => {
    const r = dataGate(ctx("DELETE FROM logs WHERE token = 'sk-supersecretvalue1234567890'"));
    const joined = r.evidence.join(" | ");
    expect(joined).not.toContain("sk-supersecretvalue1234567890");
    expect(joined).toContain("'?'");
  });
});
