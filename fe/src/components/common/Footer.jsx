// components/common/Footer.jsx

import {
    FiInstagram,
    FiTwitter,
    FiFacebook,
    FiArrowRight
} from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className='border-t border-zinc-200 bg-[#FBFBF5]  dark:border-zinc-800 dark:bg-black'>
            <div className='mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-4 py-16 sm:px-6 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:px-12 lg:py-24'>
                {/* Logo + Copyright */}
                <div>
                    <h2 className='mb-8 text-5xl font-extralight tracking-tight text-black/10 sm:text-6xl lg:text-7xl'>
                        NOVA
                    </h2>

                    <p className='max-w-xs text-xs uppercase tracking-[0.2em] text-zinc-500'>
                        © 2025 NOVAFURNITURE.
                        <br />
                        Architectural precision in living.
                    </p>
                </div>

                {/* Connect */}
                <div className='flex flex-col gap-4'>
                    <h3 className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black'>
                        Connect
                    </h3>

                    <a
                        href='#'
                        className='flex items-center gap-3 text-zinc-600 transition hover:text-black'
                    >
                        <FiInstagram />
                        Instagram
                    </a>

                    <a
                        href='#'
                        className='flex items-center gap-3 text-zinc-600 transition hover:text-black'
                    >
                        <FiTwitter />
                        Twitter
                    </a>

                    <a
                        href='#'
                        className='flex items-center gap-3 text-zinc-600 transition hover:text-black'
                    >
                        <FiFacebook />
                        Facebook
                    </a>
                </div>

                {/* Service */}
                <div className='flex flex-col gap-4'>
                    <h3 className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black'>
                        Service
                    </h3>

                    <a
                        href='#'
                        className='text-zinc-600 transition hover:text-black'
                    >
                        Sustainability
                    </a>

                    <a
                        href='#'
                        className='text-zinc-600 transition hover:text-black'
                    >
                        Shipping
                    </a>

                    <a
                        href='#'
                        className='text-zinc-600 transition hover:text-black'
                    >
                        Returns
                    </a>

                    <a
                        href='#'
                        className='text-zinc-600 transition hover:text-black'
                    >
                        Contact
                    </a>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className='mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-black'>
                        Journal
                    </h3>

                    <p className='mb-6 text-sm leading-relaxed text-zinc-600'>
                        Insights on architecture and modern living delivered
                        directly to your inbox.
                    </p>

                    <div className='relative'>
                        <input
                            type='email'
                            placeholder='YOUR EMAIL'
                            className='w-full border-b border-zinc-300 bg-transparent py-3 pr-10 text-sm uppercase tracking-[0.15em] outline-none placeholder:text-zinc-400 focus:border-black'
                        />

                        <button className='absolute right-0 top-1/2 -translate-y-1/2 text-lg text-black transition hover:translate-x-1'>
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
