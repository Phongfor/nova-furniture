import { useProduct } from '../../../contexts/ProductProvider';

export default function CollectionHeader() {
    const { selectedCategory, categories } = useProduct();

    const getTitle = () => {
        if (!selectedCategory) return 'All Collections';

        // Tìm trong parent
        for (const parent of categories) {
            if (parent.id === selectedCategory) return `${parent.name} Collective`;

            // Tìm trong children
            const child = parent.children?.find((c) => c.id === selectedCategory);
            if (child) return `${child.name} Collective`;
        }

        return 'All Collections';
    };

    return (
        <div className='mb-12'>
            <p className='mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400'>
                Selected Works
            </p>
            <h1 className='text-5xl font-extralight tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl'>
                {getTitle()}
            </h1>
        </div>
    );
}