// pages/client/Collectionspage/components/CollectionFilter.jsx
import { useProduct, CATEGORIES, MATERIALS, SORT_OPTIONS } from '../../../contexts/ProductProvider';
import { FiX } from 'react-icons/fi';

export default function CollectionFilter({ mobileOpen, onCloseMobile }) {
    const {
        selectedCategory,
        selectedMaterials,
        selectedSort,
        handleSelectCategory,
        toggleMaterial,
        handleSelectSort,
        clearFilters,
        hasActiveFilters
    } = useProduct();

    const filterContent = (
        <>
            <FilterSection title='Category'>
                <ul className='space-y-3'>
                    {CATEGORIES.map((cat) => (
                        <li key={cat.label}>
                            <button
                                onClick={() => handleSelectCategory(cat.value)}
                                className={`text-sm transition ${
                                    selectedCategory === cat.value
                                        ? 'font-semibold text-black dark:text-white'
                                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                {cat.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </FilterSection>

            <FilterSection title='Materials'>
                <ul className='space-y-3'>
                    {MATERIALS.map((mat) => (
                        <li key={mat}>
                            <button
                                onClick={() => toggleMaterial(mat)}
                                className={`text-sm transition ${
                                    selectedMaterials.includes(mat)
                                        ? 'font-semibold text-black dark:text-white'
                                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                {mat}
                            </button>
                        </li>
                    ))}
                </ul>
            </FilterSection>

            <FilterSection title='Sort'>
                <ul className='space-y-3'>
                    {SORT_OPTIONS.map((opt) => (
                        <li key={opt.label}>
                            <button
                                onClick={() => handleSelectSort(opt)}
                                className={`text-sm transition ${
                                    selectedSort.label === opt.label
                                        ? 'font-semibold text-black dark:text-white'
                                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                {opt.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </FilterSection>

            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className='
                        mt-2 rounded-full border border-black
                        px-5 py-2 text-xs font-semibold
                        uppercase tracking-widest text-black
                        transition hover:bg-black hover:text-white
                        dark:border-white dark:text-white
                        dark:hover:bg-white dark:hover:text-black
                    '
                >
                    Clear
                </button>
            )}
        </>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className='hidden w-[140px] shrink-0 lg:block'>
                {filterContent}
            </aside>

            {/* Mobile overlay */}
            <div
                onClick={onCloseMobile}
                className={`
                    fixed inset-0 z-40 bg-black/40 transition-all duration-300 lg:hidden
                    ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}
                `}
            />

            {/* Mobile bottom sheet */}
            <div
                className={`
                    fixed bottom-0 left-0 right-0 z-50
                    rounded-t-3xl bg-white p-8
                    transition-transform duration-300
                    dark:bg-[#131313] lg:hidden
                    ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}
                `}
            >
                <div className='mb-6 flex items-center justify-between'>
                    <h3 className='text-sm font-semibold uppercase tracking-widest text-black dark:text-white'>
                        Filter & Sort
                    </h3>
                    <button
                        onClick={onCloseMobile}
                        className='text-zinc-400 transition hover:text-black dark:hover:text-white'
                    >
                        <FiX size={18} />
                    </button>
                </div>

                <MobileSection title='Category'>
                    <div className='flex flex-wrap gap-2'>
                        {CATEGORIES.map((cat) => (
                            <ChipButton
                                key={cat.label}
                                active={selectedCategory === cat.value}
                                onClick={() => handleSelectCategory(cat.value)}
                            >
                                {cat.label}
                            </ChipButton>
                        ))}
                    </div>
                </MobileSection>

                <MobileSection title='Materials'>
                    <div className='flex flex-wrap gap-2'>
                        {MATERIALS.map((mat) => (
                            <ChipButton
                                key={mat}
                                active={selectedMaterials.includes(mat)}
                                onClick={() => toggleMaterial(mat)}
                            >
                                {mat}
                            </ChipButton>
                        ))}
                    </div>
                </MobileSection>

                <MobileSection title='Sort'>
                    <div className='flex flex-wrap gap-2'>
                        {SORT_OPTIONS.map((opt) => (
                            <ChipButton
                                key={opt.label}
                                active={selectedSort.label === opt.label}
                                onClick={() => handleSelectSort(opt)}
                            >
                                {opt.label}
                            </ChipButton>
                        ))}
                    </div>
                </MobileSection>

                <div className='mt-2 flex gap-3'>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className='
                                flex-1 rounded-full border border-zinc-300
                                py-4 text-sm font-semibold text-zinc-500
                                transition hover:border-black hover:text-black
                                dark:border-zinc-700 dark:text-zinc-400
                                dark:hover:border-white dark:hover:text-white
                            '
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={onCloseMobile}
                        className='
                            flex-1 rounded-full bg-black py-4
                            text-sm font-semibold text-white
                            dark:bg-white dark:text-black
                        '
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
}

function FilterSection({ title, children }) {
    return (
        <div className='mb-8'>
            <p className='mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                {title}
            </p>
            {children}
        </div>
    );
}

function MobileSection({ title, children }) {
    return (
        <div className='mb-6'>
            <p className='mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                {title}
            </p>
            {children}
        </div>
    );
}

function ChipButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`
                rounded-full border px-4 py-1.5 text-xs transition
                ${active
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
                }
            `}
        >
            {children}
        </button>
    );
}