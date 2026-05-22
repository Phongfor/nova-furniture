// components/common/RelatedProducts/RelatedProducts.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/Productcard';
import productService from '../../services/productService';

export default function RelatedProducts({
    categoryId = null,
    excludeId = null,
    title = 'Pairs Well With',
    linkLabel = 'View All',
    linkTo = '/collections',
    size = 4,
    columns = 'sm:grid-cols-4'
}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRelated = useCallback(async () => {
        try {
            const res = await productService.getProducts({
                ...(categoryId && { categoryId }),
                size: excludeId ? size + 1 : size,
                page: 0
            });
            const all = res.data.result?.content ?? [];
            const filtered = excludeId
                ? all.filter((p) => p.id !== excludeId).slice(0, size)
                : all.slice(0, size);
            setProducts(filtered);
        } catch (err) {
            console.error('Failed to fetch related products:', err);
        } finally {
            setLoading(false);
        }
    }, [categoryId, excludeId, size]);

    useEffect(() => {
        fetchRelated();
    }, [fetchRelated]);

    if (!loading && products.length === 0) return null;

    return (
        <div>
            <div className='mb-8 flex items-center justify-between'>
                <h3 className='text-xl font-extralight tracking-tight text-black dark:text-white sm:text-2xl'>
                    {title}
                </h3>
                <Link
                    to={linkTo}
                    className='text-[10px] font-semibold uppercase tracking-[0.2em] text-black dark:text-white border-b border-black dark:border-white pb-0.5 transition hover:opacity-60'
                >
                    {linkLabel}
                </Link>
            </div>

            {loading ? (
                <div className={`grid grid-cols-2 gap-6 ${columns} animate-pulse`}>
                    {Array.from({ length: size }).map((_, i) => (
                        <div key={i}>
                            <div className='aspect-[4/5] bg-zinc-200 dark:bg-zinc-800' />
                            <div className='mt-3 h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800' />
                            <div className='mt-2 h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800' />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`grid grid-cols-2 gap-6 ${columns}`}>
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}