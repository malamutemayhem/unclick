import { describe, it, expect } from "vitest";
import { prompt, PromptTemplate } from "../prompt-template.js";

describe("PromptTemplate", () => {
  it("builds messages with variables", () => {
    const msgs = prompt()
      .system("You are a {{role}}")
      .user("Help me with {{task}}")
      .set("role", "helpful assistant")
      .set("task", "coding")
      .build();
    expect(msgs.length).toBe(2);
    expect(msgs[0].content).toBe("You are a helpful assistant");
    expect(msgs[1].content).toBe("Help me with coding");
  });

  it("skips optional sections with unresolved vars", () => {
    const msgs = prompt()
      .system("Always helpful")
      .user("Context: {{extra}}", true)
      .user("Main question")
      .build();
    expect(msgs.length).toBe(2);
  });

  it("setAll sets multiple vars", () => {
    const msgs = prompt()
      .user("{{a}} and {{b}}")
      .setAll({ a: "hello", b: "world" })
      .build();
    expect(msgs[0].content).toBe("hello and world");
  });

  it("buildString outputs formatted", () => {
    const str = prompt()
      .system("sys")
      .user("usr")
      .buildString();
    expect(str).toContain("[system]");
    expect(str).toContain("[user]");
  });

  it("clone creates independent copy", () => {
    const t1 = prompt().system("hello").set("x", "1");
    const t2 = t1.clone().set("x", "2");
    expect(t1.build()[0].content).toBe("hello");
    expect(t2.build()[0].content).toBe("hello");
  });

  it("tracks section count", () => {
    const t = prompt().system("a").user("b").assistant("c");
    expect(t.sectionCount).toBe(3);
  });
});
