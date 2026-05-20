// pages/client/ProductDetailPage/ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import productService from '../../../services/productService';
import ProductImages from '../../../components/productDetails/ProductImages/ProductImages';
import ProductInfo from '../../../components/productDetails/ProductInfo/ProductInfo';
import ProductSpecs from '../../../components/productDetails/ProductSpecs/ProductSpecs';
import ProductReviews from '../../../components/productDetails/ProductReviews/ProductReviews';
import RelatedProducts from '../../../components/productDetails/RelatedProducts/RelatedProducts';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await productService.getProductBySlug(slug);
                setProduct(res.data.result);
            } catch (err) {
                setError('Product not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            {loading ? (
                <PageSkeleton />
            ) : error || !product ? (
                <PageError message={error} />
            ) : (
                <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
                    <nav className='mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400'>
                        <Link
                            to='/collections'
                            className='hover:text-black dark:hover:text-white transition'
                        >
                            {product.category?.parentName || 'Living'}
                        </Link>
                        <span>/</span>
                        <span className='text-black dark:text-white'>
                            {product.category?.name || 'Seating'}
                        </span>
                    </nav>

                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
                        <ProductImages product={product} />
                        <div className='flex flex-col gap-10'>
                            <ProductInfo product={product} />
                            <ProductSpecs product={product} />
                        </div>
                    </div>

                    <div className='mt-24'>
                        <ProductReviews productId={product.id} />
                    </div>

                    <div className='mt-24'>
                        <RelatedProducts
                            categoryId={product.category?.id}
                            currentProductId={product.id}
                        />
                    </div>
                </main>
            )}

            <Footer />
        </div>
    );
}

function PageSkeleton() {
    return (
        <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 animate-pulse'>
                <div className='aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 rounded-sm' />
                <div className='flex flex-col gap-6'>
                    <div className='h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded' />
                    <div className='h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded' />
                    <div className='h-8 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded' />
                    <div className='h-24 bg-zinc-200 dark:bg-zinc-800 rounded' />
                    <div className='h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full' />
                </div>
            </div>
        </main>
    );
}

function PageError({ message }) {
    return (
        <div className='flex items-center justify-center py-40'>
            <div className='text-center'>
                <p className='text-zinc-400 mb-4'>
                    {message || 'Something went wrong.'}
                </p>
                <Link
                    to='/collections'
                    className='text-sm underline text-black dark:text-white'
                >
                    Back to Collections
                </Link>
            </div>
        </div>
    );
}