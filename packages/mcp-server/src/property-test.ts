export interface Gen<T> {
  generate(rng: PRNG, size: number): T;
  map<U>(fn: (v: T) => U): Gen<U>;
  filter(fn: (v: T) => boolean): Gen<T>;
  chain<U>(fn: (v: T) => Gen<U>): Gen<U>;
}

export class PRNG {
  private state: number;

  constructor(seed: number = Date.now()) {
    this.state = seed;
  }

  next(): number {
    this.state = (this.state * 1664525 + 1013904223) & 0xffffffff;
    return (this.state >>> 0) / 0x100000000;
  }

  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(arr: T[]): T {
    return arr[this.int(0, arr.length - 1)];
  }
}

function makeGen<T>(fn: (rng: PRNG, size: number) => T): Gen<T> {
  return {
    generate: fn,
    map<U>(mapper: (v: T) => U): Gen<U> {
      return makeGen((rng, size) => mapper(fn(rng, size)));
    },
    filter(pred: (v: T) => boolean): Gen<T> {
      return makeGen((rng, size) => {
        for (let i = 0; i < 1000; i++) {
          const v = fn(rng, size);
          if (pred(v)) return v;
        }
        throw new Error("Could not generate value satisfying filter after 1000 attempts");
      });
    },
    chain<U>(mapper: (v: T) => Gen<U>): Gen<U> {
      return makeGen((rng, size) => mapper(fn(rng, size)).generate(rng, size));
    },
  };
}

export const Arb = {
  int(min = -100, max = 100): Gen<number> {
    return makeGen((rng, size) => {
      const lo = Math.max(min, -size);
      const hi = Math.min(max, size);
      return rng.int(lo, hi);
    });
  },

  nat(max = 100): Gen<number> {
    return Arb.int(0, max);
  },

  float(min = -1e6, max = 1e6): Gen<number> {
    return makeGen((rng) => rng.next() * (max - min) + min);
  },

  bool(): Gen<boolean> {
    return makeGen((rng) => rng.next() > 0.5);
  },

  string(maxLen = 20): Gen<string> {
    return makeGen((rng, size) => {
      const len = rng.int(0, Math.min(maxLen, size));
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let s = "";
      for (let i = 0; i < len; i++) s += chars[rng.int(0, chars.length - 1)];
      return s;
    });
  },

  char(): Gen<string> {
    return makeGen((rng) => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return chars[rng.int(0, chars.length - 1)];
    });
  },

  array<T>(gen: Gen<T>, maxLen = 20): Gen<T[]> {
    return makeGen((rng, size) => {
      const len = rng.int(0, Math.min(maxLen, size));
      const arr: T[] = [];
      for (let i = 0; i < len; i++) arr.push(gen.generate(rng, size));
      return arr;
    });
  },

  tuple<A, B>(a: Gen<A>, b: Gen<B>): Gen<[A, B]> {
    return makeGen((rng, size) => [a.generate(rng, size), b.generate(rng, size)]);
  },

  oneOf<T>(...gens: Gen<T>[]): Gen<T> {
    return makeGen((rng, size) => rng.pick(gens).generate(rng, size));
  },

  constant<T>(value: T): Gen<T> {
    return makeGen(() => value);
  },

  record<T extends Record<string, unknown>>(shape: { [K in keyof T]: Gen<T[K]> }): Gen<T> {
    return makeGen((rng, size) => {
      const result: Partial<T> = {};
      for (const key of Object.keys(shape) as (keyof T)[]) {
        result[key] = shape[key].generate(rng, size);
      }
      return result as T;
    });
  },
};

export interface PropertyResult {
  success: boolean;
  numTests: number;
  seed: number;
  counterexample?: unknown;
  error?: string;
}

export interface CheckOptions {
  numTests?: number;
  seed?: number;
  maxSize?: number;
}

export function check<T>(gen: Gen<T>, prop: (v: T) => boolean | void, opts: CheckOptions = {}): PropertyResult {
  const numTests = opts.numTests ?? 100;
  const seed = opts.seed ?? 42;
  const maxSize = opts.maxSize ?? 100;
  const rng = new PRNG(seed);

  for (let i = 0; i < numTests; i++) {
    const size = Math.floor((i / numTests) * maxSize) + 1;
    const value = gen.generate(rng, size);
    try {
      const result = prop(value);
      if (result === false) {
        return { success: false, numTests: i + 1, seed, counterexample: value };
      }
    } catch (e) {
      return {
        success: false,
        numTests: i + 1,
        seed,
        counterexample: value,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  return { success: true, numTests, seed };
}

export function assert<T>(gen: Gen<T>, prop: (v: T) => boolean | void, opts: CheckOptions = {}): void {
  const result = check(gen, prop, opts);
  if (!result.success) {
    const msg = result.error
      ? `Property failed after ${result.numTests} tests (seed=${result.seed}): ${result.error}\nCounterexample: ${JSON.stringify(result.counterexample)}`
      : `Property failed after ${result.numTests} tests (seed=${result.seed})\nCounterexample: ${JSON.stringify(result.counterexample)}`;
    throw new Error(msg);
  }
}

export function sample<T>(gen: Gen<T>, count = 10, seed = 42): T[] {
  const rng = new PRNG(seed);
  const values: T[] = [];
  for (let i = 0; i < count; i++) {
    values.push(gen.generate(rng, i + 1));
  }
  return values;
}
