// pages/client/CartPage/components/CartItem.jsx
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { SidebarContext } from '../../contexts/SidebarProvider';

export default function CartItem({ item }) {
    const { updateQuantity, removeItem } = useContext(SidebarContext);
    const [updating, setUpdating] = useState(false);

    const handleQuantity = async (delta) => {
        const newQty = item.quantity + delta;
        if (newQty < 1) return;
        setUpdating(true);
        await updateQuantity(item.id, newQty);
        setUpdating(false);
    };

    const handleRemove = async () => {
        await removeItem(item.id);
    };

    return (
        <div className='flex gap-6 border-b border-zinc-100 py-8 dark:border-zinc-900'>
            <Link to={`/products/${item.productSlug}`} className='shrink-0'>
                <div className='h-28 w-28 overflow-hidden bg-zinc-100 dark:bg-zinc-900'>
                    <img
                        src={item.productThumbnail}
                        alt={item.productName}
                        className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
                    />
                </div>
            </Link>

            <div className='flex flex-1 flex-col justify-between'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <Link
                            to={`/products/${item.productSlug}`}
                            className='text-base font-medium text-black hover:opacity-70 transition dark:text-white'
                        >
                            {item.productName}
                        </Link>
                        <p className='mt-1 text-xs uppercase tracking-widest text-zinc-400'>
                            ${item.productPrice?.toLocaleString()} / piece
                        </p>
                    </div>
                    <p className='text-base font-medium text-black dark:text-white'>
                        ${item.subtotal?.toLocaleString()}
                    </p>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => handleQuantity(-1)}
                            disabled={updating || item.quantity <= 1}
                            className='flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-black transition hover:border-black disabled:opacity-30 dark:border-zinc-700 dark:text-white dark:hover:border-white'
                        >
                            <FiMinus size={12} />
                        </button>

                        <span className='w-6 text-center text-sm font-medium text-black dark:text-white'>
                            {updating ? '...' : String(item.quantity).padStart(2, '0')}
                        </span>

                        <button
                            onClick={() => handleQuantity(1)}
                            disabled={updating}
                            className='flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-black transition hover:border-black disabled:opacity-30 dark:border-zinc-700 dark:text-white dark:hover:border-white'
                        >
                            <FiPlus size={12} />
                        </button>
                    </div>

                    <button
                        onClick={handleRemove}
                        className='flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-red-500'
                    >
                        <FiTrash2 size={13} />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}