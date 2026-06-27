export type ParticipantState = "init" | "prepared" | "committed" | "aborted";
export type CoordinatorState = "init" | "preparing" | "committing" | "aborting" | "done";

export interface TwoPhaseParticipant {
  id: string;
  state: ParticipantState;
  canPrepare: boolean;
}

export class TwoPhaseCoordinator {
  private participants = new Map<string, TwoPhaseParticipant>();
  private state: CoordinatorState = "init";
  private txId: string;

  constructor(txId: string) {
    this.txId = txId;
  }

  addParticipant(id: string, canPrepare = true): void {
    this.participants.set(id, { id, state: "init", canPrepare });
  }

  prepare(): Map<string, boolean> {
    this.state = "preparing";
    const votes = new Map<string, boolean>();

    for (const [id, p] of this.participants) {
      if (p.canPrepare) {
        p.state = "prepared";
        votes.set(id, true);
      } else {
        p.state = "aborted";
        votes.set(id, false);
      }
    }

    return votes;
  }

  decide(): "commit" | "abort" {
    const allPrepared = [...this.participants.values()].every(p => p.state === "prepared");

    if (allPrepared) {
      this.state = "committing";
      for (const p of this.participants.values()) {
        p.state = "committed";
      }
      this.state = "done";
      return "commit";
    } else {
      this.state = "aborting";
      for (const p of this.participants.values()) {
        p.state = "aborted";
      }
      this.state = "done";
      return "abort";
    }
  }

  run(): "commit" | "abort" {
    this.prepare();
    return this.decide();
  }

  getParticipantState(id: string): ParticipantState | null {
    return this.participants.get(id)?.state ?? null;
  }

  get coordinatorState(): CoordinatorState {
    return this.state;
  }

  get transactionId(): string {
    return this.txId;
  }

  get participantCount(): number {
    return this.participants.size;
  }

  getParticipantIds(): string[] {
    return [...this.participants.keys()];
  }
}

export class ThreePhaseCoordinator {
  private participants = new Map<string, { id: string; canCommit: boolean; state: string }>();
  private state = "init";

  addParticipant(id: string, canCommit = true): void {
    this.participants.set(id, { id, canCommit, state: "init" });
  }

  canCommit(): Map<string, boolean> {
    this.state = "can-commit";
    const votes = new Map<string, boolean>();
    for (const [id, p] of this.participants) {
      votes.set(id, p.canCommit);
      p.state = p.canCommit ? "agreed" : "aborted";
    }
    return votes;
  }

  preCommit(): boolean {
    const allAgreed = [...this.participants.values()].every(p => p.state === "agreed");
    if (allAgreed) {
      this.state = "pre-commit";
      for (const p of this.participants.values()) p.state = "pre-committed";
      return true;
    }
    this.state = "aborted";
    for (const p of this.participants.values()) p.state = "aborted";
    return false;
  }

  doCommit(): boolean {
    if (this.state !== "pre-commit") return false;
    this.state = "committed";
    for (const p of this.participants.values()) p.state = "committed";
    return true;
  }

  run(): "commit" | "abort" {
    this.canCommit();
    if (!this.preCommit()) return "abort";
    this.doCommit();
    return "commit";
  }

  get coordinatorState(): string {
    return this.state;
  }

  get participantCount(): number {
    return this.participants.size;
  }
}
