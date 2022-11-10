import ShoppingCartContext from 'features/shoppingCart/model/ShoppingCartContext';
import ShoppingCartLineItem from 'features/shoppingCart/model/ShoppingCartLineItem';
import { useContext } from 'react';
import CartItem from '../CartItem/CartItem';

export default function CartItems(): JSX.Element {
  const shoppingCartState = useContext(ShoppingCartContext);

  return (
    <div>
      {shoppingCartState?.shoppingCart.lineItems.map(
        (lineItem: ShoppingCartLineItem, index: number): JSX.Element => {
          return <CartItem item={lineItem} key={index} />;
        }
      ) ?? null}
    </div>
  );
}
