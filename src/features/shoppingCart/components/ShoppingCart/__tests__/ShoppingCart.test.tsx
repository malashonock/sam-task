import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import MockShoppingCartContextProvider from '../../../../../mockdata/MockShoppingCartContextProvider';
import mockShoppingCarts from '../../../../../mockdata/mockShoppingCarts';
import ShoppingCart from '../ShoppingCart';

describe('ShoppingCart component', () => {
  it('matches snapshot', () => {
    const shoppingCart = renderer.create(
      <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.empty}>
        <ShoppingCart />
      </MockShoppingCartContextProvider>
    );

    expect(shoppingCart).toMatchSnapshot();
  });

  describe('given no guitars in shopping cart', () => {
    it('renders no CartItemsCounter', () => {
      const { container } = render(
        <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.empty}>
          <ShoppingCart />
        </MockShoppingCartContextProvider>
      );

      const cartItemsCounter = container.querySelector('.badge');
      expect(cartItemsCounter).toBeNull();
    });
  });

  describe('given some guitars in shopping cart', () => {
    it('renders CartItemsCounter', () => {
      const { container } = render(
        <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.oneGuitarNoOverflow}>
          <ShoppingCart />
        </MockShoppingCartContextProvider>
      );

      const cartItemsCounter = container.querySelector('.badge');
      expect(cartItemsCounter).not.toBeNull();
    });
  });
});
