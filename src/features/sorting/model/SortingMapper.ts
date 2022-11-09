import Guitar from '../../guitars/model/Guitar';
import { SortedProperty, SortingOrder } from './GuitarSorting';

export interface SortingMapping {
  property: SortedProperty;
  order: SortingOrder;
  frontProperty: string;
  compareFn: (g1: Guitar, g2: Guitar) => number;
}

export type SortingMapper = SortingMapping[];

const sortingMapper: SortingMapper = [
  {
    property: 'model',
    order: 'ascending',
    frontProperty: 'Model (A-Z)',
    compareFn: (g1, g2) => g1.model.localeCompare(g2.model),
  },
  {
    property: 'model',
    order: 'descending',
    frontProperty: 'Model (Z-A)',
    compareFn: (g1, g2) => g2.model.localeCompare(g1.model),
  },
  {
    property: 'price',
    order: 'ascending',
    frontProperty: 'Price (cheaper first)',
    compareFn: (g1, g2) => g1.price - g2.price,
  },
  {
    property: 'price',
    order: 'descending',
    frontProperty: 'Price (expensive first)',
    compareFn: (g1, g2) => g2.price - g1.price,
  },
];

export default sortingMapper;
