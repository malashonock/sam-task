import { PropsWithChildren } from 'react';
import GuitarFilters from '../features/filtering/model/GuitarFilters';
import GuitarRepository from '../features/guitars/model/GuitarRepository';
import ShoppingCart from '../features/shoppingCart/model/ShoppingCart';
import GuitarSorting from '../features/sorting/model/GuitarSorting';
import { Nullable } from '../utils/Nullable';
import MockFilterContextProvider from './MockFilterContextProvider';
import mockGuitarFilters from './mockGuitarFilters';
import mockGuitarRepositoryFactory from './mockGuitarRepositoryFactory';
import MockGuitarRepositoryProvider from './MockGuitarRepositoryProvider';
import mockGuitars from './mockGuitars';
import mockGuitarSorting from './mockGuitarSorting';
import MockShoppingCartContextProvider from './MockShoppingCartContextProvider';
import mockShoppingCarts from './mockShoppingCarts';
import MockSortingContextProvider from './MockSortingContextProvider';

export default function TestApp({
  mockRepository = mockGuitarRepositoryFactory(mockGuitars.none),
  mockFilters = mockGuitarFilters.none,
  mockSorting = mockGuitarSorting.none,
  mockShoppingCart = mockShoppingCarts.empty,
  children,
}: Partial<{
  mockRepository: GuitarRepository;
  mockFilters: GuitarFilters;
  mockSorting: Nullable<GuitarSorting>;
  mockShoppingCart: ShoppingCart;
}> &
  PropsWithChildren): JSX.Element {
  return (
    <MockGuitarRepositoryProvider mockRepository={mockRepository}>
      <MockFilterContextProvider mockFilters={mockFilters}>
        <MockSortingContextProvider mockSorting={mockSorting}>
          <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCart}>
            {children}
          </MockShoppingCartContextProvider>
        </MockSortingContextProvider>
      </MockFilterContextProvider>
    </MockGuitarRepositoryProvider>
  );
}
