import { describe, it, expect } from "vitest";
import { ConversationBuffer, SlidingWindowBuffer } from "../conversation-buffer.js";

describe("ConversationBuffer", () => {
  it("adds and retrieves messages", () => {
    const buf = new ConversationBuffer();
    buf.add({ role: "user", content: "hello" });
    buf.add({ role: "assistant", content: "hi" });
    expect(buf.size).toBe(2);
    expect(buf.getMessages()[0].content).toBe("hello");
  });

  it("trims to maxMessages", () => {
    const buf = new ConversationBuffer(3);
    for (let i = 0; i < 5; i++) buf.add({ role: "user", content: "msg" + i });
    expect(buf.size).toBe(3);
    expect(buf.getMessages()[0].content).toBe("msg2");
  });

  it("getLastN returns recent messages", () => {
    const buf = new ConversationBuffer();
    buf.add({ role: "user", content: "a" });
    buf.add({ role: "user", content: "b" });
    buf.add({ role: "user", content: "c" });
    const last = buf.getLastN(2);
    expect(last.map((m) => m.content)).toEqual(["b", "c"]);
  });

  it("summarize produces condensed view", () => {
    const buf = new ConversationBuffer();
    for (let i = 0; i < 10; i++) buf.add({ role: "user", content: "message " + i });
    const summary = buf.summarize(() => "Summary of earlier conversation");
    expect(summary[0].content).toBe("Summary of earlier conversation");
    expect(summary.length).toBe(3);
  });

  it("clear empties the buffer", () => {
    const buf = new ConversationBuffer();
    buf.add({ role: "user", content: "hello" });
    buf.clear();
    expect(buf.size).toBe(0);
  });
});

describe("SlidingWindowBuffer", () => {
  it("maintains window size", () => {
    const buf = new SlidingWindowBuffer(3);
    buf.add({ role: "user", content: "a" });
    buf.add({ role: "user", content: "b" });
    buf.add({ role: "user", content: "c" });
    buf.add({ role: "user", content: "d" });
    expect(buf.size).toBe(3);
    expect(buf.getMessages()[0].content).toBe("b");
  });
});
