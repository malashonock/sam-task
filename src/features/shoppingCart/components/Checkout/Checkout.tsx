import CartItems from '../CartItems/CartItems';

export default function Checkout(): JSX.Element {
  return (
    <div className="d-flex flex-column gap-2">
      <h5>Cart</h5>
      <CartItems />
      <button className="btn btn-success mt-auto">Checkout</button>
    </div>
  );
}
