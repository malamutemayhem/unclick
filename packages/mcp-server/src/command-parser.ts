export interface ParsedCommand {
  command: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

export function parseCommand(input: string): ParsedCommand {
  const tokens = tokenize(input);
  if (tokens.length === 0) return { command: "", args: [], flags: {} };
  const command = tokens[0];
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  let i = 1;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      if (key.includes("=")) {
        const [k, ...rest] = key.split("=");
        flags[k] = rest.join("=");
      } else if (i + 1 < tokens.length && !tokens[i + 1].startsWith("-")) {
        flags[key] = tokens[i + 1];
        i++;
      } else {
        flags[key] = true;
      }
    } else if (token.startsWith("-") && token.length > 1) {
      const chars = token.slice(1);
      for (let j = 0; j < chars.length; j++) {
        if (j === chars.length - 1 && i + 1 < tokens.length && !tokens[i + 1].startsWith("-")) {
          flags[chars[j]] = tokens[i + 1];
          i++;
        } else {
          flags[chars[j]] = true;
        }
      }
    } else {
      args.push(token);
    }
    i++;
  }

  return { command, args, flags };
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < input.length) {
    if (input[i] === " " || input[i] === "\t") {
      i++;
      continue;
    }
    if (input[i] === '"' || input[i] === "'") {
      const quote = input[i];
      i++;
      let token = "";
      while (i < input.length && input[i] !== quote) {
        if (input[i] === "\\" && i + 1 < input.length) {
          token += input[i + 1];
          i += 2;
        } else {
          token += input[i];
          i++;
        }
      }
      tokens.push(token);
      i++;
    } else {
      let token = "";
      while (i < input.length && input[i] !== " " && input[i] !== "\t") {
        token += input[i];
        i++;
      }
      tokens.push(token);
    }
  }
  return tokens;
}
