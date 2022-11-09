import { createContext, Dispatch } from 'react';
import { ShoppingCartAction } from './ShoppingCartReducer';
import { Undefinable } from '../../../utils/Nullable';
import ShoppingCart from './ShoppingCart';

export interface ShoppingCartState {
  shoppingCart: ShoppingCart;
  dispatchShoppingCartAction: Dispatch<ShoppingCartAction>;
}

const ShoppingCartContext = createContext<Undefinable<ShoppingCartState>>(undefined);

export default ShoppingCartContext;
