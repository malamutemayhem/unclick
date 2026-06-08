import { describe, it, expect } from "vitest";
import { h, render, diff, patch, flatten, querySelector, querySelectorAll } from "../virtual-dom.js";

describe("VirtualDOM", () => {
  it("creates vnodes with h()", () => {
    const node = h("div", { class: "app" }, h("span", null, "hello"));
    expect(node.tag).toBe("div");
    expect(node.props.class).toBe("app");
    expect(node.children).toHaveLength(1);
  });

  it("renders to HTML", () => {
    const node = h("div", { id: "root" }, h("p", null, "text"));
    expect(render(node)).toBe('<div id="root"><p>text</p></div>');
  });

  it("escapes HTML in text", () => {
    const node = h("p", null, "<script>alert(1)</script>");
    expect(render(node)).toContain("&lt;script&gt;");
  });

  it("renders void elements", () => {
    const node = h("br", null);
    expect(render(node)).toBe("<br />");
  });

  it("diffs identical trees", () => {
    const a = h("div", null, "hello");
    const b = h("div", null, "hello");
    expect(diff(a, b)).toEqual([]);
  });

  it("diffs text changes", () => {
    const a = h("div", null, "hello");
    const b = h("div", null, "world");
    const patches = diff(a, b);
    expect(patches).toHaveLength(1);
    expect(patches[0].type).toBe("UPDATE_TEXT");
  });

  it("diffs tag replacement", () => {
    const a = h("div", null);
    const b = h("span", null);
    const patches = diff(a, b);
    expect(patches).toHaveLength(1);
    expect(patches[0].type).toBe("REPLACE");
  });

  it("diffs prop changes", () => {
    const a = h("div", { class: "old", id: "x" });
    const b = h("div", { class: "new" });
    const patches = diff(a, b);
    expect(patches).toHaveLength(1);
    expect(patches[0].type).toBe("UPDATE_PROPS");
    expect(patches[0].props!.set.class).toBe("new");
    expect(patches[0].props!.remove).toContain("id");
  });

  it("diffs child additions", () => {
    const a = h("div", null, "a");
    const b = h("div", null, "a", "b");
    const patches = diff(a, b);
    expect(patches.some((p) => p.type === "CREATE")).toBe(true);
  });

  it("diffs child removals", () => {
    const a = h("div", null, "a", "b");
    const b = h("div", null, "a");
    const patches = diff(a, b);
    expect(patches.some((p) => p.type === "REMOVE")).toBe(true);
  });

  it("patches a tree", () => {
    const a = h("div", null, "hello");
    const b = h("div", null, "world");
    const patches = diff(a, b);
    const result = patch(a, patches);
    expect(render(result)).toBe(render(b));
  });

  it("flattens node tree", () => {
    const tree = h("div", null, h("p", null, "text"), h("span", null));
    const flat = flatten(tree);
    expect(flat).toHaveLength(4);
  });

  it("querySelector by tag", () => {
    const tree = h("div", null, h("p", null, "text"), h("span", null, "other"));
    const found = querySelector(tree, "span");
    expect(found).not.toBeNull();
    expect(found!.tag).toBe("span");
  });

  it("querySelector by class", () => {
    const tree = h("div", null, h("p", { class: "highlight" }, "text"));
    const found = querySelector(tree, ".highlight");
    expect(found).not.toBeNull();
    expect(found!.tag).toBe("p");
  });

  it("querySelector by id", () => {
    const tree = h("div", null, h("p", { id: "main" }, "text"));
    const found = querySelector(tree, "#main");
    expect(found).not.toBeNull();
  });

  it("querySelectorAll", () => {
    const tree = h("div", null, h("p", null, "a"), h("p", null, "b"));
    const found = querySelectorAll(tree, "p");
    expect(found).toHaveLength(2);
  });
});
