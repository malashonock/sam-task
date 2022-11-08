import Guitar, { areGuitarsEqual } from '../../guitars/model/Guitar';
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
  const maxItemCount: number = 20;

  switch (action.type) {
    case 'add':
      // Continue only if item is new
      if (
        shoppingCart.guitars.findIndex((itemInCart) => areGuitarsEqual(itemInCart, action.item)) ===
        -1
      ) {
        // Add item to state, unless upper limit has been reached
        if (shoppingCart.guitars.length < maxItemCount) {
          return {
            guitars: [...shoppingCart.guitars, action.item],
            pendingOverflow: false,
          };
        }

        // Otherwise, return same items collection with pending overflow flag
        return {
          guitars: [...shoppingCart.guitars],
          pendingOverflow: true,
        };
      }

      // Otherwise, return unchanged state
      return shoppingCart;

    case 'remove':
      return {
        guitars: shoppingCart.guitars.filter(
          (itemInCart) => !areGuitarsEqual(itemInCart, action.item)
        ),
        pendingOverflow: false,
      };

    case 'clearItems':
      return {
        guitars: [],
        pendingOverflow: false,
      };

    case 'clearOverflow':
      if (shoppingCart.pendingOverflow) {
        return {
          guitars: [...shoppingCart.guitars],
          pendingOverflow: false,
        };
      }

      return shoppingCart;

    default:
      throw new Error('Unknown action type');
  }
}
