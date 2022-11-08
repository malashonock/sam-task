import Guitar from './Guitar';
import GuitarFilters from '../../filtering/model/GuitarFilters';
import GuitarSorting from '../../sorting/model/GuitarSorting';
import sortingMapper from '../../sorting/model/SortingMapper';
import { filterGuitars, sortGuitars } from './GuitarService';
import deepClone from '../../../utils/deepClone';
import { Nullable } from '../../../utils/Nullable';

export type GuitarListAction =
  | {
      type: 'update';
      guitarState: { guitars: Guitar[]; filters: GuitarFilters; sorting: Nullable<GuitarSorting> };
    }
  | { type: 'filter'; filters: GuitarFilters }
  | { type: 'sort'; sorting: Nullable<GuitarSorting> };

export function guitarListReducer(guitarList: Guitar[], action: GuitarListAction): Guitar[] {
  switch (action.type) {
    case 'update':
      const allGuitars: Guitar[] = deepClone(action.guitarState.guitars);
      const filteredGuitars: Guitar[] = filterGuitars(allGuitars, action.guitarState.filters);
      const sortedGuitars: Guitar[] = sortGuitars(
        filteredGuitars,
        action.guitarState.sorting,
        sortingMapper
      );
      return sortedGuitars;

    case 'filter':
      return filterGuitars(guitarList, action.filters);

    case 'sort':
      return sortGuitars(guitarList, action.sorting, sortingMapper);

    default:
      throw new Error('Unknown action type');
  }
}
