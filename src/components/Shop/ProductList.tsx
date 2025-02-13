import React, { useState, useEffect, memo } from 'react';
import { ProductService } from '../../services/ProductService';
import { ProductCard } from './ProductCard';
import { Product } from '../../interfaces/IProduct';
import Select from 'react-select';
import { useDebounce } from '../../hooks/useDebounce';
import { Pagination } from '../Pagination/pagination';

export const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('none');
  const [categories, setCategories] = useState<string[]>([]);
  const productsPerPage = 10;

  const debouncedSearch = useDebounce(searchTerm, 500);
  const MemoizedProductCard = memo(ProductCard);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ProductService.fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.fetchProducts();
        setAllProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const filteredProducts = allProducts
    .filter(product => 
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (category ? product.category === category : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  if (error) return <div className="error">{error}</div>;

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="no-results">
          {category 
            ? `No products found in ${category} category`
            : searchTerm 
              ? `No products found matching "${searchTerm}"`
              : 'No products available'
          }
        </div>
      );
    }

    return (
      <>
        <div className="product-grid">
          {currentProducts.map(product => (
            <MemoizedProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <Pagination 
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={handlePageChange}
         loading={loading}
         />
      </>
    );
  };

  return (
    <div className="product-list">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Select
          placeholder="Select Category"
          value={category ? { value: category, label: category } : null}
          onChange={(option) => {
            setCurrentPage(1);
            setCategory(option ? option.value : null);
          }}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          className="category-select"
          isClearable
        />
        <Select
          placeholder="Sort by Price"
          value={sortOptions.find(option => option.value === sortOrder)}
          onChange={(option) => setSortOrder(option ? option.value : 'none')}
          options={sortOptions}
          className="sort-select"
          isClearable
        />
      </div>
          {renderContent()}
    </div>
  );
};
