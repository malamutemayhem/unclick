export function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function caesarEncrypt(str: string, shift: number): string {
  shift = ((shift % 26) + 26) % 26;
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
  });
}

export function caesarDecrypt(str: string, shift: number): string {
  return caesarEncrypt(str, -shift);
}

export function runLengthEncode(str: string): string {
  if (!str) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i <= str.length; i++) {
    if (i < str.length && str[i] === str[i - 1]) {
      count++;
    } else {
      result += count > 1 ? count + str[i - 1] : str[i - 1];
      count = 1;
    }
  }
  return result;
}

export function runLengthDecode(str: string): string {
  let result = "";
  let num = "";
  for (const ch of str) {
    if (ch >= "0" && ch <= "9") {
      num += ch;
    } else {
      const count = num ? parseInt(num, 10) : 1;
      result += ch.repeat(count);
      num = "";
    }
  }
  return result;
}

export function reverseWords(str: string): string {
  return str.split(" ").reverse().join(" ");
}

export function isPalindrome(str: string): boolean {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}

export function countWords(str: string): number {
  const trimmed = str.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
