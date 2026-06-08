export class DisposableGroup {
  private disposers: Array<() => void | Promise<void>> = [];
  private _disposed = false;

  get disposed(): boolean {
    return this._disposed;
  }

  add(disposer: () => void | Promise<void>): void {
    if (this._disposed) throw new Error("Already disposed");
    this.disposers.push(disposer);
  }

  async dispose(): Promise<void> {
    if (this._disposed) return;
    this._disposed = true;
    const errors: Error[] = [];
    for (const d of this.disposers.reverse()) {
      try {
        await d();
      } catch (e) {
        errors.push(e instanceof Error ? e : new Error(String(e)));
      }
    }
    this.disposers.length = 0;
    if (errors.length > 0) throw errors[0];
  }

  use<T extends { dispose: () => void | Promise<void> }>(resource: T): T {
    this.add(() => resource.dispose());
    return resource;
  }
}
