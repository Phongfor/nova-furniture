// pages/client/CheckoutPage/components/PaymentSection.jsx
import { SectionTitle } from './ShippingForm';
import { FiCreditCard } from 'react-icons/fi';

export default function PaymentSection({ method, onSelect }) {
    return (
        <div>
            <SectionTitle number='03' title='Payment Details' />

            <div className='mt-6 flex flex-col gap-4'>
                {/* VNPay */}
                <button
                    type='button'
                    onClick={() => onSelect('vnpay')}
                    className={`
                        flex items-start justify-between gap-4
                        rounded-2xl border p-5 text-left transition
                        ${method === 'vnpay'
                            ? 'border-black dark:border-white'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                        }
                    `}
                >
                    <div className='flex items-start gap-4'>
                        <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10'>
                            <span className='text-xs font-bold text-emerald-600'>VN</span>
                        </div>
                        <div>
                            <p className='text-sm font-medium text-black dark:text-white'>
                                Pay via VNPay
                            </p>
                            <p className='mt-1 text-xs leading-relaxed text-zinc-400'>
                                You will be redirected to the secure VNPay portal to complete
                                your transaction with zero convenience fees.
                            </p>
                        </div>
                    </div>
                    <span className='shrink-0 rounded-full border border-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-600'>
                        Secure
                    </span>
                </button>

                {/* Divider */}
                <div className='flex items-center gap-4'>
                    <div className='flex-1 border-t border-zinc-200 dark:border-zinc-800' />
                    <span className='text-[10px] uppercase tracking-widest text-zinc-400'>
                        or credit card
                    </span>
                    <div className='flex-1 border-t border-zinc-200 dark:border-zinc-800' />
                </div>

                {/* Credit Card */}
                <button
                    type='button'
                    onClick={() => onSelect('card')}
                    className={`
                        rounded-2xl border p-5 text-left transition
                        ${method === 'card'
                            ? 'border-black dark:border-white'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                        }
                    `}
                >
                    <div className='flex items-center gap-3 mb-5'>
                        <FiCreditCard size={16} className='text-zinc-400' />
                        <p className='text-sm font-medium text-black dark:text-white'>
                            Credit Card
                        </p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <CardField placeholder='0000 0000 0000 0000' label='Card Number' />
                        <div className='grid grid-cols-2 gap-4'>
                            <CardField placeholder='MM/YY' label='Expiry' />
                            <CardField placeholder='•••' label='CVC' />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}

function CardField({ label, placeholder }) {
    return (
        <div>
            <p className='mb-1 text-[10px] uppercase tracking-widest text-zinc-400'>{label}</p>
            <input
                type='text'
                placeholder={placeholder}
                className='
                    w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800
                    py-2 text-sm text-black dark:text-white
                    placeholder:text-zinc-300 dark:placeholder:text-zinc-600
                    outline-none focus:border-black dark:focus:border-white transition
                '
            />
        </div>
    );
}