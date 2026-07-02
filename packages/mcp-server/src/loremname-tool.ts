import { stampMeta } from "./connector-meta.js";

const FIRST_NAMES = [
  "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Hank",
  "Iris", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Paul",
  "Quinn", "Ruby", "Sam", "Tara", "Uma", "Victor", "Wendy", "Xander",
  "Yara", "Zane", "Anna", "Ben", "Clara", "David", "Emma", "Felix",
  "Gina", "Hugo", "Ivy", "James", "Luna", "Max", "Nina", "Oscar",
];

const LAST_NAMES = [
  "Smith", "Jones", "Brown", "Davis", "Wilson", "Moore", "Taylor", "Anderson",
  "Thomas", "Jackson", "White", "Harris", "Martin", "Garcia", "Clark", "Lewis",
  "Walker", "Hall", "Allen", "Young", "King", "Wright", "Lopez", "Hill",
  "Scott", "Green", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez",
  "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export async function loremNameGenerate(args: Record<string, unknown>) {
  const count = Math.min(Math.max(Number(args.count) || 1, 1), 50);
  const includeEmail = args.email !== false;
  const domain = String(args.domain || "example.com");
  const names = Array.from({ length: count }, () => {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const entry: Record<string, string> = { first, last, full: `${first} ${last}` };
    if (includeEmail) {
      entry.email = `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`;
    }
    return entry;
  });
  return stampMeta({ names, count: names.length }, {
    source: "local random name generator",
    fetched_at: new Date().toISOString(),
    next_steps: ["set count for multiple names", "set domain to customize email addresses"],
  });
}
