export interface Run<T> {
  value: T;
  count: number;
}

export function encode<T>(input: T[]): Run<T>[] {
  if (input.length === 0) return [];
  const runs: Run<T>[] = [];
  let current = input[0];
  let count = 1;
  for (let i = 1; i < input.length; i++) {
    if (input[i] === current) {
      count++;
    } else {
      runs.push({ value: current, count });
      current = input[i];
      count = 1;
    }
  }
  runs.push({ value: current, count });
  return runs;
}

export function decode<T>(runs: Run<T>[]): T[] {
  const result: T[] = [];
  for (const { value, count } of runs) {
    for (let i = 0; i < count; i++) {
      result.push(value);
    }
  }
  return result;
}

export function encodeString(input: string): string {
  if (input.length === 0) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i <= input.length; i++) {
    if (i < input.length && input[i] === input[i - 1]) {
      count++;
    } else {
      result += count > 1 ? `${count}${input[i - 1]}` : input[i - 1];
      count = 1;
    }
  }
  return result;
}

export function decodeString(input: string): string {
  let result = "";
  let i = 0;
  while (i < input.length) {
    let num = "";
    while (i < input.length && input[i] >= "0" && input[i] <= "9") {
      num += input[i];
      i++;
    }
    if (i < input.length) {
      const count = num ? parseInt(num, 10) : 1;
      result += input[i].repeat(count);
      i++;
    }
  }
  return result;
}
