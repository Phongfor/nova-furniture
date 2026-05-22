export default function SkeletonBox({
    className = ''
}) {
    return (
        <div
            className={`
                animate-pulse
                rounded
                bg-zinc-200
                dark:bg-zinc-800
                ${className}
            `}
        />
    );
}