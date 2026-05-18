// pages/client/Collectionspage/components/CollectionGrid.jsx
import { useEffect } from 'react';
import { useProduct } from '../../../contexts/ProductProvider';
import ProductCard from '../../common/Productcard';


function SkeletonCard() {
    return (
        <div className='animate-pulse'>
            <div className='aspect-[4/5] bg-zinc-200 dark:bg-zinc-800' />
            <div className='mt-4 h-2.5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800' />
            <div className='mt-2 h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800' />
            <div className='mt-2 h-3 w-1/4 rounded bg-zinc-200 dark:bg-zinc-800' />
        </div>
    );
}

export default function CollectionGrid({ onOpenMobileFilter }) {
    const {
        products,
        loading,
        error,
        totalPages,
        totalElements,
        page,
        setPage,
        fetchProducts,
        hasActiveFilters,
        clearFilters
    } = useProduct();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className='flex-1'>
            {/* Mobile top bar */}
            <div className='mb-6 flex items-center justify-between lg:hidden'>
                <button
                    onClick={onOpenMobileFilter}
                    className='
                        rounded-full border border-black
                        px-5 py-2 text-xs font-semibold
                        uppercase tracking-widest text-black
                        dark:border-white dark:text-white
                    '
                >
                    Refine
                </button>
                <p className='text-xs text-zinc-400'>{totalElements} products</p>
            </div>

            {/* Error */}
            {error && (
                <div className='mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500 dark:border-red-900 dark:bg-red-950'>
                    {error}
                </div>
            )}

            {/* Grid */}
            {loading ? (
                <div className='grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3'>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className='flex h-60 flex-col items-center justify-center gap-4'>
                    <p className='text-sm text-zinc-400'>No products found.</p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className='text-xs underline text-zinc-500 hover:text-black dark:hover:text-white'
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <div className='grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3'>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='mt-16 flex items-center justify-center gap-2'>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`
                                h-8 w-8 rounded-full text-xs font-medium transition
                                ${page === i
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                }
                            `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}