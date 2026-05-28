import { useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import AdminLayout from '../../../components/layout/AdminLayout';
import {
    Modal, AdminPageHeader,
    TableWrapper, Th, Td, ActionBtn,
} from '../../../components/common/AdminUI';
import { userAdminService } from '../../../services/adminService';

const fmtDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ROLE_CFG = {
    ADMIN: { text: '#fef08a', bg: '#71391220', label: 'ADMIN' },
    STAFF: { text: '#93c5fd', bg: '#1e3a5f20', label: 'STAFF' },
    USER:  { text: '#d4d4d4', bg: '#ffffff08', label: 'USER' },
};

function RoleBadge({ role }) {
    const cfg = ROLE_CFG[role] ?? ROLE_CFG.USER;
    return (
        <span
            className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full"
            style={{ color: cfg.text, background: cfg.bg }}
        >
            {cfg.label}
        </span>
    );
}

function Avatar({ name, avatar }) {
    const initials = name ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() : '?';
    return (
        <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center text-[10px] font-bold text-white/40">
            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : initials}
        </div>
    );
}

// ─── User Detail Modal ────────────────────────────────────────────────────────
function UserDetailModal({ user, open, onClose }) {
    if (!user) return null;
    const rows = [
        { label: 'EMAIL', value: user.email },
        { label: 'PHONE', value: user.phone || '—' },
        { label: 'ADDRESS', value: user.address || '—' },
        { label: 'BIRTHDAY', value: user.birthday ? fmtDate(user.birthday) : '—' },
        { label: 'REGISTERED', value: fmtDate(user.createdAt) },
        { label: 'USER ID', value: `#${user.id}` },
    ];

    return (
        <Modal open={open} onClose={onClose} title="User Profile" width="max-w-md">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-lg font-bold text-white/40">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.fullname} className="w-full h-full object-cover" />
                    ) : (
                        (user.fullname || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
                    )}
                </div>
                <div>
                    <div className="text-white text-base font-medium">{user.fullname || '—'}</div>
                    <RoleBadge role={user.role} />
                </div>
            </div>

            <div className="space-y-3">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                        <span className="text-white/25 text-[9px] tracking-widest flex-shrink-0 mt-0.5">{label}</span>
                        <span className="text-white/70 text-sm text-right break-all">{value}</span>
                    </div>
                ))}
            </div>
        </Modal>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');
    const [detailUser, setDetailUser] = useState(null);

    useEffect(() => {
        userAdminService.getAll()
            .then(setUsers)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = users.filter((u) => {
        const matchRole = filterRole === 'ALL' || u.role === filterRole;
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            (u.fullname?.toLowerCase().includes(q)) ||
            (u.email?.toLowerCase().includes(q)) ||
            (u.phone?.includes(q));
        return matchRole && matchSearch;
    });

    return (
        <AdminLayout>
            <div className="p-8 max-w-[1400px]">
                <AdminPageHeader
                    title="Users"
                    subtitle={`${users.length} registered accounts`}
                />

                {/* Search + role filter */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="relative">
                        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, phone..."
                            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors w-72"
                        />
                    </div>

                    <div className="flex gap-1">
                        {['ALL', 'ADMIN', 'STAFF', 'USER'].map((r) => (
                            <button
                                key={r}
                                onClick={() => setFilterRole(r)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-widest transition-all ${
                                    filterRole === r
                                        ? 'bg-white text-black'
                                        : 'text-white/30 hover:text-white/60 border border-white/5 hover:border-white/10'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <span className="text-white/20 text-xs ml-auto">
                        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Table */}
                <TableWrapper>
                    <thead>
                        <tr>
                            <Th>USER</Th>
                            <Th>PHONE</Th>
                            <Th>ROLE</Th>
                            <Th>REGISTERED</Th>
                            <Th>ACTIONS</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(8)].map((_, i) => (
                                <tr key={i}>
                                    {[...Array(5)].map((__, j) => (
                                        <Td key={j}><div className="h-4 bg-white/5 rounded animate-pulse" /></Td>
                                    ))}
                                </tr>
                            ))
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-white/20 text-sm">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((u) => (
                                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                    <Td>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={u.fullname} avatar={u.avatar} />
                                            <div>
                                                <div className="text-white text-sm font-medium">
                                                    {u.fullname || '—'}
                                                </div>
                                                <div className="text-white/30 text-xs">{u.email}</div>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>{u.phone || '—'}</Td>
                                    <Td><RoleBadge role={u.role} /></Td>
                                    <Td>
                                        <span className="text-white/40 text-xs">{fmtDate(u.createdAt)}</span>
                                    </Td>
                                    <Td>
                                        <ActionBtn onClick={() => setDetailUser(u)} label="VIEW" variant="edit" />
                                    </Td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </TableWrapper>
            </div>

            <UserDetailModal
                user={detailUser}
                open={!!detailUser}
                onClose={() => setDetailUser(null)}
            />
        </AdminLayout>
    );
}