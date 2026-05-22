// pages/client/CheckoutPage/components/ShippingMethod.jsx
import { SectionTitle } from './ShippingForm';

const METHODS = [
    {
        id: 'standard',
        label: 'Standard Curbside Delivery',
        desc: '5-7 Business Days',
        price: 0,
        priceLabel: 'FREE'
    },
    {
        id: 'white-glove',
        label: 'White Glove Installation',
        desc: '2-3 Business Days · Full Assembly',
        price: 150,
        priceLabel: '$150.00'
    }
];

export { METHODS };

export default function ShippingMethod({ selected, onSelect }) {
    return (
        <div>
            <SectionTitle number='02' title='Shipping Method' />

            <div className='mt-6 flex flex-col gap-3'>
                {METHODS.map((method) => (
                    <button
                        key={method.id}
                        type='button'
                        onClick={() => onSelect(method)}
                        className={`
                            flex items-center justify-between
                            rounded-2xl border p-5 text-left transition
                            ${selected?.id === method.id
                                ? 'border-black dark:border-white'
                                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                            }
                        `}
                    >
                        <div className='flex items-center gap-4'>
                            <div className={`
                                flex h-4 w-4 shrink-0 items-center justify-center
                                rounded-full border-2 transition
                                ${selected?.id === method.id
                                    ? 'border-black dark:border-white'
                                    : 'border-zinc-300 dark:border-zinc-700'
                                }
                            `}>
                                {selected?.id === method.id && (
                                    <div className='h-2 w-2 rounded-full bg-black dark:bg-white' />
                                )}
                            </div>
                            <div>
                                <p className='text-sm font-medium text-black dark:text-white'>
                                    {method.label}
                                </p>
                                <p className='text-xs text-zinc-400 uppercase tracking-widest mt-0.5'>
                                    {method.desc}
                                </p>
                            </div>
                        </div>
                        <p className='text-sm font-medium text-black dark:text-white'>
                            {method.priceLabel}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}