import { useContext, useState } from 'react';

import {
    FiHeart,
    FiShoppingBag,
    FiUser,
    FiMenu,
    FiX,
    FiMoon,
    FiSun
} from 'react-icons/fi';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    const navItems = [
        { label: 'Collections', active: true },
        { label: 'Journal' },
        { label: 'Our Story' }
    ];

    return (
        <header
            className='
        fixed top-0 left-0 z-50 w-full
        border-b border-zinc-200/20
        bg-[#FBFBF5]/90
        backdrop-blur-xl

        dark:border-zinc-700/30
        dark:bg-black/80
      '
        >
            <div className='mx-auto flex max-w-[1440px] items-center justify-between px-4 py-5 md:px-8 lg:px-12'>
                {/* Logo */}
                <h1
                    className='
            text-lg font-semibold tracking-tight
            text-[#131313]

            dark:text-white
          '
                >
                    NOVAFURNITURE
                </h1>

                {/* Desktop Nav */}
                <nav className='hidden items-center gap-10 md:flex'>
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href='#'
                            className={`
                text-[15px] transition-colors

                ${
                    item.active
                        ? `
                      border-b border-black
                      pb-1
                      font-semibold
                      text-black

                      dark:border-white
                      dark:text-white
                    `
                        : `
                      text-zinc-500
                      hover:text-black

                      dark:text-zinc-400
                      dark:hover:text-white
                    `
                }
              `}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Right */}
                <div className='flex items-center gap-4 text-[20px]'>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className='
              text-[#131313]
              transition hover:opacity-70

              dark:text-white
            '
                    >
                        {darkMode ? <FiSun /> : <FiMoon />}
                    </button>

                    <button className='text-[#131313] dark:text-white'>
                        <FiHeart />
                    </button>

                    <button className='text-[#131313] dark:text-white'>
                        <FiShoppingBag />
                    </button>

                    <nav className='flex items-center gap-5'>
                        {/* Nếu chưa login */}
                        {!user ? (
                            <Link
                                to='/auth'
                                className='
            hidden sm:flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            border
            border-[#131313]
            dark:border-white
            text-[#131313]
            dark:text-white
            hover:bg-[#131313]
            hover:text-white
            dark:hover:bg-white
            dark:hover:text-black
            transition-all
        '
                            >
                                <FiUser />

                                <span className='text-sm uppercase tracking-wider'>
                                    Login
                                </span>
                            </Link>
                        ) : (
                            <div className='relative hidden sm:block group'>
                                {/* Username */}
                                <button
                                    className='
                text-sm
                font-medium
                text-[#131313]
                dark:text-white
                transition-opacity
                hover:opacity-70
            '
                                >
                                    {user.email}
                                </button>

                                {/* Dropdown logout */}
                                <div
                                    className='
                absolute right-0 top-8
                invisible opacity-0
                translate-y-2
                transition-all duration-200

                group-hover:visible
                group-hover:opacity-100
                group-hover:translate-y-0
            '
                                >
                                    <button
                                        onClick={logout}
                                        className='
                    rounded-xl
                    border border-zinc-200
                    bg-white
                    px-4 py-2
                    text-sm
                    shadow-lg
                    hover:bg-red-500
                    hover:text-white

                    dark:border-zinc-700
                    dark:bg-zinc-900
                    dark:text-white
                '
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </nav>
                    {/* Mobile */}
                    <button
                        className='
              text-2xl text-[#131313]
              dark:text-white
              md:hidden
            '
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {openMenu ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {openMenu && (
                <div
                    className='
            border-t border-zinc-200
            bg-[#FBFBF5]
            px-4 py-6

            dark:border-zinc-800
            dark:bg-black

            md:hidden
          '
                >
                    <nav className='flex flex-col gap-5'>
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href='#'
                                className='
                  text-base text-zinc-700

                  dark:text-zinc-300
                '
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
