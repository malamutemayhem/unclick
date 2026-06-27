export type MilestoneStatus = "pending" | "in-progress" | "completed" | "missed";

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: number;
  status: MilestoneStatus;
  completedDate?: number;
  dependencies: string[];
}

export class MilestoneTracker {
  private milestones: Map<string, Milestone> = new Map();

  add(milestone: Omit<Milestone, "status" | "completedDate">): void {
    this.milestones.set(milestone.id, {
      ...milestone,
      status: "pending",
    });
  }

  get(id: string): Milestone | undefined {
    return this.milestones.get(id);
  }

  remove(id: string): boolean {
    return this.milestones.delete(id);
  }

  startProgress(id: string): boolean {
    const m = this.milestones.get(id);
    if (!m || m.status !== "pending") return false;
    m.status = "in-progress";
    return true;
  }

  complete(id: string, date?: number): boolean {
    const m = this.milestones.get(id);
    if (!m) return false;
    m.status = "completed";
    m.completedDate = date ?? Date.now();
    return true;
  }

  markMissed(id: string): boolean {
    const m = this.milestones.get(id);
    if (!m) return false;
    m.status = "missed";
    return true;
  }

  checkOverdue(currentTime: number): Milestone[] {
    return Array.from(this.milestones.values()).filter(
      (m) => m.status !== "completed" && m.dueDate < currentTime,
    );
  }

  upcoming(currentTime: number, windowMs: number): Milestone[] {
    return Array.from(this.milestones.values()).filter(
      (m) =>
        m.status !== "completed" &&
        m.dueDate >= currentTime &&
        m.dueDate <= currentTime + windowMs,
    );
  }

  completionRate(): number {
    if (this.milestones.size === 0) return 0;
    const completed = Array.from(this.milestones.values()).filter(
      (m) => m.status === "completed",
    ).length;
    return completed / this.milestones.size;
  }

  count(): number {
    return this.milestones.size;
  }

  byStatus(status: MilestoneStatus): Milestone[] {
    return Array.from(this.milestones.values()).filter((m) => m.status === status);
  }

  nextMilestone(currentTime: number): Milestone | null {
    let nearest: Milestone | null = null;
    let nearestDue = Infinity;
    for (const m of this.milestones.values()) {
      if (m.status !== "completed" && m.dueDate >= currentTime && m.dueDate < nearestDue) {
        nearest = m;
        nearestDue = m.dueDate;
      }
    }
    return nearest;
  }

  timeline(): Milestone[] {
    return Array.from(this.milestones.values()).sort((a, b) => a.dueDate - b.dueDate);
  }

  dependenciesMet(id: string): boolean {
    const m = this.milestones.get(id);
    if (!m) return false;
    return m.dependencies.every((depId) => {
      const dep = this.milestones.get(depId);
      return dep?.status === "completed";
    });
  }
}
