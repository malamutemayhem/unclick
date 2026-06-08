import { describe, it, expect } from "vitest";
import { OpenApiGenerator } from "../openapi-gen.js";
import type { OpenApiPath } from "../openapi-gen.js";

describe("OpenApiGenerator", () => {
  const samplePath: OpenApiPath = {
    method: "GET",
    path: "/users",
    summary: "List users",
    description: "Returns all users",
    parameters: [
      { name: "limit", in: "query", required: false, schema: { type: "integer" } },
    ],
    responses: {
      "200": { description: "Success", schema: { type: "array" } },
    },
    tags: ["Users"],
  };

  it("generates valid OpenAPI 3.0.3 structure", () => {
    const gen = new OpenApiGenerator("Test API", "1.0.0", "A test");
    gen.addPath(samplePath);
    const spec = gen.generate();
    expect(spec.openapi).toBe("3.0.3");
    expect((spec.info as any).title).toBe("Test API");
    expect((spec.info as any).version).toBe("1.0.0");
  });

  it("adds paths correctly", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    const spec = gen.generate();
    const paths = spec.paths as any;
    expect(paths["/users"]).toBeDefined();
    expect(paths["/users"].get).toBeDefined();
    expect(paths["/users"].get.summary).toBe("List users");
  });

  it("includes parameters in output", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    const spec = gen.generate();
    const op = (spec.paths as any)["/users"].get;
    expect(op.parameters).toHaveLength(1);
    expect(op.parameters[0].name).toBe("limit");
  });

  it("handles request body", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath({
      method: "POST",
      path: "/users",
      responses: { "201": { description: "Created" } },
      requestBody: {
        contentType: "application/json",
        schema: { type: "object" },
      },
    });
    const spec = gen.generate();
    const op = (spec.paths as any)["/users"].post;
    expect(op.requestBody.content["application/json"]).toBeDefined();
  });

  it("removes paths", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    expect(gen.removePath("GET", "/users")).toBe(true);
    expect(gen.pathCount()).toBe(0);
  });

  it("returns false removing nonexistent path", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    expect(gen.removePath("GET", "/nope")).toBe(false);
  });

  it("tracks tags", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    gen.addPath({
      method: "GET",
      path: "/items",
      responses: { "200": { description: "OK" } },
      tags: ["Items"],
    });
    expect(gen.tagList()).toContain("Users");
    expect(gen.tagList()).toContain("Items");
  });

  it("filters paths by tag", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    gen.addPath({
      method: "GET",
      path: "/items",
      responses: { "200": { description: "OK" } },
      tags: ["Items"],
    });
    const userPaths = gen.getPathsByTag("Users");
    expect(userPaths).toHaveLength(1);
    expect(userPaths[0].path).toBe("/users");
  });

  it("lists endpoints", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    const endpoints = gen.endpointList();
    expect(endpoints).toEqual([{ method: "GET", path: "/users" }]);
  });

  it("counts paths", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    expect(gen.pathCount()).toBe(0);
    gen.addPath(samplePath);
    expect(gen.pathCount()).toBe(1);
  });

  it("generates tags array in spec", () => {
    const gen = new OpenApiGenerator("API", "1.0.0");
    gen.addPath(samplePath);
    const spec = gen.generate();
    const tags = spec.tags as any[];
    expect(tags).toContainEqual({ name: "Users" });
  });
});
