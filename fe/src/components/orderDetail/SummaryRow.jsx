export default function SummaryRow({
    label,
    value
}) {
    return (
        <div className='flex items-center justify-between'>
            <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                {label}
            </p>

            <p className='text-sm text-black dark:text-white'>
                {value}
            </p>
        </div>
    );
}