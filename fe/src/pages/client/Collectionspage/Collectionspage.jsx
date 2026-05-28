// pages/client/Collectionspage/Collectionspage.jsx
import { useState } from 'react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import ProductProvider from '../../../contexts/ProductProvider';
import CollectionFilter from '../../../components/collections/Collectionfilter/Collectionfilter';
import CollectionGrid from '../../../components/collections/Collectiongrid/Collectiongrid';
import CollectionHeader from '../../../components/collections/Collectionheader/Collectionheader';
import CollectionSearch from '../../../components/collections/Collectionsearch/Collectionsearch';

export default function CollectionsPage() {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    return (
        <ProductProvider>
            <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
                <Navbar />

                <main className='mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-8 lg:px-12'>
                    <CollectionHeader />
                    <CollectionSearch/>
                    <div className='flex gap-12'>
                        <CollectionFilter
                            mobileOpen={mobileFilterOpen}
                            onCloseMobile={() => setMobileFilterOpen(false)}
                        />
                        <CollectionGrid
                            onOpenMobileFilter={() => setMobileFilterOpen(true)}
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </ProductProvider>
    );
}