import StarRating from "../StarRating/StarRating";


export default function ReviewCard({ review }) {
    const date = new Date(review.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='border-b border-zinc-100 dark:border-zinc-900 py-6'>
            <div className='flex items-start justify-between mb-3'>
                <div>
                    <p className='text-sm font-medium text-black dark:text-white'>
                        {review.userFullname}
                    </p>
                    <p className='text-xs text-zinc-400 mt-0.5'>{date}</p>
                </div>
                <StarRating value={review.rating} size={14} />
            </div>
            <p className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
                {review.comment}
            </p>
        </div>
    );
}