import { FiX } from 'react-icons/fi';

export default function CommonSidebar({
    open,
    onClose,
    title,
    children,
    footer
}) {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-all duration-300

                    ${
                        open
                            ? 'visible opacity-100'
                            : 'invisible opacity-0'
                    }
                `}
            />

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 right-0 z-50
                    h-screen w-full sm:w-[420px]

                    bg-white
                    shadow-2xl
                    transition-transform duration-300

                    dark:bg-[#131313]

                    ${
                        open
                            ? 'translate-x-0'
                            : 'translate-x-full'
                    }
                `}
            >
                {/* Header */}
                <div
                    className='
                        flex items-center justify-between
                        border-b border-zinc-200
                        p-6

                        dark:border-zinc-800
                    '
                >
                    <h2
                        className='
                            text-xl font-semibold
                            text-black

                            dark:text-white
                        '
                    >
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className='
                            text-2xl
                            text-black
                            transition hover:opacity-70

                            dark:text-white
                        '
                    >
                        <FiX />
                    </button>
                </div>

                {/* Content */}
                <div
                    className={`
                        overflow-y-auto p-6
                        ${footer ? 'pb-32' : ''}
                    `}
                >
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div
                        className='
                            absolute bottom-0 left-0 w-full
                            border-t border-zinc-200
                            bg-white
                            p-6

                            dark:border-zinc-800
                            dark:bg-[#131313]
                        '
                    >
                        {footer}
                    </div>
                )}
            </div>
        </>
    );
}