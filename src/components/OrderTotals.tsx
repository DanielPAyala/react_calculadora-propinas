import { useMemo } from 'react';
import type { OrderItem } from '../types';
import { formatCurrency } from '../helpers';

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
};

export default function OrderTotals({ order, tip }: OrderTotalsProps) {
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
      <button></button>
    </>
  );
}
