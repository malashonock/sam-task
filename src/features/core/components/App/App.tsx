import './App.scss';
import Layout from '../Layout/Layout';
import FilterContextProvider from 'features/filtering/components/FilterContextProvider/FilterContextProvider';
import GuitarRepositoryProvider from 'features/guitars/components/GuitarRepositoryProvider/GuitarRepositoryProvider';
import SortingContextProvider from 'features/sorting/model/SortingContextProvider';
import ShoppingCartContextProvider from 'features/shoppingCart/model/ShoppingCartContextProvider';

export default function App(): JSX.Element {
  return (
    <GuitarRepositoryProvider>
      <FilterContextProvider>
        <SortingContextProvider>
          <ShoppingCartContextProvider>
            <Layout />
          </ShoppingCartContextProvider>
        </SortingContextProvider>
      </FilterContextProvider>
    </GuitarRepositoryProvider>
  );
}
