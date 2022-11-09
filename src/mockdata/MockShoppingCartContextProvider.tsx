import { PropsWithChildren, useReducer } from 'react';
import ShoppingCart from '../features/shoppingCart/model/ShoppingCart';
import ShoppingCartContext from '../features/shoppingCart/model/ShoppingCartContext';
import { shoppingCartReducer } from '../features/shoppingCart/model/ShoppingCartReducer';

export default function MockShoppingCartContextProvider({
  mockShoppingCart,
  children,
}: { mockShoppingCart: ShoppingCart } & PropsWithChildren): JSX.Element {
  const [shoppingCart, dispatchShoppingCartAction] = useReducer(
    shoppingCartReducer,
    mockShoppingCart
  );

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, dispatchShoppingCartAction }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
