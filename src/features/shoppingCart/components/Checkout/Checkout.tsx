import ShoppingCartContext, {
  ShoppingCartState,
} from 'features/shoppingCart/model/ShoppingCartContext';
import { useState } from 'react';
import { useContext } from 'react';
import getCurrencyString from 'utils/currency-format';
import CartItems from '../CartItems/CartItems';
import CheckoutToast from '../CheckoutToast/CheckoutToast';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

export default function Checkout(): JSX.Element {
  const { shoppingCart, dispatchShoppingCartAction } = useContext(
    ShoppingCartContext
  ) as ShoppingCartState;

  const [showToast, setShowToast] = useState(false);

  const handleCheckout = (): void => {
    setShowToast(true);
  };

  const clearShoppingCart = (): void => {
    setShowToast(false);
    dispatchShoppingCartAction({ type: 'clearItems' });
  };

  return (
    <div className="checkout d-flex flex-column gap-2">
      <div className="checkout__header d-flex flex-row justify-content-between">
        <h5 className="checkout__header my-auto">Shopping cart</h5>
        <ShoppingCart />
      </div>
      <CartItems />
      <p className="checkout__total fs-5 fw-bold my-2">
        Total: {getCurrencyString(shoppingCart.totalAmount)}
      </p>
      <button
        className="checkout__btn btn btn-success mt-auto"
        disabled={shoppingCart.itemsCount === 0}
        onClick={handleCheckout}
      >
        Checkout
      </button>
      <CheckoutToast show={showToast} onClose={clearShoppingCart} />
    </div>
  );
}
