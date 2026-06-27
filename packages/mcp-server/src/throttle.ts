export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface ThrottledFn<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  cancel(): void;
  flush(): void;
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  intervalMs: number,
  options: ThrottleOptions = {}
): ThrottledFn<T> {
  const { leading = true, trailing = true } = options;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;

  function invoke(args: Parameters<T>): void {
    lastCallTime = Date.now();
    fn(...args);
  }

  function throttled(...args: Parameters<T>): void {
    const now = Date.now();
    const elapsed = now - lastCallTime;

    if (elapsed >= intervalMs) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (leading) {
        invoke(args);
        lastArgs = null;
      } else {
        lastArgs = args;
        if (!timer && trailing) {
          timer = setTimeout(() => {
            timer = null;
            if (lastArgs) {
              invoke(lastArgs);
              lastArgs = null;
            }
          }, intervalMs);
        }
      }
    } else {
      lastArgs = args;
      if (!timer && trailing) {
        timer = setTimeout(() => {
          timer = null;
          if (lastArgs) {
            invoke(lastArgs);
            lastArgs = null;
          }
        }, intervalMs - elapsed);
      }
    }
  }

  throttled.cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
    lastCallTime = 0;
  };

  throttled.flush = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (lastArgs) {
      invoke(lastArgs);
      lastArgs = null;
    }
  };

  return throttled as ThrottledFn<T>;
}
