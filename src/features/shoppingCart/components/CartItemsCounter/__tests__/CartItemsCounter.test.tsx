import { render } from '@testing-library/react';
import CartItemsCounter from '../CartItemsCounter';

describe('CartItemsCounter component', () => {
  describe('given 3 count prop', () => {
    it('is rendered with value 3', () => {
      const { container } = render(<CartItemsCounter count={3} />);
      const cartItemsCounter = container.querySelector('.badge');
      expect(cartItemsCounter).toHaveTextContent('3');
    });
  });

  describe('given 0 count prop', () => {
    it('is still rendered with value 0', () => {
      const { container } = render(<CartItemsCounter count={0} />);
      const cartItemsCounter = container.querySelector('.badge');
      expect(cartItemsCounter).toHaveTextContent('0');
    });
  });
});
