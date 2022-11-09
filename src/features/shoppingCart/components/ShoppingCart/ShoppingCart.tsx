import { useContext } from 'react';
import ShoppingCartContext, { ShoppingCartState } from '../../model/ShoppingCartContext';
import CartItemsCounter from '../CartItemsCounter/CartItemsCounter';

export default function ShoppingCart(): JSX.Element {
  const {
    shoppingCart: { guitars },
  }: ShoppingCartState = useContext(ShoppingCartContext) as ShoppingCartState;

  return (
    <i className="bi bi-cart4 position-relative">
      {guitars.length > 0 && <CartItemsCounter count={guitars.length} />}
    </i>
  );
}
