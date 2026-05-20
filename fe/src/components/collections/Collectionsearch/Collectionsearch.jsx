import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useProduct } from '../../../contexts/ProductProvider';

export default function CollectionSearch() {
    const { keyword, setKeyword } = useProduct();
    const [input, setInput] = useState(keyword);

    // Sync khi keyword bị clear từ bên ngoài
    useEffect(() => {
        setInput(keyword);
    }, [keyword]);

    // Debounce 400ms — gõ đến đâu search đến đó
    useEffect(() => {
        const timer = setTimeout(() => {
            setKeyword(input.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [input]);

    const handleClear = () => {
        setInput('');
        setKeyword('');
    };

    return (
        <div className='mb-10 flex items-center gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800'>
            <FiSearch className='shrink-0 text-zinc-400' size={16} />

            <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Search products...'
                className='
                    flex-1 bg-transparent text-sm text-black
                    placeholder:text-zinc-400 outline-none
                    dark:text-white
                '
            />

            {input && (
                <button
                    type='button'
                    onClick={handleClear}
                    className='text-zinc-400 transition hover:text-black dark:hover:text-white'
                >
                    <FiX size={14} />
                </button>
            )}
        </div>
    );
}