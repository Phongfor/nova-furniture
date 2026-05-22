// components/common/ProductCard.jsx
import { useState, useContext } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../../contexts/SidebarProvider';

export default function ProductCard({ product }) {
    const [hovered, setHovered] = useState(false);
    const { addToCart, openSidebar, toggleWishlist, isWishlisted } =
        useContext(SidebarContext);

    const wishlisted = isWishlisted(product.id);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            await addToCart(product.id, 1);
            openSidebar('cart');
        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        toggleWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.thumbnail
        });
    };

    return (
        <Link
            to={`/products/${product.slug}`}
            className='group block'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='relative overflow-hidden bg-zinc-100 dark:bg-zinc-900'>
                <div className='aspect-[4/5] w-full'>
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                </div>

                <div className={`
                    absolute bottom-0 left-0 right-0
                    flex gap-2 p-4 transition-all duration-300
                    ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}>
                    <button
                        onClick={handleAddToCart}
                        className='
                            flex flex-1 items-center justify-center gap-2
                            rounded-full bg-white/95 py-3
                            text-xs font-semibold uppercase tracking-widest
                            text-black shadow-lg backdrop-blur-sm
                            transition hover:bg-black hover:text-white
                            dark:bg-black/90 dark:text-white
                            dark:hover:bg-white dark:hover:text-black
                        '
                    >
                        <FiShoppingBag size={14} />
                        Add to Cart
                    </button>

                    <button
                        onClick={handleWishlist}
                        className={`
                            flex h-11 w-11 shrink-0 items-center justify-center
                            rounded-full shadow-lg backdrop-blur-sm transition
                            ${wishlisted
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-white/95 text-black hover:bg-black hover:text-white dark:bg-black/90 dark:text-white dark:hover:bg-white dark:hover:text-black'
                            }
                        `}
                    >
                        <FiHeart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>

            <div className='pt-4'>
                {product.material && (
                    <p className='mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400'>
                        {product.material}
                    </p>
                )}
                <h3 className='text-sm font-medium text-black transition group-hover:opacity-70 dark:text-white'>
                    {product.name}
                </h3>
                <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
                    ${product.price?.toLocaleString()}
                </p>
            </div>
        </Link>
    );
}