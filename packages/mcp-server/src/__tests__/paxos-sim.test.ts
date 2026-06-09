import { describe, it, expect } from "vitest";
import { PaxosNode, runPaxos } from "../paxos-sim.js";

describe("PaxosNode", () => {
  it("prepare generates messages to all nodes", () => {
    const node = new PaxosNode("node0", 3);
    const messages = node.prepare("value1");
    expect(messages).toHaveLength(3);
    expect(messages[0].type).toBe("prepare");
    expect(messages[0].from).toBe("node0");
  });

  it("handlePrepare returns promise for new proposal", () => {
    const node = new PaxosNode("node1", 3);
    const msg = { type: "prepare" as const, from: "node0", to: "node1", proposalNum: 10 };
    const reply = node.handlePrepare(msg);
    expect(reply.type).toBe("promise");
    expect(reply.proposalNum).toBe(10);
  });

  it("handlePrepare returns nack for old proposal", () => {
    const node = new PaxosNode("node1", 3);
    node.handlePrepare({ type: "prepare", from: "node0", to: "node1", proposalNum: 10 });
    const reply = node.handlePrepare({ type: "prepare", from: "node0", to: "node1", proposalNum: 5 });
    expect(reply.type).toBe("nack");
  });

  it("processPromises returns null without majority", () => {
    const node = new PaxosNode("node0", 3);
    const promises = [
      { type: "promise" as const, from: "node0", to: "node0", proposalNum: 3 },
      { type: "nack" as const, from: "node1", to: "node0", proposalNum: 3 },
      { type: "nack" as const, from: "node2", to: "node0", proposalNum: 3 },
    ];
    expect(node.processPromises(promises, "val")).toBeNull();
  });

  it("processPromises returns accept messages with majority", () => {
    const node = new PaxosNode("node0", 3);
    const promises = [
      { type: "promise" as const, from: "node0", to: "node0", proposalNum: 3 },
      { type: "promise" as const, from: "node1", to: "node0", proposalNum: 3 },
      { type: "nack" as const, from: "node2", to: "node0", proposalNum: 3 },
    ];
    const accepts = node.processPromises(promises, "val");
    expect(accepts).not.toBeNull();
    expect(accepts!).toHaveLength(3);
    expect(accepts![0].type).toBe("accept");
  });

  it("handleAccept accepts valid proposals", () => {
    const node = new PaxosNode("node1", 3);
    node.handlePrepare({ type: "prepare", from: "node0", to: "node1", proposalNum: 10 });
    const reply = node.handleAccept({
      type: "accept", from: "node0", to: "node1", proposalNum: 10, value: "hello",
    });
    expect(reply.type).toBe("accepted");
    expect(node.state.acceptedValue).toBe("hello");
  });

  it("checkAccepted detects consensus", () => {
    const node = new PaxosNode("node0", 3);
    const responses = [
      { type: "accepted" as const, from: "node0", to: "node0", proposalNum: 3, value: "v" },
      { type: "accepted" as const, from: "node1", to: "node0", proposalNum: 3, value: "v" },
    ];
    const result = node.checkAccepted(responses);
    expect(result.decided).toBe(true);
    expect(result.value).toBe("v");
  });

  it("state accessor", () => {
    const node = new PaxosNode("node0", 3);
    expect(node.state.promisedNum).toBe(0);
    expect(node.state.acceptedNum).toBe(0);
  });
});

describe("runPaxos", () => {
  it("reaches consensus with all nodes", () => {
    const nodes = [
      new PaxosNode("node0", 3),
      new PaxosNode("node1", 3),
      new PaxosNode("node2", 3),
    ];
    const result = runPaxos(nodes, nodes[0], "agreed");
    expect(result.decided).toBe(true);
    expect(result.value).toBe("agreed");
    expect(result.rounds).toBe(2);
  });

  it("uses previously accepted value", () => {
    const nodes = [
      new PaxosNode("node0", 3),
      new PaxosNode("node1", 3),
      new PaxosNode("node2", 3),
    ];
    runPaxos(nodes, nodes[0], "first");
    const result = runPaxos(nodes, nodes[1], "second");
    expect(result.decided).toBe(true);
  });
});
