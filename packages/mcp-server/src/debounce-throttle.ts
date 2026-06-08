export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): T & { cancel: () => void; flush: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: unknown[] | null = null;

  const debounced = ((...args: unknown[]) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
      lastArgs = null;
    }, delay);
  }) as T & { cancel: () => void; flush: () => void };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      lastArgs = null;
    }
  };

  debounced.flush = () => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      timer = null;
      fn(...lastArgs);
      lastArgs = null;
    }
  };

  return debounced;
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number,
): T & { cancel: () => void } {
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const throttled = ((...args: unknown[]) => {
    const now = Date.now();
    const remaining = interval - (now - lastCall);

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      lastCall = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return throttled;
}

export function rateLimit<T extends (...args: unknown[]) => unknown>(
  fn: T,
  maxCalls: number,
  windowMs: number,
): T & { remaining: () => number } {
  const calls: number[] = [];

  const limited = ((...args: unknown[]) => {
    const now = Date.now();
    while (calls.length > 0 && calls[0] <= now - windowMs) {
      calls.shift();
    }
    if (calls.length < maxCalls) {
      calls.push(now);
      return fn(...args);
    }
    return undefined;
  }) as T & { remaining: () => number };

  limited.remaining = () => {
    const now = Date.now();
    while (calls.length > 0 && calls[0] <= now - windowMs) {
      calls.shift();
    }
    return Math.max(0, maxCalls - calls.length);
  };

  return limited;
}
