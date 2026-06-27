export type Cont<A, R> = (k: (a: A) => R) => R;

export function pure<A, R>(a: A): Cont<A, R> {
  return (k) => k(a);
}

export function bind<A, B, R>(ma: Cont<A, R>, f: (a: A) => Cont<B, R>): Cont<B, R> {
  return (k) => ma((a) => f(a)(k));
}

export function map<A, B, R>(ma: Cont<A, R>, f: (a: A) => B): Cont<B, R> {
  return bind(ma, (a) => pure(f(a)));
}

export function run<A>(ma: Cont<A, A>): A {
  return ma((a) => a);
}

export function callCC<A, R>(f: (exit: (a: A) => Cont<never, R>) => Cont<A, R>): Cont<A, R> {
  return (k) => {
    const exit = (a: A): Cont<never, R> => (_) => k(a);
    return f(exit)(k);
  };
}

export function sequence<A, R>(conts: Cont<A, R>[]): Cont<A[], R> {
  return conts.reduce<Cont<A[], R>>(
    (acc, cont) => bind(acc, (arr) => map(cont, (a) => [...arr, a])),
    pure([])
  );
}

export type CPS<A> = (callback: (result: A) => void) => void;

export function cpsPure<A>(a: A): CPS<A> {
  return (cb) => cb(a);
}

export function cpsBind<A, B>(ma: CPS<A>, f: (a: A) => CPS<B>): CPS<B> {
  return (cb) => ma((a) => f(a)(cb));
}

export function cpsMap<A, B>(ma: CPS<A>, f: (a: A) => B): CPS<B> {
  return cpsBind(ma, (a) => cpsPure(f(a)));
}

export function cpsAll<A>(tasks: CPS<A>[]): CPS<A[]> {
  return (cb) => {
    if (tasks.length === 0) return cb([]);
    const results: A[] = new Array(tasks.length);
    let completed = 0;
    tasks.forEach((task, i) => {
      task((result) => {
        results[i] = result;
        completed++;
        if (completed === tasks.length) cb(results);
      });
    });
  };
}

export function cpsRace<A>(tasks: CPS<A>[]): CPS<A> {
  return (cb) => {
    let done = false;
    for (const task of tasks) {
      task((result) => {
        if (!done) {
          done = true;
          cb(result);
        }
      });
    }
  };
}

export function cpsDelay<A>(ms: number, value: A): CPS<A> {
  return (cb) => setTimeout(() => cb(value), ms);
}

export function trampoline<A>(fn: () => A | (() => A | (() => A))): A {
  let result: unknown = fn;
  while (typeof result === "function") {
    result = (result as () => unknown)();
  }
  return result as A;
}

export function thunk<A>(fn: () => A): () => A {
  let cached: A | undefined;
  let computed = false;
  return () => {
    if (!computed) {
      cached = fn();
      computed = true;
    }
    return cached!;
  };
}
