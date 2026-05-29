/**
 * The master benchmark prompt - a starting reference, editable as things
 * evolve. Paste the SAME prompt into a fresh "Code" session for each of the
 * four contestants (Claude/Codex, each with and without UnClick). The only
 * thing that changes between sessions is whether UnClick is connected.
 *
 * Kept here as a constant so the Admin Benchmarks page can show it with a
 * copy button. The grading answer key is deliberately NOT in this file or
 * the prompt, so the agent under test cannot read the answers.
 */

export const MASTER_PROMPT = `You are taking the UnClick Capability Benchmark v1. Treat this as a timed capability test. Work through every task in order.

Rules:
- Use any tools, memory, or capabilities available to you. If you have persistent memory or external tools, use them. If you have none, do your best with what you have.
- Answer each task with its number (for example "C1:"). Be concise.
- For TOOL tasks, actually perform the action and report the real result, and name the tool you used. If you cannot perform it, write "cannot perform - no tool".
- For REASONING and KNOWLEDGE tasks, answer from your own thinking. Do not look these up.
- At the very end, output a section titled "TOOLS/MEMORY USED:" listing what you used, or "none".

=== CODING ===
C1. Write a function is_palindrome(s) that returns true if s reads the same forwards and backwards, ignoring case, spaces, and punctuation. Show its output for "A man, a plan, a canal: Panama" and for "hello world".
C2. Write a function second_largest(nums) that returns the second-largest UNIQUE number in a list, or null if there is not one. Show its output for [4, 1, 4, 3, 2] and for [5, 5].

=== REASONING (answer from your own thinking, no tools) ===
R1. A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?
R2. If 5 machines take 5 minutes to make 5 widgets, how long do 100 machines take to make 100 widgets?
R3. Two coins add up to 30 cents, and one of them is not a nickel. What are the two coins?

=== KNOWLEDGE (answer from your own thinking, no tools) ===
K1. What is the chemical symbol for gold, and its atomic number?
K2. Who wrote "Pride and Prejudice", and in what year was it first published?
K3. What is the capital city of Australia?

=== TOOL USE (actually perform these and name the tool) ===
T1. Report the current date and time in Sydney, Australia right now.
T2. Report the current weather in Sydney, Australia right now (conditions and temperature).
T3. Convert 100 US dollars to Australian dollars at today's real exchange rate, and state the rate you used.

=== MEMORY (seed step) ===
M0. Remember these three facts for a later, separate session. If you have persistent memory, store them now and confirm you have saved them:
   - My product launch date is 14 September 2026.
   - My co-founder's name is Priya Nair.
   - My favourite test city is Wollongong.

End of benchmark. Output your answers now, then the "TOOLS/MEMORY USED:" section.`;

/**
 * Run this in a SEPARATE, fresh session (after the master prompt session is
 * closed) to score the Memory category. A plain model will have forgotten;
 * an UnClick-equipped one should recall via its memory.
 */
export const MEMORY_RECALL_PROMPT = `This is a memory recall check for the UnClick Capability Benchmark v1. Do not guess from this message. If you have persistent memory, load it first. Answer these about me:
MR1. What is my product launch date?
MR2. What is my co-founder's name?
MR3. What is my favourite test city?
If you do not know an answer, write "unknown". Then output "TOOLS/MEMORY USED:" listing what you used, or "none".`;
