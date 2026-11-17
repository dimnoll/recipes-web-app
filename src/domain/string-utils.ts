export function replacePercentPlus(input: string): string {
  let current = input;
  let previous: string | undefined;
  while (current !== previous) {
    previous = current;
    current = decodeURIComponent(current);
  }
  return current.replaceAll("+", " ");
}

export function removeLeadingDigits(input: string): string {
  return input.replace(/^\d+\.?/, "").trim();
}
