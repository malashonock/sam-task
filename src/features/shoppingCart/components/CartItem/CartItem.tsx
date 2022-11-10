import ShoppingCartContext, {
  ShoppingCartState,
} from 'features/shoppingCart/model/ShoppingCartContext';
import ShoppingCartLineItem from 'features/shoppingCart/model/ShoppingCartLineItem';
import { useContext } from 'react';
import getCurrencyString from 'utils/currency-format';

interface CartItemProps {
  item: ShoppingCartLineItem;
}

export default function CartItem({ item }: CartItemProps): JSX.Element {
  const { dispatchShoppingCartAction } = useContext(ShoppingCartContext) as ShoppingCartState;

  const handleRemove = (): void => {
    dispatchShoppingCartAction({ type: 'removeLineItem', item: item.sku });
  };

  return (
    <div className="cart-item d-flex gap-2 justify-content-between">
      <div className="cart-item__info small">
        <div className="cart-item__name">{item.sku.model}</div>
        <div className="cart-item__total fw-semibold">
          <span className="cart-item__price">{getCurrencyString(item.sku.price)}</span>
          <span> X </span>
          <span className="cart-item__quantity">{item.quantity}</span>
        </div>
      </div>
      <div className="cart-item__remove-btn d-flex align-items-center">
        <button className="btn btn-close" onClick={handleRemove} />
      </div>
    </div>
  );
}
