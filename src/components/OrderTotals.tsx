import { Dispatch, useMemo } from 'react';
import type { OrderItem } from '../types';
import { formatCurrency } from '../helpers';
import { OrderActions } from '../reducer/order-reducer';

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

export default function OrderTotals({
  order,
  tip,
  dispatch,
}: OrderTotalsProps) {
  const subTotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.price * item.quantity, 0),
    [order]
  );
  const tipAmount = useMemo(() => subTotalAmount * tip, [subTotalAmount, tip]);
  const totalAmount = useMemo(
    () => subTotalAmount + tipAmount,
    [subTotalAmount, tipAmount]
  );
  return (
    <>
      <div className='space-y-3'>
        <h2 className='font-black text-2xl'>Totales y Propina:</h2>
        <p>
          Subtotal a pagar: {''}
          <span className='font-bold'>{formatCurrency(subTotalAmount)}</span>
        </p>

        <p>
          Propina: {''}
          <span className='font-bold'>{formatCurrency(tipAmount)}</span>
        </p>

        <p>
          Total a pagar: {''}
          <span className='font-bold'>{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        className='w-full bg-black text-white font-black py-3 disabled:opacity-10'
        disabled={totalAmount === 0}
        onClick={() => dispatch({ type: 'place-order' })}
      >
        Guardar Orden
      </button>
    </>
  );
}
