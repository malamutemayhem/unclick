import { describe, it, expect } from "vitest";
import { PriorityInbox } from "../priority-inbox.js";

describe("PriorityInbox", () => {
  it("pushes and pops by priority", () => {
    const inbox = new PriorityInbox<string>();
    inbox.push("low", 1);
    inbox.push("high", 10);
    inbox.push("mid", 5);
    expect(inbox.pop()?.payload).toBe("high");
    expect(inbox.pop()?.payload).toBe("mid");
    expect(inbox.pop()?.payload).toBe("low");
  });

  it("peek returns highest priority without removing", () => {
    const inbox = new PriorityInbox<string>();
    inbox.push("a", 1);
    inbox.push("b", 5);
    expect(inbox.peek()?.payload).toBe("b");
    expect(inbox.size).toBe(2);
  });

  it("returns undefined on empty pop/peek", () => {
    const inbox = new PriorityInbox();
    expect(inbox.pop()).toBeUndefined();
    expect(inbox.peek()).toBeUndefined();
  });

  it("tracks read/unread", () => {
    const inbox = new PriorityInbox<string>();
    const id = inbox.push("hello", 1);
    expect(inbox.unreadCount).toBe(1);
    inbox.markRead(id);
    expect(inbox.unreadCount).toBe(0);
    expect(inbox.getUnread()).toEqual([]);
  });

  it("markRead returns false for unknown id", () => {
    const inbox = new PriorityInbox();
    expect(inbox.markRead("nope")).toBe(false);
  });

  it("filters by tag", () => {
    const inbox = new PriorityInbox<string>();
    inbox.push("a", 1, ["urgent"]);
    inbox.push("b", 1, ["low"]);
    inbox.push("c", 1, ["urgent", "low"]);
    expect(inbox.getByTag("urgent").length).toBe(2);
    expect(inbox.getByTag("low").length).toBe(2);
    expect(inbox.getByTag("other").length).toBe(0);
  });

  it("removes by id", () => {
    const inbox = new PriorityInbox<string>();
    const id = inbox.push("test", 1);
    expect(inbox.remove(id)).toBe(true);
    expect(inbox.size).toBe(0);
    expect(inbox.remove(id)).toBe(false);
  });

  it("reports size correctly", () => {
    const inbox = new PriorityInbox<number>();
    inbox.push(1, 1);
    inbox.push(2, 2);
    expect(inbox.size).toBe(2);
    inbox.pop();
    expect(inbox.size).toBe(1);
  });

  it("all returns copy of messages", () => {
    const inbox = new PriorityInbox<string>();
    inbox.push("a", 1);
    const all = inbox.all();
    expect(all.length).toBe(1);
    all.pop();
    expect(inbox.size).toBe(1);
  });

  it("clear empties the inbox", () => {
    const inbox = new PriorityInbox<string>();
    inbox.push("a", 1);
    inbox.push("b", 2);
    inbox.clear();
    expect(inbox.size).toBe(0);
  });

  it("same priority sorts by timestamp (FIFO)", () => {
    const inbox = new PriorityInbox<string>();
    inbox.push("first", 5);
    inbox.push("second", 5);
    expect(inbox.pop()?.payload).toBe("first");
    expect(inbox.pop()?.payload).toBe("second");
  });
});
