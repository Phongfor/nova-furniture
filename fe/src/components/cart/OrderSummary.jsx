// pages/client/CartPage/components/OrderSummary.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { SidebarContext } from '../../contexts/SidebarProvider';


const SHIPPING = 250;
const TAX_RATE = 0.08;

export default function OrderSummary() {
    const { totalPrice, totalItems } = useContext(SidebarContext);
    const navigate = useNavigate();

    const taxes = +(totalPrice * TAX_RATE).toFixed(2);
    const total = totalPrice + SHIPPING + taxes;

    return (
        <div className='rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800'>
            <p className='mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                Order Summary
            </p>

            <div className='flex flex-col gap-4'>
                <SummaryRow label='Subtotal' value={`$${totalPrice?.toLocaleString()}`} />
                <SummaryRow label='Shipping (White Glove)' value={`$${SHIPPING.toLocaleString()}`} />
                <SummaryRow label='Est. Taxes' value={`$${taxes.toLocaleString()}`} />
            </div>

            <div className='my-6 border-t border-zinc-200 dark:border-zinc-800' />

            <div className='flex items-baseline justify-between'>
                <p className='text-base font-medium text-black dark:text-white'>Total</p>
                <p className='text-3xl font-light text-black dark:text-white'>
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
            </div>

            <button
                onClick={() => navigate('/checkout')}
                disabled={totalItems === 0}
                className='
                    mt-6 w-full rounded-full bg-black py-4
                    text-xs font-semibold uppercase tracking-widest text-white
                    transition hover:opacity-80 disabled:opacity-40
                    dark:bg-white dark:text-black
                '
            >
                Proceed to Checkout
            </button>

            <div className='mt-6 flex items-start gap-3'>
                <FiShield className='mt-0.5 shrink-0 text-zinc-400' size={14} />
                <p className='text-xs leading-relaxed text-zinc-400'>
                    Every piece includes our 10-year structural integrity guarantee
                    and white-glove installation service.
                </p>
            </div>
        </div>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className='flex items-center justify-between'>
            <p className='text-sm text-zinc-500 dark:text-zinc-400'>{label}</p>
            <p className='text-sm text-black dark:text-white'>{value}</p>
        </div>
    );
}