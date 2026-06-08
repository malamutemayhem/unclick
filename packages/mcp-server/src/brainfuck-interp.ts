export class BrainfuckInterpreter {
  private readonly maxSteps: number;

  constructor(maxSteps: number = 100000) {
    this.maxSteps = maxSteps;
  }

  execute(program: string, input: string = ""): { output: string; steps: number; memory: number[] } {
    const code = program.replace(/[^><+\-.,[\]]/g, "");
    const memory = new Array(30000).fill(0);
    let pointer = 0;
    let pc = 0;
    let inputIdx = 0;
    let steps = 0;
    const output: number[] = [];
    const brackets = this.matchBrackets(code);

    while (pc < code.length && steps < this.maxSteps) {
      const instr = code[pc];
      switch (instr) {
        case ">":
          pointer = (pointer + 1) % memory.length;
          break;
        case "<":
          pointer = (pointer - 1 + memory.length) % memory.length;
          break;
        case "+":
          memory[pointer] = (memory[pointer] + 1) % 256;
          break;
        case "-":
          memory[pointer] = (memory[pointer] - 1 + 256) % 256;
          break;
        case ".":
          output.push(memory[pointer]);
          break;
        case ",":
          memory[pointer] = inputIdx < input.length ? input.charCodeAt(inputIdx++) : 0;
          break;
        case "[":
          if (memory[pointer] === 0) pc = brackets.get(pc)!;
          break;
        case "]":
          if (memory[pointer] !== 0) pc = brackets.get(pc)!;
          break;
      }
      pc++;
      steps++;
    }

    const usedMemory = memory.slice(0, Math.max(1, memory.findLastIndex((v: number) => v !== 0) + 1));
    return {
      output: String.fromCharCode(...output),
      steps,
      memory: usedMemory,
    };
  }

  private matchBrackets(code: string): Map<number, number> {
    const map = new Map<number, number>();
    const stack: number[] = [];
    for (let i = 0; i < code.length; i++) {
      if (code[i] === "[") {
        stack.push(i);
      } else if (code[i] === "]") {
        const open = stack.pop()!;
        map.set(open, i);
        map.set(i, open);
      }
    }
    return map;
  }

  static validate(program: string): { valid: boolean; error?: string } {
    let depth = 0;
    for (let i = 0; i < program.length; i++) {
      if (program[i] === "[") depth++;
      else if (program[i] === "]") {
        depth--;
        if (depth < 0) return { valid: false, error: `Unmatched ] at position ${i}` };
      }
    }
    if (depth !== 0) return { valid: false, error: "Unmatched [" };
    return { valid: true };
  }
}
