import { describe, it, expect } from "vitest";
import { ContextWindow, fitMessages, summarizeMessages, Message } from "../context-window.js";

describe("ContextWindow", () => {
  it("adds and retrieves messages", () => {
    const cw = new ContextWindow({ maxTokens: 1000 });
    cw.add({ role: "user", content: "Hello" });
    cw.add({ role: "assistant", content: "Hi there" });
    expect(cw.messageCount).toBe(2);
    expect(cw.getMessages()[0].role).toBe("user");
  });

  it("tracks token count", () => {
    const cw = new ContextWindow({ maxTokens: 1000 });
    cw.add({ role: "user", content: "Hello world" });
    expect(cw.totalTokens).toBeGreaterThan(0);
  });

  it("trims old messages when over budget", () => {
    const cw = new ContextWindow({ maxTokens: 50, reserveTokens: 0 });
    for (let i = 0; i < 20; i++) {
      cw.add({ role: "user", content: `Message number ${i} with some content` });
    }
    expect(cw.totalTokens).toBeLessThanOrEqual(50);
  });

  it("preserves system messages when systemPriority is true", () => {
    const cw = new ContextWindow({ maxTokens: 60, reserveTokens: 0, systemPriority: true });
    cw.add({ role: "system", content: "You are helpful" });
    for (let i = 0; i < 10; i++) {
      cw.add({ role: "user", content: `Message ${i} with extra padding text` });
    }
    const msgs = cw.getMessages();
    expect(msgs.some((m) => m.role === "system")).toBe(true);
  });

  it("reports available tokens", () => {
    const cw = new ContextWindow({ maxTokens: 1000, reserveTokens: 200 });
    cw.add({ role: "user", content: "Hi" });
    expect(cw.availableTokens).toBeLessThan(800);
    expect(cw.availableTokens).toBeGreaterThan(0);
  });

  it("clear empties everything", () => {
    const cw = new ContextWindow();
    cw.add({ role: "user", content: "Hello" });
    cw.clear();
    expect(cw.messageCount).toBe(0);
    expect(cw.totalTokens).toBe(0);
  });
});

describe("fitMessages", () => {
  it("takes most recent messages that fit", () => {
    const msgs: Message[] = [
      { role: "user", content: "A".repeat(100) },
      { role: "user", content: "B".repeat(100) },
      { role: "user", content: "C".repeat(20) },
    ];
    const fit = fitMessages(msgs, 40);
    expect(fit.length).toBe(2);
    expect(fit[0].content.startsWith("B")).toBe(true);
    expect(fit[1].content.startsWith("C")).toBe(true);
  });

  it("returns empty for zero budget", () => {
    const msgs: Message[] = [{ role: "user", content: "hello" }];
    expect(fitMessages(msgs, 0)).toEqual([]);
  });
});

describe("summarizeMessages", () => {
  it("creates text summary", () => {
    const msgs: Message[] = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ];
    const summary = summarizeMessages(msgs);
    expect(summary).toContain("[user]");
    expect(summary).toContain("[assistant]");
  });

  it("truncates long messages", () => {
    const msgs: Message[] = [{ role: "user", content: "X".repeat(200) }];
    const summary = summarizeMessages(msgs);
    expect(summary).toContain("...");
  });
});
