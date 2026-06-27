export type StoryStatus = "backlog" | "todo" | "in-progress" | "review" | "done";

export interface UserStory {
  id: string;
  title: string;
  points: number;
  status: StoryStatus;
  assignee?: string;
  priority: number;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  stories: UserStory[];
  velocity: number;
}

export class SprintPlanner {
  private sprints: Map<string, Sprint> = new Map();
  private backlog: UserStory[] = [];

  addToBacklog(story: UserStory): void {
    this.backlog.push({ ...story, status: "backlog" });
  }

  backlogSize(): number {
    return this.backlog.length;
  }

  backlogPoints(): number {
    return this.backlog.reduce((sum, s) => sum + s.points, 0);
  }

  createSprint(id: string, name: string, startDate: number, endDate: number, velocity: number): Sprint {
    const sprint: Sprint = { id, name, startDate, endDate, stories: [], velocity };
    this.sprints.set(id, sprint);
    return sprint;
  }

  addToSprint(sprintId: string, storyId: string): boolean {
    const sprint = this.sprints.get(sprintId);
    if (!sprint) return false;
    const idx = this.backlog.findIndex((s) => s.id === storyId);
    if (idx < 0) return false;
    const currentPoints = sprint.stories.reduce((sum, s) => sum + s.points, 0);
    if (currentPoints + this.backlog[idx].points > sprint.velocity) return false;
    const story = this.backlog.splice(idx, 1)[0];
    story.status = "todo";
    sprint.stories.push(story);
    return true;
  }

  updateStoryStatus(sprintId: string, storyId: string, status: StoryStatus): boolean {
    const sprint = this.sprints.get(sprintId);
    if (!sprint) return false;
    const story = sprint.stories.find((s) => s.id === storyId);
    if (!story) return false;
    story.status = status;
    return true;
  }

  sprintProgress(sprintId: string): number {
    const sprint = this.sprints.get(sprintId);
    if (!sprint || sprint.stories.length === 0) return 0;
    const donePoints = sprint.stories
      .filter((s) => s.status === "done")
      .reduce((sum, s) => sum + s.points, 0);
    const totalPoints = sprint.stories.reduce((sum, s) => sum + s.points, 0);
    return totalPoints > 0 ? donePoints / totalPoints : 0;
  }

  sprintVelocity(sprintId: string): number {
    const sprint = this.sprints.get(sprintId);
    if (!sprint) return 0;
    return sprint.stories
      .filter((s) => s.status === "done")
      .reduce((sum, s) => sum + s.points, 0);
  }

  remainingCapacity(sprintId: string): number {
    const sprint = this.sprints.get(sprintId);
    if (!sprint) return 0;
    const used = sprint.stories.reduce((sum, s) => sum + s.points, 0);
    return sprint.velocity - used;
  }

  getSprint(id: string): Sprint | undefined {
    return this.sprints.get(id);
  }

  sprintCount(): number {
    return this.sprints.size;
  }

  averageVelocity(): number {
    if (this.sprints.size === 0) return 0;
    let total = 0;
    for (const sprint of this.sprints.values()) {
      total += sprint.stories
        .filter((s) => s.status === "done")
        .reduce((sum, s) => sum + s.points, 0);
    }
    return total / this.sprints.size;
  }

  sprintsToComplete(): number {
    const avgVelocity = this.averageVelocity();
    if (avgVelocity === 0) return Infinity;
    return Math.ceil(this.backlogPoints() / avgVelocity);
  }

  burndown(sprintId: string): Array<{ story: string; points: number; remaining: number }> {
    const sprint = this.sprints.get(sprintId);
    if (!sprint) return [];
    let remaining = sprint.stories.reduce((sum, s) => sum + s.points, 0);
    const entries: Array<{ story: string; points: number; remaining: number }> = [];
    for (const story of sprint.stories.filter((s) => s.status === "done")) {
      remaining -= story.points;
      entries.push({ story: story.id, points: story.points, remaining });
    }
    return entries;
  }
}
