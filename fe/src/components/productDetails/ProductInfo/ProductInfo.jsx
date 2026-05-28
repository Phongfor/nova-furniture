// pages/client/ProductDetailPage/components/ProductInfo.jsx
import { useState, useContext } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { SidebarContext } from '../../../contexts/SidebarProvider';

// Parse color string thành mảng màu
// color từ API là string VD: "Black, Forest Green, Stone Grey"
function parseColors(colorStr) {
    if (!colorStr) return [];
    return colorStr.split(',').map((c) => c.trim());
}

// Map tên màu sang hex tương đối
const COLOR_MAP = {
    'black': '#1a1a1a',
    'white': '#f5f5f5',
    'forest green': '#3d5a40',
    'stone grey': '#9e9e9e',
    'grey': '#9e9e9e',
    'gray': '#9e9e9e',
    'walnut': '#6b3f1f',
    'oak': '#c8a96e',
    'concrete': '#b0aca8',
    'beige': '#e8dcc8',
    'cream': '#f5f0e8',
    'navy': '#1a2744',
    'brown': '#7b4f2e',
};

function getColorHex(name) {
    return COLOR_MAP[name.toLowerCase()] || '#888';
}

export default function ProductInfo({ product }) {
    const colors = parseColors(product.color);
    const [selectedColor, setSelectedColor] = useState(colors[0] || null);
    const [wishlisted, setWishlisted] = useState(false);
    const [addedFeedback, setAddedFeedback] = useState(false);

    const { setCartItems, setWishlistItems, openSidebar } = useContext(SidebarContext);

    const handleAddToCart = () => {
        setCartItems((prev) => {
            const exists = prev.find((i) => i.id === product.id);
            if (exists) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.thumbnail,
                    quantity: 1,
                    color: selectedColor
                }
            ];
        });

        // Feedback animation
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 1500);

        // Mở cart sidebar
        openSidebar('cart');
    };

    const handleWishlist = () => {
        setWishlisted((prev) => !prev);
        setWishlistItems((prev) => {
            const exists = prev.find((i) => i.id === product.id);
            if (exists) return prev.filter((i) => i.id !== product.id);
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.thumbnail
                }
            ];
        });
    };

    return (
        <div className='flex flex-col gap-6'>
            {/* Brand */}
            {product.brand?.name && (
                <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400'>
                    {product.brand.name}
                </p>
            )}

            {/* Name */}
            <h1 className='text-3xl font-light tracking-tight text-black dark:text-white sm:text-4xl'>
                {product.name}
            </h1>

            {/* Price */}
            <p className='text-2xl font-light text-black dark:text-white'>
                ${product.price?.toLocaleString()}
            </p>

            {/* Description */}
            <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                {product.description}
            </p>

            {/* Color picker */}
            {colors.length > 0 && (
                <div>
                    <p className='mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                        Select Finish
                        {selectedColor && (
                            <span className='ml-2 normal-case font-normal text-zinc-500'>
                                — {selectedColor}
                            </span>
                        )}
                    </p>
                    <div className='flex gap-3'>
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                title={color}
                                className={`
                                    h-8 w-8 rounded-full transition-all duration-200
                                    ${selectedColor === color
                                        ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-black'
                                        : 'hover:scale-110'
                                    }
                                `}
                                style={{ backgroundColor: getColorHex(color) }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Stock */}
            {product.stock !== undefined && (
                <p className={`text-xs font-medium ${
                    product.stock > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500'
                }`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </p>
            )}

            {/* Actions */}
            <div className='flex gap-3 pt-2'>
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`
                        flex flex-1 items-center justify-center gap-3
                        rounded-full py-4 text-sm font-semibold
                        uppercase tracking-widest transition-all duration-300
                        ${addedFeedback
                            ? 'bg-emerald-600 text-white'
                            : 'bg-black text-white hover:opacity-80 dark:bg-white dark:text-black'
                        }
                        disabled:opacity-40 disabled:cursor-not-allowed
                    `}
                >
                    <FiShoppingBag size={16} />
                    {addedFeedback ? 'Added!' : 'Add to Bag'}
                </button>

                <button
                    onClick={handleWishlist}
                    className={`
                        flex h-14 w-14 shrink-0 items-center justify-center
                        rounded-full border transition-all duration-200
                        ${wishlisted
                            ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                            : 'border-zinc-300 text-black hover:border-black dark:border-zinc-700 dark:text-white dark:hover:border-white'
                        }
                    `}
                >
                    <FiHeart
                        size={18}
                        fill={wishlisted ? 'currentColor' : 'none'}
                    />
                </button>
            </div>
        </div>
    );
}