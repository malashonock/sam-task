import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import FilterContext from '../../model/FilterContext';
import GuitarContext from '../../../guitars/model/GuitarContext';
import GuitarFilters from '../../model/GuitarFilters';
import GuitarRepository from '../../../guitars/model/GuitarRepository';
import {
  parseJsonFromLocalStorage,
  saveJsonToLocalStorage,
} from '../../../../utils/local-storage-utils';

function initFilters(fallback: GuitarFilters): GuitarFilters {
  return parseJsonFromLocalStorage<GuitarFilters>('filters', fallback);
}

function saveFilters(filtersToSave: GuitarFilters): void {
  saveJsonToLocalStorage<GuitarFilters>(filtersToSave, 'filters');
}

export default function FilterContextProvider({ children }: PropsWithChildren): JSX.Element {
  const { categories, brands, colors, priceRange }: GuitarRepository = useContext(
    GuitarContext
  ) as GuitarRepository;

  const [filters, setFilters] = useState(
    initFilters({
      category: categories,
      brand: brands,
      color: colors,
      price: priceRange,
      inStock: [],
      searchQuery: '',
    })
  );

  useEffect((): void => {
    saveFilters(filters);
  }, [filters]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>
  );
}
