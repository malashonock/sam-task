export type SortedProperty = 'model' | 'price';
export type SortingOrder = 'ascending' | 'descending';

export default interface GuitarSorting {
  property: SortedProperty;
  order: SortingOrder;
}
