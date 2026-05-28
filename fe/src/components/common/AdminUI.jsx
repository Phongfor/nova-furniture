import { useEffect } from 'react';
import { RiCloseLine, RiAlertLine } from 'react-icons/ri';

// ─── Modal ───────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, width = 'max-w-xl' }) {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`relative w-full ${width} bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
                    <h2 className="text-white text-sm font-semibold tracking-widest uppercase">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/30 hover:text-white transition-colors"
                    >
                        <RiCloseLine size={18} />
                    </button>
                </div>
                <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
            </div>
        </div>
    );
}

// ─── ConfirmDialog ────────────────────────────────────────────────────────────
export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <RiAlertLine className="text-red-400" size={16} />
                    </div>
                    <div>
                        <h3 className="text-white text-sm font-semibold mb-1">{title}</h3>
                        <p className="text-white/40 text-xs leading-relaxed">{message}</p>
                    </div>
                </div>
                <div className="flex gap-2 mt-6 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 text-xs font-bold tracking-widest bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'DELETING...' : 'DELETE'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function Pagination({ page, totalPages, onChange }) {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 0}
                className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/30 hover:text-white border border-white/5 hover:border-white/10 rounded-lg transition-all disabled:opacity-20"
            >
                ← PREV
            </button>
            {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                const p = totalPages <= 7 ? i : Math.max(0, page - 3) + i;
                if (p >= totalPages) return null;
                return (
                    <button
                        key={p}
                        onClick={() => onChange(p)}
                        className={`w-8 h-8 text-[10px] font-bold rounded-lg transition-all ${
                            p === page
                                ? 'bg-white text-black'
                                : 'text-white/30 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {p + 1}
                    </button>
                );
            })}
            <button
                onClick={() => onChange(page + 1)}
                disabled={page >= totalPages - 1}
                className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/30 hover:text-white border border-white/5 hover:border-white/10 rounded-lg transition-all disabled:opacity-20"
            >
                NEXT →
            </button>
        </div>
    );
}

// ─── FormField ────────────────────────────────────────────────────────────────
export function FormField({ label, error, children }) {
    return (
        <div>
            <label className="block text-[9px] font-bold tracking-[0.2em] text-white/30 mb-1.5 uppercase">
                {label}
            </label>
            {children}
            {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
        </div>
    );
}

export const inputCls =
    'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors';

export const selectCls =
    'w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors';

// ─── AdminStatusBadge ─────────────────────────────────────────────────────────
const STATUS_CFG = {
    PENDING:    { text: '#fef08a', bg: '#713f1220' },
    PROCESSING: { text: '#93c5fd', bg: '#1e3a5f20' },
    SHIPPED:    { text: '#d4d4d4', bg: '#ffffff10' },
    DELIVERED:  { text: '#86efac', bg: '#14532d20' },
    CANCELLED:  { text: '#fca5a5', bg: '#7f1d1d20' },
    ON_HOLD:    { text: '#e9d5ff', bg: '#4c1d9520' },
};

export function AdminStatusBadge({ status }) {
    const cfg = STATUS_CFG[status] ?? STATUS_CFG.PROCESSING;
    return (
        <span
            className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full"
            style={{ color: cfg.text, background: cfg.bg }}
        >
            {status}
        </span>
    );
}

// ─── AdminPageHeader ──────────────────────────────────────────────────────────
export function AdminPageHeader({ title, subtitle, action }) {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-extralight tracking-tight text-white">{title}</h1>
                {subtitle && <p className="text-white/30 text-sm mt-1">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}

// ─── TableWrapper ─────────────────────────────────────────────────────────────
export function TableWrapper({ children }) {
    return (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">{children}</table>
            </div>
        </div>
    );
}

export function Th({ children, className = '' }) {
    return (
        <th className={`px-5 py-3.5 text-left text-[9px] font-bold tracking-[0.2em] text-white/25 border-b border-white/5 ${className}`}>
            {children}
        </th>
    );
}

export function Td({ children, className = '' }) {
    return (
        <td className={`px-5 py-4 text-sm text-white/70 border-b border-white/5 last:border-0 ${className}`}>
            {children}
        </td>
    );
}

export function ActionBtn({ onClick, label, variant = 'edit' }) {
    const cls =
        variant === 'edit'
            ? 'text-white/30 hover:text-white border border-white/5 hover:border-white/20'
            : 'text-red-400/60 hover:text-red-400 border border-red-400/10 hover:border-red-400/30';
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 text-[9px] font-bold tracking-widest rounded-lg transition-all ${cls}`}
        >
            {label}
        </button>
    );
}