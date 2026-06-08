export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number,
): T & { cancel: () => void; flush: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: unknown[] | undefined;

  const debounced = function (this: unknown, ...args: unknown[]) {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(this, lastArgs!);
      lastArgs = undefined;
    }, delayMs);
  } as T & { cancel: () => void; flush: () => void };

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

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  intervalMs: number,
): T & { cancel: () => void } {
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const throttled = function (this: unknown, ...args: unknown[]) {
    const now = Date.now();
    const remaining = intervalMs - (now - lastCall);

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = undefined; }
      lastCall = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = undefined;
        fn.apply(this, args);
      }, remaining);
    }
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };

  return throttled;
}

export function rateLimit(maxCalls: number, windowMs: number): () => boolean {
  const timestamps: number[] = [];
  return () => {
    const now = Date.now();
    while (timestamps.length > 0 && timestamps[0] <= now - windowMs) {
      timestamps.shift();
    }
    if (timestamps.length >= maxCalls) return false;
    timestamps.push(now);
    return true;
  };
}
