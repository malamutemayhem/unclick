import { describe, it, expect } from "vitest";
import { schema, SchemaBuilder } from "../schema-builder.js";

describe("SchemaBuilder", () => {
  it("builds basic object schema", () => {
    const s = schema()
      .string("name").required()
    const built = new SchemaBuilder();
    built.string("name").required();
    built.number("age");
    const result = built.build();
    expect(result.type).toBe("object");
    expect(result.properties?.name.type).toBe("string");
    expect(result.properties?.age.type).toBe("number");
    expect(result.required).toContain("name");
  });

  it("string constraints", () => {
    const b = new SchemaBuilder();
    b.string("email").min(5).max(100).pattern("@");
    const result = b.build();
    expect(result.properties?.email.minLength).toBe(5);
    expect(result.properties?.email.maxLength).toBe(100);
    expect(result.properties?.email.pattern).toBe("@");
  });

  it("number constraints", () => {
    const b = new SchemaBuilder();
    b.number("age").min(0).max(150);
    const result = b.build();
    expect(result.properties?.age.minimum).toBe(0);
    expect(result.properties?.age.maximum).toBe(150);
  });

  it("enum values", () => {
    const b = new SchemaBuilder();
    b.string("status").enum(["active", "inactive"]);
    const result = b.build();
    expect(result.properties?.status.enum).toEqual(["active", "inactive"]);
  });

  it("default values", () => {
    const b = new SchemaBuilder();
    b.boolean("active").default(true);
    const result = b.build();
    expect(result.properties?.active.default).toBe(true);
  });

  it("description", () => {
    const b = new SchemaBuilder();
    b.description("User schema");
    b.string("name").description("Full name");
    const result = b.build();
    expect(result.description).toBe("User schema");
    expect(result.properties?.name.description).toBe("Full name");
  });

  it("toJSON outputs string", () => {
    const b = new SchemaBuilder();
    b.string("x");
    const json = b.toJSON();
    expect(JSON.parse(json).type).toBe("object");
  });

  it("array with items", () => {
    const b = new SchemaBuilder();
    const items = new SchemaBuilder();
    b.array("tags");
    const result = b.build();
    expect(result.properties?.tags.type).toBe("array");
  });
});
