const STATUS_COLOR = {
    PENDING:   { bg: '#ffffff15', bar: '#facc15', text: '#fef08a' },
    PROCESSING:{ bg: '#ffffff10', bar: '#60a5fa', text: '#93c5fd' },
    SHIPPED:   { bg: '#ffffff10', bar: '#a3a3a3', text: '#d4d4d4' },
    DELIVERED: { bg: '#ffffff10', bar: '#4ade80', text: '#86efac' },
    CANCELLED: { bg: '#ffffff08', bar: '#f87171', text: '#fca5a5' },
    ON_HOLD:   { bg: '#ffffff08', bar: '#c084fc', text: '#e9d5ff' },
};

export default function OrderStats({ data, loading }) {
    if (loading) {
        return <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 h-64 animate-pulse" />;
    }

    const total = (data ?? []).reduce((s, d) => s + d.count, 0);

    return (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
            <div className="text-[9px] tracking-[0.2em] text-white/30 font-bold mb-5">
                ORDER STATUS BREAKDOWN
            </div>

            <div className="space-y-3">
                {(data ?? []).map((d) => {
                    const cfg = STATUS_COLOR[d.status] ?? STATUS_COLOR.PROCESSING;
                    const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                    return (
                        <div key={d.status}>
                            <div className="flex justify-between items-center mb-1">
                                <span
                                    className="text-[10px] font-bold tracking-widest"
                                    style={{ color: cfg.text }}
                                >
                                    {d.status}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white/30 text-[10px]">{d.count}</span>
                                    <span className="text-white/15 text-[9px]">{pct}%</span>
                                </div>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${pct}%`, background: cfg.bar }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex justify-between">
                <span className="text-[9px] tracking-widest text-white/20">TOTAL</span>
                <span className="text-white text-sm font-light">{total}</span>
            </div>
        </div>
    );
}