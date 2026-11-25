import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ENTRY =
  "The meeting could have been an email, but the email declined the invite — it knew twelve people would spend an hour deciding nothing, and it had better things to do.";

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("Entry must not start or end with whitespace");
  }
  if (!text.toLowerCase().includes("meeting") || !text.toLowerCase().includes("email")) {
    throw new Error("Entry must be a joke about a meeting that should have been an email");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  const roundTrip = readFileSync("/output/entry.txt", "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("Read-back mismatch: entry.txt does not match the entry");
  }
  console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt`);
  console.log(`Character count: ${ENTRY.length} (limit 200), words: ${ENTRY.split(" ").length}`);
}

main();
