// pages/client/JournalPage/JournalPage.jsx
import { useState } from 'react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

const POSTS = [
    {
        id: 1,
        category: 'MATERIAL',
        title: 'The Quiet Authority of Solid Oak',
        excerpt: 'Why the world\'s most enduring furniture returns, again and again, to a single species of tree — and what that tells us about permanence in design.',
        date: 'May 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop',
        featured: true
    },
    {
        id: 2,
        category: 'CRAFT',
        title: 'Hand vs Machine: The False Dichotomy',
        excerpt: 'The most compelling furniture of our time doesn\'t choose between handcraft and technology. It asks both to serve the same master: the object itself.',
        date: 'Apr 2026',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1600&auto=format&fit=crop',
        featured: false
    },
    {
        id: 3,
        category: 'SPACE',
        title: 'Furniture as Architecture',
        excerpt: 'When a chair defines the room around it, it has ceased to be mere furniture. It has become spatial proposition — a built argument for how life should unfold.',
        date: 'Mar 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop',
        featured: false
    },
    {
        id: 4,
        category: 'PROCESS',
        title: 'From Sketch to Surface: The Nova Method',
        excerpt: 'Every piece begins as a problem. Not an aesthetic problem — a structural one. How does weight distribute? Where does stress concentrate? Beauty follows from the answer.',
        date: 'Feb 2026',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop',
        featured: false
    },
    {
        id: 5,
        category: 'MATERIAL',
        title: 'Concrete at Home: Beyond the Brutalist Cliché',
        excerpt: 'Polished, sealed, warmed with textile — concrete in the domestic interior has finally shed its industrial associations to become something genuinely intimate.',
        date: 'Jan 2026',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
        featured: false
    },
    {
        id: 6,
        category: 'LIVING',
        title: 'The Art of the Empty Room',
        excerpt: 'Negative space is not absence. In the hands of a disciplined designer, emptiness becomes the most powerful element in any interior.',
        date: 'Dec 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
        featured: false
    }
];

const CATEGORIES = ['All', 'Material', 'Craft', 'Space', 'Process', 'Living'];

const FURTHER_READING = [
    { cat: 'Journal · Architecture', title: "The Geometry of Light in Tadao Ando's Work" },
    { cat: 'Journal · Craftsmanship', title: 'Sustainable Sourcing in the Nordic Forests' },
    { cat: 'Journal · Interiors', title: 'Tactile Modernism: Textile Choices for 2024' }
];

const NEWSLETTER_CARDS = [
    { num: '01', label: 'Exclusive Interviews', dark: false },
    { label: 'Archive Access', dark: true },
    { label: 'Design Resources', dark: false },
    { label: '', dark: false, empty: true }
];

