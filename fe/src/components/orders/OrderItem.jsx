export default function OrderItem({ item }) {
    return (
        <div className='flex gap-4 mb-4 last:mb-0'>
            <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900'>
                <img
                    src={item.productThumbnail}
                    alt={item.productName}
                    className='h-full w-full object-cover'
                />
            </div>

            <div className='flex flex-col justify-center gap-1'>
                <p className='text-sm font-medium text-black dark:text-white'>
                    {item.productName}
                </p>

                <p className='text-xs text-zinc-400'>
                    Quantity: {item.quantity}
                </p>

                <p className='text-xs text-zinc-400'>
                    ${item.subtotal?.toLocaleString()}
                </p>
            </div>
        </div>
    );
}