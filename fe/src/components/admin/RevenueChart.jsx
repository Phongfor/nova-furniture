import { useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';

const fmt = (n) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#222] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
            <div className="text-white/40 mb-1">{label}</div>
            <div className="text-white font-semibold">{fmt(payload[0]?.value ?? 0)}</div>
            <div className="text-white/30">{payload[0]?.payload?.orderCount ?? 0} orders</div>
        </div>
    );
}

export default function RevenueChart({ monthly, daily, loading }) {
    const [mode, setMode] = useState('monthly');
    const data = mode === 'monthly' ? monthly : daily;

    if (loading) {
        return (
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 h-72 animate-pulse" />
        );
    }

    const chartData = (data ?? []).map((d) => ({
        period: d.period,
        revenue: d.revenue,
        orderCount: d.orderCount,
    }));

    return (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="text-[9px] tracking-[0.2em] text-white/30 font-bold mb-1">
                        REVENUE GROWTH DYNAMICS
                    </div>
                </div>
                <div className="flex gap-1">
                    {['daily', 'monthly'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-3 py-1 rounded text-[9px] font-bold tracking-widest transition-all ${
                                mode === m
                                    ? 'bg-white text-black'
                                    : 'text-white/30 hover:text-white/60'
                            }`}
                        >
                            {m.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#ffffff08" vertical={false} />
                    <XAxis
                        dataKey="period"
                        tick={{ fill: '#ffffff25', fontSize: 9, fontFamily: 'monospace' }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tickFormatter={fmt}
                        tick={{ fill: '#ffffff25', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        width={52}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        dot={false}
                        activeDot={{ r: 3, fill: '#fff', strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}