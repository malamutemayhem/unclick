export interface KanbanItem {
  id: string;
  column: string;
  enteredAt: number;
  completedAt?: number;
}

export interface ColumnMetrics {
  column: string;
  count: number;
  avgTime: number;
  wipLimit?: number;
  overLimit: boolean;
}

export class KanbanMetrics {
  private items: KanbanItem[] = [];
  private wipLimits: Map<string, number> = new Map();

  addItem(item: KanbanItem): void {
    this.items.push(item);
  }

  setWipLimit(column: string, limit: number): void {
    this.wipLimits.set(column, limit);
  }

  columnCounts(): Map<string, number> {
    const counts = new Map<string, number>();
    for (const item of this.items) {
      if (!item.completedAt) {
        counts.set(item.column, (counts.get(item.column) || 0) + 1);
      }
    }
    return counts;
  }

  columnMetrics(): ColumnMetrics[] {
    const counts = this.columnCounts();
    const columns = [...new Set(this.items.map((i) => i.column))];
    const now = Date.now();

    return columns.map((column) => {
      const colItems = this.items.filter((i) => i.column === column);
      const times = colItems.map((i) => (i.completedAt || now) - i.enteredAt);
      const avgTime = times.length === 0 ? 0 : Math.round(times.reduce((s, t) => s + t, 0) / times.length);
      const count = counts.get(column) || 0;
      const wipLimit = this.wipLimits.get(column);
      return {
        column,
        count,
        avgTime,
        wipLimit,
        overLimit: wipLimit !== undefined && count > wipLimit,
      };
    });
  }

  leadTime(): number {
    const completed = this.items.filter((i) => i.completedAt);
    if (completed.length === 0) return 0;
    const times = completed.map((i) => i.completedAt! - i.enteredAt);
    return Math.round(times.reduce((s, t) => s + t, 0) / times.length);
  }

  cycleTime(startColumn: string): number {
    const relevant = this.items.filter((i) => i.completedAt);
    if (relevant.length === 0) return 0;
    const times = relevant.map((i) => i.completedAt! - i.enteredAt);
    return Math.round(times.reduce((s, t) => s + t, 0) / times.length);
  }

  throughput(periodMs: number): number {
    const now = Date.now();
    const completed = this.items.filter(
      (i) => i.completedAt && i.completedAt >= now - periodMs,
    );
    return completed.length;
  }

  wipViolations(): Array<{ column: string; count: number; limit: number }> {
    const counts = this.columnCounts();
    const violations: Array<{ column: string; count: number; limit: number }> = [];
    for (const [column, limit] of this.wipLimits) {
      const count = counts.get(column) || 0;
      if (count > limit) {
        violations.push({ column, count, limit });
      }
    }
    return violations;
  }

  flowEfficiency(): number {
    const completed = this.items.filter((i) => i.completedAt);
    if (completed.length === 0) return 0;
    const totalTime = completed.reduce((s, i) => s + (i.completedAt! - i.enteredAt), 0);
    return totalTime === 0 ? 0 : Math.round((totalTime / totalTime) * 1000) / 10;
  }

  cumulativeFlow(columns: string[]): Map<string, number> {
    const result = new Map<string, number>();
    for (const col of columns) {
      result.set(col, this.items.filter((i) => i.column === col).length);
    }
    return result;
  }

  itemCount(): number {
    return this.items.length;
  }

  activeItems(): KanbanItem[] {
    return this.items.filter((i) => !i.completedAt);
  }
}
