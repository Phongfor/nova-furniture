const fmt = (n) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${n?.toLocaleString('en-US') ?? 0}`;

function Rank({ n }) {
    const color = n === 1 ? '#facc15' : n === 2 ? '#d4d4d4' : n === 3 ? '#cd7f32' : '#ffffff18';
    return (
        <div
            className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0"
            style={{ background: color, color: n <= 3 ? '#000' : '#ffffff30' }}
        >
            {n}
        </div>
    );
}

export default function TopProducts({ data, loading }) {
    if (loading) {
        return <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 h-64 animate-pulse" />;
    }

    const maxRev = Math.max(...(data ?? []).map((d) => d.totalRevenue), 1);

    return (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
            <div className="text-[9px] tracking-[0.2em] text-white/30 font-bold mb-5">
                TOP SELLING PRODUCTS
            </div>

            <div className="space-y-4">
                {(data ?? []).map((p, i) => (
                    <div key={p.productId} className="flex items-center gap-3">
                        <Rank n={i + 1} />
                        <div
                            className="w-8 h-8 rounded bg-white/5 flex-shrink-0 overflow-hidden"
                        >
                            {p.productThumbnail ? (
                                <img
                                    src={p.productThumbnail}
                                    alt={p.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/10" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white text-[11px] font-medium truncate">
                                {p.productName}
                            </div>
                            <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                                <div
                                    className="h-full bg-white/40 rounded-full"
                                    style={{ width: `${(p.totalRevenue / maxRev) * 100}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="text-white text-[11px] font-light">{fmt(p.totalRevenue)}</div>
                            <div className="text-white/25 text-[9px]">{p.totalQuantitySold} sold</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}