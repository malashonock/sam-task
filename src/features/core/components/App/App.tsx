import './App.scss';
import Layout from '../Layout/Layout';
import FilterContextProvider from '../../../filtering/components/FilterContextProvider/FilterContextProvider';
import GuitarRepositoryProvider from '../../../guitars/components/GuitarRepositoryProvider/GuitarRepositoryProvider';
import SortingContextProvider from '../../../sorting/model/SortingContextProvider';
import ShoppingCartContextProvider from '../../../shoppingCart/model/ShoppingCartContextProvider';

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
