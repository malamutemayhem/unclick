export interface Process {
  id: number;
  name: string;
  burstTime: number;
  arrivalTime: number;
  priority: number;
  remaining: number;
  completionTime: number;
  waitTime: number;
  turnaroundTime: number;
  started: boolean;
}

export interface ScheduleResult {
  processes: Process[];
  timeline: Array<{ time: number; processId: number | null }>;
  avgWaitTime: number;
  avgTurnaroundTime: number;
  throughput: number;
}

function createProcess(id: number, name: string, burstTime: number, arrivalTime: number, priority = 0): Process {
  return {
    id, name, burstTime, arrivalTime, priority,
    remaining: burstTime, completionTime: 0, waitTime: 0, turnaroundTime: 0, started: false,
  };
}

export function defineProcesses(defs: Array<{ name: string; burst: number; arrival: number; priority?: number }>): Process[] {
  return defs.map((d, i) => createProcess(i, d.name, d.burst, d.arrival, d.priority ?? 0));
}

function finalize(processes: Process[], timeline: Array<{ time: number; processId: number | null }>): ScheduleResult {
  for (const p of processes) {
    p.turnaroundTime = p.completionTime - p.arrivalTime;
    p.waitTime = p.turnaroundTime - p.burstTime;
  }
  const n = processes.length;
  const totalTime = timeline.length > 0 ? timeline[timeline.length - 1].time + 1 : 0;
  return {
    processes,
    timeline,
    avgWaitTime: n > 0 ? processes.reduce((s, p) => s + p.waitTime, 0) / n : 0,
    avgTurnaroundTime: n > 0 ? processes.reduce((s, p) => s + p.turnaroundTime, 0) / n : 0,
    throughput: totalTime > 0 ? n / totalTime : 0,
  };
}

export function fcfs(input: Process[]): ScheduleResult {
  const procs = input.map((p) => ({ ...p }));
  procs.sort((a, b) => a.arrivalTime - b.arrivalTime);
  const timeline: Array<{ time: number; processId: number | null }> = [];
  let time = 0;

  for (const p of procs) {
    if (time < p.arrivalTime) {
      for (let t = time; t < p.arrivalTime; t++) timeline.push({ time: t, processId: null });
      time = p.arrivalTime;
    }
    for (let t = 0; t < p.burstTime; t++) {
      timeline.push({ time: time + t, processId: p.id });
    }
    time += p.burstTime;
    p.completionTime = time;
    p.remaining = 0;
  }

  return finalize(procs, timeline);
}

export function sjf(input: Process[]): ScheduleResult {
  const procs = input.map((p) => ({ ...p }));
  const timeline: Array<{ time: number; processId: number | null }> = [];
  const done = new Set<number>();
  let time = 0;

  while (done.size < procs.length) {
    const ready = procs.filter((p) => p.arrivalTime <= time && !done.has(p.id));
    if (ready.length === 0) {
      timeline.push({ time, processId: null });
      time++;
      continue;
    }
    ready.sort((a, b) => a.burstTime - b.burstTime);
    const p = ready[0];
    for (let t = 0; t < p.burstTime; t++) {
      timeline.push({ time: time + t, processId: p.id });
    }
    time += p.burstTime;
    p.completionTime = time;
    p.remaining = 0;
    done.add(p.id);
  }

  return finalize(procs, timeline);
}

export function roundRobin(input: Process[], quantum: number): ScheduleResult {
  const procs = input.map((p) => ({ ...p }));
  const timeline: Array<{ time: number; processId: number | null }> = [];
  const queue: Process[] = [];
  let time = 0;
  const arriving = [...procs].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let nextArrival = 0;

  while (nextArrival < arriving.length && arriving[nextArrival].arrivalTime <= time) {
    queue.push(arriving[nextArrival++]);
  }

  while (queue.length > 0 || nextArrival < arriving.length) {
    if (queue.length === 0) {
      timeline.push({ time, processId: null });
      time++;
      while (nextArrival < arriving.length && arriving[nextArrival].arrivalTime <= time) {
        queue.push(arriving[nextArrival++]);
      }
      continue;
    }

    const p = queue.shift()!;
    const slice = Math.min(quantum, p.remaining);

    for (let t = 0; t < slice; t++) {
      timeline.push({ time: time + t, processId: p.id });
    }
    time += slice;
    p.remaining -= slice;

    while (nextArrival < arriving.length && arriving[nextArrival].arrivalTime <= time) {
      queue.push(arriving[nextArrival++]);
    }

    if (p.remaining > 0) {
      queue.push(p);
    } else {
      p.completionTime = time;
    }
  }

  return finalize(procs, timeline);
}

export function prioritySchedule(input: Process[]): ScheduleResult {
  const procs = input.map((p) => ({ ...p }));
  const timeline: Array<{ time: number; processId: number | null }> = [];
  const done = new Set<number>();
  let time = 0;

  while (done.size < procs.length) {
    const ready = procs.filter((p) => p.arrivalTime <= time && !done.has(p.id));
    if (ready.length === 0) {
      timeline.push({ time, processId: null });
      time++;
      continue;
    }
    ready.sort((a, b) => b.priority - a.priority || a.arrivalTime - b.arrivalTime);
    const p = ready[0];
    for (let t = 0; t < p.burstTime; t++) {
      timeline.push({ time: time + t, processId: p.id });
    }
    time += p.burstTime;
    p.completionTime = time;
    p.remaining = 0;
    done.add(p.id);
  }

  return finalize(procs, timeline);
}
