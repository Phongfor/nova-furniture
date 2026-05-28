import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function OrderProductItem({
    item
}) {
    return (
        <div className='flex gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4 last:border-0 last:pb-0'>
            <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900'>
                <img
                    src={item.productThumbnail}
                    alt={item.productName}
                    className='h-full w-full object-cover'
                />
            </div>

            <div className='flex flex-1 flex-col justify-between'>
                <div className='flex items-start justify-between gap-4'>
                    <p className='text-sm font-medium text-black dark:text-white'>
                        {item.productName}
                    </p>

                    <p className='shrink-0 text-sm font-medium text-black dark:text-white'>
                        {formatCurrency(
                            item.subtotal
                        )}
                    </p>
                </div>

                <p className='text-xs text-zinc-400'>
                    QTY: {item.quantity} ·{' '}
                    {formatCurrency(
                        item.unitPrice
                    )}{' '}
                    each
                </p>

                <div className='mt-1 flex gap-4'>
                    <Link
                        to={`/products/${item.productId}`}
                        className='text-[10px] font-semibold uppercase tracking-widest text-zinc-500 underline underline-offset-2 transition hover:text-black dark:hover:text-white'
                    >
                        Review Item
                    </Link>

                    <Link
                        to={`/products/${item.productId}`}
                        className='text-[10px] font-semibold uppercase tracking-widest text-zinc-500 underline underline-offset-2 transition hover:text-black dark:hover:text-white'
                    >
                        Buy Again
                    </Link>
                </div>
            </div>
        </div>
    );
}