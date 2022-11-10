import ShoppingCartContext, {
  ShoppingCartState,
} from 'features/shoppingCart/model/ShoppingCartContext';
import { useContext } from 'react';
import CartItems from '../CartItems/CartItems';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

export default function Checkout(): JSX.Element {
  const {
    shoppingCart: { itemsCount },
  } = useContext(ShoppingCartContext) as ShoppingCartState;

  return (
    <div className="checkout d-flex flex-column gap-2">
      <div className="checkout__header d-flex flex-row justify-content-between">
        <h5 className="checkout__header my-auto">Shopping cart</h5>
        <ShoppingCart />
      </div>
      <CartItems />
      <button className="checkout__btn btn btn-success mt-auto" disabled={itemsCount === 0}>
        Checkout
      </button>
    </div>
  );
}
