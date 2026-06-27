import { describe, it, expect } from "vitest";
import { BudgetTracker } from "../budget-tracker.js";

describe("BudgetTracker", () => {
  it("sets income", () => {
    const bt = new BudgetTracker();
    bt.setIncome(5000);
    expect(bt.getIncome()).toBe(5000);
  });

  it("adds categories with allocations", () => {
    const bt = new BudgetTracker();
    bt.addCategory("Food", 500);
    bt.addCategory("Rent", 1500);
    expect(bt.categoryCount()).toBe(2);
    expect(bt.totalAllocated()).toBe(2000);
  });

  it("tracks expenses", () => {
    const bt = new BudgetTracker();
    bt.addCategory("Food", 500);
    bt.addExpense("Food", 50, "Groceries", "2024-01-01");
    bt.addExpense("Food", 30, "Restaurant", "2024-01-02");
    expect(bt.getCategory("Food")!.spent).toBe(80);
  });

  it("calculates remaining budget", () => {
    const bt = new BudgetTracker();
    bt.setIncome(5000);
    bt.addCategory("Food", 500);
    bt.addExpense("Food", 200, "Groceries", "2024-01-01");
    expect(bt.remaining()).toBe(4800);
    expect(bt.categoryRemaining("Food")).toBe(300);
  });

  it("detects over-budget categories", () => {
    const bt = new BudgetTracker();
    bt.addCategory("Entertainment", 100);
    bt.addExpense("Entertainment", 150, "Concert", "2024-01-01");
    expect(bt.overBudgetCategories().length).toBe(1);
  });

  it("calculates utilization rate", () => {
    const bt = new BudgetTracker();
    bt.addCategory("Food", 500);
    bt.addExpense("Food", 250, "Groceries", "2024-01-01");
    expect(bt.utilizationRate("Food")).toBeCloseTo(0.5);
  });

  it("calculates savings rate", () => {
    const bt = new BudgetTracker();
    bt.setIncome(5000);
    bt.addCategory("Expenses", 3000);
    bt.addExpense("Expenses", 3000, "Total", "2024-01-01");
    expect(bt.savingsRate()).toBeCloseTo(0.4);
  });

  it("lists entries by category", () => {
    const bt = new BudgetTracker();
    bt.addCategory("Food", 500);
    bt.addCategory("Transport", 200);
    bt.addExpense("Food", 50, "Lunch", "2024-01-01");
    bt.addExpense("Transport", 30, "Bus", "2024-01-01");
    bt.addExpense("Food", 40, "Dinner", "2024-01-02");
    expect(bt.entriesByCategory("Food").length).toBe(2);
  });

  it("provides summary", () => {
    const bt = new BudgetTracker();
    bt.addCategory("Food", 500);
    bt.addExpense("Food", 200, "Groceries", "2024-01-01");
    const summary = bt.summary();
    expect(summary.length).toBe(1);
    expect(summary[0].remaining).toBe(300);
  });

  it("rejects expense for unknown category", () => {
    const bt = new BudgetTracker();
    expect(bt.addExpense("Unknown", 50, "Test", "2024-01-01")).toBe(false);
  });

  it("calculates unallocated income", () => {
    const bt = new BudgetTracker();
    bt.setIncome(5000);
    bt.addCategory("Rent", 1500);
    expect(bt.unallocated()).toBe(3500);
  });
});
