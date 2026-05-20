// components/productDetails/ProductReviews/RatingSummary.jsx
import StarRating from '../StarRating/StarRating';
export default function RatingSummary({ rating, total, reviews }) {
    const countByStar = (star) =>
        reviews.filter((r) => r.rating === star).length;

    return (
        <div className='flex items-end gap-4'>
            <div>
                <p className='text-6xl font-extralight text-black dark:text-white'>
                    {rating ? rating.toFixed(1) : '—'}
                </p>
                <StarRating value={Math.round(rating || 0)} size={16} />
                <p className='mt-1 text-xs text-zinc-400'>{total} reviews</p>
            </div>

            <div className='flex-1 flex flex-col gap-1.5 pb-1'>
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = countByStar(star);
                    const percent = total > 0 ? (count / total) * 100 : 0;
                    return (
                        <div key={star} className='flex items-center gap-2'>
                            <span className='text-[10px] text-zinc-400 w-2'>{star}</span>
                            <div className='flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-black dark:bg-white rounded-full transition-all duration-500'
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <span className='text-[10px] text-zinc-400 w-4'>{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}