import Guitar from '../../guitars/model/Guitar';
import ShoppingCart from './ShoppingCart';

export type ShoppingCartAction =
  | { type: 'addItem'; item: Guitar }
  | { type: 'removeItem'; item: Guitar }
  | { type: 'removeLineItem'; item: Guitar }
  | { type: 'clearItems' }
  | { type: 'clearOverflow' };

export function shoppingCartReducer(
  shoppingCart: ShoppingCart,
  action: ShoppingCartAction
): ShoppingCart {
  switch (action.type) {
    case 'addItem':
      shoppingCart.addItem(action.item);
      return shoppingCart.clone();

    case 'removeItem':
      shoppingCart.removeItem(action.item);
      return shoppingCart.clone();

    case 'removeLineItem':
      shoppingCart.removeLineItem(action.item);
      return shoppingCart.clone();

    case 'clearItems':
      return new ShoppingCart();

    case 'clearOverflow':
      if (shoppingCart.pendingOverflow) {
        shoppingCart.pendingOverflow = false;
      }

      return shoppingCart.clone();

    default:
      throw new Error('Unknown action type');
  }
}
