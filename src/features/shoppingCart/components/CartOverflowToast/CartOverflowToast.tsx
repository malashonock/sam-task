import { Toast } from 'bootstrap';
import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import ShoppingCartContext, { ShoppingCartState } from '../../model/ShoppingCartContext';
import useFirstRender from '../../../../utils/useFirstRender';
import { Nullable, Undefinable } from '../../../../utils/Nullable';

export default function CartOverflowToast(): JSX.Element {
  const toastRootRef: MutableRefObject<Nullable<HTMLDivElement>> = useRef<HTMLDivElement>(null);
  const toastRef: MutableRefObject<Undefinable<Toast>> = useRef<Toast>();
  const isFirstRender: boolean = useFirstRender();
  const { shoppingCart, dispatchShoppingCartAction }: ShoppingCartState = useContext(
    ShoppingCartContext
  ) as ShoppingCartState;

  useEffect((): void => {
    // Initialize Toast
    if (isFirstRender && toastRootRef.current) {
      toastRef.current = new Toast(toastRootRef.current, { delay: 3000 });
    }

    if (shoppingCart.pendingOverflow) {
      if (toastRef.current) {
        toastRef.current.show();
      }

      dispatchShoppingCartAction({ type: 'clearOverflow' });
    }
  }, [dispatchShoppingCartAction, isFirstRender, shoppingCart.pendingOverflow]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="cart-overflow-toast"
        className="toast text-white bg-danger border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRootRef}
      >
        <div className="toast-header text-white bg-danger border-0">
          <strong className="me-auto">Cart overflow</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
        <div className="toast-body">Shopping cart is full. No more items can be added.</div>
      </div>
    </div>
  );
}
