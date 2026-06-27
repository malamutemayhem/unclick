export interface Lens<S, A> {
  get(source: S): A;
  set(source: S, value: A): S;
  modify(source: S, fn: (a: A) => A): S;
  compose<B>(other: Lens<A, B>): Lens<S, B>;
}

export function lens<S, A>(
  getter: (s: S) => A,
  setter: (s: S, a: A) => S
): Lens<S, A> {
  return {
    get: getter,
    set: setter,
    modify(source: S, fn: (a: A) => A): S {
      return setter(source, fn(getter(source)));
    },
    compose<B>(other: Lens<A, B>): Lens<S, B> {
      return lens<S, B>(
        (s) => other.get(getter(s)),
        (s, b) => setter(s, other.set(getter(s), b))
      );
    },
  };
}

export function prop<S, K extends keyof S>(key: K): Lens<S, S[K]> {
  return lens(
    (s) => s[key],
    (s, v) => ({ ...s, [key]: v })
  );
}

export function index<T>(i: number): Lens<T[], T> {
  return lens(
    (arr) => arr[i],
    (arr, v) => {
      const result = [...arr];
      result[i] = v;
      return result;
    }
  );
}

export function at<V>(key: string): Lens<Record<string, V>, V | undefined> {
  return lens(
    (m) => m[key],
    (m, v) => {
      if (v === undefined) {
        const result = { ...m };
        delete result[key];
        return result;
      }
      return { ...m, [key]: v };
    }
  );
}

export interface Prism<S, A> {
  getOption(source: S): A | undefined;
  set(source: S, value: A): S;
  modify(source: S, fn: (a: A) => A): S;
}

export function prism<S, A>(
  getOption: (s: S) => A | undefined,
  set: (s: S, a: A) => S
): Prism<S, A> {
  return {
    getOption,
    set,
    modify(source: S, fn: (a: A) => A): S {
      const a = getOption(source);
      return a !== undefined ? set(source, fn(a)) : source;
    },
  };
}

export function head<T>(): Prism<T[], T> {
  return prism(
    (arr) => arr.length > 0 ? arr[0] : undefined,
    (arr, v) => arr.length > 0 ? [v, ...arr.slice(1)] : [v]
  );
}

export function last<T>(): Prism<T[], T> {
  return prism(
    (arr) => arr.length > 0 ? arr[arr.length - 1] : undefined,
    (arr, v) => arr.length > 0 ? [...arr.slice(0, -1), v] : [v]
  );
}

export interface Traversal<S, A> {
  getAll(source: S): A[];
  modify(source: S, fn: (a: A) => A): S;
}

export function each<T>(): Traversal<T[], T> {
  return {
    getAll: (arr) => [...arr],
    modify: (arr, fn) => arr.map(fn),
  };
}

export function filtered<T>(pred: (v: T) => boolean): Traversal<T[], T> {
  return {
    getAll: (arr) => arr.filter(pred),
    modify: (arr, fn) => arr.map((v) => pred(v) ? fn(v) : v),
  };
}

export function view<S, A>(l: Lens<S, A>, source: S): A {
  return l.get(source);
}

export function set<S, A>(l: Lens<S, A>, value: A, source: S): S {
  return l.set(source, value);
}

export function over<S, A>(l: Lens<S, A>, fn: (a: A) => A, source: S): S {
  return l.modify(source, fn);
}

export function path<S, A, B>(l1: Lens<S, A>, l2: Lens<A, B>): Lens<S, B> {
  return l1.compose(l2);
}

export function path3<S, A, B, C>(l1: Lens<S, A>, l2: Lens<A, B>, l3: Lens<B, C>): Lens<S, C> {
  return l1.compose(l2).compose(l3);
}
