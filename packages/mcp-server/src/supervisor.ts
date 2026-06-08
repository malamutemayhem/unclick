export interface AgentSpec {
  name: string;
  description: string;
  capabilities: string[];
  handler: (task: string, context: Record<string, unknown>) => unknown | Promise<unknown>;
}

export interface DelegationResult {
  agent: string;
  task: string;
  result: unknown;
  durationMs: number;
  error?: string;
}

export class Supervisor {
  private agents = new Map<string, AgentSpec>();
  private log: DelegationResult[] = [];

  register(agent: AgentSpec): void {
    this.agents.set(agent.name, agent);
  }

  unregister(name: string): boolean {
    return this.agents.delete(name);
  }

  getAgent(name: string): AgentSpec | undefined {
    return this.agents.get(name);
  }

  findAgent(capability: string): AgentSpec | undefined {
    for (const agent of this.agents.values()) {
      if (agent.capabilities.includes(capability)) return agent;
    }
    return undefined;
  }

  findAgents(capability: string): AgentSpec[] {
    return [...this.agents.values()].filter((a) => a.capabilities.includes(capability));
  }

  async delegate(agentName: string, task: string, context: Record<string, unknown> = {}): Promise<DelegationResult> {
    const agent = this.agents.get(agentName);
    if (!agent) throw new Error(`Unknown agent: ${agentName}`);
    const start = Date.now();
    try {
      const result = await agent.handler(task, context);
      const entry: DelegationResult = { agent: agentName, task, result, durationMs: Date.now() - start };
      this.log.push(entry);
      return entry;
    } catch (err) {
      const entry: DelegationResult = {
        agent: agentName, task, result: null, durationMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      };
      this.log.push(entry);
      return entry;
    }
  }

  async delegateByCapability(capability: string, task: string, context: Record<string, unknown> = {}): Promise<DelegationResult> {
    const agent = this.findAgent(capability);
    if (!agent) throw new Error(`No agent with capability: ${capability}`);
    return this.delegate(agent.name, task, context);
  }

  getLog(): DelegationResult[] {
    return [...this.log];
  }

  get agentCount(): number {
    return this.agents.size;
  }

  agentNames(): string[] {
    return [...this.agents.keys()];
  }

  allCapabilities(): string[] {
    const caps = new Set<string>();
    for (const agent of this.agents.values()) {
      for (const c of agent.capabilities) caps.add(c);
    }
    return [...caps].sort();
  }

  clear(): void {
    this.agents.clear();
    this.log = [];
  }
}
