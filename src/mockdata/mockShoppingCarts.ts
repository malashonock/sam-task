import ShoppingCart from '../features/shoppingCart/model/ShoppingCart';
import mockGuitars from './mockGuitars';

const mockShoppingCarts: { [name: string]: ShoppingCart } = {
  empty: {
    guitars: [],
    pendingOverflow: false,
  },

  oneGuitarNoOverflow: {
    guitars: mockGuitars.oneGuitar,
    pendingOverflow: false,
  },

  oneGuitarPendingOverflow: {
    guitars: mockGuitars.oneGuitar,
    pendingOverflow: true,
  },
};

export default mockShoppingCarts;
