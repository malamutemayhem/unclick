export type EasingFn = (t: number) => number;

export const linear: EasingFn = (t) => t;

export const easeInQuad: EasingFn = (t) => t * t;
export const easeOutQuad: EasingFn = (t) => t * (2 - t);
export const easeInOutQuad: EasingFn = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const easeInCubic: EasingFn = (t) => t * t * t;
export const easeOutCubic: EasingFn = (t) => (--t) * t * t + 1;
export const easeInOutCubic: EasingFn = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

export const easeInQuart: EasingFn = (t) => t * t * t * t;
export const easeOutQuart: EasingFn = (t) => 1 - (--t) * t * t * t;
export const easeInOutQuart: EasingFn = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;

export const easeInSine: EasingFn = (t) => 1 - Math.cos((t * Math.PI) / 2);
export const easeOutSine: EasingFn = (t) => Math.sin((t * Math.PI) / 2);
export const easeInOutSine: EasingFn = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

export const easeInExpo: EasingFn = (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
export const easeOutExpo: EasingFn = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const easeInOutExpo: EasingFn = (t) => {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

export const easeInCirc: EasingFn = (t) => 1 - Math.sqrt(1 - t * t);
export const easeOutCirc: EasingFn = (t) => Math.sqrt(1 - (--t) * t);
export const easeInOutCirc: EasingFn = (t) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2;

export const easeInBack: EasingFn = (t) => {
  const c = 1.70158;
  return (c + 1) * t * t * t - c * t * t;
};

export const easeOutBack: EasingFn = (t) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

export const easeInElastic: EasingFn = (t) => {
  if (t === 0 || t === 1) return t;
  return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
};

export const easeOutElastic: EasingFn = (t) => {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
};

export const easeOutBounce: EasingFn = (t) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

export const easeInBounce: EasingFn = (t) => 1 - easeOutBounce(1 - t);

export function interpolate(
  from: number,
  to: number,
  t: number,
  easing: EasingFn = linear,
): number {
  return from + (to - from) * easing(t);
}

export function steps(n: number, duration: number, easing: EasingFn = linear): number[] {
  const result: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    result.push(easing(t));
  }
  return result;
}

export function chain(...easings: EasingFn[]): EasingFn {
  const n = easings.length;
  return (t: number) => {
    const segment = Math.min(Math.floor(t * n), n - 1);
    const localT = t * n - segment;
    return (segment + easings[segment](localT)) / n;
  };
}
