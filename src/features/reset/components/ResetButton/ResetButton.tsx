import { MouseEvent, useContext } from 'react';
import FilterContext, { FiltersState } from '../../../filtering/model/FilterContext';
import GuitarContext from '../../../guitars/model/GuitarContext';
import SortingContext, { SortingState } from '../../../sorting/model/SortingContext';
import GuitarFilters from '../../../filtering/model/GuitarFilters';
import GuitarRepository from '../../../guitars/model/GuitarRepository';
import GuitarSorting from '../../../sorting/model/GuitarSorting';
import { Nullable } from '../../../../utils/Nullable';
import ShoppingCartContext, {
  ShoppingCartState,
} from '../../../shoppingCart/model/ShoppingCartContext';

interface ResetOption {
  id: string;
  text: string;
  clickEventHandler: () => void;
}

export default function ResetButton(): JSX.Element {
  const { setFilters }: FiltersState = useContext(FilterContext) as FiltersState;
  const { setSorting }: SortingState = useContext(SortingContext) as SortingState;
  const { dispatchShoppingCartAction }: ShoppingCartState = useContext(
    ShoppingCartContext
  ) as ShoppingCartState;

  const { priceRange }: GuitarRepository = useContext(GuitarContext) as GuitarRepository;

  const clearFilters = (): void => {
    setFilters((): GuitarFilters => {
      const defaultFilters: GuitarFilters = {
        category: [],
        brand: [],
        color: [],
        price: priceRange,
        inStock: [],
        searchQuery: '',
      };
      return defaultFilters;
    });
  };

  const clearSorting = (): void => {
    setSorting((): Nullable<GuitarSorting> => {
      const defaultSorting: Nullable<GuitarSorting> = null;
      return defaultSorting;
    });
  };

  const clearShoppingCart = (): void => {
    dispatchShoppingCartAction({ type: 'clearItems' });
  };

  const clearAll = (): void => {
    clearFilters();
    clearSorting();
    clearShoppingCart();
  };

  const resetOptions: ResetOption[] = [
    { id: 'clear-all', text: 'All', clickEventHandler: clearAll },
    { id: 'clear-filters', text: 'Filters only', clickEventHandler: clearFilters },
    { id: 'clear-sorting', text: 'Sorting only', clickEventHandler: clearSorting },
    { id: 'clear-cart', text: 'Cart only', clickEventHandler: clearShoppingCart },
  ];

  const handleClick = (event: MouseEvent): void => {
    const clickedButton: HTMLButtonElement = event.target as HTMLButtonElement;

    if (clickedButton.id) {
      resetOptions.find((option) => option.id === clickedButton.id)?.clickEventHandler();
    }
  };

  return (
    <div className="dropdown my-3 align-self-center">
      <button
        className="btn btn-danger dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Clear selection
      </button>
      <ul className="dropdown-menu">
        {resetOptions.map((option) => (
          <li key={option.id}>
            <button id={option.id} className="dropdown-item" type="button" onClick={handleClick}>
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
