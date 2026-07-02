import { stampMeta } from "./connector-meta.js";

export async function palindromeCheck(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = Array.from(clean).reverse().join("");
  const isPalindrome = clean === reversed;
  const words = text.split(/\s+/);
  const palindromeWords = words.filter(w => {
    const c = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    return c.length > 1 && c === Array.from(c).reverse().join("");
  });
  let longestPalinSubstr = "";
  for (let i = 0; i < clean.length; i++) {
    for (let j = i + 1; j <= clean.length; j++) {
      const sub = clean.slice(i, j);
      if (sub === Array.from(sub).reverse().join("") && sub.length > longestPalinSubstr.length) {
        longestPalinSubstr = sub;
      }
    }
  }
  return stampMeta({
    text,
    is_palindrome: isPalindrome,
    cleaned: clean,
    reversed: reversed,
    palindrome_words: palindromeWords,
    longest_palindrome_substring: longestPalinSubstr || null,
    character_count: clean.length,
  }, {
    source: "local palindrome checker",
    fetched_at: new Date().toISOString(),
    next_steps: ["ignores spaces, punctuation, and case when checking", "longest_palindrome_substring finds the longest palindromic run"],
  });
}
