import { createContext, Dispatch, SetStateAction } from 'react';
import GuitarFilters from './GuitarFilters';
import { Undefinable } from '../../../utils/Nullable';

export interface FiltersState {
  filters: GuitarFilters;
  setFilters: Dispatch<SetStateAction<GuitarFilters>>;
}

const FilterContext = createContext<Undefinable<FiltersState>>(undefined);

export default FilterContext;
