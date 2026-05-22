// pages/client/OurStoryPage/OurStoryPage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';

export default function OurStoryPage() {
    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            {/* Hero */}
            <section className='relative h-screen overflow-hidden'>
                <img
                    src='https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=1600&auto=format&fit=crop'
                    alt='Nova studio'
                    className='absolute inset-0 h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-black/50' />
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
                    <p className='mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60'>
                        A Philosophy of Permanence
                    </p>
                    <h1 className='text-5xl font-extralight text-white sm:text-7xl lg:text-[90px] leading-none tracking-tight'>
                        OUR STORY
                    </h1>
                </div>
                {/* Scroll indicator */}
                <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3'>
                    <span className='text-[10px] tracking-[0.2em] text-white/50'>SCROLL</span>
                    <div className='h-12 w-px bg-white/30' />
                </div>
            </section>

            {/* Est. + Intro */}
            <section className='mx-auto max-w-[1440px] px-4 py-24 md:px-8 lg:px-12'>
                <div className='grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24'>
                    <div className='flex flex-col justify-center gap-8'>
                        <span className='inline-block rounded-full border border-zinc-300 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 w-fit'>
                            Est. 1984
                        </span>
                        <h2 className='text-4xl font-extralight tracking-tight text-black dark:text-white sm:text-5xl'>
                            We build furniture that outlasts the people who commission it.
                        </h2>
                        <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                            Nova was founded on a single conviction: that the objects we live with should be built to the same standard as the buildings that house them. Architectural precision. Material honesty. Zero compromise on structure.
                        </p>
                        <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                            Four decades later, our pieces occupy the homes of architects, collectors, and families who understand that quality is not a feature — it is a decision made before the first cut.
                        </p>
                    </div>
                    <div className='aspect-[4/5] overflow-hidden'>
                        <img
                            src='https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop'
                            alt='Craftsman at work'
                            className='h-full w-full object-cover'
                        />
                    </div>
                </div>
            </section>

            {/* Material Truth */}
            <section className='bg-zinc-100 dark:bg-zinc-950 py-24'>
                <div className='mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12'>
                    <p className='mb-12 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400'>
                        The Material Truth
                    </p>
                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
                        {[
                            {
                                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
                                label: 'Solid Oak'
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop',
                                label: 'American Walnut'
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop',
                                label: 'Polished Concrete'
                            }
                        ].map((m) => (
                            <div key={m.label} className='group relative overflow-hidden aspect-square'>
                                <img
                                    src={m.src}
                                    alt={m.label}
                                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300' />
                                <p className='absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.2em] text-white'>
                                    {m.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Vision */}
            <section className='mx-auto max-w-[1440px] px-4 py-24 md:px-8 lg:px-12'>
                <div className='grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center'>
                    <div className='aspect-[4/3] overflow-hidden'>
                        <img
                            src='https://images.unsplash.com/photo-1572297448250-ac6d6c457e4a?q=80&w=1200&auto=format&fit=crop'
                            alt='Design sketches'
                            className='h-full w-full object-cover'
                        />
                    </div>
                    <div className='flex flex-col gap-8'>
                        <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400'>
                            The Vision
                        </p>
                        <h2 className='text-4xl font-extralight tracking-tight text-black dark:text-white sm:text-5xl'>
                            Design begins with a structural problem, never an aesthetic one.
                        </h2>
                        <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                            Every Nova piece starts with engineering. How does load distribute through the joint? Where will stress concentrate over decades of use? What thickness is structurally honest rather than merely sufficient?
                        </p>
                        <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
                            Beauty, in our view, is the visible consequence of solving these problems with discipline and restraint. It cannot be applied. It can only emerge.
                        </p>
                        <Link
                            to='/journal'
                            className='flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:gap-4 dark:text-white w-fit border-b border-black dark:border-white pb-1'
                        >
                            Explore the Journal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section className='relative overflow-hidden bg-black py-32'>
                <img
                    src='https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop'
                    alt='Forest'
                    className='absolute inset-0 h-full w-full object-cover opacity-30'
                />
                <div className='relative mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12'>
                    <div className='max-w-2xl'>
                        <p className='mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50'>
                            Our Commitment
                        </p>
                        <h2 className='mb-8 text-4xl font-extralight text-white sm:text-5xl'>
                            We source every material as if the forest were watching.
                        </h2>
                        <div className='flex flex-wrap gap-4'>
                            {['Traceable Timber', 'Zero Waste Target', 'Local Artisans', '10-Year Guarantee'].map((item) => (
                                <span
                                    key={item}
                                    className='rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/70'
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Numbers */}
            <section className='mx-auto max-w-[1440px] px-4 py-24 md:px-8 lg:px-12'>
                <div className='grid grid-cols-2 gap-12 lg:grid-cols-4'>
                    {[
                        { number: '40+', label: 'Years of craft' },
                        { number: '12', label: 'Materials mastered' },
                        { number: '3,200+', label: 'Pieces made' },
                        { number: '10yr', label: 'Structural guarantee' }
                    ].map((stat) => (
                        <div key={stat.label} className='flex flex-col gap-2'>
                            <p className='text-5xl font-extralight text-black dark:text-white'>
                                {stat.number}
                            </p>
                            <p className='text-xs uppercase tracking-widest text-zinc-400'>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className='border-t border-zinc-200 dark:border-zinc-800'>
                <div className='mx-auto max-w-[1440px] px-4 py-24 md:px-8 lg:px-12'>
                    <div className='flex flex-col items-center gap-8 text-center'>
                        <h2 className='text-4xl font-extralight tracking-tight text-black dark:text-white sm:text-5xl'>
                            Ready to commission something permanent?
                        </h2>
                        <div className='flex flex-wrap items-center justify-center gap-4'>
                            <Link
                                to='/collections'
                                className='rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-80 dark:bg-white dark:text-black'
                            >
                                View Collections
                            </Link>
                            <button className='rounded-full border border-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'>
                                Request Catalog
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}