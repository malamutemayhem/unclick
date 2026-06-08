type Listener = () => void;

export class Signal {
  private _aborted = false;
  private _reason: unknown;
  private listeners = new Set<Listener>();

  get aborted(): boolean {
    return this._aborted;
  }

  get reason(): unknown {
    return this._reason;
  }

  abort(reason?: unknown): void {
    if (this._aborted) return;
    this._aborted = true;
    this._reason = reason ?? new Error("Aborted");
    for (const listener of this.listeners) listener();
    this.listeners.clear();
  }

  onAbort(listener: Listener): () => void {
    if (this._aborted) {
      listener();
      return () => {};
    }
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  throwIfAborted(): void {
    if (this._aborted) throw this._reason;
  }
}

export class SignalController {
  readonly signal = new Signal();

  abort(reason?: unknown): void {
    this.signal.abort(reason);
  }
}

export function timeout(ms: number): Signal {
  const ctrl = new SignalController();
  setTimeout(() => ctrl.abort(new Error(`Timed out after ${ms}ms`)), ms);
  return ctrl.signal;
}

export function race(...signals: Signal[]): Signal {
  const ctrl = new SignalController();
  for (const s of signals) {
    if (s.aborted) {
      ctrl.abort(s.reason);
      return ctrl.signal;
    }
    s.onAbort(() => ctrl.abort(s.reason));
  }
  return ctrl.signal;
}

export function any(...signals: Signal[]): Signal {
  return race(...signals);
}
