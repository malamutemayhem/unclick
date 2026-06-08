import { describe, it, expect } from "vitest";
import { UriTemplate } from "../uri-template.js";

describe("UriTemplate", () => {
  it("expands simple variables", () => {
    const result = UriTemplate.expand("/users/{id}", { id: "42" });
    expect(result).toBe("/users/42");
  });

  it("expands multiple variables", () => {
    const result = UriTemplate.expand("/users/{id}/posts/{postId}", { id: "1", postId: "99" });
    expect(result).toBe("/users/1/posts/99");
  });

  it("expands with + operator (reserved)", () => {
    const tmpl = new UriTemplate("{+path}/here");
    expect(tmpl.expand({ path: "/foo/bar" })).toBe("/foo/bar/here");
  });

  it("expands with # operator (fragment)", () => {
    const result = UriTemplate.expand("page{#section}", { section: "intro" });
    expect(result).toBe("page#intro");
  });

  it("expands with ? operator (query)", () => {
    const result = UriTemplate.expand("/search{?q,page}", { q: "test", page: 1 });
    expect(result).toBe("/search?q=test&page=1");
  });

  it("omits undefined variables", () => {
    const result = UriTemplate.expand("/items{?sort,filter}", { sort: "name" });
    expect(result).toBe("/items?sort=name");
  });

  it("getVariableNames returns all names", () => {
    const tmpl = new UriTemplate("/api/{version}/users/{id}{?fields}");
    expect(tmpl.getVariableNames()).toEqual(["version", "id", "fields"]);
  });

  it("toString returns original template", () => {
    const tmpl = new UriTemplate("/api/{id}");
    expect(tmpl.toString()).toBe("/api/{id}");
  });

  it("encodes special characters", () => {
    const result = UriTemplate.expand("/search/{q}", { q: "hello world" });
    expect(result).toBe("/search/hello%20world");
  });
});
