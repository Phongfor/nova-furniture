export default function CancelOrderButton({
    loading,
    onClick
}) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className='
                rounded-full border border-red-400
                px-4 py-1.5 text-[10px]
                font-semibold uppercase tracking-widest
                text-red-500 transition
                hover:bg-red-500 hover:text-white
                disabled:opacity-40
            '
        >
            {loading
                ? 'Cancelling...'
                : 'Cancel Order'}
        </button>
    );
}