import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import { AuthContext } from '../../../contexts/AuthProvider';
import orderService from '../../../services/orderService';
import OrdersHeader from '../../../components/orders/OrdersHeader';
import OrdersSkeleton from '../../../components/orders/OrdersSkeleton';
import EmptyOrders from '../../../components/orders/EmptyOrders';
import OrderCard from '../../../components/orders/OrderCard';
import LoadMoreButton from '../../../components/orders/LoadMoreButton';


export default function OrdersPage() {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [loadingMore, setLoadingMore] = useState(false);

    const fetchOrders = useCallback(async (p = 0, append = false) => {
        if (p === 0) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const res = await orderService.getMyOrders({
                page: p,
                size: 5
            });

            const result = res.data.result;

            const content = result?.content ?? [];

            setOrders((prev) =>
                append ? [...prev, ...content] : content
            );

            setTotalPages(result?.totalPages ?? 1);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }

        fetchOrders(0);
    }, [user]);

    const handleLoadMore = () => {
        const next = page + 1;

        setPage(next);

        fetchOrders(next, true);
    };

    return (
        <div className='min-h-screen bg-[#FBFBF5] dark:bg-[#0a0a0a]'>
            <Navbar />

            <main className='mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8 lg:px-12'>
                <OrdersHeader />

                {loading ? (
                    <OrdersSkeleton />
                ) : orders.length === 0 ? (
                    <EmptyOrders />
                ) : (
                    <div className='flex flex-col gap-6'>
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                            />
                        ))}

                        {page + 1 < totalPages && (
                            <LoadMoreButton
                                loadingMore={loadingMore}
                                onClick={handleLoadMore}
                            />
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}