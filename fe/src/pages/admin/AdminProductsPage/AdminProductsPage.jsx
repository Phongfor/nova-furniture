import { useEffect, useState, useCallback } from 'react';
import { RiAddLine, RiSearchLine } from 'react-icons/ri';
import AdminLayout from '../../../components/layout/AdminLayout';
import {
    Modal, ConfirmDialog, Pagination, FormField,
    inputCls, selectCls, AdminPageHeader,
    TableWrapper, Th, Td, ActionBtn,
} from '../../../components/common/AdminUI';
import {
    productAdminService,
    categoryAdminService,
    brandAdminService,
} from '../../../services/adminService';

// ─── Product Form ─────────────────────────────────────────────────────────────
const EMPTY_FORM = {
    name: '', description: '', price: '', stock: '',
    material: '', dimensions: '', color: '', weight: '',
    thumbnail: '', brandId: '', categoryId: '',
};

function ProductForm({ form, setForm, categories, brands, onSubmit, loading, isEdit }) {
    const field = (key) => ({
        value: form[key] ?? '',
        onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    });

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            className="space-y-4"
        >
            <div className="grid grid-cols-2 gap-4">
                <FormField label="Name *">
                    <input className={inputCls} required placeholder="Product name" {...field('name')} />
                </FormField>
                <FormField label="Price *">
                    <input className={inputCls} type="number" min="0" required placeholder="0.00" {...field('price')} />
                </FormField>
            </div>

            <FormField label="Description">
                <textarea
                    className={`${inputCls} resize-none`}
                    rows={3}
                    placeholder="Product description..."
                    {...field('description')}
                />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
                <FormField label="Stock *">
                    <input className={inputCls} type="number" min="0" required placeholder="0" {...field('stock')} />
                </FormField>
                <FormField label="Weight (kg)">
                    <input className={inputCls} type="number" min="0" step="0.1" placeholder="0.0" {...field('weight')} />
                </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField label="Material">
                    <input className={inputCls} placeholder="e.g. Oak Wood" {...field('material')} />
                </FormField>
                <FormField label="Color">
                    <input className={inputCls} placeholder="e.g. Natural Oak" {...field('color')} />
                </FormField>
            </div>

            <FormField label="Dimensions">
                <input className={inputCls} placeholder="e.g. 200x90x75 cm" {...field('dimensions')} />
            </FormField>

            <FormField label="Thumbnail URL">
                <input className={inputCls} placeholder="https://..." {...field('thumbnail')} />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
                <FormField label="Category *">
                    <select className={selectCls} required {...field('categoryId')}>
                        <option value="">Select category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </FormField>
                <FormField label="Brand *">
                    <select className={selectCls} required {...field('brandId')}>
                        <option value="">Select brand</option>
                        {brands.map((b) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </FormField>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-white text-black text-[10px] font-black tracking-widest rounded-lg hover:bg-white/90 transition-all disabled:opacity-50"
                >
                    {loading ? 'SAVING...' : isEdit ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
                </button>
            </div>
        </form>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [modal, setModal] = useState(null); // null | 'create' | 'edit'
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    const [confirmId, setConfirmId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await productAdminService.getAll({
                page, size: 10, keyword: keyword || undefined,
            });
            setProducts(res.content ?? []);
            setTotalPages(res.totalPages ?? 0);
            setTotalElements(res.totalElements ?? 0);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [page, keyword]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    useEffect(() => {
        Promise.all([categoryAdminService.getAll(), brandAdminService.getAll()]).then(
            ([cats, brnds]) => { setCategories(cats); setBrands(brnds); }
        );
    }, []);

    const openCreate = () => {
        setForm(EMPTY_FORM);
        setEditTarget(null);
        setModal('create');
    };

    const openEdit = (p) => {
        setEditTarget(p);
        setForm({
            name: p.name, description: p.description ?? '',
            price: p.price, stock: p.stock,
            material: p.material ?? '', dimensions: p.dimensions ?? '',
            color: p.color ?? '', weight: p.weight ?? '',
            thumbnail: p.thumbnail ?? '',
            brandId: p.brand?.id ?? '', categoryId: p.category?.id ?? '',
        });
        setModal('edit');
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const payload = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
                weight: Number(form.weight) || 0,
                brandId: Number(form.brandId),
                categoryId: Number(form.categoryId),
            };
            if (modal === 'edit') {
                await productAdminService.update(editTarget.id, payload);
            } else {
                await productAdminService.create(payload);
            }
            setModal(null);
            fetchProducts();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await productAdminService.remove(confirmId);
            setConfirmId(null);
            fetchProducts();
        } catch (e) {
            console.error(e);
        } finally {
            setDeleting(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(searchInput.trim());
        setPage(0);
    };

    const fmt = (n) => `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    return (
        <AdminLayout>
            <div className="p-8 max-w-[1400px]">
                <AdminPageHeader
                    title="Products"
                    subtitle={`${totalElements} total listings`}
                    action={
                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-[10px] font-black tracking-widest rounded-lg hover:bg-white/90 transition-all"
                        >
                            <RiAddLine size={13} /> ADD PRODUCT
                        </button>
                    }
                />

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 text-[10px] font-bold tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
                    >
                        SEARCH
                    </button>
                    {keyword && (
                        <button
                            type="button"
                            onClick={() => { setKeyword(''); setSearchInput(''); setPage(0); }}
                            className="px-4 py-2 text-[10px] font-bold tracking-widest text-white/30 hover:text-white transition-all"
                        >
                            CLEAR
                        </button>
                    )}
                </form>

                {/* Table */}
                <TableWrapper>
                    <thead>
                        <tr>
                            <Th>PRODUCT</Th>
                            <Th>CATEGORY</Th>
                            <Th>BRAND</Th>
                            <Th>PRICE</Th>
                            <Th>STOCK</Th>
                            <Th>ACTIONS</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <tr key={i}>
                                    {[...Array(6)].map((__, j) => (
                                        <Td key={j}>
                                            <div className="h-4 bg-white/5 rounded animate-pulse" />
                                        </Td>
                                    ))}
                                </tr>
                            ))
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-5 py-12 text-center text-white/20 text-sm">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <Td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                                {p.thumbnail ? (
                                                    <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-white/10" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-white text-sm font-medium leading-snug max-w-[180px] truncate">
                                                    {p.name}
                                                </div>
                                                <div className="text-white/25 text-[10px] font-mono">{p.slug}</div>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>{p.category?.name ?? '—'}</Td>
                                    <Td>{p.brand?.name ?? '—'}</Td>
                                    <Td>
                                        <span className="text-white font-light">{fmt(p.price)}</span>
                                    </Td>
                                    <Td>
                                        <span className={p.stock === 0 ? 'text-red-400' : p.stock < 10 ? 'text-yellow-400' : 'text-white/60'}>
                                            {p.stock}
                                        </span>
                                    </Td>
                                    <Td>
                                        <div className="flex gap-2">
                                            <ActionBtn onClick={() => openEdit(p)} label="EDIT" variant="edit" />
                                            <ActionBtn onClick={() => setConfirmId(p.id)} label="DELETE" variant="delete" />
                                        </div>
                                    </Td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </TableWrapper>

                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>

            {/* Create / Edit modal */}
            <Modal
                open={!!modal}
                onClose={() => setModal(null)}
                title={modal === 'edit' ? 'Edit Product' : 'Add Product'}
                width="max-w-2xl"
            >
                <ProductForm
                    form={form}
                    setForm={setForm}
                    categories={categories}
                    brands={brands}
                    onSubmit={handleSubmit}
                    loading={saving}
                    isEdit={modal === 'edit'}
                />
            </Modal>

            {/* Delete confirm */}
            <ConfirmDialog
                open={!!confirmId}
                onClose={() => setConfirmId(null)}
                onConfirm={handleDelete}
                title="Delete Product"
                message="This action is permanent and cannot be undone. Are you sure?"
                loading={deleting}
            />
        </AdminLayout>
    );
}