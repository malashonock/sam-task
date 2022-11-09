import { PropsWithChildren, useState } from 'react';
import FilterContext from '../features/filtering/model/FilterContext';
import GuitarFilters from '../features/filtering/model/GuitarFilters';

export default function MockFilterContextProvider({
  mockFilters,
  children,
}: { mockFilters: GuitarFilters } & PropsWithChildren): JSX.Element {
  const [filters, setFilters] = useState(mockFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>
  );
}
