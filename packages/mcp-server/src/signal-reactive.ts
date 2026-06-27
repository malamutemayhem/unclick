type EffectFn = () => void;

let activeEffect: EffectFn | null = null;
const effectStack: EffectFn[] = [];

export class Signal<T> {
  private value: T;
  private subscribers = new Set<EffectFn>();

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    if (activeEffect) this.subscribers.add(activeEffect);
    return this.value;
  }

  set(newValue: T): void {
    if (Object.is(this.value, newValue)) return;
    this.value = newValue;
    this.notify();
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this.value));
  }

  peek(): T {
    return this.value;
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }

  private notify(): void {
    const subs = [...this.subscribers];
    for (const fn of subs) fn();
  }
}

export function effect(fn: EffectFn): () => void {
  const wrappedEffect = (): void => {
    activeEffect = wrappedEffect;
    effectStack.push(wrappedEffect);
    try {
      fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1] ?? null;
    }
  };
  wrappedEffect();
  return () => {
    activeEffect = null;
  };
}

export function computed<T>(fn: () => T): Signal<T> {
  const signal = new Signal<T>(undefined as T);
  effect(() => signal.set(fn()));
  return signal;
}

export function batch(fn: () => void): void {
  fn();
}

export class SignalMap<K, V> {
  private map = new Map<K, Signal<V>>();
  private keysSignal = new Signal<number>(0);

  get(key: K): V | undefined {
    this.keysSignal.get();
    return this.map.get(key)?.get();
  }

  set(key: K, value: V): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.set(value);
    } else {
      this.map.set(key, new Signal(value));
      this.keysSignal.set(this.map.size);
    }
  }

  delete(key: K): boolean {
    const result = this.map.delete(key);
    if (result) this.keysSignal.set(this.map.size);
    return result;
  }

  get size(): number {
    this.keysSignal.get();
    return this.map.size;
  }

  keys(): K[] {
    this.keysSignal.get();
    return [...this.map.keys()];
  }
}
