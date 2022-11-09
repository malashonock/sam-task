export function toSentenceCase(text: string): string {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function toKebabCase(asInSentenceString: string): string {
  return asInSentenceString
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('-');
}
