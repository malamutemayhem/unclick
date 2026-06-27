export type Free<F, A> =
  | { kind: "pure"; value: A }
  | { kind: "suspend"; functor: F; next: (value: unknown) => Free<F, A> };

export function pureFree<F, A>(value: A): Free<F, A> {
  return { kind: "pure", value };
}

export function liftF<F>(functor: F): Free<F, unknown> {
  return { kind: "suspend", functor, next: (v) => pureFree(v) };
}

export function bindFree<F, A, B>(fa: Free<F, A>, fn: (a: A) => Free<F, B>): Free<F, B> {
  if (fa.kind === "pure") return fn(fa.value);
  return {
    kind: "suspend",
    functor: fa.functor,
    next: (v) => bindFree(fa.next(v), fn),
  };
}

export function mapFree<F, A, B>(fa: Free<F, A>, fn: (a: A) => B): Free<F, B> {
  return bindFree(fa, (a) => pureFree(fn(a)));
}

export type Interpreter<F> = (functor: F) => unknown;

export function interpret<F, A>(program: Free<F, A>, interpreter: Interpreter<F>): A {
  let current: Free<F, A> = program;
  while (current.kind !== "pure") {
    const result = interpreter(current.functor);
    current = current.next(result);
  }
  return current.value;
}

export function foldFree<F, A, M>(
  program: Free<F, A>,
  lift: (f: F) => M,
  bind: (m: M, f: (a: unknown) => M) => M,
  wrap: (a: A) => M
): M {
  if (program.kind === "pure") return wrap(program.value);
  const lifted = lift(program.functor);
  return bind(lifted, (v) => foldFree(program.next(v), lift, bind, wrap));
}

export type ConsoleOp =
  | { tag: "print"; message: string }
  | { tag: "readLine"; prompt: string };

export function print(message: string): Free<ConsoleOp, void> {
  return { kind: "suspend", functor: { tag: "print", message }, next: () => pureFree(undefined) };
}

export function readLine(prompt: string): Free<ConsoleOp, string> {
  return { kind: "suspend", functor: { tag: "readLine", prompt }, next: (v) => pureFree(v as string) };
}

export type KVOp =
  | { tag: "get"; key: string }
  | { tag: "put"; key: string; value: unknown }
  | { tag: "delete"; key: string };

export function kvGet(key: string): Free<KVOp, unknown> {
  return liftF({ tag: "get", key } as KVOp);
}

export function kvPut(key: string, value: unknown): Free<KVOp, void> {
  return { kind: "suspend", functor: { tag: "put", key, value }, next: () => pureFree(undefined) };
}

export function kvDelete(key: string): Free<KVOp, void> {
  return { kind: "suspend", functor: { tag: "delete", key }, next: () => pureFree(undefined) };
}

export function kvInterpreter(): { interpreter: Interpreter<KVOp>; store: Map<string, unknown> } {
  const store = new Map<string, unknown>();
  const interpreter: Interpreter<KVOp> = (op) => {
    switch (op.tag) {
      case "get": return store.get(op.key);
      case "put": store.set(op.key, op.value); return undefined;
      case "delete": store.delete(op.key); return undefined;
    }
  };
  return { interpreter, store };
}
