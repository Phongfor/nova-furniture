import {
    SHIPPING_COST,
    TAX_RATE
} from '../../../../constants/orderConstants';

import { formatCurrency } from '../../../../utils/formatCurrency';
import OrderSectionCard from '../common/OrderSectionCard';
import OrderSectionTitle from '../common/OrderSectionTitle';

import SummaryRow from './SummaryRow';

export default function PaymentSummaryCard({
    order,
    date
}) {
    const taxes = +(
        order.totalPrice * TAX_RATE
    ).toFixed(2);

    const total =
        order.totalPrice +
        SHIPPING_COST +
        taxes;

    return (
        <OrderSectionCard className='self-start'>
            <OrderSectionTitle>
                Payment Summary
            </OrderSectionTitle>

            <div className='flex flex-col gap-3'>
                <SummaryRow
                    label='Subtotal'
                    value={formatCurrency(
                        order.totalPrice
                    )}
                />

                <SummaryRow
                    label='Shipping'
                    value={formatCurrency(
                        SHIPPING_COST
                    )}
                />

                <SummaryRow
                    label='Tax'
                    value={formatCurrency(taxes)}
                />
            </div>

            <div className='my-4 border-t border-zinc-200 dark:border-zinc-800' />

            <div className='flex items-baseline justify-between'>
                <p className='text-sm font-semibold text-black dark:text-white'>
                    Total
                </p>

                <p className='text-xl font-light text-black dark:text-white'>
                    {formatCurrency(total)}
                </p>
            </div>

            <div className='mt-6 flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10'>
                    <span className='text-[10px] font-bold text-emerald-600'>
                        VN
                    </span>
                </div>

                <div>
                    <p className='text-xs font-medium text-black dark:text-white'>
                        VNPay
                    </p>

                    <p className='text-[10px] text-zinc-400'>
                        Charged on {date}
                    </p>
                </div>
            </div>
        </OrderSectionCard>
    );
}