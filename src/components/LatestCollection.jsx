import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1="LATEST" text2="COLLECTION" />
      </div>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
        Discover our latest collection of trendy fashion pieces, carefully curated to keep you ahead of the style curve. From chic apparel to must-have accessories, explore fresh arrivals that embody contemporary design and timeless elegance. Elevate your wardrobe with our newest selections, perfect for any occasion.
        </p>

      {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {products && products.slice(0,10).map((product) => (
          <div key={product.id} className='border border-gray-300 p-3 hover:shadow-lg cursor-pointer'>
            <img src={product.image} alt={product.title} className='w-full h-48 object-contain mb-3' />
            <p className='text-gray-700 font-medium mb-1'>{product.title}</p>
            <p className='text-gray-900 font-semibold'>${product.price}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default LatestCollection
