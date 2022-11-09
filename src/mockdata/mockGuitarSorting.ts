import GuitarSorting from '../features/sorting/model/GuitarSorting';
import { Nullable } from '../utils/Nullable';

const mockGuitarSorting: { [name: string]: Nullable<GuitarSorting> } = {
  none: null,

  byModelAscending: {
    property: 'model',
    order: 'ascending',
  },

  byPriceDescending: {
    property: 'price',
    order: 'descending',
  },
};

export default mockGuitarSorting;
