import CommonSidebar from '../common/CommonSidebar';
import { useContext } from 'react';
import { SidebarContext } from '../../contexts/SidebarProvider';
import { Link } from 'react-router-dom';

export default function WishlistSidebar({ open, onClose }) {
    const { wishlistItems, toggleWishlist } = useContext(SidebarContext);
    console.log(wishlistItems);
    return (
        <CommonSidebar
            open={open}
            onClose={onClose}
            title={`Wishlist (${wishlistItems.length})`}
            footer={
                wishlistItems.length > 0 && (
                    <Link
                        to='/wishlist'
                        onClick={onClose}
                        className='
                            block w-full rounded-full border border-black
                            py-3 text-center text-sm font-medium
                            text-black transition hover:bg-black hover:text-white

                            dark:border-white dark:text-white
                            dark:hover:bg-white dark:hover:text-black
                        '
                    >
                        View Wishlist
                    </Link>
                )
            }
        >
            {wishlistItems.length === 0 ? (
                <p className='text-zinc-500 dark:text-zinc-400'>
                    No favorite products yet.
                </p>
            ) : (
                <ul className='space-y-4'>
                    {wishlistItems.map((item) => (
                        <li key={item.id} className='flex gap-4'>
                            <img
                                src={
                                    item.productThumbnail || '/placeholder.png'
                                }
                                alt={item.productName}
                                className='h-20 w-20 rounded-xl object-cover'
                            />

                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='flex items-start justify-between gap-2'>
                                    <p className='text-sm font-medium text-black dark:text-white'>
                                        {item.productName}
                                    </p>

                                    <button
                                        onClick={() =>
                                            toggleWishlist(item.productId)
                                        }
                                        className='
                            flex h-6 w-6 items-center justify-center
                            rounded-full text-zinc-500 transition
                            hover:bg-zinc-200 hover:text-red-500

                            dark:hover:bg-zinc-800
                        '
                                    >
                                        ✕
                                    </button>
                                </div>

                                <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                                    ${item.productPrice?.toLocaleString()}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </CommonSidebar>
    );
}
