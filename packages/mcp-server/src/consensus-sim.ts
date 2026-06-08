export type NodeRole = "follower" | "candidate" | "leader";

export interface RaftNode {
  id: string;
  role: NodeRole;
  term: number;
  votedFor: string | null;
  log: Array<{ term: number; command: string }>;
  commitIndex: number;
  lastApplied: number;
}

export interface VoteRequest {
  candidateId: string;
  term: number;
  lastLogIndex: number;
  lastLogTerm: number;
}

export interface VoteResponse {
  term: number;
  granted: boolean;
}

export class RaftCluster {
  private nodes = new Map<string, RaftNode>();
  private partitioned = new Set<string>();

  addNode(id: string): void {
    this.nodes.set(id, {
      id,
      role: "follower",
      term: 0,
      votedFor: null,
      log: [],
      commitIndex: -1,
      lastApplied: -1,
    });
  }

  startElection(candidateId: string): boolean {
    const candidate = this.nodes.get(candidateId);
    if (!candidate) return false;

    candidate.term++;
    candidate.role = "candidate";
    candidate.votedFor = candidateId;

    let votes = 1;
    const majority = Math.floor(this.nodes.size / 2) + 1;

    for (const [id, node] of this.nodes) {
      if (id === candidateId) continue;
      if (this.partitioned.has(id)) continue;

      const response = this.requestVote(node, {
        candidateId,
        term: candidate.term,
        lastLogIndex: candidate.log.length - 1,
        lastLogTerm: candidate.log.length > 0 ? candidate.log[candidate.log.length - 1].term : 0,
      });

      if (response.granted) votes++;
      if (response.term > candidate.term) {
        candidate.term = response.term;
        candidate.role = "follower";
        candidate.votedFor = null;
        return false;
      }
    }

    if (votes >= majority) {
      candidate.role = "leader";
      return true;
    }

    candidate.role = "follower";
    return false;
  }

  private requestVote(node: RaftNode, req: VoteRequest): VoteResponse {
    if (req.term < node.term) {
      return { term: node.term, granted: false };
    }

    if (req.term > node.term) {
      node.term = req.term;
      node.role = "follower";
      node.votedFor = null;
    }

    if (node.votedFor === null || node.votedFor === req.candidateId) {
      const lastLogTerm = node.log.length > 0 ? node.log[node.log.length - 1].term : 0;
      const lastLogIndex = node.log.length - 1;

      if (req.lastLogTerm > lastLogTerm || (req.lastLogTerm === lastLogTerm && req.lastLogIndex >= lastLogIndex)) {
        node.votedFor = req.candidateId;
        return { term: node.term, granted: true };
      }
    }

    return { term: node.term, granted: false };
  }

  appendEntry(leaderId: string, command: string): boolean {
    const leader = this.nodes.get(leaderId);
    if (!leader || leader.role !== "leader") return false;

    leader.log.push({ term: leader.term, command });

    let replicated = 1;
    const majority = Math.floor(this.nodes.size / 2) + 1;

    for (const [id, node] of this.nodes) {
      if (id === leaderId) continue;
      if (this.partitioned.has(id)) continue;

      node.log.push({ term: leader.term, command });
      replicated++;
    }

    if (replicated >= majority) {
      leader.commitIndex = leader.log.length - 1;
      for (const [id, node] of this.nodes) {
        if (id === leaderId || this.partitioned.has(id)) continue;
        node.commitIndex = leader.commitIndex;
      }
      return true;
    }

    return false;
  }

  partition(nodeId: string): void {
    this.partitioned.add(nodeId);
  }

  heal(nodeId: string): void {
    this.partitioned.delete(nodeId);
  }

  getNode(id: string): RaftNode | undefined {
    return this.nodes.get(id);
  }

  leader(): string | null {
    for (const [id, node] of this.nodes) {
      if (node.role === "leader") return id;
    }
    return null;
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  committedEntries(nodeId: string): string[] {
    const node = this.nodes.get(nodeId);
    if (!node) return [];
    return node.log.slice(0, node.commitIndex + 1).map((e) => e.command);
  }
}
