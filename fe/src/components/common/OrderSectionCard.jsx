export default function OrderSectionCard({
    children,
    className = ''
}) {
    return (
        <div
            className={`
                rounded-2xl
                border border-zinc-200
                dark:border-zinc-800
                p-6
                ${className}
            `}
        >
            {children}
        </div>
    );
}