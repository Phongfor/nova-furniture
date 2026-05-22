import { ORDER_STATUS_CONFIG } from '../orders/orderStatusConfig';

export default function StatusBadge({
    status,
    className = '',
    size = 'md'
}) {
    const cfg =
        ORDER_STATUS_CONFIG[status] ??
        ORDER_STATUS_CONFIG.PENDING;

    const sizeClasses = {
        sm: 'px-3 py-1 text-[10px]',
        md: 'px-4 py-1.5 text-[10px]',
        lg: 'px-5 py-2 text-xs'
    };

    return (
        <span
            className={`
                rounded-full
                font-semibold
                uppercase
                tracking-widest
                ${cfg.bg}
                ${sizeClasses[size]}
                ${className}
            `}
        >
            {cfg.label}
        </span>
    );
}