import { describe, it, expect } from "vitest";
import { query } from "../query-builder.js";

describe("QueryBuilder", () => {
  it("builds simple select", () => {
    expect(query().from("users").build()).toBe("SELECT * FROM users");
  });

  it("builds with columns", () => {
    expect(query().select("id", "name").from("users").build()).toBe("SELECT id, name FROM users");
  });

  it("builds with where", () => {
    const sql = query().from("users").where("age > 18").build();
    expect(sql).toBe("SELECT * FROM users WHERE age > 18");
  });

  it("builds with multiple where (AND)", () => {
    const sql = query().from("users").where("age > 18").andWhere("active = true").build();
    expect(sql).toBe("SELECT * FROM users WHERE age > 18 AND active = true");
  });

  it("builds with order, limit, offset", () => {
    const sql = query().from("users").orderBy("name").limit(10).offset(20).build();
    expect(sql).toBe("SELECT * FROM users ORDER BY name ASC LIMIT 10 OFFSET 20");
  });

  it("builds with join", () => {
    const sql = query().from("orders").join("users", "orders.user_id = users.id").select("orders.*").build();
    expect(sql).toContain("JOIN users ON orders.user_id = users.id");
  });

  it("builds with group by and having", () => {
    const sql = query().from("orders").select("user_id", "COUNT(*) as cnt").groupBy("user_id").having("cnt > 5").build();
    expect(sql).toContain("GROUP BY user_id");
    expect(sql).toContain("HAVING cnt > 5");
  });

  it("clone creates independent copy", () => {
    const base = query().from("users").where("active = true");
    const q1 = base.clone().limit(10);
    const q2 = base.clone().limit(20);
    expect(q1.build()).toContain("LIMIT 10");
    expect(q2.build()).toContain("LIMIT 20");
  });
});
