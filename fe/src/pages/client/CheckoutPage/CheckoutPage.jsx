// pages/client/CheckoutPage/CheckoutPage.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import { SidebarContext } from '../../../contexts/SidebarProvider';
import { AuthContext } from '../../../contexts/AuthProvider';
import orderService from '../../../services/orderService';
import ShippingMethod, {
    METHODS
} from '../../../components/checkout/ShippingMethod';
import OrderReview from '../../../components/checkout/OrderReview';
import ShippingForm from '../../../components/checkout/ShippingForm';
import PaymentSection from '../../../components/checkout/PaymentSection';

export default function CheckoutPage() {
    const { user } = useContext(AuthContext);
    const { cartItems, clearCart } = useContext(SidebarContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        recipientName: '',
        recipientPhone: '',
        shippingAddress: '',
        note: ''
    });
    const [shippingMethod, setShippingMethod] = useState(METHODS[0]);
    const [paymentMethod, setPaymentMethod] = useState('vnpay');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        if (!form.recipientName.trim()) return 'Please enter your full name.';
        if (!form.recipientPhone.trim())
            return 'Please enter your phone number.';
        if (!form.shippingAddress.trim())
            return 'Please enter your shipping address.';
        return null;
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) {
            setError(err);
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            // 1. Place order
            const orderRes = await orderService.placeOrder({
                recipientName: form.recipientName,
                recipientPhone: form.recipientPhone,
                shippingAddress: form.shippingAddress,
                note: form.note
            });
            const orderId = orderRes.data.result.id;

            // 2. VNPay redirect
            if (paymentMethod === 'vnpay') {
                const payRes = await orderService.createVNPayUrl(orderId);
                const paymentUrl = payRes.data.result.paymentUrl;
                await clearCart();
                
                window.location.href = paymentUrl;
            } else {
                // Credit card: chỉ place order, navigate tới success
                await clearCart();
                navigate(`/order-success?orderId=${orderId}`);
            }
        } catch (err) {
            setError('Failed to place order. Please try again.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
                <Navbar />
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <p className='text-sm text-zinc-400'>
                        Please sign in to checkout.
                    </p>
                    <Link
                        to='/auth'
                        className='rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white dark:bg-white dark:text-black'
                    >
                        Sign In
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
                <Navbar />
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <p className='text-sm text-zinc-400'>Your cart is empty.</p>
                    <Link
                        to='/collections'
                        className='rounded-full border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-black dark:border-white dark:text-white'
                    >
                        Explore Collection
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
                {/* Header */}
                <div className='mb-12'>
                    <h1 className='text-5xl font-extralight tracking-tight text-black dark:text-white sm:text-6xl'>
                        Checkout
                    </h1>
                    <p className='mt-3 text-sm text-zinc-500 dark:text-zinc-400'>
                        Secure completion of your architectural acquisition.
                    </p>
                </div>

                <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]'>
                    {/* Left: Forms */}
                    <div className='flex flex-col gap-12'>
                        <ShippingForm form={form} onChange={handleChange} />
                        <ShippingMethod
                            selected={shippingMethod}
                            onSelect={setShippingMethod}
                        />
                        <PaymentSection
                            method={paymentMethod}
                            onSelect={setPaymentMethod}
                        />
                    </div>

                    {/* Right: Order review */}
                    <div className='lg:sticky lg:top-28 self-start'>
                        <OrderReview
                            shippingPrice={shippingMethod.price}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            error={error}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
