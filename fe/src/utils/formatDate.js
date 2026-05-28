export function formatOrderDate(date) {
    return new Date(date).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
}