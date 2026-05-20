import { useState, useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import reviewService from '../../../../services/reviewService';
import StarRating from '../StarRating/StarRating';

export default function ReviewForm({ productId, onSubmitted }) {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!user) {
        return (
            <div className='rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center'>
                <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                    Please{' '}
                    <a href='/auth' className='underline text-black dark:text-white'>
                        sign in
                    </a>{' '}
                    to leave a review.
                </p>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (rating === 0) { setError('Please select a rating.'); return; }
        if (!comment.trim()) { setError('Please write a comment.'); return; }
        setSubmitting(true);
        setError('');
        try {
            await reviewService.createReview({ productId, rating, comment });
            setRating(0);
            setComment('');
            onSubmitted?.();
        } catch {
            setError('Failed to submit. You may need to have purchased this product.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-5'>
            <h4 className='text-sm font-semibold uppercase tracking-widest text-black dark:text-white'>
                Write a Review
            </h4>

            <div>
                <p className='mb-2 text-[10px] uppercase tracking-widest text-zinc-400'>
                    Your Rating
                </p>
                <StarRating value={rating} onChange={setRating} size={24} />
            </div>

            <div>
                <p className='mb-2 text-[10px] uppercase tracking-widest text-zinc-400'>
                    Your Review
                </p>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Share your experience with this piece...'
                    rows={4}
                    className='
                        w-full resize-none rounded-xl border border-zinc-200
                        bg-transparent px-4 py-3 text-sm text-black
                        placeholder:text-zinc-400 outline-none focus:border-black
                        dark:border-zinc-800 dark:text-white dark:focus:border-zinc-500
                        transition
                    '
                />
            </div>

            {error && <p className='text-xs text-red-500'>{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className='
                    self-start rounded-full bg-black px-8 py-3
                    text-xs font-semibold uppercase tracking-widest text-white
                    transition hover:opacity-80 disabled:opacity-40
                    dark:bg-white dark:text-black
                '
            >
                {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </div>
    );
}