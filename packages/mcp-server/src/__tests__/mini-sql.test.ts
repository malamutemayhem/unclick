import { describe, it, expect } from "vitest";
import { QueryBuilder, InsertBuilder, UpdateBuilder } from "../mini-sql.js";

describe("MiniSQL", () => {
  it("builds simple select", () => {
    const { sql } = QueryBuilder.select("*").from("users").build();
    expect(sql).toBe("SELECT * FROM users");
  });

  it("builds select with columns", () => {
    const { sql } = QueryBuilder.select("name", "age").from("users").build();
    expect(sql).toBe("SELECT name, age FROM users");
  });

  it("builds where clause", () => {
    const { sql, params } = QueryBuilder.select("*")
      .from("users")
      .whereEq("age", 25)
      .build();
    expect(sql).toBe("SELECT * FROM users WHERE age = $1");
    expect(params).toEqual([25]);
  });

  it("builds multiple where clauses", () => {
    const { sql, params } = QueryBuilder.select("*")
      .from("users")
      .whereEq("active", true)
      .where("age", ">", 18)
      .build();
    expect(sql).toContain("AND");
    expect(params).toEqual([true, 18]);
  });

  it("builds where IN", () => {
    const { sql, params } = QueryBuilder.select("*")
      .from("users")
      .whereIn("id", [1, 2, 3])
      .build();
    expect(sql).toContain("IN ($1, $2, $3)");
    expect(params).toEqual([1, 2, 3]);
  });

  it("builds where IS NULL", () => {
    const { sql } = QueryBuilder.select("*")
      .from("users")
      .whereNull("deleted_at")
      .build();
    expect(sql).toContain("IS NULL");
  });

  it("builds ORDER BY", () => {
    const { sql } = QueryBuilder.select("*")
      .from("users")
      .orderBy("name", "ASC")
      .orderBy("age", "DESC")
      .build();
    expect(sql).toContain("ORDER BY name ASC, age DESC");
  });

  it("builds LIMIT and OFFSET", () => {
    const { sql } = QueryBuilder.select("*")
      .from("users")
      .limit(10)
      .offset(20)
      .build();
    expect(sql).toContain("LIMIT 10");
    expect(sql).toContain("OFFSET 20");
  });

  it("builds GROUP BY", () => {
    const { sql } = QueryBuilder.select("department")
      .from("employees")
      .groupBy("department")
      .build();
    expect(sql).toContain("GROUP BY department");
  });

  it("builds JOIN", () => {
    const { sql } = QueryBuilder.select("*")
      .from("orders")
      .join("users", "orders.user_id = users.id")
      .build();
    expect(sql).toContain("JOIN users ON orders.user_id = users.id");
  });

  it("builds LEFT JOIN", () => {
    const { sql } = QueryBuilder.select("*")
      .from("orders")
      .leftJoin("users", "orders.user_id = users.id")
      .build();
    expect(sql).toContain("LEFT JOIN users");
  });

  it("builds DISTINCT", () => {
    const { sql } = QueryBuilder.select("name")
      .from("users")
      .distinct()
      .build();
    expect(sql).toContain("DISTINCT");
  });

  it("builds aggregate functions", () => {
    const qb = QueryBuilder.select("department").from("employees").groupBy("department");
    qb.count("*", "total");
    const { sql } = qb.build();
    expect(sql).toContain("COUNT(*)");
  });

  it("toString returns SQL", () => {
    const sql = QueryBuilder.select("*").from("users").toString();
    expect(sql).toBe("SELECT * FROM users");
  });

  it("builds INSERT", () => {
    const { sql, params } = InsertBuilder.into("users")
      .values({ name: "Alice", age: 30 })
      .build();
    expect(sql).toContain("INSERT INTO users");
    expect(sql).toContain("$1, $2");
    expect(params).toEqual(["Alice", 30]);
  });

  it("builds batch INSERT", () => {
    const { sql, params } = InsertBuilder.into("users")
      .values({ name: "Alice", age: 30 })
      .values({ name: "Bob", age: 25 })
      .build();
    expect(sql).toContain("$3, $4");
    expect(params).toHaveLength(4);
  });

  it("builds UPDATE", () => {
    const { sql, params } = UpdateBuilder.table("users")
      .set("name", "Bob")
      .where("id", "=", 1)
      .build();
    expect(sql).toContain("UPDATE users SET name = $1 WHERE id = $2");
    expect(params).toEqual(["Bob", 1]);
  });
});
