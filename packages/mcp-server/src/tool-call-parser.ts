export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
  id?: string;
}

export function parseToolCall(text: string): ToolCall | null {
  const jsonMatch = text.match(/\{[\s\S]*"name"\s*:\s*"([^"]+)"[\s\S]*"arguments"\s*:\s*(\{[\s\S]*?\})[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const full = JSON.parse(jsonMatch[0]);
      return {
        name: full.name,
        arguments: typeof full.arguments === "string" ? JSON.parse(full.arguments) : full.arguments,
        id: full.id,
      };
    } catch {}
  }

  const xmlMatch = text.match(/<tool_call>\s*<name>(.*?)<\/name>\s*<arguments>([\s\S]*?)<\/arguments>\s*<\/tool_call>/);
  if (xmlMatch) {
    try {
      return {
        name: xmlMatch[1].trim(),
        arguments: JSON.parse(xmlMatch[2].trim()),
      };
    } catch {}
  }

  return null;
}

export function parseMultipleToolCalls(text: string): ToolCall[] {
  const results: ToolCall[] = [];

  const jsonPattern = /\{\s*"name"\s*:\s*"[^"]+"\s*,\s*"arguments"\s*:\s*\{[^}]*\}[^}]*\}/g;
  let match;
  while ((match = jsonPattern.exec(text)) !== null) {
    const parsed = parseToolCall(match[0]);
    if (parsed) results.push(parsed);
  }

  if (results.length === 0) {
    const xmlPattern = /<tool_call>[\s\S]*?<\/tool_call>/g;
    while ((match = xmlPattern.exec(text)) !== null) {
      const parsed = parseToolCall(match[0]);
      if (parsed) results.push(parsed);
    }
  }

  return results;
}

export function formatToolResult(toolCallId: string, result: unknown): string {
  return JSON.stringify({ tool_call_id: toolCallId, output: result });
}

export function validateToolCall(call: ToolCall, schema: Record<string, { type: string; required?: boolean }>): string[] {
  const errors: string[] = [];
  for (const [param, config] of Object.entries(schema)) {
    if (config.required && !(param in call.arguments)) {
      errors.push("Missing required parameter: " + param);
    }
    if (param in call.arguments) {
      const val = call.arguments[param];
      if (config.type === "string" && typeof val !== "string") errors.push(param + " must be a string");
      if (config.type === "number" && typeof val !== "number") errors.push(param + " must be a number");
      if (config.type === "boolean" && typeof val !== "boolean") errors.push(param + " must be a boolean");
    }
  }
  return errors;
}
