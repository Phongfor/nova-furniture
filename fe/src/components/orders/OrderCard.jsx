import { Link } from 'react-router-dom';
import OrderItem from './OrderItem';
import StatusBadge from '../common/StatusBadge';

export default function OrderCard({ order }) {
    const date = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden'>
            {/* Header */}
            <div className='flex flex-wrap items-center justify-between gap-4 px-6 py-5 bg-zinc-50 dark:bg-zinc-900/50'>
                <div>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1'>
                        Order Reference
                    </p>

                    <p className='text-sm font-medium text-black dark:text-white'>
                        #NF-{order.id}
                    </p>
                </div>

                <div>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1'>
                        Placed On
                    </p>

                    <p className='text-sm text-black dark:text-white'>{date}</p>
                </div>

                <div>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1'>
                        Total Investment
                    </p>

                    <p className='text-sm font-medium text-black dark:text-white'>
                        ${order.totalPrice?.toLocaleString()}
                    </p>
                </div>

                <StatusBadge status={order.status} size='md' />
            </div>

            {/* Items */}
            <div className='px-6 py-6'>
                {order.items?.slice(0, 2).map((item) => (
                    <OrderItem key={item.id} item={item} />
                ))}

                {order.items?.length > 2 && (
                    <p className='text-xs text-zinc-400 mt-2'>
                        +{order.items.length - 2} more item
                        {order.items.length - 2 > 1 ? 's' : ''}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className='px-6 py-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between'>
                <Link
                    to={`/orders/${order.id}`}
                    className='
                        rounded-full border border-black px-6 py-2
                        text-[10px] font-semibold uppercase tracking-widest
                        text-black transition hover:bg-black hover:text-white
                        dark:border-white dark:text-white
                        dark:hover:bg-white dark:hover:text-black
                    '
                >
                    View Details
                </Link>

                {order.status === 'PENDING' && (
                    <p className='text-xs text-zinc-400'>
                        You can cancel this order
                    </p>
                )}
            </div>
        </div>
    );
}
