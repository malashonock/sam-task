import { useCallback, useContext } from 'react';
import ShoppingCartContext, {
  ShoppingCartState,
} from 'features/shoppingCart/model/ShoppingCartContext';
import Guitar from '../../model/Guitar';
import styles from './GuitarCard.module.scss';
import getCurrencyString from 'utils/currency-format';
import { useMemo } from 'react';

interface GuitarCardProps {
  guitar: Guitar;
}

export default function GuitarCard({ guitar }: GuitarCardProps): JSX.Element {
  const { model, price, imageFilename }: Guitar = guitar;

  const { shoppingCart, dispatchShoppingCartAction } = useContext(
    ShoppingCartContext
  ) as ShoppingCartState;

  const isInCart = useMemo((): boolean => {
    return shoppingCart.findLineItemIndex(guitar) >= 0;
  }, [guitar, shoppingCart]);

  const handleShoppingCartToggle = useCallback((): void => {
    dispatchShoppingCartAction({ type: 'addItem', item: guitar });
  }, [dispatchShoppingCartAction, guitar]);

  return (
    <div className={['card', styles.card].join(' ')}>
      <div className="card-img p-3">
        <img src={`./img/${imageFilename}`} className="card-img-top img-fluid" alt={model} />
      </div>
      <div className="card-body text-center">
        <h6 className="card-title">{model}</h6>
        <h2 className="card-title">{getCurrencyString(price)}</h2>
        <button
          type="button"
          className={`btn btn-${isInCart ? 'warning' : 'primary'} m-2`}
          onClick={handleShoppingCartToggle}
        >
          {isInCart ? 'Add one more' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
