import { useCallback, useContext } from 'react';
import ShoppingCartContext, {
  ShoppingCartState,
} from '../../../shoppingCart/model/ShoppingCartContext';
import Guitar, { areGuitarsEqual } from '../../model/Guitar';
import styles from './GuitarCard.module.scss';

interface GuitarCardProps {
  guitar: Guitar;
}

export default function GuitarCard({ guitar }: GuitarCardProps): JSX.Element {
  const { model, price, imageFilename }: Guitar = guitar;

  const { shoppingCart, dispatchShoppingCartAction }: ShoppingCartState = useContext(
    ShoppingCartContext
  ) as ShoppingCartState;

  const isInCart = useCallback((): boolean => {
    return shoppingCart.guitars.findIndex((itemInCart) => areGuitarsEqual(itemInCart, guitar)) > -1;
  }, [guitar, shoppingCart]);

  const handleShoppingCartToggle = useCallback((): void => {
    if (!isInCart()) {
      dispatchShoppingCartAction({ type: 'add', item: guitar });
    } else {
      dispatchShoppingCartAction({ type: 'remove', item: guitar });
    }
  }, [dispatchShoppingCartAction, guitar, isInCart]);

  return (
    <div className={['card', styles.card].join(' ')}>
      <div className="card-img p-3">
        <img src={`./img/${imageFilename}`} className="card-img-top img-fluid" alt={model} />
      </div>
      <div className="card-body text-center">
        <h6 className="card-title">{model}</h6>
        <h2 className="card-title">{`${price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}`}</h2>
        <button
          type="button"
          className={`btn btn-${isInCart() ? 'danger' : 'primary'} m-2`}
          onClick={handleShoppingCartToggle}
        >
          {isInCart() ? 'Remove from cart' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
