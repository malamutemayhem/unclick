import { describe, it, expect } from "vitest";
import { GraphQLBuilder } from "../graphql-builder.js";

describe("GraphQLBuilder", () => {
  it("builds a simple query", () => {
    const q = GraphQLBuilder.query("GetUsers").field("id").field("name").build();
    expect(q).toContain("query GetUsers");
    expect(q).toContain("id");
    expect(q).toContain("name");
  });

  it("builds a mutation", () => {
    const q = GraphQLBuilder.mutation("CreateUser")
      .variable("input", "CreateUserInput!")
      .fieldWithArgs("createUser", { input: "$input" }, [{ name: "id" }, { name: "name" }])
      .build();
    expect(q).toContain("mutation CreateUser($input: CreateUserInput!)");
    expect(q).toContain("createUser(input: $input)");
  });

  it("builds a subscription", () => {
    const q = GraphQLBuilder.subscription("OnMessage")
      .field("messageAdded", [{ name: "id" }, { name: "text" }])
      .build();
    expect(q).toContain("subscription OnMessage");
    expect(q).toContain("messageAdded");
  });

  it("handles nested fields", () => {
    const q = GraphQLBuilder.query()
      .field("users", [
        { name: "id" },
        { name: "profile", children: [{ name: "avatar" }, { name: "bio" }] },
      ])
      .build();
    expect(q).toContain("users {");
    expect(q).toContain("profile {");
    expect(q).toContain("avatar");
    expect(q).toContain("bio");
  });

  it("formats string arguments with quotes", () => {
    const q = GraphQLBuilder.query()
      .fieldWithArgs("user", { name: "Alice" })
      .build();
    expect(q).toContain('name: "Alice"');
  });

  it("formats number and boolean arguments", () => {
    const q = GraphQLBuilder.query()
      .fieldWithArgs("items", { limit: 10, active: true })
      .build();
    expect(q).toContain("limit: 10");
    expect(q).toContain("active: true");
  });

  it("handles aliased fields", () => {
    const q = GraphQLBuilder.query()
      .aliasedField("admin", "user", { role: "ADMIN" })
      .build();
    expect(q).toContain("admin: user");
  });

  it("handles variables", () => {
    const q = GraphQLBuilder.query("Search")
      .variable("term", "String!")
      .variable("limit", "Int")
      .build();
    expect(q).toContain("$term: String!");
    expect(q).toContain("$limit: Int");
  });

  it("reports field count", () => {
    const b = GraphQLBuilder.query().field("id").field("name").field("email");
    expect(b.fieldCount()).toBe(3);
  });

  it("reports operation type and name", () => {
    const b = GraphQLBuilder.mutation("DoThing");
    expect(b.getOperationType()).toBe("mutation");
    expect(b.getOperationName()).toBe("DoThing");
  });

  it("returns variables map", () => {
    const b = GraphQLBuilder.query().variable("id", "ID!");
    expect(b.getVariables()).toEqual({ id: "ID!" });
  });
});
