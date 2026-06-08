export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  } as T & { cancel: () => void };
  debounced.cancel = () => { if (timer) clearTimeout(timer); };
  return debounced;
}

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  intervalMs: number
): T & { cancel: () => void } {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    const remaining = intervalMs - (now - last);
    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = undefined; }
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = undefined;
        fn.apply(this, args);
      }, remaining);
    }
  } as T & { cancel: () => void };
  throttled.cancel = () => { if (timer) { clearTimeout(timer); timer = undefined; } };
  return throttled;
}
