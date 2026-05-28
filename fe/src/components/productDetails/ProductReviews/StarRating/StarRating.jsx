// components/productDetails/ProductReviews/StarRating.jsx
import { useState } from 'react';
import { FiStar } from 'react-icons/fi';

export default function StarRating({ value, onChange, size = 20 }) {
    const [hovered, setHovered] = useState(0);
    const display = hovered || value;

    return (
        <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type='button'
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => onChange && setHovered(star)}
                    onMouseLeave={() => onChange && setHovered(0)}
                    className='transition-transform hover:scale-110'
                >
                    <FiStar
                        size={size}
                        fill={star <= display ? 'currentColor' : 'none'}
                        className={
                            star <= display
                                ? 'text-black dark:text-white'
                                : 'text-zinc-300 dark:text-zinc-600'
                        }
                    />
                </button>
            ))}
        </div>
    );
}