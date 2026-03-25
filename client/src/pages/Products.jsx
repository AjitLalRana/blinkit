import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, selectIsProductLoading } from '../store/reducres/productSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  
  // Grab data from Redux Store
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectIsProductLoading);

  // Example: Logic for a "Skeleton" loader or empty state
  if (loading) {
    return (
      <div className="max-w-9xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-gray-100 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--text-primary))]">
        Luxury Essentials
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;