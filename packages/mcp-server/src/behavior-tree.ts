export type BTStatus = "success" | "failure" | "running";

export interface BTNode {
  tick(blackboard: Map<string, unknown>): BTStatus;
  reset(): void;
}

export class Action implements BTNode {
  constructor(private fn: (blackboard: Map<string, unknown>) => BTStatus) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    return this.fn(blackboard);
  }

  reset(): void {}
}

export class Condition implements BTNode {
  constructor(private fn: (blackboard: Map<string, unknown>) => boolean) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    return this.fn(blackboard) ? "success" : "failure";
  }

  reset(): void {}
}

export class Sequence implements BTNode {
  private index = 0;

  constructor(private children: BTNode[]) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    while (this.index < this.children.length) {
      const status = this.children[this.index].tick(blackboard);
      if (status === "running") return "running";
      if (status === "failure") {
        this.index = 0;
        return "failure";
      }
      this.index++;
    }
    this.index = 0;
    return "success";
  }

  reset(): void {
    this.index = 0;
    for (const child of this.children) child.reset();
  }
}

export class Selector implements BTNode {
  private index = 0;

  constructor(private children: BTNode[]) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    while (this.index < this.children.length) {
      const status = this.children[this.index].tick(blackboard);
      if (status === "running") return "running";
      if (status === "success") {
        this.index = 0;
        return "success";
      }
      this.index++;
    }
    this.index = 0;
    return "failure";
  }

  reset(): void {
    this.index = 0;
    for (const child of this.children) child.reset();
  }
}

export class Inverter implements BTNode {
  constructor(private child: BTNode) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    const status = this.child.tick(blackboard);
    if (status === "success") return "failure";
    if (status === "failure") return "success";
    return "running";
  }

  reset(): void {
    this.child.reset();
  }
}

export class Repeater implements BTNode {
  private count = 0;

  constructor(
    private child: BTNode,
    private times: number,
  ) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    while (this.count < this.times) {
      const status = this.child.tick(blackboard);
      if (status === "running") return "running";
      if (status === "failure") {
        this.count = 0;
        return "failure";
      }
      this.count++;
      this.child.reset();
    }
    this.count = 0;
    return "success";
  }

  reset(): void {
    this.count = 0;
    this.child.reset();
  }
}

export class Succeeder implements BTNode {
  constructor(private child: BTNode) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    const status = this.child.tick(blackboard);
    return status === "running" ? "running" : "success";
  }

  reset(): void {
    this.child.reset();
  }
}

export class BehaviorTree {
  constructor(private root: BTNode) {}

  tick(blackboard: Map<string, unknown>): BTStatus {
    return this.root.tick(blackboard);
  }

  reset(): void {
    this.root.reset();
  }
}
