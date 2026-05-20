// pages/client/ProductDetailPage/components/ProductImages.jsx
import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';

export default function ProductImages({ product }) {
    const [selected, setSelected] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    // API chỉ có thumbnail, tạm dùng thumbnail làm ảnh chính
    // Khi backend có images array thì thay vào đây
    const images = product.thumbnail
        ? [product.thumbnail, product.thumbnail]
        : [];

    if (images.length === 0) {
        return (
            <div className='aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center'>
                <FiZoomIn className='text-zinc-300' size={32} />
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>
            {/* Main image */}
            <div
                className='relative overflow-hidden group cursor-zoom-in'
                onClick={() => setZoomed(true)}
            >
                <div className='aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900'>
                    <img
                        src={images[selected]}
                        alt={product.name}
                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                </div>
                <button className='
                    absolute bottom-4 right-4
                    flex items-center gap-2
                    rounded-full bg-white/90 px-4 py-2
                    text-xs font-medium text-black
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    backdrop-blur-sm shadow-md
                    dark:bg-black/80 dark:text-white
                '>
                    <FiZoomIn size={14} />
                    Zoom
                </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className='grid grid-cols-4 gap-3'>
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`
                                aspect-square overflow-hidden
                                transition-all duration-200
                                ${selected === i
                                    ? 'ring-2 ring-black dark:ring-white ring-offset-2'
                                    : 'opacity-60 hover:opacity-100'
                                }
                            `}
                        >
                            <img
                                src={img}
                                alt={`${product.name} ${i + 1}`}
                                className='h-full w-full object-cover'
                            />
                        </button>
                    ))}
                    {/* Placeholder slot */}
                    <div className='aspect-square bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center'>
                        <FiZoomIn className='text-zinc-300 dark:text-zinc-700' size={20} />
                    </div>
                </div>
            )}

            {/* Zoom modal */}
            {zoomed && (
                <div
                    className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out'
                    onClick={() => setZoomed(false)}
                >
                    <img
                        src={images[selected]}
                        alt={product.name}
                        className='max-h-[90vh] max-w-[90vw] object-contain'
                    />
                </div>
            )}
        </div>
    );
}