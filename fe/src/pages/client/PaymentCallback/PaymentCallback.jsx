// pages/client/PaymentCallback/PaymentCallback.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';


export default function PaymentCallback() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // VNPay trả về vnp_ResponseCode = '00' là success
        const responseCode = searchParams.get('vnp_ResponseCode');
        if (responseCode === '00') {
            setStatus('success');
        } else {
            setStatus('failed');
        }
    }, [searchParams]);

    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />
            <div className='flex flex-col items-center justify-center py-40 gap-6'>
                {status === 'loading' && (
                    <p className='text-sm text-zinc-400'>Processing payment...</p>
                )}

                {status === 'success' && (
                    <>
                        <div className='text-center'>
                            <p className='text-4xl font-extralight text-black dark:text-white mb-2'>
                                Payment Successful
                            </p>
                            <p className='text-sm text-zinc-400'>
                                Your order has been confirmed. Thank you for your purchase.
                            </p>
                        </div>
                        <Link
                            to='/'
                            className='rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white dark:bg-white dark:text-black'
                        >
                            Back to Home
                        </Link>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <div className='text-center'>
                            <p className='text-4xl font-extralight text-black dark:text-white mb-2'>
                                Payment Failed
                            </p>
                            <p className='text-sm text-zinc-400'>
                                Something went wrong. Please try again.
                            </p>
                        </div>
                        <Link
                            to='/checkout'
                            className='rounded-full border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-black dark:border-white dark:text-white'
                        >
                            Try Again
                        </Link>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}