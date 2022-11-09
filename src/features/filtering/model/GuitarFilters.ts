import Range from '../../../utils/Range';

export default interface GuitarFilters {
  [key: string]: unknown;

  category: string[];
  brand: string[];
  color: string[];
  price: Range<number>;
  inStock: boolean[];
  searchQuery: string;
}

export const defaultGuitarFilters: GuitarFilters = {
  category: [],
  brand: [],
  color: [],
  price: { from: 0, to: 9999 },
  inStock: [],
  searchQuery: '',
};
