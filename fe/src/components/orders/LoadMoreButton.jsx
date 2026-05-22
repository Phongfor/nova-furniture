import { FiChevronDown } from 'react-icons/fi';

export default function LoadMoreButton({
    loadingMore,
    onClick
}) {
    return (
        <div className='flex justify-center mt-4'>
            <button
                onClick={onClick}
                disabled={loadingMore}
                className='
                    flex items-center gap-2 rounded-full
                    border border-zinc-300 px-8 py-3
                    text-xs font-semibold uppercase tracking-widest
                    text-zinc-600 transition
                    hover:border-black hover:text-black
                    disabled:opacity-40
                    dark:border-zinc-700 dark:text-zinc-400
                    dark:hover:border-white dark:hover:text-white
                '
            >
                {loadingMore ? 'Loading...' : 'Show More Orders'}

                <FiChevronDown size={14} />
            </button>
        </div>
    );
}