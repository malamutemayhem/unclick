export interface CommandOption {
  name: string;
  alias?: string;
  type: "string" | "boolean" | "number";
  required?: boolean;
  default?: unknown;
  description?: string;
}

export interface CommandDef {
  name: string;
  description?: string;
  options?: CommandOption[];
  args?: { name: string; required?: boolean }[];
}

export interface ParsedCommand {
  command: string;
  args: string[];
  options: Record<string, unknown>;
  rest: string[];
}

export function parseArgs(argv: string[], defs?: CommandOption[]): ParsedCommand {
  const options: Record<string, unknown> = {};
  const args: string[] = [];
  const rest: string[] = [];
  let command = "";
  let afterDoubleDash = false;

  if (defs) {
    for (const def of defs) {
      if (def.default !== undefined) options[def.name] = def.default;
    }
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (afterDoubleDash) {
      rest.push(arg);
      continue;
    }

    if (arg === "--") {
      afterDoubleDash = true;
      continue;
    }

    if (arg.startsWith("--")) {
      const eqIdx = arg.indexOf("=");
      if (eqIdx !== -1) {
        const key = arg.slice(2, eqIdx);
        const val = arg.slice(eqIdx + 1);
        options[key] = coerceValue(val, findDef(key, defs));
      } else {
        const key = arg.slice(2);
        if (key.startsWith("no-")) {
          options[key.slice(3)] = false;
        } else {
          const def = findDef(key, defs);
          if (def?.type === "boolean") {
            options[key] = true;
          } else if (i + 1 < argv.length && !argv[i + 1].startsWith("-")) {
            options[key] = coerceValue(argv[++i], def);
          } else {
            options[key] = true;
          }
        }
      }
    } else if (arg.startsWith("-") && arg.length > 1) {
      const flag = arg.slice(1);
      const def = findDefByAlias(flag, defs);
      const key = def?.name ?? flag;
      if (def?.type === "boolean" || !def) {
        options[key] = true;
      } else if (i + 1 < argv.length) {
        options[key] = coerceValue(argv[++i], def);
      }
    } else if (!command) {
      command = arg;
    } else {
      args.push(arg);
    }
  }

  return { command, args, options, rest };
}

function findDef(name: string, defs?: CommandOption[]): CommandOption | undefined {
  return defs?.find((d) => d.name === name);
}

function findDefByAlias(alias: string, defs?: CommandOption[]): CommandOption | undefined {
  return defs?.find((d) => d.alias === alias);
}

function coerceValue(val: string, def?: CommandOption): unknown {
  if (!def) return val;
  if (def.type === "number") return Number(val);
  if (def.type === "boolean") return val !== "false" && val !== "0";
  return val;
}

export function validateArgs(parsed: ParsedCommand, def: CommandDef): string[] {
  const errors: string[] = [];
  if (def.options) {
    for (const opt of def.options) {
      if (opt.required && !(opt.name in parsed.options)) {
        errors.push(`Missing required option: --${opt.name}`);
      }
    }
  }
  if (def.args) {
    const requiredArgs = def.args.filter((a) => a.required);
    if (parsed.args.length < requiredArgs.length) {
      errors.push(`Expected at least ${requiredArgs.length} arguments, got ${parsed.args.length}`);
    }
  }
  return errors;
}

export function generateHelp(def: CommandDef): string {
  const lines = [`Usage: ${def.name} [options]`];
  if (def.description) lines.push("", def.description);
  if (def.options && def.options.length > 0) {
    lines.push("", "Options:");
    for (const opt of def.options) {
      const alias = opt.alias ? `-${opt.alias}, ` : "    ";
      const req = opt.required ? " (required)" : "";
      lines.push(`  ${alias}--${opt.name.padEnd(20)} ${opt.description ?? ""}${req}`);
    }
  }
  return lines.join("\n");
}
