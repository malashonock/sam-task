import Guitar from './Guitar';
import GuitarFilters from '../../filtering/model/GuitarFilters';
import GuitarSorting from '../../sorting/model/GuitarSorting';
import Range from '../../../utils/Range';
import { SortingMapper, SortingMapping } from '../../sorting/model/SortingMapper';
import { SortingComparer } from '../../../utils/Comparer';
import deepClone from '../../../utils/deepClone';
import distinct from '../../../utils/distinct';
import { Nullable, Undefinable } from '../../../utils/Nullable';

export async function loadGuitarsAsync(url: string): Promise<Guitar[]> {
  try {
    const res: Response = await fetch(url);
    const guitars: Guitar[] = await (res.json() as Promise<Guitar[]>);
    return guitars;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function getCategories(guitars: Guitar[]): string[] {
  return guitars.map((guitar: Guitar): string => guitar.category).filter(distinct);
}

export function getBrands(guitars: Guitar[]): string[] {
  return guitars.map((guitar: Guitar): string => guitar.brand).filter(distinct);
}

export function getColors(guitars: Guitar[]): string[] {
  return guitars.map((guitar: Guitar): string => guitar.color).filter(distinct);
}

export function getPriceRange(guitars: Guitar[]): Range<number> {
  let maxPrice: number = 0;

  guitars.forEach((guitar: Guitar): void => {
    if (guitar.price > maxPrice) {
      maxPrice = guitar.price;
    }
  });

  let minPrice: number = maxPrice;

  guitars.forEach((guitar: Guitar): void => {
    if (guitar.price < minPrice) {
      minPrice = guitar.price;
    }
  });

  return {
    from: minPrice,
    to: maxPrice,
  };
}

export function filterGuitars(guitars: Guitar[], filters: GuitarFilters): Guitar[] {
  let filteredGuitars: Guitar[] = deepClone(guitars);

  Object.keys(filters).forEach((filter: string): void => {
    if (Object.prototype.hasOwnProperty.call(filters, filter)) {
      const filterContent = filters[filter];

      // Apply textual filters,
      // formulated as string arrays)
      if (Array.isArray(filterContent)) {
        if (filterContent.length > 0) {
          filteredGuitars = filteredGuitars.filter((guitar: Guitar): boolean =>
            filterContent.includes(guitar[filter])
          );
        }
      }

      // Apply number range filters,
      // formulated as objects with from and to properties
      if (
        Object.prototype.hasOwnProperty.call(filterContent, 'from') &&
        Object.prototype.hasOwnProperty.call(filterContent, 'to')
      ) {
        filteredGuitars = filteredGuitars.filter((guitar: Guitar): boolean => {
          const guitarParam: number = guitar[filter] as number;
          const filterFrom: number = (filterContent as Range<number>).from;
          const filterTo: number = (filterContent as Range<number>).to;
          return guitarParam >= filterFrom && guitarParam <= filterTo;
        });
      }

      // Apply search query
      if (filter === 'searchQuery') {
        filteredGuitars = filteredGuitars.filter((guitar: Guitar): boolean => {
          const query: string = (filterContent as string).toLowerCase();

          if (query.length === 0) {
            return true;
          }

          return guitar.model.toLowerCase().includes(query);
        });
      }
    }
  });

  return filteredGuitars;
}

export function sortGuitars(
  guitars: Guitar[],
  sorting: Nullable<GuitarSorting>,
  sortingMapper: SortingMapper
) {
  const sortedGuitars = deepClone(guitars);

  if (sorting) {
    const sortingMapping: Undefinable<SortingMapping> = sortingMapper.find(
      (mapping: SortingMapping): boolean =>
        mapping.property === sorting?.property && mapping.order === sorting?.order
    ) as Undefinable<SortingMapping>;

    const compareFn: Undefinable<SortingComparer<Guitar>> = sortingMapping?.compareFn;

    sortedGuitars.sort(compareFn);
  }

  return sortedGuitars;
}
