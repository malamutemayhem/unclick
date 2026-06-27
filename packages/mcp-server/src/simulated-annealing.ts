export interface SAConfig<T> {
  initial: T;
  energy: (state: T) => number;
  neighbor: (state: T) => T;
  temperature: number;
  coolingRate: number;
  minTemperature?: number;
  maxIterations?: number;
}

export interface SAResult<T> {
  best: T;
  bestEnergy: number;
  iterations: number;
  finalTemperature: number;
}

export function anneal<T>(config: SAConfig<T>): SAResult<T> {
  const {
    initial,
    energy,
    neighbor,
    coolingRate,
    minTemperature = 1e-10,
    maxIterations = 100000,
  } = config;

  let temp = config.temperature;
  let current = initial;
  let currentEnergy = energy(current);
  let best = current;
  let bestEnergy = currentEnergy;
  let iterations = 0;

  while (temp > minTemperature && iterations < maxIterations) {
    const candidate = neighbor(current);
    const candidateEnergy = energy(candidate);
    const delta = candidateEnergy - currentEnergy;

    if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
      current = candidate;
      currentEnergy = candidateEnergy;
    }

    if (currentEnergy < bestEnergy) {
      best = current;
      bestEnergy = currentEnergy;
    }

    temp *= 1 - coolingRate;
    iterations++;
  }

  return { best, bestEnergy, iterations, finalTemperature: temp };
}

export function linearSchedule(
  initial: number,
  final: number,
  steps: number,
): (step: number) => number {
  const rate = (initial - final) / steps;
  return (step: number) => Math.max(final, initial - rate * step);
}

export function exponentialSchedule(
  initial: number,
  decay: number,
): (step: number) => number {
  return (step: number) => initial * Math.pow(decay, step);
}

export function annealWithSchedule<T>(
  config: Omit<SAConfig<T>, "coolingRate" | "minTemperature"> & {
    schedule: (step: number) => number;
    maxIterations: number;
  },
): SAResult<T> {
  const { initial, energy, neighbor, schedule, maxIterations } = config;

  let current = initial;
  let currentEnergy = energy(current);
  let best = current;
  let bestEnergy = currentEnergy;

  for (let i = 0; i < maxIterations; i++) {
    const temp = schedule(i);
    if (temp <= 0) break;

    const candidate = neighbor(current);
    const candidateEnergy = energy(candidate);
    const delta = candidateEnergy - currentEnergy;

    if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
      current = candidate;
      currentEnergy = candidateEnergy;
    }

    if (currentEnergy < bestEnergy) {
      best = current;
      bestEnergy = currentEnergy;
    }
  }

  return {
    best,
    bestEnergy,
    iterations: maxIterations,
    finalTemperature: schedule(maxIterations - 1),
  };
}
