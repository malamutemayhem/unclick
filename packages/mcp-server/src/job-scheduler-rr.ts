export interface Job {
  id: string;
  burstTime: number;
  arrivalTime: number;
}

export interface ScheduleResult {
  id: string;
  start: number;
  end: number;
}

export interface ScheduleMetrics {
  schedule: ScheduleResult[];
  avgWaitTime: number;
  avgTurnaroundTime: number;
}

export class RoundRobinScheduler {
  static schedule(jobs: Job[], quantum: number): ScheduleMetrics {
    if (jobs.length === 0) {
      return { schedule: [], avgWaitTime: 0, avgTurnaroundTime: 0 };
    }

    const sorted = [...jobs].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const remaining = new Map<string, number>();
    for (const j of sorted) remaining.set(j.id, j.burstTime);

    const schedule: ScheduleResult[] = [];
    const queue: string[] = [];
    const arrivals = new Map<string, number>();
    for (const j of sorted) arrivals.set(j.id, j.arrivalTime);

    let time = sorted[0].arrivalTime;
    let nextArrival = 0;

    while (nextArrival < sorted.length && sorted[nextArrival].arrivalTime <= time) {
      queue.push(sorted[nextArrival].id);
      nextArrival++;
    }

    while (queue.length > 0 || nextArrival < sorted.length) {
      if (queue.length === 0) {
        time = sorted[nextArrival].arrivalTime;
        while (nextArrival < sorted.length && sorted[nextArrival].arrivalTime <= time) {
          queue.push(sorted[nextArrival].id);
          nextArrival++;
        }
      }

      const jobId = queue.shift()!;
      const rem = remaining.get(jobId)!;
      const execTime = Math.min(rem, quantum);
      const start = time;
      time += execTime;
      schedule.push({ id: jobId, start, end: time });
      remaining.set(jobId, rem - execTime);

      while (nextArrival < sorted.length && sorted[nextArrival].arrivalTime <= time) {
        queue.push(sorted[nextArrival].id);
        nextArrival++;
      }

      if (remaining.get(jobId)! > 0) {
        queue.push(jobId);
      }
    }

    const completionTime = new Map<string, number>();
    for (const s of schedule) {
      completionTime.set(s.id, s.end);
    }

    let totalWait = 0;
    let totalTurnaround = 0;
    for (const j of sorted) {
      const ct = completionTime.get(j.id)!;
      const turnaround = ct - j.arrivalTime;
      const wait = turnaround - j.burstTime;
      totalTurnaround += turnaround;
      totalWait += wait;
    }

    return {
      schedule,
      avgWaitTime: totalWait / sorted.length,
      avgTurnaroundTime: totalTurnaround / sorted.length,
    };
  }
}
