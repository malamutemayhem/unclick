#!/usr/bin/env node
// Extract verbatim conversation from Claude Code jsonl transcript.
// Usage: node scripts/export-transcript.js <input.jsonl> <output.txt>

const fs = require('fs');
const [,, inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Usage: node export-transcript.js <input.jsonl> <output.txt>');
  process.exit(1);
}

const lines = fs.readFileSync(inPath, 'utf8').split('\n').filter(Boolean);
const out = [];

function stringify(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return JSON.stringify(content, null, 2);
  const parts = [];
  for (const block of content) {
    if (block.type === 'text') {
      parts.push(block.text);
    } else if (block.type === 'tool_use') {
      parts.push(`[TOOL CALL: ${block.name}]\n${JSON.stringify(block.input, null, 2)}`);
    } else if (block.type === 'tool_result') {
      const c = block.content;
      const body = typeof c === 'string' ? c : JSON.stringify(c, null, 2);
      parts.push(`[TOOL RESULT]\n${body}`);
    } else if (block.type === 'thinking') {
      parts.push(`[THINKING]\n${block.thinking}`);
    } else {
      parts.push(JSON.stringify(block, null, 2));
    }
  }
  return parts.join('\n\n');
}

for (const line of lines) {
  let rec;
  try { rec = JSON.parse(line); } catch { continue; }

  const ts = rec.timestamp || '';
  const type = rec.type;

  if (type === 'user' || type === 'assistant') {
    const msg = rec.message;
    if (!msg) continue;
    const role = msg.role || type;
    const body = stringify(msg.content);
    out.push(`\n${'='.repeat(79)}\n${role.toUpperCase()}  ${ts}\n${'='.repeat(79)}\n\n${body}\n`);
  } else if (type === 'summary') {
    out.push(`\n${'='.repeat(79)}\nSUMMARY  ${ts}\n${'='.repeat(79)}\n\n${rec.summary || ''}\n`);
  }
}

fs.writeFileSync(outPath, out.join('\n'));
console.log(`Wrote ${out.length} entries to ${outPath}`);
