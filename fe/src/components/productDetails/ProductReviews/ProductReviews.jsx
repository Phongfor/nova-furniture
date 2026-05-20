// components/productDetails/ProductReviews/ProductReviews.jsx
import { useState, useEffect, useCallback } from 'react';
import reviewService from '../../../services/reviewService';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewForm from './ReviewForm/ReviewForm';
import ReviewCard from './ReviewCard/ReviewCard';


export default function ProductReviews({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchReviews = useCallback(async () => {
        try {
            const [reviewsRes, ratingRes] = await Promise.all([
                reviewService.getReviewsByProduct(productId, { page, size: 5 }),
                reviewService.getRatingByProduct(productId)
            ]);
            setReviews(reviewsRes.data.result?.content ?? []);
            setTotalPages(reviewsRes.data.result?.totalPages ?? 1);
            setRating(ratingRes.data.result ?? null);
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
        } finally {
            setLoading(false);
        }
    }, [productId, page]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h3 className='text-xl font-light tracking-tight text-black dark:text-white'>
                    Customer Reviews
                </h3>
                <span className='text-xs text-zinc-400 uppercase tracking-widest'>
                    {reviews.length} reviews
                </span>
            </div>

            <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]'>
                {/* Left: summary + list + pagination */}
                <div>
                    {loading ? (
                        <ReviewSkeleton />
                    ) : reviews.length === 0 ? (
                        <div className='py-12 text-center'>
                            <p className='text-sm text-zinc-400'>
                                No reviews yet. Be the first to review this product.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className='mb-8'>
                                <RatingSummary
                                    rating={rating}
                                    total={reviews.length}
                                    reviews={reviews}
                                />
                            </div>
                            {reviews.map((r) => (
                                <ReviewCard key={r.id} review={r} />
                            ))}
                            {totalPages > 1 && (
                                <div className='mt-8 flex gap-2'>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i)}
                                            className={`
                                                h-8 w-8 rounded-full text-xs font-medium transition
                                                ${page === i
                                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                                    : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                                }
                                            `}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Right: form */}
                <div>
                    <ReviewForm productId={productId} onSubmitted={fetchReviews} />
                </div>
            </div>
        </div>
    );
}

function ReviewSkeleton() {
    return (
        <div className='space-y-6 animate-pulse'>
            {[1, 2, 3].map((i) => (
                <div key={i} className='border-b border-zinc-100 dark:border-zinc-900 py-6'>
                    <div className='h-3 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-3' />
                    <div className='h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-2' />
                    <div className='h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded' />
                </div>
            ))}
        </div>
    );
}