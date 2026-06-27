import { describe, it, expect } from "vitest";
import { ActorSystem, type Behavior } from "../actor-model.js";

describe("ActorSystem", () => {
  it("spawns actors", () => {
    const sys = new ActorSystem();
    sys.spawn("counter", 0, (state, _msg) => ({ state: state + 1 }));
    expect(sys.actorCount()).toBe(1);
  });

  it("sends and processes messages", () => {
    const sys = new ActorSystem();
    const behavior: Behavior<number> = (state, msg) => {
      if (msg.type === "inc") return { state: state + 1 };
      return { state };
    };
    sys.spawn("counter", 0, behavior);
    sys.send("counter", { type: "inc" });
    sys.tick();
    expect(sys.getState<number>("counter")).toBe(1);
  });

  it("runs until mailboxes empty", () => {
    const sys = new ActorSystem();
    sys.spawn("echo", 0, (state, _msg) => ({ state: state + 1 }));
    sys.send("echo", { type: "a" });
    sys.send("echo", { type: "b" });
    sys.send("echo", { type: "c" });
    sys.run();
    expect(sys.getState<number>("echo")).toBe(3);
  });

  it("actors can send messages to each other", () => {
    const sys = new ActorSystem();
    sys.spawn("ping", 0, (state, msg) => {
      if (msg.type === "start") {
        return { state: state + 1, messages: [{ to: "pong", msg: { type: "ping" } }] };
      }
      if (msg.type === "pong") {
        return { state: state + 1 };
      }
      return { state };
    });
    sys.spawn("pong", 0, (state, msg) => {
      if (msg.type === "ping") {
        return { state: state + 1, messages: [{ to: "ping", msg: { type: "pong" } }] };
      }
      return { state };
    });
    sys.send("ping", { type: "start" });
    sys.run();
    expect(sys.getState<number>("ping")).toBe(2);
    expect(sys.getState<number>("pong")).toBe(1);
  });

  it("tracks dead letters", () => {
    const sys = new ActorSystem();
    sys.send("nonexistent", { type: "hello" });
    expect(sys.getDeadLetters().length).toBe(1);
  });

  it("stops actors", () => {
    const sys = new ActorSystem();
    sys.spawn("temp", null, (state) => ({ state }));
    expect(sys.stop("temp")).toBe(true);
    expect(sys.actorCount()).toBe(0);
  });

  it("tracks mailbox size", () => {
    const sys = new ActorSystem();
    sys.spawn("worker", 0, (state) => ({ state }));
    sys.send("worker", { type: "a" });
    sys.send("worker", { type: "b" });
    expect(sys.mailboxSize("worker")).toBe(2);
  });

  it("tracks processed count", () => {
    const sys = new ActorSystem();
    sys.spawn("worker", 0, (state) => ({ state: state + 1 }));
    sys.send("worker", { type: "a" });
    sys.run();
    expect(sys.processedCount("worker")).toBe(1);
  });

  it("broadcasts to all actors", () => {
    const sys = new ActorSystem();
    sys.spawn("a", 0, (state) => ({ state: state + 1 }));
    sys.spawn("b", 0, (state) => ({ state: state + 1 }));
    sys.broadcast({ type: "hello" });
    sys.run();
    expect(sys.getState<number>("a")).toBe(1);
    expect(sys.getState<number>("b")).toBe(1);
  });

  it("broadcasts with exclusion", () => {
    const sys = new ActorSystem();
    sys.spawn("a", 0, (state) => ({ state: state + 1 }));
    sys.spawn("b", 0, (state) => ({ state: state + 1 }));
    sys.broadcast({ type: "hello" }, "a");
    sys.run();
    expect(sys.getState<number>("a")).toBe(0);
    expect(sys.getState<number>("b")).toBe(1);
  });

  it("lists actor ids", () => {
    const sys = new ActorSystem();
    sys.spawn("b", 0, (state) => ({ state }));
    sys.spawn("a", 0, (state) => ({ state }));
    expect(sys.actorIds()).toEqual(["a", "b"]);
  });

  it("counts total messages", () => {
    const sys = new ActorSystem();
    sys.spawn("x", 0, (state) => ({ state }));
    sys.send("x", { type: "a" });
    sys.send("x", { type: "b" });
    expect(sys.totalMessagesSent()).toBe(2);
  });
});
