export interface ParseResult<T> {
  success: boolean;
  value: T;
  rest: string;
  expected?: string;
}

export type Parser<T> = (input: string) => ParseResult<T>;

function success<T>(value: T, rest: string): ParseResult<T> {
  return { success: true, value, rest };
}

function failure<T>(expected: string, rest: string): ParseResult<T> {
  return { success: false, value: null as unknown as T, rest, expected };
}

export function char(c: string): Parser<string> {
  return (input) =>
    input.length > 0 && input[0] === c
      ? success(c, input.slice(1))
      : failure(`'${c}'`, input);
}

export function string(s: string): Parser<string> {
  return (input) =>
    input.startsWith(s)
      ? success(s, input.slice(s.length))
      : failure(`"${s}"`, input);
}

export function regex(pattern: RegExp): Parser<string> {
  return (input) => {
    const m = input.match(new RegExp(`^(?:${pattern.source})`));
    return m ? success(m[0], input.slice(m[0].length)) : failure(`/${pattern.source}/`, input);
  };
}

export function satisfy(pred: (c: string) => boolean, label = "character"): Parser<string> {
  return (input) =>
    input.length > 0 && pred(input[0])
      ? success(input[0], input.slice(1))
      : failure(label, input);
}

export const letter: Parser<string> = satisfy((c) => /[a-zA-Z]/.test(c), "letter");
export const digit: Parser<string> = satisfy((c) => /[0-9]/.test(c), "digit");
export const whitespace: Parser<string> = regex(/\s+/);
export const optWhitespace: Parser<string | null> = optional(whitespace);

export function map<A, B>(parser: Parser<A>, fn: (a: A) => B): Parser<B> {
  return (input) => {
    const result = parser(input);
    return result.success ? success(fn(result.value), result.rest) : failure<B>(result.expected || "", result.rest);
  };
}

export function seq<A, B>(a: Parser<A>, b: Parser<B>): Parser<[A, B]> {
  return (input) => {
    const ra = a(input);
    if (!ra.success) return failure<[A, B]>(ra.expected || "", ra.rest);
    const rb = b(ra.rest);
    if (!rb.success) return failure<[A, B]>(rb.expected || "", rb.rest);
    return success<[A, B]>([ra.value, rb.value], rb.rest);
  };
}

export function seq3<A, B, C>(a: Parser<A>, b: Parser<B>, c: Parser<C>): Parser<[A, B, C]> {
  return map(seq(a, seq(b, c)), ([va, [vb, vc]]) => [va, vb, vc]);
}

export function alt<T>(...parsers: Parser<T>[]): Parser<T> {
  return (input) => {
    for (const p of parsers) {
      const result = p(input);
      if (result.success) return result;
    }
    return failure<T>("one of alternatives", input);
  };
}

export function many<T>(parser: Parser<T>): Parser<T[]> {
  return (input) => {
    const results: T[] = [];
    let rest = input;
    while (true) {
      const result = parser(rest);
      if (!result.success) break;
      results.push(result.value);
      rest = result.rest;
      if (rest === input) break;
      input = rest;
    }
    return success(results, rest);
  };
}

export function many1<T>(parser: Parser<T>): Parser<T[]> {
  return (input) => {
    const result = many(parser)(input);
    if (!result.success || result.value.length === 0) return failure<T[]>("at least one", input);
    return result;
  };
}

export function optional<T>(parser: Parser<T>): Parser<T | null> {
  return (input) => {
    const result = parser(input);
    return result.success ? success<T | null>(result.value, result.rest) : success<T | null>(null, input);
  };
}

export function sepBy<T, S>(parser: Parser<T>, separator: Parser<S>): Parser<T[]> {
  return (input) => {
    const first = parser(input);
    if (!first.success) return success<T[]>([], input);
    const results: T[] = [first.value];
    let rest = first.rest;
    while (true) {
      const sepResult = separator(rest);
      if (!sepResult.success) break;
      const nextResult = parser(sepResult.rest);
      if (!nextResult.success) break;
      results.push(nextResult.value);
      rest = nextResult.rest;
    }
    return success(results, rest);
  };
}

export function between<O, T, C>(open: Parser<O>, parser: Parser<T>, close: Parser<C>): Parser<T> {
  return map(seq3(open, parser, close), ([, value]) => value);
}

export function lazy<T>(fn: () => Parser<T>): Parser<T> {
  return (input) => fn()(input);
}

export function label<T>(parser: Parser<T>, name: string): Parser<T> {
  return (input) => {
    const result = parser(input);
    if (!result.success) return failure<T>(name, result.rest);
    return result;
  };
}

export function eof(): Parser<null> {
  return (input) =>
    input.length === 0 ? success(null, "") : failure<null>("end of input", input);
}

export function chainLeft<T>(operand: Parser<T>, operator: Parser<(a: T, b: T) => T>): Parser<T> {
  return (input) => {
    const first = operand(input);
    if (!first.success) return first;
    let value = first.value;
    let rest = first.rest;
    while (true) {
      const opResult = operator(rest);
      if (!opResult.success) break;
      const nextResult = operand(opResult.rest);
      if (!nextResult.success) break;
      value = opResult.value(value, nextResult.value);
      rest = nextResult.rest;
    }
    return success(value, rest);
  };
}

export function integer(): Parser<number> {
  return map(
    regex(/[+-]?\d+/),
    (s) => parseInt(s, 10)
  );
}

export function float(): Parser<number> {
  return map(
    regex(/[+-]?\d+(\.\d+)?/),
    (s) => parseFloat(s)
  );
}

export function word(): Parser<string> {
  return map(many1(letter), (chars) => chars.join(""));
}
