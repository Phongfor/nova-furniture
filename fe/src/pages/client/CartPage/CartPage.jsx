// pages/client/CartPage/CartPage.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import CartItem from '../../../components/cart/CartItem';
import OrderSummary from '../../../components/cart/OrderSummary';
import { SidebarContext } from '../../../contexts/SidebarProvider';
import { AuthContext } from '../../../contexts/AuthProvider';
import RelatedProducts from '../../../components/common/RelatedProducts';

export default function CartPage() {
    const {
        cartItems: items,
        totalItems,
        cartLoading: loading,
        clearCart
    } = useContext(SidebarContext);
    const { user } = useContext(AuthContext);

    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
                {/* Header */}
                <div className='mb-12'>
                    <p className='mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400'>
                        Nova Collective
                    </p>
                    <h1 className='text-5xl font-extralight tracking-tight text-black dark:text-white sm:text-6xl'>
                        Your Selection.
                    </h1>
                    <p className='mt-4 text-sm text-zinc-500 dark:text-zinc-400'>
                        Curated pieces from the Nova Collective, awaiting their
                        place in your architectural narrative.
                    </p>
                </div>

                {/* Not logged in */}
                {!user ? (
                    <div className='flex flex-col items-center justify-center py-24 gap-4'>
                        <p className='text-sm text-zinc-400'>
                            Please sign in to view your cart.
                        </p>
                        <Link
                            to='/auth'
                            className='rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white dark:bg-white dark:text-black'
                        >
                            Sign In
                        </Link>
                    </div>
                ) : loading ? (
                    <CartSkeleton />
                ) : items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]'>
                        {/* Items */}
                        <div>
                            <div className='mb-4 flex items-center justify-between'>
                                <p className='text-xs text-zinc-400 uppercase tracking-widest'>
                                    {totalItems}{' '}
                                    {totalItems === 1 ? 'item' : 'items'}
                                </p>
                                <button
                                    onClick={clearCart}
                                    className='text-xs text-zinc-400 transition hover:text-red-500'
                                >
                                    Clear all
                                </button>
                            </div>

                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className='lg:sticky lg:top-28 self-start'>
                            <OrderSummary />
                        </div>
                    </div>
                )}

                {/* Related */}
                <RelatedProducts
                    title='Complete the Space.'
                    linkLabel='View All Objects'
                    size={4}
                    columns='sm:grid-cols-4'
                />
            </main>

            <Footer />
        </div>
    );
}

function EmptyCart() {
    return (
        <div className='flex flex-col items-center justify-center py-24 gap-6'>
            <p className='text-sm text-zinc-400'>Your cart is empty.</p>
            <Link
                to='/collections'
                className='rounded-full border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
            >
                Explore Collection
            </Link>
        </div>
    );
}

function CartSkeleton() {
    return (
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] animate-pulse'>
            <div className='space-y-8'>
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className='flex gap-6 border-b border-zinc-100 dark:border-zinc-900 py-8'
                    >
                        <div className='h-28 w-28 bg-zinc-200 dark:bg-zinc-800' />
                        <div className='flex-1 flex flex-col gap-3'>
                            <div className='h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded' />
                            <div className='h-3 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded' />
                            <div className='h-3 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded mt-auto' />
                        </div>
                    </div>
                ))}
            </div>
            <div className='h-80 rounded-2xl bg-zinc-200 dark:bg-zinc-800' />
        </div>
    );
}
