export default function ProductSpecs({ product }) {
    const specs = [
        { label: 'Materials', value: product.material },
        { label: 'Dimensions', value: product.dimensions },
        { label: 'Weight', value: product.weight ? `${product.weight} kg` : null },
        { label: 'Color', value: product.color },
        { label: 'Lead Time', value: '8–12 Weeks' }, // static vì API không có
    ].filter((s) => s.value);

    if (specs.length === 0) return null;

    return (
        <div className='border-t border-zinc-200 dark:border-zinc-800 pt-8'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                {specs.map((spec) => (
                    <div key={spec.label}>
                        <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                            {spec.label}
                        </p>
                        <p className='text-sm text-black dark:text-white'>
                            {spec.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}