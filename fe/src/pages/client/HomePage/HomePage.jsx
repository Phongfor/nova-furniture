import Footer from '../../../components/common/Footer';
import Navbar from '../../../components/common/Navbar';
import FeaturedCollection from '../../../components/home/FeaturedCollection/FeaturedCollection';
import HeroSection from '../../../components/home/HeroSection/HeroSection';
import ManifestoSection from '../../../components/home/ManifestoSection/ManifestoSection';

function HomePage() {
    return (
        <main
            className='
        overflow-x-hidden
        bg-[#FBFBF5]
        text-[#131313]
        transition-colors duration-300
        dark:bg-black
        dark:text-white
      '
        >
            <Navbar />

            <HeroSection />

            <FeaturedCollection />

            <ManifestoSection />

            <Footer />
        </main>
    );
}

export default HomePage;
