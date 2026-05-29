/**
 * The master benchmark prompt - a starting reference, editable as things
 * evolve. Paste the SAME prompt into a fresh session for each of the four
 * contestants (Claude/Codex, each with and without UnClick). The only thing
 * that changes between sessions is whether UnClick is connected.
 *
 * v1 is deliberately strict: it forbids built-in tools (web search, file
 * read/write, code execution) so the test measures connected MCP tools and
 * memory only - not the host app's native capabilities. This is what keeps
 * "without UnClick" a true baseline.
 *
 * Kept here as a constant so the Admin Benchmarks page can show it with a
 * copy button. The grading answer key is deliberately NOT in this file or the
 * prompt, so the agent under test cannot read the answers.
 */

export const MASTER_PROMPT = `You are taking the UnClick Capability Benchmark v1. Treat this as a controlled capability test. Work through every task in order.

ALLOWED CAPABILITIES (read first):
- You may ONLY use tools provided by a connected MCP server (a "connector").
- You may NOT use any built-in or host-app tools. Specifically: no web search, no browsing, no reading or writing files, no scratch/memory files, no running code or terminal commands. These are not connectors and are off-limits even if they are available.
- If a task needs a capability and no CONNECTOR provides it, write exactly: "cannot perform - no connector". Do not work around it.

ANSWER RULES:
- Answer each task with its number (for example "C1:"). Be concise.
- REASONING and KNOWLEDGE: answer from your own thinking only. Use no tools.
- CODING: write the function as text and work out the expected output by reasoning. Do NOT execute code.
- TOOL USE: use a connected MCP tool only, actually perform the action, report the real result, and name the connector and tool you used. Do NOT fall back to web search or guessing.
- MEMORY: save the facts using a connected memory tool only (for example UnClick save_fact). Do NOT write files to disk to fake memory. If you have no memory connector, write "cannot save - no memory connector".
- At the very end, output a section titled "TOOLS/MEMORY USED:" listing each connector and tool you used, or "none".

BEFORE YOU START: in one sentence, restate the rules above to confirm you will follow them. Then complete every task below in this same response - do not stop or wait for a "go".

=== CODING ===
C1. Write a function is_palindrome(s) that returns true if s reads the same forwards and backwards, ignoring case, spaces, and punctuation. Show its expected output for "A man, a plan, a canal: Panama" and for "hello world".
C2. Write a function second_largest(nums) that returns the second-largest UNIQUE number in a list, or null if there is not one. Show its expected output for [4, 1, 4, 3, 2] and for [5, 5].

=== REASONING (your own thinking only, no tools) ===
R1. A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?
R2. If 5 machines take 5 minutes to make 5 widgets, how long do 100 machines take to make 100 widgets?
R3. Two coins add up to 30 cents, and one of them is not a nickel. What are the two coins?

=== KNOWLEDGE (your own thinking only, no tools) ===
K1. What is the chemical symbol for gold, and its atomic number?
K2. Who wrote "Pride and Prejudice", and in what year was it first published?
K3. What is the capital city of Australia?

=== TOOL USE (use a connected MCP tool only; if none, write "cannot perform - no connector") ===
T1. Report the current date and time in Sydney, Australia right now.
T2. Report the current weather in Sydney, Australia right now (conditions and temperature).
T3. Convert 100 US dollars to Australian dollars at today's real exchange rate, and state the rate you used.

=== MEMORY (seed step - use a connected memory tool only) ===
M0. Save these three facts using a connected memory tool so a later, separate session can recall them. Confirm they were saved, or write "cannot save - no memory connector":
   - My product launch date is 14 September 2026.
   - My co-founder's name is Priya Nair.
   - My favourite test city is Wollongong.

End of benchmark. Output your answers now, then the "TOOLS/MEMORY USED:" section.`;

/**
 * Run this in a SEPARATE, fresh session (after the master prompt session is
 * closed) to score the Memory category. Recall must come from a connected
 * memory tool, not files or guessing - so a plain model answers "unknown" and
 * an UnClick-equipped one recalls.
 */
export const MEMORY_RECALL_PROMPT = `This is a memory recall check for the UnClick Capability Benchmark v1.

RULES:
- Recall ONLY from a connected memory tool (for example UnClick load_memory or search_memory).
- Do NOT read files from disk, do NOT use web search, and do NOT guess from this message or from general knowledge.
- If you have no memory connector, or a fact is not found, answer "unknown".

Answer these about me:
MR1. What is my product launch date?
MR2. What is my co-founder's name?
MR3. What is my favourite test city?

Then output "TOOLS/MEMORY USED:" listing the connector and tool you used, or "none".`;
