export type QuestStatus = "inactive" | "active" | "completed" | "failed";

export interface QuestObjective {
  id: string;
  description: string;
  target: number;
  current: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: QuestStatus;
  objectives: QuestObjective[];
  prerequisites?: string[];
  rewards?: Record<string, number>;
}

export class QuestTracker {
  private quests: Map<string, Quest> = new Map();

  addQuest(quest: Quest): void {
    this.quests.set(quest.id, { ...quest, objectives: quest.objectives.map((o) => ({ ...o })) });
  }

  activate(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== "inactive") return false;
    if (quest.prerequisites) {
      for (const preReq of quest.prerequisites) {
        const pq = this.quests.get(preReq);
        if (!pq || pq.status !== "completed") return false;
      }
    }
    quest.status = "active";
    return true;
  }

  updateObjective(questId: string, objectiveId: string, amount = 1): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== "active") return false;
    const obj = quest.objectives.find((o) => o.id === objectiveId);
    if (!obj) return false;
    obj.current = Math.min(obj.current + amount, obj.target);
    if (quest.objectives.every((o) => o.current >= o.target)) {
      quest.status = "completed";
    }
    return true;
  }

  fail(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.status !== "active") return false;
    quest.status = "failed";
    return true;
  }

  getQuest(questId: string): Quest | undefined {
    return this.quests.get(questId);
  }

  getByStatus(status: QuestStatus): Quest[] {
    return Array.from(this.quests.values()).filter((q) => q.status === status);
  }

  isComplete(questId: string): boolean {
    const quest = this.quests.get(questId);
    return quest?.status === "completed";
  }

  objectiveProgress(questId: string): number {
    const quest = this.quests.get(questId);
    if (!quest || quest.objectives.length === 0) return 0;
    const total = quest.objectives.reduce((s, o) => s + o.target, 0);
    const current = quest.objectives.reduce((s, o) => s + Math.min(o.current, o.target), 0);
    return current / total;
  }

  allQuests(): Quest[] {
    return Array.from(this.quests.values());
  }

  reset(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest) return false;
    quest.status = "inactive";
    for (const obj of quest.objectives) {
      obj.current = 0;
    }
    return true;
  }
}
