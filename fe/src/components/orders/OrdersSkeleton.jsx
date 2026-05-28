export default function OrdersSkeleton() {
    return (
        <div className='flex flex-col gap-6'>
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className='h-48 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse'
                />
            ))}
        </div>
    );
}