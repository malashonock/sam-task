import { Toast } from 'bootstrap';
import { MutableRefObject, useEffect, useRef } from 'react';
import useFirstRender from 'utils/useFirstRender';
import { Nullable, Undefinable } from 'utils/Nullable';

interface CheckoutToastProps {
  show: boolean;
  onClose: () => void;
}

export default function CheckoutToast({ show, onClose }: CheckoutToastProps): JSX.Element {
  const toastRootRef: MutableRefObject<Nullable<HTMLDivElement>> = useRef<HTMLDivElement>(null);
  const toastRef: MutableRefObject<Undefinable<Toast>> = useRef<Toast>();
  const isFirstRender: boolean = useFirstRender();

  useEffect((): void => {
    // Initialize Toast
    if (isFirstRender && toastRootRef.current) {
      toastRef.current = new Toast(toastRootRef.current, { delay: 3000 });

      // set show to false on close
      toastRootRef.current.addEventListener('hidden.bs.toast', () => {
        onClose();
      });
    }

    if (toastRef.current) {
      show && toastRef.current.show();
    }
  }, [isFirstRender, show, onClose]);

  return (
    <div className="toast-container position-fixed top-50 start-50 translate-middle p-3">
      <div
        id="checkout-toast"
        className="toast text-white bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRootRef}
      >
        <div className="toast-header text-white bg-success border-0">
          <strong className="me-auto">Order received</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
        <div className="toast-body">
          We have received your order and will handle it shortly. Thank you for the purchase!
        </div>
      </div>
    </div>
  );
}
