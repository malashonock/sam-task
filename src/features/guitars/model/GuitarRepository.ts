import Guitar from './Guitar';
import Range from '../../../utils/Range';

export default interface GuitarRepository {
  guitars: Guitar[];
  categories: string[];
  brands: string[];
  colors: string[];
  priceRange: Range<number>;
}
