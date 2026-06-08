export type EffectTag = string;

export interface Effect<T = unknown> {
  tag: EffectTag;
  payload: T;
}

export type Handler<T = unknown, R = unknown> = (payload: T, resume: (value: R) => unknown) => unknown;

export class EffectRunner {
  private handlers = new Map<EffectTag, Handler[]>();

  handle<T, R>(tag: EffectTag, handler: Handler<T, R>): void {
    if (!this.handlers.has(tag)) {
      this.handlers.set(tag, []);
    }
    this.handlers.get(tag)!.push(handler as Handler);
  }

  removeHandler(tag: EffectTag): void {
    this.handlers.delete(tag);
  }

  perform<T, R>(effect: Effect<T>): R {
    const stack = this.handlers.get(effect.tag);
    if (!stack || stack.length === 0) {
      throw new Error(`Unhandled effect: ${effect.tag}`);
    }
    const handler = stack[stack.length - 1];
    let result: unknown;
    handler(effect.payload, (v) => { result = v; return v; });
    return result as R;
  }

  hasHandler(tag: EffectTag): boolean {
    const stack = this.handlers.get(tag);
    return !!stack && stack.length > 0;
  }

  handlerCount(): number {
    let count = 0;
    for (const stack of this.handlers.values()) {
      count += stack.length;
    }
    return count;
  }
}

export function createEffect<T>(tag: EffectTag, payload: T): Effect<T> {
  return { tag, payload };
}

export interface EffectLog {
  effects: Array<{ tag: EffectTag; payload: unknown; result: unknown }>;
}

export function createEffectLogger(): EffectLog {
  return { effects: [] };
}

export function withLogging(runner: EffectRunner, log: EffectLog, tag: EffectTag, handler: Handler): void {
  runner.handle(tag, (payload, resume) => {
    const result = handler(payload, resume);
    log.effects.push({ tag, payload, result });
    return result;
  });
}

export type Interpreter<S> = {
  state: S;
  run: (runner: EffectRunner) => void;
};

export function pureEffect<T>(value: T): Effect<T> {
  return createEffect("pure", value);
}

export function composeHandlers(...pairs: Array<[EffectTag, Handler]>): EffectRunner {
  const runner = new EffectRunner();
  for (const [tag, handler] of pairs) {
    runner.handle(tag, handler);
  }
  return runner;
}

export function interceptEffect(runner: EffectRunner, tag: EffectTag, interceptor: (payload: unknown) => unknown): void {
  runner.handle(tag, (payload, resume) => {
    const modified = interceptor(payload);
    resume(modified);
    return modified;
  });
}
