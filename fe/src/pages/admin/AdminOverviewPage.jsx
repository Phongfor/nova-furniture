import { useEffect, useState } from 'react';
import { RiRefreshLine, RiDownloadLine } from 'react-icons/ri';
import adminDashboardService from '../../services/adminDashboardService';
import AdminLayout from '../../components/layout/AdminLayout';
import SummaryCards from '../../components/admin/SummaryCards';
import RevenueChart from '../../components/admin/RevenueChart';
import OrderStats from '../../components/admin/OrderStats';
import TopProducts from '../../components/admin/TopProducts';
import RecentUsers from '../../components/admin/RecentUsers';

function useAdminDashboard() {
    const [summary, setSummary] = useState(null);
    const [revenueMonthly, setRevenueMonthly] = useState(null);
    const [revenueDaily, setRevenueDaily] = useState(null);
    const [orderStats, setOrderStats] = useState(null);
    const [topProducts, setTopProducts] = useState(null);
    const [recentUsers, setRecentUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [sum, monthly, daily, orders, products, users] = await Promise.all([
                adminDashboardService.getSummary(),
                adminDashboardService.getRevenueMonthly(),
                adminDashboardService.getRevenueDaily(),
                adminDashboardService.getOrderStats(),
                adminDashboardService.getTopSellingProducts(5),
                adminDashboardService.getRecentUsers(6),
            ]);
            setSummary(sum);
            setRevenueMonthly(monthly);
            setRevenueDaily(daily);
            setOrderStats(orders);
            setTopProducts(products);
            setRecentUsers(users);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    return { summary, revenueMonthly, revenueDaily, orderStats, topProducts, recentUsers, loading, lastUpdated, refresh: fetchAll };
}

export default function AdminOverviewPage() {
    const {
        summary, revenueMonthly, revenueDaily,
        orderStats, topProducts, recentUsers,
        loading, lastUpdated, refresh,
    } = useAdminDashboard();

    const fmtTime = (d) =>
        d ? d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—';

    return (
        <AdminLayout>
            <div className="p-8 max-w-[1400px]">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extralight tracking-tight text-white">
                            Dashboard Overview
                        </h1>
                        <p className="text-white/30 text-sm mt-1">
                            Operational performance and commercial health.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-white/20 text-[10px] tracking-widest">
                            Updated {fmtTime(lastUpdated)}
                        </span>
                        <button
                            onClick={refresh}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-[10px] font-bold tracking-widest transition-all disabled:opacity-40"
                        >
                            <RiRefreshLine size={12} className={loading ? 'animate-spin' : ''} />
                            REFRESH
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-[10px] font-black tracking-widest hover:bg-white/90 transition-all">
                            <RiDownloadLine size={12} />
                            EXPORT DATA
                        </button>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="mb-6">
                    <SummaryCards data={summary} />
                </div>

                {/* Revenue chart (full width) */}
                <div className="mb-6">
                    <RevenueChart
                        monthly={revenueMonthly}
                        daily={revenueDaily}
                        loading={loading && !revenueMonthly}
                    />
                </div>

                {/* Middle row: Order stats + Top products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <OrderStats data={orderStats} loading={loading && !orderStats} />
                    <TopProducts data={topProducts} loading={loading && !topProducts} />
                </div>

                {/* Bottom: Recent users (full width) */}
                <div>
                    <RecentUsers data={recentUsers} loading={loading && !recentUsers} />
                </div>
            </div>
        </AdminLayout>
    );
}