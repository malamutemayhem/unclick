import { describe, it, expect } from "vitest";
import { GameEconomy } from "../game-economy.js";

describe("GameEconomy", () => {
  it("creates accounts and deposits", () => {
    const eco = new GameEconomy();
    eco.registerCurrency("gold");
    eco.createAccount("player1");
    eco.deposit("player1", "gold", 100);
    expect(eco.getBalance("player1", "gold")).toBe(100);
  });

  it("withdraws funds", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    expect(eco.withdraw("p1", "gold", 50)).toBe(true);
    expect(eco.getBalance("p1", "gold")).toBe(50);
  });

  it("prevents overdraft", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 10);
    expect(eco.withdraw("p1", "gold", 20)).toBe(false);
    expect(eco.getBalance("p1", "gold")).toBe(10);
  });

  it("transfers between accounts", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    eco.createAccount("p2");
    expect(eco.transfer("p1", "p2", "gold", 30)).toBe(true);
    expect(eco.getBalance("p1", "gold")).toBe(70);
    expect(eco.getBalance("p2", "gold")).toBe(30);
  });

  it("tracks transaction history", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    eco.withdraw("p1", "gold", 10);
    expect(eco.transactionHistory("p1").length).toBe(2);
  });

  it("computes total supply", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    eco.deposit("p2", "gold", 200);
    expect(eco.totalSupply("gold")).toBe(300);
  });

  it("finds richest account", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    eco.deposit("p2", "gold", 300);
    expect(eco.richestAccount("gold")).toBe("p2");
  });

  it("tracks all balances for account", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    eco.deposit("p1", "gems", 5);
    const all = eco.getAllBalances("p1");
    expect(all.gold).toBe(100);
    expect(all.gems).toBe(5);
  });

  it("rejects invalid amounts", () => {
    const eco = new GameEconomy();
    expect(eco.deposit("p1", "gold", -10)).toBe(false);
    expect(eco.withdraw("p1", "gold", 0)).toBe(false);
  });

  it("counts accounts and transactions", () => {
    const eco = new GameEconomy();
    eco.deposit("p1", "gold", 100);
    eco.deposit("p2", "gold", 50);
    expect(eco.accountCount()).toBe(2);
    expect(eco.transactionCount()).toBe(2);
  });
});
