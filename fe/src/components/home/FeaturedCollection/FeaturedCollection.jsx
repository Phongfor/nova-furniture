import CollectionCard from '../CollectionCard/CollectionCard';

const collections = [
    {
        image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
        category: 'Precision Joinery',
        title: 'THE OAK SERIES'
    },
    {
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
        category: 'Sculpted Glow',
        title: 'LUMINA LIGHTING',
        offset: true
    }
];

export default function FeaturedCollection() {
    return (
        <section className='bg-[#FBFBF5] px-4 py-20 sm:px-6 md:px-8 lg:px-12 lg:py-32  dark:bg-black'>
            <div className='mx-auto grid max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-2'>
                {collections.map((item) => (
                    <CollectionCard key={item.title} {...item} />
                ))}
            </div>
        </section>
    );
}
