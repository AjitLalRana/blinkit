import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/reducres/productSlice';
import ProductCard from './ProductCard';
import { RiH1 } from 'react-icons/ri';

const SimilarProducts = ({ currentProduct }) => {
  const allProducts = useSelector(selectAllProducts);

  // Use useMemo to prevent re-filtering on every render unless products change
  const similarItems = useMemo(() => {
    if (!currentProduct || !allProducts) return [];

    return allProducts
      .filter((item) => {
        // 1. Must be in the same category
        const hasCommonCategory = item.category?.some(catId => 
          currentProduct.category?.includes(catId)
        );
        
        // 2. Exclude the current product itself
        const isNotCurrent = item._id !== currentProduct._id;

        return hasCommonCategory && isNotCurrent;
      })
      .slice(0, 4); // Show only the top 4 matches
  }, [allProducts, currentProduct]);

  if (similarItems.length === 0) return (<><h1>No similar product</h1></>);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
            Similar Essentials
          </h2>
          <div className="h-1 w-12 bg-[rgb(var(--primary))] mt-2 rounded-full"></div>
        </div>
        <button className="text-sm font-semibold text-[rgb(var(--primary))] hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarItems.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;