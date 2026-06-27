import { describe, it, expect } from "vitest";
import { DialogueTree } from "../dialogue-tree.js";

describe("DialogueTree", () => {
  const makeTree = () => {
    const tree = new DialogueTree();
    tree.addNodes([
      { id: "start", text: "Hello!", choices: [
        { text: "Hi there", nextId: "greeting" },
        { text: "Secret", nextId: "secret", condition: "unlocked" },
      ]},
      { id: "greeting", text: "How are you?", choices: [
        { text: "Good", nextId: "end" },
      ]},
      { id: "secret", text: "You found the secret!", choices: [] },
      { id: "end", text: "Goodbye!", choices: [] },
    ]);
    return tree;
  };

  it("start sets current node", () => {
    const tree = makeTree();
    const node = tree.start("start");
    expect(node).not.toBeNull();
    expect(node!.text).toBe("Hello!");
  });

  it("choose navigates to next node", () => {
    const tree = makeTree();
    tree.start("start");
    const next = tree.choose(0);
    expect(next).not.toBeNull();
    expect(next!.text).toBe("How are you?");
  });

  it("availableChoices filters by condition", () => {
    const tree = makeTree();
    tree.start("start");
    expect(tree.availableChoices().length).toBe(1);
    tree.setFlag("unlocked", true);
    expect(tree.availableChoices().length).toBe(2);
  });

  it("hasVisited tracks visited nodes", () => {
    const tree = makeTree();
    tree.start("start");
    tree.choose(0);
    expect(tree.hasVisited("start")).toBe(true);
    expect(tree.hasVisited("greeting")).toBe(true);
    expect(tree.hasVisited("end")).toBe(false);
  });

  it("validate detects missing references", () => {
    const tree = new DialogueTree();
    tree.addNode({ id: "a", text: "test", choices: [{ text: "go", nextId: "missing" }] });
    const result = tree.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
  });

  it("validate passes for valid tree", () => {
    const tree = makeTree();
    expect(tree.validate().valid).toBe(true);
  });

  it("reset clears state", () => {
    const tree = makeTree();
    tree.start("start");
    tree.setFlag("test", true);
    tree.reset();
    expect(tree.current()).toBeNull();
    expect(tree.getFlag("test")).toBe(false);
    expect(tree.visitedNodes().length).toBe(0);
  });

  it("nodeCount returns correct count", () => {
    const tree = makeTree();
    expect(tree.nodeCount()).toBe(4);
  });

  it("serialize captures state", () => {
    const tree = makeTree();
    tree.start("start");
    tree.setFlag("f", true);
    const data = tree.serialize();
    expect(data.currentId).toBe("start");
    expect(data.visited).toContain("start");
    expect(data.flags.f).toBe(true);
  });
});
