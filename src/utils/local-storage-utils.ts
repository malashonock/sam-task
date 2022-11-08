import { Nullable } from './Nullable';

export function parseJsonFromLocalStorage<T>(key: string, fallBack: T): T {
  const jsonFromLocalStorage: Nullable<string> = localStorage.getItem(key);

  if (jsonFromLocalStorage) {
    return JSON.parse(jsonFromLocalStorage) as T;
  }

  return fallBack;
}

export function saveJsonToLocalStorage<T>(value: T, key: string): void {
  localStorage.setItem(key, JSON.stringify(value));
}
