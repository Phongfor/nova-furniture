// contexts/ProductProvider.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

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

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

    // Reset page khi keyword thay đổi
    useEffect(() => {
        setPage(0);
    }, [keyword]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await categoryService.getCategories();
                setCategories(res.data.result ?? []);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page,
                size: 9,
                sortBy: selectedSort.sortBy,
                sortDir: selectedSort.sortDir,
                ...(keyword && { keyword }),
                ...(selectedCategory && { categoryId: selectedCategory }),
                ...(selectedMaterials.length === 1 && {
                    material: selectedMaterials[0].toLowerCase()
                })
            };

            const res = await productService.getProducts(params);
            const result = res.data.result;

            setProducts(result?.content ?? []);
            setTotalPages(result?.totalPages ?? 1);
            setTotalElements(result?.totalElements ?? 0);
        } catch {
            setError('Failed to load products.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [page, selectedCategory, selectedMaterials, selectedSort, keyword]);

    const toggleMaterial = (mat) => {
        setSelectedMaterials((prev) =>
            prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
        );
        setPage(0);
    };

    const handleSelectCategory = (id) => {
        setSelectedCategory(id);
        setPage(0);
    };

    const handleSelectSort = (opt) => {
        setSelectedSort(opt);
        setPage(0);
    };

    const clearFilters = () => {
        setKeyword('');
        setSelectedCategory(null);
        setSelectedMaterials([]);
        setSelectedSort(SORT_OPTIONS[0]);
        setPage(0);
    };

    const hasActiveFilters =
        keyword !== '' || selectedCategory !== null || selectedMaterials.length > 0;

    return (
        <ProductContext.Provider
            value={{
                products, loading, error,
                totalPages, totalElements,
                page, setPage,
                categories, categoriesLoading,
                keyword, setKeyword,
                selectedCategory, selectedMaterials, selectedSort,
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