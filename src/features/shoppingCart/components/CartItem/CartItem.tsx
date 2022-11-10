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
    dispatchShoppingCartAction({ type: 'remove', item: item.sku });
  };

  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <div className="cart-item__name">{item.sku.model}</div>
        <div className="cart-item__total">
          <span className="cart-item__price">{getCurrencyString(item.sku.price)}</span>
          <span> X </span>
          <span className="cart-item__quantity">{item.quantity}</span>
        </div>
      </div>
      <button className="btn btn-close cart-item__remove-btn" onClick={handleRemove} />
    </div>
  );
}
