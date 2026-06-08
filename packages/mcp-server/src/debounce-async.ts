export interface DebouncedAsync<T extends (...args: unknown[]) => Promise<unknown>> {
  (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
  cancel(): void;
  flush(): Promise<Awaited<ReturnType<T>> | undefined>;
  get pending(): boolean;
}

export function debounceAsync<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  delayMs: number
): DebouncedAsync<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let pendingResolve: ((value: Awaited<ReturnType<T>>) => void) | null = null;
  let pendingReject: ((reason: unknown) => void) | null = null;

  async function execute(args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    const result = await fn(...args);
    return result as Awaited<ReturnType<T>>;
  }

  function debounced(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    lastArgs = args;
    if (timer) clearTimeout(timer);

    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      if (pendingReject) {
        pendingReject(new Error("Debounce superseded"));
      }
      pendingResolve = resolve;
      pendingReject = reject;

      timer = setTimeout(async () => {
        timer = null;
        const currentArgs = lastArgs!;
        lastArgs = null;
        const currentResolve = pendingResolve;
        const currentReject = pendingReject;
        pendingResolve = null;
        pendingReject = null;
        try {
          const result = await execute(currentArgs);
          currentResolve?.(result);
        } catch (err) {
          currentReject?.(err);
        }
      }, delayMs);
    });
  }

  debounced.cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (pendingReject) {
      pendingReject(new Error("Debounce cancelled"));
    }
    lastArgs = null;
    pendingResolve = null;
    pendingReject = null;
  };

  debounced.flush = async (): Promise<Awaited<ReturnType<T>> | undefined> => {
    if (!lastArgs) return undefined;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const args = lastArgs;
    lastArgs = null;
    const currentResolve = pendingResolve;
    pendingResolve = null;
    pendingReject = null;
    const result = await execute(args);
    currentResolve?.(result);
    return result;
  };

  Object.defineProperty(debounced, "pending", {
    get: () => timer !== null,
  });

  return debounced as DebouncedAsync<T>;
}
