export type Transform<I, O> = (input: I) => O;

export class DataPipeline<I, O> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private steps: Array<{ name: string; transform: Transform<any, any> }> = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pipe<N>(name: string, transform: Transform<O, N>): DataPipeline<I, N> {
    this.steps.push({ name, transform });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this as any;
  }

  run(input: I): O {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = input;
    for (const step of this.steps) {
      value = step.transform(value);
    }
    return value as O;
  }

  runBatch(inputs: I[]): O[] {
    return inputs.map((i) => this.run(i));
  }

  get stepCount(): number {
    return this.steps.length;
  }

  stepNames(): string[] {
    return this.steps.map((s) => s.name);
  }
}

export function createPipeline<T>(): DataPipeline<T, T> {
  return new DataPipeline();
}

export function mapTransform<T, U>(fn: (item: T) => U): Transform<T[], U[]> {
  return (items) => items.map(fn);
}

export function filterTransform<T>(predicate: (item: T) => boolean): Transform<T[], T[]> {
  return (items) => items.filter(predicate);
}

export function groupByTransform<T>(keyFn: (item: T) => string): Transform<T[], Record<string, T[]>> {
  return (items) => {
    const groups: Record<string, T[]> = {};
    for (const item of items) {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }
    return groups;
  };
}

export function sortTransform<T>(compareFn: (a: T, b: T) => number): Transform<T[], T[]> {
  return (items) => [...items].sort(compareFn);
}
