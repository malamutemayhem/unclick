export type RaftState = "follower" | "candidate" | "leader";

export interface LogEntry {
  term: number;
  index: number;
  command: string;
}

export interface VoteRequest {
  term: number;
  candidateId: string;
  lastLogIndex: number;
  lastLogTerm: number;
}

export interface VoteResponse {
  term: number;
  granted: boolean;
}

export interface AppendRequest {
  term: number;
  leaderId: string;
  prevLogIndex: number;
  prevLogTerm: number;
  entries: LogEntry[];
  leaderCommit: number;
}

export interface AppendResponse {
  term: number;
  success: boolean;
}

export class RaftNode {
  readonly id: string;
  private state: RaftState = "follower";
  private currentTerm = 0;
  private votedFor: string | null = null;
  private log: LogEntry[] = [];
  private commitIndex = 0;
  private lastApplied = 0;
  private votesReceived = new Set<string>();
  private clusterSize: number;

  constructor(id: string, clusterSize = 3) {
    this.id = id;
    this.clusterSize = clusterSize;
  }

  startElection(): VoteRequest {
    this.currentTerm++;
    this.state = "candidate";
    this.votedFor = this.id;
    this.votesReceived.clear();
    this.votesReceived.add(this.id);

    return {
      term: this.currentTerm,
      candidateId: this.id,
      lastLogIndex: this.log.length,
      lastLogTerm: this.log.length > 0 ? this.log[this.log.length - 1].term : 0,
    };
  }

  handleVoteRequest(req: VoteRequest): VoteResponse {
    if (req.term < this.currentTerm) {
      return { term: this.currentTerm, granted: false };
    }

    if (req.term > this.currentTerm) {
      this.currentTerm = req.term;
      this.state = "follower";
      this.votedFor = null;
    }

    const lastLogTerm = this.log.length > 0 ? this.log[this.log.length - 1].term : 0;
    const lastLogIndex = this.log.length;
    const logOk = req.lastLogTerm > lastLogTerm ||
      (req.lastLogTerm === lastLogTerm && req.lastLogIndex >= lastLogIndex);

    if ((this.votedFor === null || this.votedFor === req.candidateId) && logOk) {
      this.votedFor = req.candidateId;
      return { term: this.currentTerm, granted: true };
    }

    return { term: this.currentTerm, granted: false };
  }

  receiveVote(resp: VoteResponse): void {
    if (resp.term > this.currentTerm) {
      this.currentTerm = resp.term;
      this.state = "follower";
      this.votedFor = null;
      return;
    }

    if (this.state !== "candidate") return;

    if (resp.granted) {
      this.votesReceived.add(`voter-${this.votesReceived.size}`);
      if (this.votesReceived.size > this.clusterSize / 2) {
        this.state = "leader";
      }
    }
  }

  appendEntry(command: string): LogEntry | null {
    if (this.state !== "leader") return null;
    const entry: LogEntry = {
      term: this.currentTerm,
      index: this.log.length + 1,
      command,
    };
    this.log.push(entry);
    return entry;
  }

  handleAppendEntries(req: AppendRequest): AppendResponse {
    if (req.term < this.currentTerm) {
      return { term: this.currentTerm, success: false };
    }

    if (req.term >= this.currentTerm) {
      this.currentTerm = req.term;
      this.state = "follower";
      this.votedFor = null;
    }

    if (req.prevLogIndex > 0) {
      if (req.prevLogIndex > this.log.length) {
        return { term: this.currentTerm, success: false };
      }
      if (this.log[req.prevLogIndex - 1].term !== req.prevLogTerm) {
        this.log.splice(req.prevLogIndex - 1);
        return { term: this.currentTerm, success: false };
      }
    }

    for (const entry of req.entries) {
      if (entry.index <= this.log.length) {
        this.log[entry.index - 1] = entry;
      } else {
        this.log.push(entry);
      }
    }

    if (req.leaderCommit > this.commitIndex) {
      this.commitIndex = Math.min(req.leaderCommit, this.log.length);
    }

    return { term: this.currentTerm, success: true };
  }

  advanceCommit(newCommitIndex: number): void {
    if (this.state === "leader" && newCommitIndex > this.commitIndex) {
      this.commitIndex = Math.min(newCommitIndex, this.log.length);
    }
  }

  applyCommitted(): string[] {
    const applied: string[] = [];
    while (this.lastApplied < this.commitIndex) {
      this.lastApplied++;
      applied.push(this.log[this.lastApplied - 1].command);
    }
    return applied;
  }

  get role(): RaftState { return this.state; }
  get term(): number { return this.currentTerm; }
  get logLength(): number { return this.log.length; }
  get committed(): number { return this.commitIndex; }
  get applied(): number { return this.lastApplied; }
  get votes(): number { return this.votesReceived.size; }

  getLog(): LogEntry[] { return [...this.log]; }
}
