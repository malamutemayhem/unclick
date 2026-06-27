export interface PaxosMessage {
  type: "prepare" | "promise" | "accept" | "accepted" | "nack";
  from: string;
  to: string;
  proposalNum: number;
  value?: unknown;
  acceptedNum?: number;
  acceptedValue?: unknown;
}

export class PaxosNode {
  readonly id: string;
  private promisedNum = 0;
  private acceptedNum = 0;
  private acceptedValue: unknown = null;
  private proposalCounter = 0;
  private nodeCount: number;

  constructor(id: string, nodeCount: number) {
    this.id = id;
    this.nodeCount = nodeCount;
  }

  prepare(value: unknown): PaxosMessage[] {
    this.proposalCounter++;
    const proposalNum = this.proposalCounter * this.nodeCount + parseInt(this.id.replace(/\D/g, "") || "0");
    return Array.from({ length: this.nodeCount }, (_, i) => ({
      type: "prepare" as const,
      from: this.id,
      to: `node${i}`,
      proposalNum,
      value,
    }));
  }

  handlePrepare(msg: PaxosMessage): PaxosMessage {
    if (msg.proposalNum > this.promisedNum) {
      this.promisedNum = msg.proposalNum;
      return {
        type: "promise",
        from: this.id,
        to: msg.from,
        proposalNum: msg.proposalNum,
        acceptedNum: this.acceptedNum,
        acceptedValue: this.acceptedValue,
      };
    }
    return {
      type: "nack",
      from: this.id,
      to: msg.from,
      proposalNum: msg.proposalNum,
    };
  }

  processPromises(promises: PaxosMessage[], value: unknown): PaxosMessage[] | null {
    const majority = Math.floor(this.nodeCount / 2) + 1;
    const valid = promises.filter((p) => p.type === "promise");
    if (valid.length < majority) return null;

    let highestAccepted = 0;
    let useValue = value;
    for (const p of valid) {
      if ((p.acceptedNum ?? 0) > highestAccepted) {
        highestAccepted = p.acceptedNum!;
        useValue = p.acceptedValue;
      }
    }

    const proposalNum = promises[0].proposalNum;
    return Array.from({ length: this.nodeCount }, (_, i) => ({
      type: "accept" as const,
      from: this.id,
      to: `node${i}`,
      proposalNum,
      value: useValue,
    }));
  }

  handleAccept(msg: PaxosMessage): PaxosMessage {
    if (msg.proposalNum >= this.promisedNum) {
      this.promisedNum = msg.proposalNum;
      this.acceptedNum = msg.proposalNum;
      this.acceptedValue = msg.value;
      return {
        type: "accepted",
        from: this.id,
        to: msg.from,
        proposalNum: msg.proposalNum,
        value: msg.value,
      };
    }
    return {
      type: "nack",
      from: this.id,
      to: msg.from,
      proposalNum: msg.proposalNum,
    };
  }

  checkAccepted(responses: PaxosMessage[]): { decided: boolean; value: unknown } {
    const majority = Math.floor(this.nodeCount / 2) + 1;
    const accepted = responses.filter((r) => r.type === "accepted");
    if (accepted.length >= majority) {
      return { decided: true, value: accepted[0].value };
    }
    return { decided: false, value: null };
  }

  get state(): { promisedNum: number; acceptedNum: number; acceptedValue: unknown } {
    return {
      promisedNum: this.promisedNum,
      acceptedNum: this.acceptedNum,
      acceptedValue: this.acceptedValue,
    };
  }
}

export function runPaxos(
  nodes: PaxosNode[],
  proposer: PaxosNode,
  value: unknown
): { decided: boolean; value: unknown; rounds: number } {
  const prepareMessages = proposer.prepare(value);
  const promises: PaxosMessage[] = [];

  for (const msg of prepareMessages) {
    const target = nodes.find((n) => n.id === msg.to);
    if (target) {
      promises.push(target.handlePrepare(msg));
    }
  }

  const acceptMessages = proposer.processPromises(promises, value);
  if (!acceptMessages) {
    return { decided: false, value: null, rounds: 1 };
  }

  const accepted: PaxosMessage[] = [];
  for (const msg of acceptMessages) {
    const target = nodes.find((n) => n.id === msg.to);
    if (target) {
      accepted.push(target.handleAccept(msg));
    }
  }

  const result = proposer.checkAccepted(accepted);
  return { ...result, rounds: 2 };
}
