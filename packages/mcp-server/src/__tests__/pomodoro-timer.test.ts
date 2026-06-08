import { describe, it, expect } from "vitest";
import { PomodoroTimer } from "../pomodoro-timer.js";

describe("PomodoroTimer", () => {
  it("plan creates work and break sessions", () => {
    const sessions = PomodoroTimer.plan(120);
    const workSessions = sessions.filter((s) => s.type === "work");
    const breakSessions = sessions.filter((s) => s.type !== "work");
    expect(workSessions.length).toBeGreaterThan(0);
    expect(breakSessions.length).toBeGreaterThan(0);
  });

  it("plan includes long break after 4 work sessions", () => {
    const sessions = PomodoroTimer.plan(150);
    const longBreaks = sessions.filter((s) => s.type === "long_break");
    expect(longBreaks.length).toBeGreaterThan(0);
  });

  it("plan respects custom config", () => {
    const config = { workDuration: 50, shortBreakDuration: 10, longBreakDuration: 30, sessionsBeforeLongBreak: 2 };
    const sessions = PomodoroTimer.plan(120, config);
    const work = sessions.filter((s) => s.type === "work");
    expect(work[0].duration).toBe(50);
  });

  it("stats calculates work and break totals", () => {
    const sessions = PomodoroTimer.plan(100);
    sessions.forEach((s) => { s.completed = true; });
    const stats = PomodoroTimer.stats(sessions);
    expect(stats.totalWorkMinutes).toBeGreaterThanOrEqual(100);
    expect(stats.completedPomodoros).toBeGreaterThan(0);
    expect(stats.focusRatio).toBeGreaterThan(0);
  });

  it("stats tracks longest streak", () => {
    const sessions = [
      { type: "work" as const, duration: 25, completed: true },
      { type: "short_break" as const, duration: 5, completed: true },
      { type: "work" as const, duration: 25, completed: true },
      { type: "short_break" as const, duration: 5, completed: true },
      { type: "work" as const, duration: 25, completed: false },
    ];
    const stats = PomodoroTimer.stats(sessions);
    expect(stats.longestStreak).toBe(2);
  });

  it("estimatePomodoros calculates count", () => {
    expect(PomodoroTimer.estimatePomodoros(60)).toBe(3);
    expect(PomodoroTimer.estimatePomodoros(30)).toBe(2);
  });

  it("totalTime includes breaks", () => {
    const time = PomodoroTimer.totalTime(4);
    expect(time).toBe(25 * 4 + 5 * 3);
  });

  it("dailyCapacity fits pomodoros in available time", () => {
    const cap = PomodoroTimer.dailyCapacity(4);
    expect(cap.pomodoros).toBeGreaterThan(0);
    expect(cap.workMinutes + cap.breakMinutes).toBeLessThanOrEqual(240);
  });

  it("render formats sessions", () => {
    const sessions = PomodoroTimer.plan(60);
    const output = PomodoroTimer.render(sessions);
    expect(output).toContain("[W]");
    expect(output).toContain("min");
  });
});
