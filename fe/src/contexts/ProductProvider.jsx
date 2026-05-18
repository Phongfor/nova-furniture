// contexts/ProductProvider.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import productService from '../services/productService';

export const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

// Constants dùng chung
export const CATEGORIES = [
    { label: 'All', value: null },
    { label: 'Seating', value: 'seating' },
    { label: 'Tables', value: 'tables' },
    { label: 'Lighting', value: 'lighting' },
    { label: 'Objects', value: 'objects' }
];

export const MATERIALS = ['Oak', 'Walnut', 'Concrete', 'Metal'];

export const SORT_OPTIONS = [
    { label: 'Newest', sortBy: 'createdAt', sortDir: 'desc' },
    { label: 'Price: Low–High', sortBy: 'price', sortDir: 'asc' },
    { label: 'Price: High–Low', sortBy: 'price', sortDir: 'desc' }
];

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

    const fetchProducts = useCallback(async (overrideParams = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page,
                size: 9,
                sortBy: selectedSort.sortBy,
                sortDir: selectedSort.sortDir,
                ...(selectedCategory && { categoryId: selectedCategory }),
                ...(selectedMaterials.length === 1 && {
                    material: selectedMaterials[0].toLowerCase()
                }),
                ...overrideParams
            };

            const res = await productService.getProducts(params);
            const result = res.data.result;

            setProducts(result?.content ?? []);
            setTotalPages(result?.totalPages ?? 1);
            setTotalElements(result?.totalElements ?? 0);
        } catch (err) {
            setError('Failed to load products.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [page, selectedCategory, selectedMaterials, selectedSort]);

    const toggleMaterial = (mat) => {
        setSelectedMaterials((prev) =>
            prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
        );
        setPage(0);
    };

    const handleSelectCategory = (val) => {
        setSelectedCategory(val);
        setPage(0);
    };

    const handleSelectSort = (opt) => {
        setSelectedSort(opt);
        setPage(0);
    };

    const clearFilters = () => {
        setSelectedCategory(null);
        setSelectedMaterials([]);
        setSelectedSort(SORT_OPTIONS[0]);
        setPage(0);
    };

    const hasActiveFilters =
        selectedCategory !== null || selectedMaterials.length > 0;

    return (
        <ProductContext.Provider
            value={{
                // Data
                products,
                loading,
                error,
                totalPages,
                totalElements,
                page,
                setPage,

                // Filters state
                selectedCategory,
                selectedMaterials,
                selectedSort,

                // Actions
                fetchProducts,
                toggleMaterial,
                handleSelectCategory,
                handleSelectSort,
                clearFilters,
                hasActiveFilters
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}