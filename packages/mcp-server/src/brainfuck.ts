export interface BFResult {
  output: string;
  steps: number;
}

export function interpret(code: string, input = "", maxSteps = 100000): BFResult {
  const tape = new Uint8Array(30000);
  let ptr = 0;
  let pc = 0;
  let inputPos = 0;
  let steps = 0;
  let output = "";

  const brackets = new Map<number, number>();
  const stack: number[] = [];
  for (let i = 0; i < code.length; i++) {
    if (code[i] === "[") {
      stack.push(i);
    } else if (code[i] === "]") {
      if (stack.length === 0) throw new Error("Unmatched ] at position " + i);
      const open = stack.pop()!;
      brackets.set(open, i);
      brackets.set(i, open);
    }
  }
  if (stack.length > 0) throw new Error("Unmatched [ at position " + stack[stack.length - 1]);

  while (pc < code.length && steps < maxSteps) {
    steps++;
    switch (code[pc]) {
      case ">": ptr = (ptr + 1) % 30000; break;
      case "<": ptr = (ptr - 1 + 30000) % 30000; break;
      case "+": tape[ptr] = (tape[ptr] + 1) & 0xff; break;
      case "-": tape[ptr] = (tape[ptr] - 1) & 0xff; break;
      case ".": output += String.fromCharCode(tape[ptr]); break;
      case ",": tape[ptr] = inputPos < input.length ? input.charCodeAt(inputPos++) & 0xff : 0; break;
      case "[": if (tape[ptr] === 0) pc = brackets.get(pc)!; break;
      case "]": if (tape[ptr] !== 0) pc = brackets.get(pc)!; break;
    }
    pc++;
  }

  return { output, steps };
}

export function validate(code: string): { valid: boolean; error?: string } {
  let depth = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === "[") depth++;
    else if (code[i] === "]") {
      depth--;
      if (depth < 0) return { valid: false, error: `Unmatched ] at position ${i}` };
    }
  }
  if (depth !== 0) return { valid: false, error: "Unmatched [" };
  return { valid: true };
}

export function minify(code: string): string {
  return code.replace(/[^><+\-.,[\]]/g, "");
}
