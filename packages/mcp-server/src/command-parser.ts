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

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("--")) {
      const eqIdx = token.indexOf("=");
      if (eqIdx >= 0) {
        flags[token.slice(2, eqIdx)] = token.slice(eqIdx + 1);
      } else if (i + 1 < tokens.length && !tokens[i + 1].startsWith("-")) {
        flags[token.slice(2)] = tokens[++i];
      } else {
        flags[token.slice(2)] = true;
      }
    } else if (token.startsWith("-") && token.length === 2) {
      if (i + 1 < tokens.length && !tokens[i + 1].startsWith("-")) {
        flags[token.slice(1)] = tokens[++i];
      } else {
        flags[token.slice(1)] = true;
      }
    } else {
      args.push(token);
    }
  }

  return { command, args, flags };
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < input.length) {
    while (i < input.length && input[i] === " ") i++;
    if (i >= input.length) break;
    if (input[i] === '"' || input[i] === "'") {
      const quote = input[i++];
      let token = "";
      while (i < input.length && input[i] !== quote) {
        if (input[i] === "\\" && i + 1 < input.length) {
          i++;
          token += input[i];
        } else {
          token += input[i];
        }
        i++;
      }
      i++;
      tokens.push(token);
    } else {
      let token = "";
      while (i < input.length && input[i] !== " ") {
        token += input[i++];
      }
      tokens.push(token);
    }
  }
  return tokens;
}
