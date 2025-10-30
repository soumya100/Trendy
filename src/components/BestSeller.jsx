import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter(product => product.bestseller);
        setBestSellers(bestProducts.slice(0, 5));
    }, [products]);

  return (
    <div className='my-10'>
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
        Explore our curated selection of best-selling products that have captured the hearts of our customers. From timeless classics to trending must-haves, these top picks showcase exceptional quality and style. Discover why these favorites stand out and elevate your collection with our most sought-after items.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSellers.map((product, idx) => (
                <ProductItem key={idx} 
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
