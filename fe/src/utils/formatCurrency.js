export function formatCurrency(value) {
    if (value == null) return '$0';

    return `$${Number(value).toLocaleString()}`;
}