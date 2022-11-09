import { PropsWithChildren } from 'react';
import GuitarContext from '../features/guitars/model/GuitarContext';
import GuitarRepository from '../features/guitars/model/GuitarRepository';

export default function MockGuitarRepositoryProvider({
  mockRepository: { guitars, categories, brands, colors, priceRange },
  children,
}: { mockRepository: GuitarRepository } & PropsWithChildren): JSX.Element {
  return (
    <GuitarContext.Provider value={{ guitars, categories, brands, colors, priceRange }}>
      {children}
    </GuitarContext.Provider>
  );
}
