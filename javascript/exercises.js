import exp from "node:constants"
import { open } from "node:fs/promises"

export function change(amount) {
  if (!Number.isInteger(amount)) {
    throw new TypeError("Amount must be an integer")
  }
  if (amount < 0) {
    throw new RangeError("Amount cannot be negative")
  }
  let [counts, remaining] = [{}, amount]
  for (const denomination of [25, 10, 5, 1]) {
    counts[denomination] = Math.floor(remaining / denomination)
    remaining %= denomination
  }
  return counts
}

// Write your first then lower case function here
export function firstThenLowerCase(sequence, predicate) {
  for (const letters of sequence) {
    if (predicate?.(letters)) {
      return letters.toLowerCase()
    }
  }
  return undefined
}
// Write your powers generator here

export function* powersGenerator({ ofBase, upTo }) {
  let power = 0
  let result = 1
  while (result <= upTo) {
    yield result
    result = Math.pow(ofBase, ++power)
  }
}
// Write your say function here
export function say(word) {
  let words = ""
  function sayNext(nextWord) {
    if (nextWord !== undefined) {
      words += " " + nextWord
      return sayNext
    }
    return words
  }
  if (word !== undefined) {
    words = word
    return sayNext
  }
  return words
}
// Write your line count function here
export async function meaningfulLineCount(file) {

  const content = await open(file);
  let meaningfulLines = 0; 
  for await (const line of content.readLines()) {
    const trimmedLine = line.trim();
    if (trimmedLine !== "" && !trimmedLine.startsWith('#')) {
      meaningfulLines ++;
    }
  }
  await content.close;
  return meaningfulLines;
}
// Write your Quaternion class here
