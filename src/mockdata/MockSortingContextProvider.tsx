import { PropsWithChildren, useState } from 'react';
import SortingContext from '../features/sorting/model/SortingContext';
import GuitarSorting from '../features/sorting/model/GuitarSorting';
import { Nullable } from '../utils/Nullable';

export default function MockSortingContextProvider({
  mockSorting,
  children,
}: { mockSorting: Nullable<GuitarSorting> } & PropsWithChildren): JSX.Element {
  const [sorting, setSorting] = useState(mockSorting);

  return (
    <SortingContext.Provider value={{ sorting, setSorting }}>{children}</SortingContext.Provider>
  );
}
