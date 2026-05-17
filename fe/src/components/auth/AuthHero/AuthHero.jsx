const AuthHero = () => {
    return (
        <section className="hidden md:flex w-1/2 relative overflow-hidden bg-black h-[calc(100vh-88px)]">
            <img
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                alt="Furniture"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="relative z-10 self-end p-20 max-w-2xl">
                <h1 className="text-7xl font-light text-white mb-6 tracking-tight">
                    Quiet Luxury.
                </h1>

                <p className="text-lg text-gray-300 leading-relaxed">
                    Enter a world of architectural precision and curated living.
                    Your journey into the Nova Collective starts here.
                </p>
            </div>
        </section>
    );
};

export default AuthHero;