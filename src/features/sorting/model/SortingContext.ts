import { createContext, Dispatch, SetStateAction } from 'react';
import GuitarSorting from './GuitarSorting';
import { Nullable, Undefinable } from '../../../utils/Nullable';

export type SortingState = {
  sorting: Nullable<GuitarSorting>;
  setSorting: Dispatch<SetStateAction<Nullable<GuitarSorting>>>;
};

const SortingContext = createContext<Undefinable<SortingState>>(undefined);

export default SortingContext;
