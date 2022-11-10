import Guitar from 'features/guitars/model/Guitar';
import ShoppingCart from 'features/shoppingCart/model/ShoppingCart';
import ShoppingCartLineItem from 'features/shoppingCart/model/ShoppingCartLineItem';
import mockGuitars from './mockGuitars';

const mapGuitarsToShoppingCart = (
  guitars: Guitar[],
  shoppingCart: ShoppingCart = new ShoppingCart()
): ShoppingCart => {
  guitars
    .map((guitar: Guitar): ShoppingCartLineItem => {
      return { sku: guitar, quantity: 1 };
    })
    .forEach((lineItem: ShoppingCartLineItem): void => {
      shoppingCart.addItem(lineItem.sku);
    });

  return shoppingCart;
};

const mockShoppingCarts: { [name: string]: ShoppingCart } = {
  empty: new ShoppingCart(),
  oneGuitarNoOverflow: mapGuitarsToShoppingCart(mockGuitars.oneGuitar),
  oneGuitarPendingOverflow: mapGuitarsToShoppingCart(
    mockGuitars.oneGuitar,
    new ShoppingCart([], 0, 0, true)
  ),
};

export default mockShoppingCarts;
