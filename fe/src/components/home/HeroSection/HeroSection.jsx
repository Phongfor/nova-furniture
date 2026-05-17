export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 dark:bg-black/50" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center sm:px-6">
        <h1 className="mb-6 text-5xl font-extralight uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[120px] lg:leading-[110px]">
          ARCHITECTURAL
          <br />
          PRECISION
        </h1>

        <button className="rounded-full border border-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all hover:bg-white hover:text-black sm:px-8 sm:py-4 sm:text-xs">
          Explore Collection
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="text-[10px] tracking-[0.2em] text-white/70">
          SCROLL
        </span>

        <div className="h-10 w-px bg-white/40" />
      </div>
    </section>
  );
}