export default function JournalPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [email, setEmail] = useState('');

    const filtered = activeCategory === 'All'
        ? POSTS
        : POSTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

    const featured = POSTS.find(p => p.featured);
    const rest = filtered.filter(p => !p.featured);

    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
                {/* Header */}
                <div className='mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                    <div>
                        <p className='mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400'>
                            Nova Journal
                        </p>
                        <h1 className='text-5xl font-extralight tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl'>
                            Perspectives.
                        </h1>
                    </div>
                    <p className='max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                        Insights on architecture, material, and modern living — delivered with the same precision we apply to every piece we make.
                    </p>
                </div>

                {/* Category filter */}
                <div className='mb-12 flex flex-wrap gap-2'>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                                rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-widest transition
                                ${activeCategory === cat
                                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                    : 'border-zinc-300 text-zinc-500 hover:border-black hover:text-black dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured post */}
                {activeCategory === 'All' && featured && (
                    <div className='mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2'>
                        <div className='aspect-[4/3] overflow-hidden'>
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
                            />
                        </div>
                        <div className='flex flex-col justify-center gap-6'>
                            <div className='flex items-center gap-4'>
                                <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>{featured.category}</span>
                                <span className='h-px w-8 bg-zinc-300 dark:bg-zinc-700' />
                                <span className='text-[10px] text-zinc-400'>{featured.date}</span>
                            </div>
                            <h2 className='text-3xl font-light tracking-tight text-black dark:text-white sm:text-4xl'>
                                {featured.title}
                            </h2>
                            <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                                {featured.excerpt}
                            </p>
                            <div className='flex items-center justify-between'>
                                <span className='text-xs text-zinc-400'>{featured.readTime}</span>
                                <button className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black transition hover:gap-3 dark:text-white'>
                                    Read More <FiArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeCategory === 'All' && (
                    <div className='mb-16 border-t border-zinc-200 dark:border-zinc-800' />
                )}

                {/* Post grid */}
                <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>
                    {rest.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className='py-24 text-center'>
                        <p className='text-sm text-zinc-400'>No articles in this category yet.</p>
                    </div>
                )}

                {/* Newsletter */}
                <div className='mt-24 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-12'>
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 items-center'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-2xl font-light text-black dark:text-white'>
                                Insights Delivered with Precision.
                            </h3>
                            <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                                Subscribe to receive a monthly digest of architectural explorations,
                                new collection previews, and designer interviews. No noise, just substance.
                            </p>
                            <div className='flex gap-3 mt-2'>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email Address'
                                    className='
                                        flex-1 rounded-full border border-zinc-300 dark:border-zinc-700
                                        bg-transparent px-5 py-3 text-sm text-black dark:text-white
                                        placeholder:text-zinc-400 outline-none
                                        focus:border-black dark:focus:border-white transition
                                    '
                                />
                                <button className='rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:opacity-80 transition dark:bg-white dark:text-black'>
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Feature cards */}
                        <div className='grid grid-cols-2 gap-2'>
                            {[
                                { num: '01', label: 'Exclusive Interviews', dark: false },
                                { label: 'Archive Access', dark: true },
                                { label: 'Design Resources', dark: false },
                                { label: '', dark: false, empty: true }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`
                                        aspect-square rounded-xl flex flex-col items-start justify-end p-4
                                        ${item.dark
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : 'bg-zinc-100 dark:bg-zinc-900'
                                        }
                                        ${item.empty ? 'opacity-0 pointer-events-none' : ''}
                                    `}
                                >
                                    {item.num && (
                                        <p className='text-xs text-zinc-400 mb-auto'>{item.num}</p>
                                    )}
                                    {item.label && (
                                        <p className={`text-[10px] font-semibold uppercase tracking-widest ${item.dark ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
                                            {item.label}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Further Reading */}
                <div className='mt-16'>
                    <p className='mb-0 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-4'>
                        Further Reading
                    </p>
                    {FURTHER_READING.map((item, i) => (
                        <div
                            key={i}
                            className='flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 py-5 group cursor-pointer hover:opacity-70 transition'
                        >
                            <div>
                                <p className='text-[10px] uppercase tracking-widest text-zinc-400 mb-1'>{item.cat}</p>
                                <p className='text-sm font-medium text-black dark:text-white'>{item.title}</p>
                            </div>
                            <FiArrowUpRight size={16} className='text-zinc-400 shrink-0' />
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function PostCard({ post }) {
    return (
        <article className='group flex flex-col gap-4'>
            <div className='overflow-hidden aspect-[4/3]'>
                <img
                    src={post.image}
                    alt={post.title}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
            </div>
            <div className='flex items-center gap-3'>
                <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>{post.category}</span>
                <span className='h-px w-6 bg-zinc-300 dark:bg-zinc-700' />
                <span className='text-[10px] text-zinc-400'>{post.date}</span>
            </div>
            <h3 className='text-lg font-light tracking-tight text-black transition group-hover:opacity-70 dark:text-white'>
                {post.title}
            </h3>
            <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3'>
                {post.excerpt}
            </p>
            <div className='flex items-center justify-between mt-auto pt-2'>
                <span className='text-xs text-zinc-400'>{post.readTime}</span>
                <button className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black transition hover:gap-3 dark:text-white'>
                    Read <FiArrowRight size={12} />
                </button>
            </div>
        </article>
    );
}