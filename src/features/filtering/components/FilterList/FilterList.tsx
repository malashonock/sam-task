import { useContext } from 'react';
import GuitarContext from '../../../guitars/model/GuitarContext';
import Filter from '../Filter/Filter';
import { FilterMapper } from '../../model/FilterMapper';
import RangeFilter from '../RangeFilter/RangeFilter';
import GuitarRepository from '../../../guitars/model/GuitarRepository';

export default function FilterList(): JSX.Element {
  const { categories, brands, colors, priceRange }: GuitarRepository = useContext(
    GuitarContext
  ) as GuitarRepository;

  const inStockOptions: boolean[] = [true, false];
  const inStockFilterMapper: FilterMapper<boolean> = {
    name: { back: 'inStock', front: 'availability' },
    values: [
      { back: true, front: 'in stock' },
      { back: false, front: 'pre-order' },
    ],
  };

  return (
    <div className="accordion accordion-flush" id="filters">
      <Filter filterBy="category" options={categories} />
      <Filter filterBy="brand" options={brands} />
      <Filter filterBy="color" options={colors} />
      <Filter<boolean> filterBy="inStock" options={inStockOptions} mapper={inStockFilterMapper} />
      <RangeFilter filterBy="price" min={priceRange.from} max={priceRange.to} />
    </div>
  );
}
