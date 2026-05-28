import { useEffect, useState, useCallback } from 'react';

import {
    Modal, Pagination, FormField, selectCls,
    AdminPageHeader, AdminStatusBadge,
    TableWrapper, Th, Td, ActionBtn,
} from '../../../components/common/AdminUI';
import AdminLayout from '../../../components/layout/AdminLayout';
import { orderAdminService } from '../../../services/adminService';


const ORDER_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'ON_HOLD'];

const fmt = (n) => `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ─── Order Detail Modal ───────────────────────────────────────────────────────
function OrderDetailModal({ order, open, onClose }) {
    if (!order) return null;
    return (
        <Modal open={open} onClose={onClose} title={`Order #NF-${order.id}`} width="max-w-2xl">
            <div className="space-y-5">
                {/* Header info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-white/30 text-[9px] tracking-widest mb-1">RECIPIENT</div>
                        <div className="text-white">{order.recipientName}</div>
                        <div className="text-white/40 text-xs">{order.recipientPhone}</div>
                    </div>
                    <div>
                        <div className="text-white/30 text-[9px] tracking-widest mb-1">STATUS</div>
                        <AdminStatusBadge status={order.status} />
                    </div>
                    <div className="col-span-2">
                        <div className="text-white/30 text-[9px] tracking-widest mb-1">SHIPPING ADDRESS</div>
                        <div className="text-white/70 text-sm">{order.shippingAddress}</div>
                    </div>
                    {order.note && (
                        <div className="col-span-2">
                            <div className="text-white/30 text-[9px] tracking-widest mb-1">NOTE</div>
                            <div className="text-white/50 text-sm italic">{order.note}</div>
                        </div>
                    )}
                </div>

                {/* Items */}
                <div>
                    <div className="text-white/30 text-[9px] tracking-widest mb-3">ITEMS</div>
                    <div className="space-y-3">
                        {order.items?.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white/3 rounded-lg p-3">
                                <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                    {item.productThumbnail ? (
                                        <img src={item.productThumbnail} alt={item.productName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/10" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-white text-sm font-medium truncate">{item.productName}</div>
                                    <div className="text-white/30 text-xs">
                                        {fmt(item.unitPrice)} × {item.quantity}
                                    </div>
                                </div>
                                <div className="text-white font-light">{fmt(item.subtotal)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-white/30 text-[9px] tracking-widest">TOTAL</span>
                    <span className="text-white text-lg font-light">{fmt(order.totalPrice)}</span>
                </div>

                <div className="text-white/20 text-[10px]">
                    Placed: {fmtDate(order.createdAt)} · Updated: {fmtDate(order.updatedAt)}
                </div>
            </div>
        </Modal>
    );
}

// ─── Status Update Modal ──────────────────────────────────────────────────────
function StatusModal({ order, open, onClose, onSave, loading }) {
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (order) setStatus(order.status);
    }, [order]);

    if (!order) return null;

    return (
        <Modal open={open} onClose={onClose} title="Update Order Status" width="max-w-sm">
            <div className="space-y-4">
                <FormField label="New Status">
                    <select
                        className={selectCls}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </FormField>
                <button
                    onClick={() => onSave(order.id, status)}
                    disabled={loading || status === order.status}
                    className="w-full py-2.5 bg-white text-black text-[10px] font-black tracking-widest rounded-lg hover:bg-white/90 transition-all disabled:opacity-40"
                >
                    {loading ? 'UPDATING...' : 'UPDATE STATUS'}
                </button>
            </div>
        </Modal>
    );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
const ALL_FILTERS = ['ALL', ...ORDER_STATUSES];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('ALL');

    const [detailOrder, setDetailOrder] = useState(null);
    const [statusOrder, setStatusOrder] = useState(null);
    const [updating, setUpdating] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await orderAdminService.getAll(page, 10);
            setOrders(res.content ?? []);
            setTotalPages(res.totalPages ?? 0);
            setTotalElements(res.totalElements ?? 0);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const handleUpdateStatus = async (orderId, status) => {
        setUpdating(true);
        try {
            const updated = await orderAdminService.updateStatus(orderId, status);
            setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: updated.status } : o)));
            setStatusOrder(null);
        } catch (e) {
            console.error(e);
        } finally {
            setUpdating(false);
        }
    };

    const filtered = filterStatus === 'ALL' ? orders : orders.filter((o) => o.status === filterStatus);

    return (
        <AdminLayout>
            <div className="p-8 max-w-[1400px]">
                <AdminPageHeader
                    title="Orders"
                    subtitle={`${totalElements} total orders`}
                />

                {/* Filter tabs */}
                <div className="flex gap-1 flex-wrap mb-6">
                    {ALL_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilterStatus(f)}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-widest transition-all ${
                                filterStatus === f
                                    ? 'bg-white text-black'
                                    : 'text-white/30 hover:text-white/60 border border-white/5 hover:border-white/10'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <TableWrapper>
                    <thead>
                        <tr>
                            <Th>ORDER</Th>
                            <Th>CUSTOMER</Th>
                            <Th>ITEMS</Th>
                            <Th>TOTAL</Th>
                            <Th>STATUS</Th>
                            <Th>DATE</Th>
                            <Th>ACTIONS</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <tr key={i}>
                                    {[...Array(7)].map((__, j) => (
                                        <Td key={j}><div className="h-4 bg-white/5 rounded animate-pulse" /></Td>
                                    ))}
                                </tr>
                            ))
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-5 py-12 text-center text-white/20 text-sm">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((o) => (
                                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                                    <Td>
                                        <span className="text-white font-mono text-xs">#NF-{o.id}</span>
                                    </Td>
                                    <Td>
                                        <div className="text-white text-sm">{o.recipientName}</div>
                                        <div className="text-white/30 text-xs">{o.recipientPhone}</div>
                                    </Td>
                                    <Td>
                                        <span className="text-white/60 text-xs">
                                            {o.items?.length ?? 0} item{(o.items?.length ?? 0) !== 1 ? 's' : ''}
                                        </span>
                                    </Td>
                                    <Td>
                                        <span className="text-white font-light">{fmt(o.totalPrice)}</span>
                                    </Td>
                                    <Td><AdminStatusBadge status={o.status} /></Td>
                                    <Td>
                                        <span className="text-white/40 text-xs">{fmtDate(o.createdAt)}</span>
                                    </Td>
                                    <Td>
                                        <div className="flex gap-2">
                                            <ActionBtn onClick={() => setDetailOrder(o)} label="VIEW" variant="edit" />
                                            <ActionBtn onClick={() => setStatusOrder(o)} label="STATUS" variant="edit" />
                                        </div>
                                    </Td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </TableWrapper>

                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>

            <OrderDetailModal
                order={detailOrder}
                open={!!detailOrder}
                onClose={() => setDetailOrder(null)}
            />

            <StatusModal
                order={statusOrder}
                open={!!statusOrder}
                onClose={() => setStatusOrder(null)}
                onSave={handleUpdateStatus}
                loading={updating}
            />
        </AdminLayout>
    );
}