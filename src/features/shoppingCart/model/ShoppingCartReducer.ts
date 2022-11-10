import Guitar from '../../guitars/model/Guitar';
import ShoppingCart from './ShoppingCart';

export type ShoppingCartAction =
  | { type: 'add'; item: Guitar }
  | { type: 'remove'; item: Guitar }
  | { type: 'clearItems' }
  | { type: 'clearOverflow' };

export function shoppingCartReducer(
  shoppingCart: ShoppingCart,
  action: ShoppingCartAction
): ShoppingCart {
  switch (action.type) {
    case 'add':
      shoppingCart.addItem(action.item);
      return shoppingCart.clone();

    case 'remove':
      shoppingCart.removeItem(action.item);
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
