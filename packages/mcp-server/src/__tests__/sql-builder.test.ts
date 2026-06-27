import { describe, it, expect } from "vitest";
import { SqlBuilder } from "../sql-builder.js";

describe("SqlBuilder", () => {
  it("builds simple select", () => {
    const q = new SqlBuilder().select("id", "name").from("users").build();
    expect(q.sql).toBe("SELECT id, name FROM users");
    expect(q.params).toEqual([]);
  });

  it("defaults to SELECT *", () => {
    const q = new SqlBuilder().from("items").build();
    expect(q.sql).toBe("SELECT * FROM items");
  });

  it("adds where with params", () => {
    const q = new SqlBuilder().from("users").where("age > $1", 18).build();
    expect(q.sql).toContain("WHERE age > $1");
    expect(q.params).toEqual([18]);
  });

  it("chains multiple where with AND", () => {
    const q = new SqlBuilder()
      .from("users")
      .where("age > $1", 18)
      .andWhere("active = $2", true)
      .build();
    expect(q.sql).toContain("WHERE age > $1 AND active = $2");
    expect(q.params).toEqual([18, true]);
  });

  it("handles orWhere", () => {
    const q = new SqlBuilder()
      .from("users")
      .where("role = $1", "admin")
      .orWhere("role = $2", "superadmin")
      .build();
    expect(q.sql).toContain("(role = $1 OR role = $2)");
    expect(q.params).toEqual(["admin", "superadmin"]);
  });

  it("adds joins", () => {
    const q = new SqlBuilder()
      .select("u.name", "o.total")
      .from("users u")
      .join("orders o", "u.id = o.user_id", "LEFT")
      .build();
    expect(q.sql).toContain("LEFT JOIN orders o ON u.id = o.user_id");
  });

  it("adds group by and having", () => {
    const q = new SqlBuilder()
      .select("category", "COUNT(*)")
      .from("products")
      .groupBy("category")
      .having("COUNT(*) > 5")
      .build();
    expect(q.sql).toContain("GROUP BY category");
    expect(q.sql).toContain("HAVING COUNT(*) > 5");
  });

  it("adds order by", () => {
    const q = new SqlBuilder()
      .from("users")
      .orderBy("name", "ASC")
      .orderBy("age", "DESC")
      .build();
    expect(q.sql).toContain("ORDER BY name ASC, age DESC");
  });

  it("adds limit and offset", () => {
    const q = new SqlBuilder().from("users").limit(10).offset(20).build();
    expect(q.sql).toContain("LIMIT 10");
    expect(q.sql).toContain("OFFSET 20");
  });

  it("toSQL returns just the sql string", () => {
    const b = new SqlBuilder().select("id").from("users");
    expect(b.toSQL()).toBe("SELECT id FROM users");
  });

  it("static insert builds correct SQL", () => {
    const r = SqlBuilder.insert("users", { name: "Alice", age: 30 });
    expect(r.sql).toBe("INSERT INTO users (name, age) VALUES ($1, $2)");
    expect(r.params).toEqual(["Alice", 30]);
  });

  it("static update builds correct SQL", () => {
    const r = SqlBuilder.update("users", { name: "Bob" }, "id = $2", [1]);
    expect(r.sql).toBe("UPDATE users SET name = $1 WHERE id = $2");
    expect(r.params).toEqual(["Bob", 1]);
  });

  it("static deleteFrom builds correct SQL", () => {
    const r = SqlBuilder.deleteFrom("users", "id = $1", [5]);
    expect(r.sql).toBe("DELETE FROM users WHERE id = $1");
    expect(r.params).toEqual([5]);
  });
});
