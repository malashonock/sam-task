import { PropsWithChildren, useEffect, useState } from 'react';
import GuitarContext from '../../model/GuitarContext';
import Guitar from '../../model/Guitar';
import Range from '../../../../utils/Range';
import {
  getBrands,
  getCategories,
  getColors,
  getPriceRange,
  loadGuitarsAsync,
} from '../../model/GuitarService';

const guitarsUrl = './data/guitars.json';

export default function GuitarRepositoryProvider({ children }: PropsWithChildren): JSX.Element {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<Range<number>>({ from: 0, to: 9999 });

  useEffect(() => {
    loadGuitarsAsync(guitarsUrl)
      .then((fetchedGuitars) => {
        setGuitars(fetchedGuitars);
        setCategories(getCategories(fetchedGuitars));
        setBrands(getBrands(fetchedGuitars));
        setColors(getColors(fetchedGuitars));
        setPriceRange(getPriceRange(fetchedGuitars));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <GuitarContext.Provider value={{ guitars, categories, brands, colors, priceRange }}>
      {children}
    </GuitarContext.Provider>
  );
}
