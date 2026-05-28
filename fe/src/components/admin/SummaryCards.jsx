import { RiMoneyDollarCircleLine, RiFileListLine, RiUserLine, RiTimeLine } from 'react-icons/ri';

const fmt = (n) =>
    n >= 1_000_000
        ? `$${(n / 1_000_000).toFixed(2)}M`
        : n >= 1_000
        ? `$${(n / 1_000).toFixed(1)}K`
        : `$${n?.toLocaleString('en-US') ?? 0}`;

const fmtNum = (n) => n?.toLocaleString('en-US') ?? '—';

function MiniBar({ value, max, color = '#fff' }) {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    return (
        <div className="flex items-end gap-[2px] h-8">
            {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 1].map((f, i) => (
                <div
                    key={i}
                    style={{
                        height: `${f * pct}%`,
                        width: 5,
                        background: i === 6 ? color : `${color}40`,
                        borderRadius: 2,
                        minHeight: 4,
                    }}
                />
            ))}
        </div>
    );
}

export default function SummaryCards({ data }) {
    if (!data) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#1a1a1a] rounded-xl p-5 animate-pulse h-32" />
                ))}
            </div>
        );
    }

    const cards = [
        {
            label: 'REVENUE',
            value: fmt(data.totalRevenue),
            sub: `This month: ${fmt(data.revenueThisMonth)}`,
            icon: RiMoneyDollarCircleLine,
            raw: data.revenueThisMonth,
            max: data.totalRevenue,
            color: '#ffffff',
        },
        {
            label: 'TOTAL ORDERS',
            value: fmtNum(data.totalOrders),
            sub: `Pending: ${fmtNum(data.pendingOrders)}`,
            icon: RiFileListLine,
            raw: data.totalOrders - data.pendingOrders,
            max: data.totalOrders,
            color: '#a3a3a3',
        },
        {
            label: 'TOTAL USERS',
            value: fmtNum(data.totalUsers),
            sub: 'Registered accounts',
            icon: RiUserLine,
            raw: data.totalUsers,
            max: data.totalUsers,
            color: '#d4d4d4',
        },
        {
            label: 'TOTAL PRODUCTS',
            value: fmtNum(data.totalProducts),
            sub: 'Active listings',
            icon: RiTimeLine,
            raw: data.totalProducts,
            max: data.totalProducts,
            color: '#8a8a8a',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c) => (
                <div
                    key={c.label}
                    className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] tracking-[0.2em] text-white/30 font-bold">
                            {c.label}
                        </span>
                        <c.icon size={13} className="text-white/20" />
                    </div>
                    <div className="text-2xl font-light tracking-tight text-white mb-1">
                        {c.value}
                    </div>
                    <div className="text-[10px] text-white/30 mb-3">{c.sub}</div>
                    <MiniBar value={c.raw} max={c.max} color={c.color} />
                </div>
            ))}
        </div>
    );
}