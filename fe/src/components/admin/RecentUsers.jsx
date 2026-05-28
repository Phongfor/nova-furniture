function Avatar({ name, avatar }) {
    const initials = name
        ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
        : '?';

    return (
        <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/50">
            {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
                initials
            )}
        </div>
    );
}

function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const ROLE_STYLE = {
    ADMIN: 'text-yellow-400/80 bg-yellow-400/10',
    STAFF: 'text-blue-400/80 bg-blue-400/10',
    USER:  'text-white/20 bg-white/5',
};

export default function RecentUsers({ data, loading }) {
    if (loading) {
        return <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 h-64 animate-pulse" />;
    }

    return (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
            <div className="text-[9px] tracking-[0.2em] text-white/30 font-bold mb-5">
                RECENTLY REGISTERED
            </div>

            <div className="space-y-3">
                {(data ?? []).map((u) => (
                    <div key={u.id} className="flex items-center gap-3">
                        <Avatar name={u.fullname} avatar={u.avatar} />
                        <div className="flex-1 min-w-0">
                            <div className="text-white text-[11px] font-medium truncate">
                                {u.fullname || '—'}
                            </div>
                            <div className="text-white/30 text-[10px] truncate">{u.email}</div>
                        </div>
                        <div className="text-right flex-shrink-0 space-y-1">
                            <div
                                className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded ${
                                    ROLE_STYLE[u.role] ?? ROLE_STYLE.USER
                                }`}
                            >
                                {u.role}
                            </div>
                            <div className="text-white/20 text-[9px]">{fmtDate(u.createdAt)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}