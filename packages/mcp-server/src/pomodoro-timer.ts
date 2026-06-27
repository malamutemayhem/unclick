export interface PomodoroSession {
  type: "work" | "short_break" | "long_break";
  duration: number;
  startTime?: number;
  endTime?: number;
  completed: boolean;
  label?: string;
}

export interface PomodoroConfig {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

export interface PomodoroStats {
  totalWorkMinutes: number;
  totalBreakMinutes: number;
  completedPomodoros: number;
  focusRatio: number;
  longestStreak: number;
  averageWorkDuration: number;
}

export class PomodoroTimer {
  static readonly DEFAULT_CONFIG: PomodoroConfig = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
  };

  static plan(
    totalMinutes: number,
    config: PomodoroConfig = PomodoroTimer.DEFAULT_CONFIG,
  ): PomodoroSession[] {
    const sessions: PomodoroSession[] = [];
    let remaining = totalMinutes;
    let workCount = 0;

    while (remaining > 0) {
      const workTime = Math.min(config.workDuration, remaining);
      sessions.push({ type: "work", duration: workTime, completed: false });
      remaining -= workTime;
      workCount++;

      if (remaining <= 0) break;

      if (workCount % config.sessionsBeforeLongBreak === 0) {
        sessions.push({ type: "long_break", duration: config.longBreakDuration, completed: false });
      } else {
        sessions.push({ type: "short_break", duration: config.shortBreakDuration, completed: false });
      }
    }
    return sessions;
  }

  static stats(sessions: PomodoroSession[]): PomodoroStats {
    const workSessions = sessions.filter((s) => s.type === "work");
    const breakSessions = sessions.filter((s) => s.type !== "work");
    const completedWork = workSessions.filter((s) => s.completed);

    const totalWorkMinutes = workSessions.reduce((s, session) => s + session.duration, 0);
    const totalBreakMinutes = breakSessions.reduce((s, session) => s + session.duration, 0);
    const totalMinutes = totalWorkMinutes + totalBreakMinutes;

    let longestStreak = 0;
    let currentStreak = 0;
    for (const session of sessions) {
      if (session.type === "work" && session.completed) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (session.type === "work") {
        currentStreak = 0;
      }
    }

    return {
      totalWorkMinutes,
      totalBreakMinutes,
      completedPomodoros: completedWork.length,
      focusRatio: totalMinutes === 0 ? 0 : Math.round((totalWorkMinutes / totalMinutes) * 1000) / 10,
      longestStreak,
      averageWorkDuration: workSessions.length === 0 ? 0 :
        Math.round((totalWorkMinutes / workSessions.length) * 100) / 100,
    };
  }

  static estimatePomodoros(taskMinutes: number, config: PomodoroConfig = PomodoroTimer.DEFAULT_CONFIG): number {
    return Math.ceil(taskMinutes / config.workDuration);
  }

  static totalTime(pomodoros: number, config: PomodoroConfig = PomodoroTimer.DEFAULT_CONFIG): number {
    let total = 0;
    for (let i = 1; i <= pomodoros; i++) {
      total += config.workDuration;
      if (i < pomodoros) {
        total += i % config.sessionsBeforeLongBreak === 0
          ? config.longBreakDuration
          : config.shortBreakDuration;
      }
    }
    return total;
  }

  static dailyCapacity(
    availableHours: number,
    config: PomodoroConfig = PomodoroTimer.DEFAULT_CONFIG,
  ): { pomodoros: number; workMinutes: number; breakMinutes: number } {
    const totalMinutes = availableHours * 60;
    let pomodoros = 0;
    let workMinutes = 0;
    let breakMinutes = 0;

    while (workMinutes + breakMinutes + config.workDuration <= totalMinutes) {
      workMinutes += config.workDuration;
      pomodoros++;
      if (workMinutes + breakMinutes < totalMinutes) {
        const breakTime = pomodoros % config.sessionsBeforeLongBreak === 0
          ? config.longBreakDuration
          : config.shortBreakDuration;
        if (workMinutes + breakMinutes + breakTime <= totalMinutes) {
          breakMinutes += breakTime;
        }
      }
    }

    return { pomodoros, workMinutes, breakMinutes };
  }

  static render(sessions: PomodoroSession[]): string {
    return sessions
      .map((s, i) => {
        const icon = s.type === "work" ? "[W]" : s.type === "short_break" ? "[S]" : "[L]";
        const status = s.completed ? "done" : "pending";
        const label = s.label ? ` (${s.label})` : "";
        return `${i + 1}. ${icon} ${s.duration}min - ${status}${label}`;
      })
      .join("\n");
  }
}
