import { Nullable } from '../../../utils/Nullable';
import { EqualityComparer } from '../../../utils/Comparer';

export default interface Guitar {
  [key: string]: unknown;

  category: string;
  brand: string;
  model: string;
  description: string;
  color: string;
  price: number;
  inStock: boolean;
  rating: Nullable<number>;
  popularity: number;
  imageFilename: string;
}

export const areGuitarsEqual: EqualityComparer<Guitar> = (guitar1: Guitar, guitar2: Guitar) => {
  return guitar1.model === guitar2.model;
};
