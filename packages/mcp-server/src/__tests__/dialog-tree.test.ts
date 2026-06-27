import { describe, it, expect } from "vitest";
import { DialogTree } from "../dialog-tree.js";

describe("DialogTree", () => {
  function buildTree(): DialogTree {
    const tree = new DialogTree();
    tree.addNode({
      id: "start",
      speaker: "NPC",
      text: "Hello traveler!",
      choices: [
        { text: "Hi!", nextNodeId: "greet" },
        { text: "Goodbye", nextNodeId: "bye" },
      ],
    });
    tree.addNode({
      id: "greet",
      speaker: "NPC",
      text: "Nice to meet you.",
      choices: [{ text: "Tell me more", nextNodeId: "info" }],
    });
    tree.addNode({
      id: "bye",
      speaker: "NPC",
      text: "Farewell!",
      choices: [],
    });
    tree.addNode({
      id: "info",
      speaker: "NPC",
      text: "Here is some info.",
      choices: [],
    });
    return tree;
  }

  it("adds nodes and tracks count", () => {
    const tree = buildTree();
    expect(tree.nodeCount()).toBe(4);
  });

  it("starts at first node", () => {
    const tree = buildTree();
    const node = tree.start();
    expect(node!.id).toBe("start");
    expect(node!.speaker).toBe("NPC");
  });

  it("navigates via choices", () => {
    const tree = buildTree();
    tree.start();
    const next = tree.choose(0);
    expect(next!.id).toBe("greet");
  });

  it("tracks history", () => {
    const tree = buildTree();
    tree.start();
    tree.choose(1);
    expect(tree.getHistory()).toEqual(["start", "bye"]);
  });

  it("detects terminal nodes", () => {
    const tree = buildTree();
    expect(tree.isTerminal("bye")).toBe(true);
    expect(tree.isTerminal("start")).toBe(false);
  });

  it("goTo navigates directly", () => {
    const tree = buildTree();
    tree.start();
    const node = tree.goTo("info");
    expect(node!.id).toBe("info");
  });

  it("manages variables", () => {
    const tree = buildTree();
    tree.setVariable("quest", "active");
    expect(tree.getVariable("quest")).toBe("active");
  });

  it("removes nodes", () => {
    const tree = buildTree();
    expect(tree.removeNode("bye")).toBe(true);
    expect(tree.nodeCount()).toBe(3);
  });

  it("validates references", () => {
    const tree = new DialogTree();
    tree.addNode({
      id: "a",
      speaker: "X",
      text: "Hello",
      choices: [{ text: "go", nextNodeId: "nonexistent" }],
    });
    const errors = tree.validate();
    expect(errors.length).toBe(1);
  });

  it("finds all paths", () => {
    const tree = buildTree();
    const paths = tree.allPaths();
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it("gets node by id", () => {
    const tree = buildTree();
    const node = tree.getNode("greet");
    expect(node!.text).toBe("Nice to meet you.");
  });

  it("returns null for nonexistent node navigation", () => {
    const tree = buildTree();
    tree.start();
    const node = tree.goTo("doesnotexist");
    expect(node).toBeNull();
  });
});
