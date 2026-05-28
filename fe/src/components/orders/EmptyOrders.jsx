import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

export default function EmptyOrders() {
    return (
        <div className='flex flex-col items-center justify-center py-24 gap-6'>
            <FiPackage size={40} className='text-zinc-300' />

            <p className='text-sm text-zinc-400'>
                No orders yet.
            </p>

            <Link
                to='/collections'
                className='
                    rounded-full bg-black px-8 py-3
                    text-xs font-semibold uppercase tracking-widest
                    text-white dark:bg-white dark:text-black
                '
            >
                Explore Collection
            </Link>
        </div>
    );
}