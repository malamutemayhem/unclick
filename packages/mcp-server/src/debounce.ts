// Debounce and throttle utilities.
// Prevents rapid-fire calls from hammering APIs or flooding logs.

export interface DebouncedFn<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  cancel(): void;
  flush(): void;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number,
): DebouncedFn<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...lastArgs!);
      lastArgs = undefined;
    }, delayMs);
  }) as DebouncedFn<T>;

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  debounced.flush = () => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      timer = undefined;
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  return debounced;
}

export interface ThrottledFn<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  cancel(): void;
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  intervalMs: number,
): ThrottledFn<T> {
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const throttled = ((...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = intervalMs - (now - lastCall);

    if (remaining <= 0) {
      lastCall = now;
      fn(...args);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          lastCall = Date.now();
          timer = undefined;
          if (lastArgs) {
            fn(...lastArgs);
            lastArgs = undefined;
          }
        }, remaining);
      }
    }
  }) as ThrottledFn<T>;

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  return throttled;
}
