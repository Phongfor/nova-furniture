import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import orderService from '../../../services/orderService';
import { formatOrderDate } from '../../../utils/formatDate';
import OrderLayout from '../../../components/layout/OrderLayout';
import OrderDetailSkeleton from '../../../components/orderDetail/OrderDetailSkeleton';
import StatusBadge from '../../../components/common/StatusBadge';
import CancelOrderButton from '../../../components/common/CancelOrderButton';
import OrderTracker from '../../../components/common/OrderTracker';
import ProductDetailsCard from '../../../components/orderDetail/ProductDetailsCard';
import PaymentSummaryCard from '../../../components/orderDetail/PaymentSummaryCard';
import ShippingInfoCard from '../../../components/orderDetail/ShippingInfoCard';
import { AuthContext } from '../../../contexts/AuthProvider';

export default function OrderDetailPage() {
    const { orderId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [cancelError, setCancelError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/auth');

            return;
        }

        const fetchOrder = async () => {
            try {
                const res = await orderService.getOrderById(orderId);

                setOrder(res.data.result);
            } catch (err) {
                console.error('Failed to fetch order:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, user]);

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }

        setCancelling(true);

        setCancelError('');

        try {
            await orderService.cancelOrder(orderId);

            setOrder((prev) => ({
                ...prev,
                status: 'CANCELLED'
            }));
        } catch {
            setCancelError('Failed to cancel order. Please try again.');
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <OrderLayout>
                <OrderDetailSkeleton />
            </OrderLayout>
        );
    }

    if (!order) {
        return <OrderNotFound />;
    }

    const date = formatOrderDate(order.createdAt);

    return (
        <OrderLayout>
            <Link
                to='/orders'
                className='mb-8 flex items-center gap-2 text-xs text-zinc-400 transition hover:text-black dark:hover:text-white w-fit'
            >
                <FiArrowLeft size={14} />
                Back to Orders
            </Link>

            <div className='mb-8 flex flex-wrap items-start justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-extralight tracking-tight text-black dark:text-white'>
                        Order #NF-{order.id}
                    </h1>

                    <p className='mt-1 text-sm text-zinc-400'>
                        Placed on {date}
                    </p>
                </div>

                <div className='flex items-center gap-3'>
                    <StatusBadge status={order.status} />

                    {order.status === 'PENDING' && (
                        <CancelOrderButton
                            loading={cancelling}
                            onClick={handleCancel}
                        />
                    )}
                </div>
            </div>

            {cancelError && (
                <p className='mb-6 text-xs text-red-500'>{cancelError}</p>
            )}

            <div className='mb-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8'>
                <OrderTracker status={order.status} />
            </div>

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]'>
                <div className='flex flex-col gap-6'>
                    <ProductDetailsCard items={order.items} />

                    <ShippingInfoCard order={order} />
                </div>

                <PaymentSummaryCard order={order} date={date} />
            </div>
        </OrderLayout>
    );
}
