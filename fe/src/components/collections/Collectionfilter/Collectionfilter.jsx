// components/collections/Collectionfilter/CollectionFilter.jsx
import { useState } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { useProduct, MATERIALS, SORT_OPTIONS } from '../../../contexts/ProductProvider';

export default function CollectionFilter({ mobileOpen, onCloseMobile }) {
    const {
        categories,
        categoriesLoading,
        selectedCategory,
        selectedMaterials,
        selectedSort,
        handleSelectCategory,
        toggleMaterial,
        handleSelectSort,
        clearFilters,
        hasActiveFilters
    } = useProduct();

    // Track expanded parent categories
    const [expandedParents, setExpandedParents] = useState({});

    const toggleParent = (id) =>
        setExpandedParents((prev) => ({ ...prev, [id]: !prev[id] }));

    const categoryList = (
        <FilterSection title='Category'>
            {/* All */}
            <button
                onClick={() => handleSelectCategory(null)}
                className={`mb-2 block text-sm transition ${
                    selectedCategory === null
                        ? 'font-semibold text-black dark:text-white'
                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
            >
                All
            </button>

            {categoriesLoading ? (
                <div className='space-y-2 animate-pulse'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='h-3 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800' />
                    ))}
                </div>
            ) : (
                <ul className='space-y-1'>
                    {categories.map((parent) => (
                        <li key={parent.id}>
                            {/* Parent */}
                            <div className='flex items-center justify-between'>
                                <button
                                    onClick={() => handleSelectCategory(parent.id)}
                                    className={`text-sm transition ${
                                        selectedCategory === parent.id
                                            ? 'font-semibold text-black dark:text-white'
                                            : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    {parent.name}
                                </button>
                                {parent.children?.length > 0 && (
                                    <button
                                        onClick={() => toggleParent(parent.id)}
                                        className='text-zinc-400 hover:text-black dark:hover:text-white transition'
                                    >
                                        <FiChevronDown
                                            size={12}
                                            className={`transition-transform ${
                                                expandedParents[parent.id] ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                )}
                            </div>

                            {/* Children */}
                            {parent.children?.length > 0 && expandedParents[parent.id] && (
                                <ul className='mt-1 ml-3 space-y-1 border-l border-zinc-200 pl-3 dark:border-zinc-800'>
                                    {parent.children.map((child) => (
                                        <li key={child.id}>
                                            <button
                                                onClick={() => handleSelectCategory(child.id)}
                                                className={`text-xs transition ${
                                                    selectedCategory === child.id
                                                        ? 'font-semibold text-black dark:text-white'
                                                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                                                }`}
                                            >
                                                {child.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </FilterSection>
    );

    const materialsList = (
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
    );

    const sortList = (
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
    );

    const clearBtn = hasActiveFilters && (
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
    );

    return (
        <>
            {/* ── Desktop sidebar ── */}
            <aside className='hidden w-[160px] shrink-0 lg:block'>
                {categoryList}
                {materialsList}
                {sortList}
                {clearBtn}
            </aside>

            {/* ── Mobile overlay ── */}
            <div
                onClick={onCloseMobile}
                className={`
                    fixed inset-0 z-40 bg-black/40 transition-all duration-300 lg:hidden
                    ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}
                `}
            />

            {/* ── Mobile bottom sheet ── */}
            <div
                className={`
                    fixed bottom-0 left-0 right-0 z-50
                    rounded-t-3xl bg-white p-8
                    transition-transform duration-300
                    dark:bg-[#131313] lg:hidden
                    max-h-[80vh] overflow-y-auto
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

                {/* Category chips */}
                <MobileSection title='Category'>
                    <div className='flex flex-wrap gap-2'>
                        <ChipButton
                            active={selectedCategory === null}
                            onClick={() => handleSelectCategory(null)}
                        >
                            All
                        </ChipButton>
                        {categories.map((parent) => (
                            <ChipButton
                                key={parent.id}
                                active={selectedCategory === parent.id}
                                onClick={() => handleSelectCategory(parent.id)}
                            >
                                {parent.name}
                            </ChipButton>
                        ))}
                        {/* Children flatten */}
                        {categories.flatMap((p) => p.children ?? []).map((child) => (
                            <ChipButton
                                key={child.id}
                                active={selectedCategory === child.id}
                                onClick={() => handleSelectCategory(child.id)}
                            >
                                {child.name}
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