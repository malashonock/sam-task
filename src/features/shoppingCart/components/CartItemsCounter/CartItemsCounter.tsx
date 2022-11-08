import './CartItemsCounter.scss';

interface CartItemsCounterProps {
  count: number;
}

export default function CartItemsCounter({ count }: CartItemsCounterProps): JSX.Element {
  return (
    <span className="position-absolute top-25 start-100 fs-6 fst-normal translate-middle badge rounded-pill bg-danger">
      {count}
      <span className="visually-hidden">Number of items in cart</span>
    </span>
  );
}
