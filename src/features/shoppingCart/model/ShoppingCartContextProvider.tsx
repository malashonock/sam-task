import { PropsWithChildren, useEffect, useReducer } from 'react';
import {
  parseJsonFromLocalStorage,
  saveJsonToLocalStorage,
} from '../../../utils/local-storage-utils';
import ShoppingCart from './ShoppingCart';
import ShoppingCartContext from './ShoppingCartContext';
import { shoppingCartReducer } from './ShoppingCartReducer';

function initShoppingCart(): ShoppingCart {
  return parseJsonFromLocalStorage<ShoppingCart>('shoppingCart', {
    guitars: [],
    pendingOverflow: false,
  });
}

function saveShoppingCart(shoppingCartToSave: ShoppingCart): void {
  saveJsonToLocalStorage<ShoppingCart>(shoppingCartToSave, 'shoppingCart');
}

export default function ShoppingCartContextProvider({ children }: PropsWithChildren): JSX.Element {
  const [shoppingCart, dispatchShoppingCartAction] = useReducer(
    shoppingCartReducer,
    initShoppingCart()
  );

  useEffect((): void => {
    saveShoppingCart(shoppingCart);
  }, [shoppingCart]);

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, dispatchShoppingCartAction }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
