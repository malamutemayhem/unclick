export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
}

export interface BudgetEntry {
  category: string;
  amount: number;
  description: string;
  date: string;
}

export class BudgetTracker {
  private categories: Map<string, BudgetCategory> = new Map();
  private entries: BudgetEntry[] = [];
  private income = 0;

  setIncome(amount: number): void {
    this.income = amount;
  }

  getIncome(): number {
    return this.income;
  }

  addCategory(name: string, allocated: number): void {
    this.categories.set(name, { name, allocated, spent: 0 });
  }

  removeCategory(name: string): boolean {
    return this.categories.delete(name);
  }

  addExpense(category: string, amount: number, description: string, date: string): boolean {
    const cat = this.categories.get(category);
    if (!cat) return false;
    cat.spent += amount;
    this.entries.push({ category, amount, description, date });
    return true;
  }

  getCategory(name: string): BudgetCategory | undefined {
    return this.categories.get(name);
  }

  categoryCount(): number {
    return this.categories.size;
  }

  totalAllocated(): number {
    let total = 0;
    for (const cat of this.categories.values()) {
      total += cat.allocated;
    }
    return total;
  }

  totalSpent(): number {
    let total = 0;
    for (const cat of this.categories.values()) {
      total += cat.spent;
    }
    return total;
  }

  remaining(): number {
    return this.income - this.totalSpent();
  }

  unallocated(): number {
    return this.income - this.totalAllocated();
  }

  categoryRemaining(name: string): number {
    const cat = this.categories.get(name);
    if (!cat) return 0;
    return cat.allocated - cat.spent;
  }

  overBudgetCategories(): BudgetCategory[] {
    return Array.from(this.categories.values()).filter((c) => c.spent > c.allocated);
  }

  utilizationRate(name: string): number {
    const cat = this.categories.get(name);
    if (!cat || cat.allocated === 0) return 0;
    return cat.spent / cat.allocated;
  }

  entriesByCategory(name: string): BudgetEntry[] {
    return this.entries.filter((e) => e.category === name);
  }

  savingsRate(): number {
    if (this.income === 0) return 0;
    return (this.income - this.totalSpent()) / this.income;
  }

  summary(): Array<{
    name: string;
    allocated: number;
    spent: number;
    remaining: number;
    utilization: number;
  }> {
    return Array.from(this.categories.values()).map((c) => ({
      name: c.name,
      allocated: c.allocated,
      spent: c.spent,
      remaining: c.allocated - c.spent,
      utilization: c.allocated > 0 ? c.spent / c.allocated : 0,
    }));
  }
}
