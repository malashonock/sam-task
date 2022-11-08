import Guitar from '../features/guitars/model/Guitar';
import GuitarRepository from '../features/guitars/model/GuitarRepository';
import { getBrands, getCategories, getColors, getPriceRange } from '../features/guitars/model/GuitarService';

export default function mockGuitarRepositoryFactory(guitars: Guitar[]): GuitarRepository {
  return {
    guitars,
    categories: getCategories(guitars),
    brands: getBrands(guitars),
    colors: getColors(guitars),
    priceRange: getPriceRange(guitars),
  };
}
