export default function ManifestoSection() {
  return (
    <section
      className="
        relative min-h-screen
        bg-[#FBFBF5]
        transition-colors duration-300

        dark:bg-black
      "
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="order-2 flex items-center px-4 py-20 sm:px-6 md:px-8 lg:order-1 lg:px-12">
          <div className="max-w-xl">
            <span
              className="
                mb-6 block
                text-xs font-semibold uppercase tracking-[0.25em]
                text-emerald-700

                dark:text-emerald-300
              "
            >
              Our Manifesto
            </span>

            <h2
              className="
                mb-8
                text-5xl font-extralight leading-none tracking-tight
                text-[#131313]
                font-bold
                sm:text-6xl
                lg:text-7xl
                
                dark:text-white
              "
            >
              The Nova
              <br />
              Philosophy
            </h2>

            <p
              className="
                mb-10
                max-w-lg
                text-base leading-relaxed
                text-zinc-600

                sm:text-lg

                dark:text-zinc-400
              "
            >
              We believe furniture is not merely functional —
              it is an architectural anchor for modern life.
              Every curve, joint, and shadow is meticulously
              considered to create a sense of permanent calm.
            </p>

            <button
              className="
                group flex items-center gap-4
                text-sm uppercase tracking-[0.2em]
                text-black transition

                dark:text-white
              "
            >
              READ THE JOURNAL

              <div
                className="
                  h-px w-10
                  bg-black
                  transition-all duration-300
                  group-hover:w-16

                  dark:bg-white
                "
              />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 h-[60vh] lg:order-2 lg:h-screen">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYKz5H980WcIT7ikH-zC7P_YMf71KefYCeGFIrW50jPauSiPhySGJg5wmI4_xI25jlRwqu3-vZWHLqdLVvP78Sg_SlTFFVeqMqqvmtyfIzoRJQQeiBrpLr5N9BCvUo7ECjkwzo6F4PKAkoBRFXpmCu5z_nVIIvgGFmcQ4yvk6kPV4UrZBDfjrj9Me-a8cXA1JuN0xpCW6V3iYiMko_ujy5muIrnwLLvlhSsymXdO0UOekYP7jbbNLwsvjuVfxAikXIa5XOfq-kpqA"
            alt="Manifesto"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}