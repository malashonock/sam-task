import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import GuitarCard from '../GuitarCard';
import mockGuitars from '../../../../../mockdata/mockGuitars';
import MockShoppingCartContextProvider from '../../../../../mockdata/MockShoppingCartContextProvider';
import mockShoppingCarts from '../../../../../mockdata/mockShoppingCarts';

describe('GuitarCard component', () => {
  it('matches snapshot', () => {
    const guitarCard = renderer.create(
      <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.empty}>
        <GuitarCard guitar={mockGuitars.oneGuitar[0]} />
      </MockShoppingCartContextProvider>
    );

    expect(guitarCard).toMatchSnapshot();
  });

  describe('Add to/remove from cart button', () => {
    describe('given that guitar prop is NOT in the shopping cart', () => {
      it('has class "bnt-primary"', () => {
        const { container } = render(
          <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.empty}>
            <GuitarCard guitar={mockGuitars.oneGuitar[0]} />
          </MockShoppingCartContextProvider>
        );

        const button = container.querySelector('.btn');
        expect(button).toHaveClass('btn-primary');
      });

      it('has text "Add to cart"', () => {
        const { container } = render(
          <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.empty}>
            <GuitarCard guitar={mockGuitars.oneGuitar[0]} />
          </MockShoppingCartContextProvider>
        );

        const button = container.querySelector('.btn');
        expect(button).toHaveTextContent('Add to cart');
      });
    });

    describe('given that guitar prop IS in the shopping cart', () => {
      it('has class "btn-danger"', () => {
        const { container } = render(
          <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.oneGuitarNoOverflow}>
            <GuitarCard guitar={mockGuitars.oneGuitar[0]} />
          </MockShoppingCartContextProvider>
        );

        const button = container.querySelector('.btn');
        expect(button).toHaveClass('btn-danger');
      });

      it('has text "Remove from cart"', () => {
        const { container } = render(
          <MockShoppingCartContextProvider mockShoppingCart={mockShoppingCarts.oneGuitarNoOverflow}>
            <GuitarCard guitar={mockGuitars.oneGuitar[0]} />
          </MockShoppingCartContextProvider>
        );

        const button = container.querySelector('.btn');
        expect(button).toHaveTextContent('Remove from cart');
      });
    });
  });
});
