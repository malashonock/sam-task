import GuitarFilters, { defaultGuitarFilters } from '../features/filtering/model/GuitarFilters';

const mockGuitarFilters: { [name: string]: GuitarFilters } = {
  none: { ...defaultGuitarFilters },

  oneCategorySelected: {
    ...defaultGuitarFilters,
    category: ['Electric guitars'],
  },

  oneBrandSelected: {
    ...defaultGuitarFilters,
    brand: ['Gibson'],
  },

  oneColorSelected: {
    ...defaultGuitarFilters,
    category: ['white'],
  },

  setMaxPrice: {
    ...defaultGuitarFilters,
    price: { from: 0, to: 1500 },
  },

  preOrderSelected: {
    ...defaultGuitarFilters,
    inStock: [false],
  },

  searchQueryEntered: {
    ...defaultGuitarFilters,
    searchQuery: 'het',
  },

  missingBrandSelected: {
    ...defaultGuitarFilters,
    brand: ['Fender'],
  },
};

export default mockGuitarFilters;
