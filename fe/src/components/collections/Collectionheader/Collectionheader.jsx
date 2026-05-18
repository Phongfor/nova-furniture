import { useProduct, CATEGORIES } from '../../../contexts/ProductProvider';

export default function CollectionHeader() {
    const { selectedCategory } = useProduct();

    const title = selectedCategory
        ? CATEGORIES.find((c) => c.value === selectedCategory)?.label + ' Collective'
        : 'All Collections';

    return (
        <div className='mb-12'>
            <p className='mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400'>
                Selected Works
            </p>
            <h1 className='text-5xl font-extralight tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl'>
                {title}
            </h1>
        </div>
    );
}