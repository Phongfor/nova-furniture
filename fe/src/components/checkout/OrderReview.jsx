// pages/client/CheckoutPage/components/OrderReview.jsx
import { useContext } from 'react';
import { FiLock } from 'react-icons/fi';
import { SidebarContext } from '../../contexts/SidebarProvider';

const TAX_RATE = 0.08;

export default function OrderReview({ shippingPrice, onSubmit, submitting, error }) {
    const { cartItems, totalPrice } = useContext(SidebarContext);

    const taxes = +(totalPrice * TAX_RATE).toFixed(2);
    const total = totalPrice + shippingPrice + taxes;

    return (
        <div className='rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800'>
            <h3 className='mb-6 text-base font-medium text-black dark:text-white'>
                Order Review
            </h3>

            {/* Items */}
            <div className='flex flex-col gap-4 mb-6'>
                {cartItems.map((item) => (
                    <div key={item.id} className='flex gap-3'>
                        <div className='h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
                            <img
                                src={item.productThumbnail}
                                alt={item.productName}
                                className='h-full w-full object-cover'
                            />
                        </div>
                        <div className='flex flex-1 flex-col justify-between'>
                            <p className='text-sm font-medium text-black dark:text-white'>
                                {item.productName}
                            </p>
                            <p className='text-xs uppercase tracking-widest text-zinc-400'>
                                x{item.quantity}
                            </p>
                            <p className='text-sm text-black dark:text-white'>
                                ${item.subtotal?.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='border-t border-zinc-100 dark:border-zinc-900 pt-4 flex flex-col gap-3'>
                <SummaryRow label='Subtotal' value={`$${totalPrice?.toLocaleString()}`} />
                <SummaryRow
                    label='Shipping'
                    value={shippingPrice === 0 ? 'Free' : `$${shippingPrice.toLocaleString()}`}
                />
                <SummaryRow label='Tax (Estimated)' value={`$${taxes.toLocaleString()}`} />
            </div>

            <div className='mt-4 flex items-baseline justify-between'>
                <p className='text-base font-medium text-black dark:text-white'>Total</p>
                <p className='text-2xl font-light text-black dark:text-white'>
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
            </div>

            {error && (
                <p className='mt-3 text-xs text-red-500'>{error}</p>
            )}

            <button
                onClick={onSubmit}
                disabled={submitting}
                className='
                    mt-6 w-full rounded-full bg-black py-4
                    text-xs font-semibold uppercase tracking-widest text-white
                    transition hover:opacity-80 disabled:opacity-40
                    dark:bg-white dark:text-black
                    flex items-center justify-center gap-2
                '
            >
                {submitting ? 'Processing...' : (
                    <>Complete Purchase <span>→</span></>
                )}
            </button>

            <div className='mt-4 flex items-center justify-center gap-2'>
                <FiLock size={11} className='text-zinc-400' />
                <p className='text-[10px] uppercase tracking-widest text-zinc-400'>
                    Encrypted & Secured by Nova Vault System
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