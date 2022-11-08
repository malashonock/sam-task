export default function distinct<T>(element: T, index: number, array: T[]): boolean {
  return index === array.indexOf(element);
}
