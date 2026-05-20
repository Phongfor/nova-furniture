// components/productDetails/RelatedProducts/RelatedProducts.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../../services/productService';
import ProductCard from '../../common/ProductCard';

export default function RelatedProducts({ categoryId, currentProductId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRelated = useCallback(async () => {
        try {
            const res = await productService.getProducts({
                categoryId,
                size: 4,
                page: 0
            });
            const all = res.data.result?.content ?? [];
            setProducts(all.filter((p) => p.id !== currentProductId).slice(0, 3));
        } catch (err) {
            console.error('Failed to fetch related products:', err);
        } finally {
            setLoading(false);
        }
    }, [categoryId, currentProductId]);

    useEffect(() => {
        if (categoryId) fetchRelated();
        else setLoading(false);
    }, [fetchRelated]);

    if (!loading && products.length === 0) return null;

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h3 className='text-xl font-light tracking-tight text-black dark:text-white'>
                    Pairs Well With
                </h3>
                <Link
                    to='/collections'
                    className='
                        text-[10px] font-semibold uppercase tracking-[0.2em]
                        text-black dark:text-white border-b border-black
                        dark:border-white pb-0.5 transition hover:opacity-60
                    '
                >
                    View All
                </Link>
            </div>

            {loading ? (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 animate-pulse'>
                    {[1, 2, 3].map((i) => (
                        <div key={i}>
                            <div className='aspect-[4/5] bg-zinc-200 dark:bg-zinc-800' />
                            <div className='mt-4 h-3 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded' />
                            <div className='mt-2 h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded' />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}