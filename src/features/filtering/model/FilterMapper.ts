export interface FilterMapper<TValue> {
  name: { back: string; front: string };
  values: { back: TValue; front: string }[];
}
