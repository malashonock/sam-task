import { PropsWithChildren, useEffect, useState } from 'react';
import SortingContext from './SortingContext';
import GuitarSorting from './GuitarSorting';
import {
  parseJsonFromLocalStorage,
  saveJsonToLocalStorage,
} from '../../../utils/local-storage-utils';
import { Nullable } from '../../../utils/Nullable';

function initSorting(): Nullable<GuitarSorting> {
  return parseJsonFromLocalStorage<Nullable<GuitarSorting>>('sorting', null);
}

function saveSorting(sortingToSave: Nullable<GuitarSorting>): void {
  saveJsonToLocalStorage<Nullable<GuitarSorting>>(sortingToSave, 'sorting');
}

export default function SortingContextProvider({ children }: PropsWithChildren): JSX.Element {
  const [sorting, setSorting] = useState(initSorting());

  useEffect((): void => {
    saveSorting(sorting);
  }, [sorting]);

  return (
    <SortingContext.Provider value={{ sorting, setSorting }}>{children}</SortingContext.Provider>
  );
}
