import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function OrderLayout({
    children
}) {
    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
                {children}
            </main>

            <Footer />
        </div>
    );
}