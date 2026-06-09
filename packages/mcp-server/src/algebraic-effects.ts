export type EffectHandler<E, R> = (effect: E, resume: (value: unknown) => R) => R;

export interface Effect<T = unknown> {
  tag: string;
  payload: T;
}

export function effect<T>(tag: string, payload: T): Effect<T> {
  return { tag, payload };
}

export type Eff<A> =
  | { kind: "pure"; value: A }
  | { kind: "impure"; effect: Effect; continuation: (value: unknown) => Eff<A> };

export function pure<A>(value: A): Eff<A> {
  return { kind: "pure", value };
}

export function perform<A>(eff: Effect): Eff<A> {
  return { kind: "impure", effect: eff, continuation: (v) => pure(v as A) };
}

export function bind<A, B>(eff: Eff<A>, fn: (a: A) => Eff<B>): Eff<B> {
  if (eff.kind === "pure") return fn(eff.value);
  return {
    kind: "impure",
    effect: eff.effect,
    continuation: (v) => bind(eff.continuation(v), fn),
  };
}

export function map<A, B>(eff: Eff<A>, fn: (a: A) => B): Eff<B> {
  return bind(eff, (a) => pure(fn(a)));
}

export interface Handler {
  [tag: string]: ((payload: unknown, resume: (value: unknown) => unknown) => unknown) | undefined;
}

export function handle<A>(
  eff: Eff<A>,
  handler: Handler,
  returnFn?: (value: unknown) => unknown
): unknown {
  if (eff.kind === "pure") {
    return returnFn ? returnFn(eff.value) : eff.value;
  }
  const h = handler[eff.effect.tag];
  if (!h) throw new Error(`Unhandled effect: ${eff.effect.tag}`);
  return h(eff.effect.payload, (v) => handle(eff.continuation(v), handler, returnFn));
}

export function run<A>(eff: Eff<A>): A {
  if (eff.kind === "pure") return eff.value;
  throw new Error(`Unhandled effect: ${eff.effect.tag}`);
}

export function sequence<A>(effs: Eff<A>[]): Eff<A[]> {
  if (effs.length === 0) return pure([]);
  return bind(effs[0], (first) =>
    bind(sequence(effs.slice(1)), (rest) => pure([first, ...rest]))
  );
}

export class EffectRegistry {
  private handlers = new Map<string, (payload: unknown) => unknown>();

  register(tag: string, handler: (payload: unknown) => unknown): void {
    this.handlers.set(tag, handler);
  }

  unregister(tag: string): void {
    this.handlers.delete(tag);
  }

  interpret<A>(eff: Eff<A>): A {
    if (eff.kind === "pure") return eff.value;
    const h = this.handlers.get(eff.effect.tag);
    if (!h) throw new Error(`Unhandled effect: ${eff.effect.tag}`);
    const value = h(eff.effect.payload);
    return this.interpret(eff.continuation(value));
  }

  has(tag: string): boolean {
    return this.handlers.has(tag);
  }

  get tags(): string[] {
    return [...this.handlers.keys()];
  }
}
