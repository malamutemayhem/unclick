import { describe, it, expect } from "vitest";
import { createLeaf, createBranch, predict, depth, nodeCount, leafCount, getPath, collectLeaves } from "../decision-tree.js";

describe("createLeaf / createBranch", () => {
  it("creates a leaf", () => {
    const leaf = createLeaf("yes");
    expect(leaf.type).toBe("leaf");
    if (leaf.type === "leaf") expect(leaf.value).toBe("yes");
  });

  it("creates a branch", () => {
    const tree = createBranch("age", 30, createLeaf("young"), createLeaf("old"));
    expect(tree.type).toBe("branch");
  });
});

describe("predict", () => {
  const tree = createBranch(
    "temp",
    20,
    createLeaf("cold"),
    createBranch("humidity", 60, createLeaf("nice"), createLeaf("muggy")),
  );

  it("follows left when <= threshold", () => {
    expect(predict(tree, { temp: 15 })).toBe("cold");
  });

  it("follows right when > threshold", () => {
    expect(predict(tree, { temp: 25, humidity: 50 })).toBe("nice");
  });

  it("follows nested right branch", () => {
    expect(predict(tree, { temp: 25, humidity: 80 })).toBe("muggy");
  });

  it("defaults missing feature to 0", () => {
    expect(predict(tree, {})).toBe("cold");
  });

  it("handles single leaf tree", () => {
    expect(predict(createLeaf(42), {})).toBe(42);
  });
});

describe("depth", () => {
  it("leaf has depth 0", () => {
    expect(depth(createLeaf("x"))).toBe(0);
  });

  it("single branch has depth 1", () => {
    expect(depth(createBranch("a", 1, createLeaf("l"), createLeaf("r")))).toBe(1);
  });

  it("nested tree has correct depth", () => {
    const tree = createBranch("a", 1, createLeaf("l"), createBranch("b", 2, createLeaf("ll"), createLeaf("rr")));
    expect(depth(tree)).toBe(2);
  });
});

describe("nodeCount", () => {
  it("leaf is 1 node", () => {
    expect(nodeCount(createLeaf("x"))).toBe(1);
  });

  it("branch with two leaves is 3 nodes", () => {
    expect(nodeCount(createBranch("a", 1, createLeaf("l"), createLeaf("r")))).toBe(3);
  });
});

describe("leafCount", () => {
  it("leaf is 1", () => {
    expect(leafCount(createLeaf("x"))).toBe(1);
  });

  it("counts only leaves", () => {
    const tree = createBranch("a", 1, createLeaf("l"), createBranch("b", 2, createLeaf("ll"), createLeaf("rr")));
    expect(leafCount(tree)).toBe(3);
  });
});

describe("getPath", () => {
  it("returns decision path", () => {
    const tree = createBranch("score", 50, createLeaf("fail"), createLeaf("pass"));
    const path = getPath(tree, { score: 70 });
    expect(path[0]).toContain("(no)");
    expect(path[1]).toBe("pass");
  });

  it("uses label when available", () => {
    const tree = createBranch("x", 5, createLeaf("left", "LEFT"), createLeaf("right", "RIGHT"), "check x");
    const path = getPath(tree, { x: 10 });
    expect(path[0]).toContain("check x");
    expect(path[1]).toBe("RIGHT");
  });
});

describe("collectLeaves", () => {
  it("collects all leaf values", () => {
    const tree = createBranch("a", 1, createLeaf("x"), createBranch("b", 2, createLeaf("y"), createLeaf("z")));
    expect(collectLeaves(tree)).toEqual(["x", "y", "z"]);
  });

  it("single leaf returns array of one", () => {
    expect(collectLeaves(createLeaf(42))).toEqual([42]);
  });
});
