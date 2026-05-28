// components/common/Navbar.jsx
import { useContext, useState, useRef, useEffect } from 'react';
import {
    FiHeart,
    FiShoppingBag,
    FiUser,
    FiMenu,
    FiX,
    FiMoon,
    FiSun,
    FiSearch
} from 'react-icons/fi';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SidebarContext } from '../../contexts/SidebarProvider';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const { openSidebar, isOpen } = useContext(SidebarContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [searchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const searchInputRef = useRef(null);

    const navItems = [
        { label: 'Collections', href: '/collections' },
        { label: 'Journal', href: '/journal' },
        { label: 'Our Story', href: '/our-story' }
    ];

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [searchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        const q = keyword.trim();
        if (!q) return;
        setSearchOpen(false);
        setKeyword('');
        navigate(`/collections?keyword=${encodeURIComponent(q)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setSearchOpen(false);
            setKeyword('');
        }
    };

    return (
        <header className='fixed top-0 left-0 z-50 w-full border-b border-zinc-200/20 bg-[#FBFBF5]/90 backdrop-blur-xl dark:border-zinc-700/30 dark:bg-black/80'>
            <div className='mx-auto flex max-w-[1440px] items-center justify-between px-4 py-5 md:px-8 lg:px-12'>
                {/* Logo */}
                <Link to='/'>
                    <h1 className='text-lg font-semibold tracking-tight text-[#131313] dark:text-white'>
                        NOVAFURNITURE
                    </h1>
                </Link>

                {/* Desktop Nav */}
                <nav className='hidden items-center gap-10 md:flex'>
                    {navItems.map((item) => {
                        const isActive =
                            location.pathname === item.href ||
                            (item.href !== '/' &&
                                location.pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`text-[15px] transition-colors ${
                                    isActive
                                        ? 'border-b border-black pb-1 font-semibold text-black dark:border-white dark:text-white'
                                        : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right icons */}
                <div className='flex items-center gap-4 text-[20px]'>
                    <button
                        onClick={() => setSearchOpen(true)}
                        className='text-[#131313] transition hover:opacity-70 dark:text-white'
                    >
                        <FiSearch />
                    </button>

                    <button
                        onClick={toggleTheme}
                        className='text-[#131313] transition hover:opacity-70 dark:text-white'
                    >
                        {darkMode ? <FiSun /> : <FiMoon />}
                    </button>

                    <button
                        onClick={() => openSidebar('wishlist')}
                        className='text-[#131313] dark:text-white'
                    >
                        <FiHeart />
                    </button>

                    <button
                        onClick={() => openSidebar('cart')}
                        className='text-[#131313] dark:text-white'
                    >
                        <FiShoppingBag />
                    </button>

                    {!user ? (
                        <Link
                            to='/auth'
                            className='hidden sm:flex items-center gap-2 px-5 py-2 rounded-full border border-[#131313] dark:border-white text-[#131313] dark:text-white hover:bg-[#131313] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all'
                        >
                            <FiUser />
                            <span className='text-sm uppercase tracking-wider'>
                                Login
                            </span>
                        </Link>
                    ) : (
                        <div className='relative hidden sm:block group'>
                            <button className='text-[#131313] dark:text-white transition hover:opacity-70'>
                                <FiUser size={20} />
                            </button>
                            <div className='absolute right-0 top-8 w-48 invisible opacity-0 translate-y-2 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'>
                                <div className='rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900'>
                                    <div className='px-4 py-3 border-b border-zinc-100 dark:border-zinc-800'>
                                        <p className='text-xs text-zinc-400 truncate'>
                                            {user.email}
                                        </p>
                                    </div>
                                    <Link
                                        to='/orders'
                                        className='block w-full px-4 py-3 text-left text-sm text-black hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800 transition'
                                    >
                                        My Orders
                                    </Link>
                                    {user.role === 'ADMIN' && (
                                        <Link
                                            to='/admin'
                                            className='flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-black hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800 transition'
                                        >
                                            <span className='text-[9px] font-black tracking-widest bg-black text-white dark:bg-white dark:text-black px-1.5 py-0.5 rounded'>
                                                ADMIN
                                            </span>
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={logout}
                                        className='w-full px-4 py-3 text-left text-sm text-black hover:bg-red-500 hover:text-white dark:text-white rounded-b-xl transition'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        className='text-2xl text-[#131313] dark:text-white md:hidden'
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className='border-t border-zinc-200 bg-[#FBFBF5] px-4 py-6 dark:border-zinc-800 dark:bg-black md:hidden'>
                    <nav className='flex flex-col gap-5'>
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-base transition ${
                                    location.pathname === item.href
                                        ? 'font-semibold text-black dark:text-white'
                                        : 'text-zinc-500 dark:text-zinc-400'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            {/* Search overlay */}
            {searchOpen && (
                <>
                    <div
                        className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm'
                        onClick={() => {
                            setSearchOpen(false);
                            setKeyword('');
                        }}
                    />
                    <div className='absolute top-full left-0 right-0 z-50 bg-[#FBFBF5] dark:bg-[#131313] border-b border-zinc-200 dark:border-zinc-800 px-4 py-4 md:px-8 lg:px-12'>
                        <form
                            onSubmit={handleSearch}
                            className='mx-auto max-w-[1440px]'
                        >
                            <div className='flex items-center gap-4'>
                                <FiSearch
                                    className='shrink-0 text-zinc-400'
                                    size={18}
                                />
                                <input
                                    ref={searchInputRef}
                                    type='text'
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder='Search products...'
                                    className='flex-1 bg-transparent text-base text-black placeholder:text-zinc-400 outline-none dark:text-white'
                                />
                                {keyword && (
                                    <button
                                        type='button'
                                        onClick={() => setKeyword('')}
                                        className='text-zinc-400 hover:text-black dark:hover:text-white transition'
                                    >
                                        <FiX size={16} />
                                    </button>
                                )}
                                <button
                                    type='submit'
                                    disabled={!keyword.trim()}
                                    className='rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-80 disabled:opacity-30 dark:bg-white dark:text-black'
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </header>
    );
}
