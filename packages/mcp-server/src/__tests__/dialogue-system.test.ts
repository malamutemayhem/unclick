import { describe, it, expect } from "vitest";
import { DialogueRunner } from "../dialogue-system.js";
import type { DialogueNode } from "../dialogue-system.js";

const nodes: DialogueNode[] = [
  {
    id: "start",
    text: "Hello, traveler!",
    speaker: "NPC",
    choices: [
      { text: "Hi there!", next: "greeting" },
      { text: "Goodbye", next: "farewell" },
    ],
  },
  {
    id: "greeting",
    text: "Welcome to the village.",
    speaker: "NPC",
    next: "quest",
  },
  {
    id: "quest",
    text: "Will you help me?",
    speaker: "NPC",
    choices: [
      { text: "Yes", next: "accept" },
      { text: "No", next: "farewell" },
    ],
  },
  {
    id: "accept",
    text: "Thank you!",
    speaker: "NPC",
  },
  {
    id: "farewell",
    text: "Goodbye then.",
    speaker: "NPC",
  },
];

describe("DialogueRunner", () => {
  it("starts at first node", () => {
    const runner = new DialogueRunner(nodes);
    const node = runner.current();
    expect(node?.id).toBe("start");
    expect(node?.text).toBe("Hello, traveler!");
  });

  it("starts at specified node", () => {
    const runner = new DialogueRunner(nodes, "quest");
    expect(runner.current()?.id).toBe("quest");
  });

  it("lists available choices", () => {
    const runner = new DialogueRunner(nodes);
    const choices = runner.availableChoices();
    expect(choices).toHaveLength(2);
    expect(choices[0].text).toBe("Hi there!");
  });

  it("navigates via choices", () => {
    const runner = new DialogueRunner(nodes);
    runner.enter();
    const node = runner.choose(0);
    expect(node?.id).toBe("greeting");
  });

  it("advances via next", () => {
    const runner = new DialogueRunner(nodes, "greeting");
    runner.enter();
    const node = runner.advance();
    expect(node?.id).toBe("quest");
  });

  it("tracks visited nodes", () => {
    const runner = new DialogueRunner(nodes);
    runner.enter();
    expect(runner.hasVisited("start")).toBe(true);
    expect(runner.hasVisited("greeting")).toBe(false);
  });

  it("tracks history", () => {
    const runner = new DialogueRunner(nodes);
    runner.enter();
    runner.choose(0);
    expect(runner.getHistory()).toEqual(["start", "greeting"]);
  });

  it("manages variables", () => {
    const runner = new DialogueRunner(nodes);
    runner.setVariable("gold", 100);
    expect(runner.getVariable("gold")).toBe(100);
  });

  it("filters choices by condition", () => {
    const conditional: DialogueNode[] = [
      {
        id: "shop",
        text: "What do you want?",
        choices: [
          { text: "Buy sword", next: "buy", condition: (s) => (s.variables.get("gold") as number) >= 50 },
          { text: "Leave", next: "leave" },
        ],
      },
      { id: "buy", text: "Done" },
      { id: "leave", text: "Bye" },
    ];
    const runner = new DialogueRunner(conditional, "shop");
    runner.setVariable("gold", 10);
    expect(runner.availableChoices()).toHaveLength(1);
    runner.setVariable("gold", 100);
    expect(runner.availableChoices()).toHaveLength(2);
  });

  it("isFinished when no current node", () => {
    const runner = new DialogueRunner(nodes, "accept");
    runner.enter();
    const advanced = runner.advance();
    expect(advanced).toBeNull();
    expect(runner.isFinished()).toBe(true);
  });

  it("goTo jumps to any node", () => {
    const runner = new DialogueRunner(nodes);
    const node = runner.goTo("farewell");
    expect(node?.text).toBe("Goodbye then.");
  });

  it("reset clears state", () => {
    const runner = new DialogueRunner(nodes);
    runner.enter();
    runner.choose(0);
    runner.setVariable("x", 1);
    runner.reset();
    expect(runner.hasVisited("start")).toBe(false);
    expect(runner.getHistory()).toEqual([]);
    expect(runner.getVariable("x")).toBeUndefined();
  });
});
