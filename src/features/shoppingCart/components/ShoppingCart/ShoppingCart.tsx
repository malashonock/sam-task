import { useContext } from 'react';
import ShoppingCartContext, { ShoppingCartState } from '../../model/ShoppingCartContext';
import CartItemsCounter from '../CartItemsCounter/CartItemsCounter';

export default function ShoppingCart(): JSX.Element {
  const {
    shoppingCart: { itemsCount },
  }: ShoppingCartState = useContext(ShoppingCartContext) as ShoppingCartState;

  return (
    <i className="bi bi-cart4 position-relative">
      {itemsCount > 0 && <CartItemsCounter count={itemsCount} />}
    </i>
  );
}
