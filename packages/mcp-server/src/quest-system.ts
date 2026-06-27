export type QuestStatus = "available" | "active" | "completed" | "failed";

export interface QuestObjective {
  id: string;
  description: string;
  target: number;
  current: number;
}

export interface QuestReward {
  type: string;
  amount: number;
}

export interface QuestDef {
  id: string;
  name: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  prerequisites?: string[];
  timeLimit?: number;
}

export class Quest {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  status: QuestStatus;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  prerequisites: string[];
  timeLimit: number | null;
  startTime: number | null = null;

  constructor(def: QuestDef) {
    this.id = def.id;
    this.name = def.name;
    this.description = def.description;
    this.status = "available";
    this.objectives = def.objectives.map((o) => ({ ...o }));
    this.rewards = [...def.rewards];
    this.prerequisites = def.prerequisites ?? [];
    this.timeLimit = def.timeLimit ?? null;
  }

  activate(time?: number): void {
    this.status = "active";
    this.startTime = time !== undefined ? time : Date.now();
  }

  updateObjective(objectiveId: string, amount: number): void {
    const obj = this.objectives.find((o) => o.id === objectiveId);
    if (obj) {
      obj.current = Math.min(obj.current + amount, obj.target);
    }
  }

  isComplete(): boolean {
    return this.objectives.every((o) => o.current >= o.target);
  }

  progress(): number {
    if (this.objectives.length === 0) return 1;
    const total = this.objectives.reduce((sum, o) => sum + o.target, 0);
    const current = this.objectives.reduce((sum, o) => sum + Math.min(o.current, o.target), 0);
    return current / total;
  }

  complete(): void {
    this.status = "completed";
  }

  fail(): void {
    this.status = "failed";
  }

  isExpired(currentTime: number): boolean {
    if (!this.timeLimit || this.startTime === null) return false;
    return currentTime - this.startTime > this.timeLimit;
  }
}

export class QuestJournal {
  private quests: Map<string, Quest> = new Map();

  add(def: QuestDef): Quest {
    const quest = new Quest(def);
    this.quests.set(quest.id, quest);
    return quest;
  }

  get(id: string): Quest | undefined {
    return this.quests.get(id);
  }

  activate(id: string): boolean {
    const quest = this.quests.get(id);
    if (!quest || quest.status !== "available") return false;
    for (const prereq of quest.prerequisites) {
      const p = this.quests.get(prereq);
      if (!p || p.status !== "completed") return false;
    }
    quest.activate();
    return true;
  }

  complete(id: string): QuestReward[] | null {
    const quest = this.quests.get(id);
    if (!quest || quest.status !== "active" || !quest.isComplete()) return null;
    quest.complete();
    return quest.rewards;
  }

  activeQuests(): Quest[] {
    return Array.from(this.quests.values()).filter((q) => q.status === "active");
  }

  completedQuests(): Quest[] {
    return Array.from(this.quests.values()).filter((q) => q.status === "completed");
  }

  availableQuests(): Quest[] {
    return Array.from(this.quests.values()).filter((q) => q.status === "available");
  }

  questCount(): number {
    return this.quests.size;
  }

  completionRate(): number {
    if (this.quests.size === 0) return 0;
    const completed = this.completedQuests().length;
    return completed / this.quests.size;
  }
}
