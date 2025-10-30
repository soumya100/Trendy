import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const navigate= useNavigate();

    useEffect(() => {
      setLatestProducts(products.slice(0, 10));
    }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1="LATEST" text2="COLLECTION" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
        Discover our latest collection of trendy fashion pieces, carefully curated to keep you ahead of the style curve. 
        From chic apparel to must-have accessories, explore fresh arrivals that embody contemporary design and timeless elegance. 
        Elevate your wardrobe with our newest selections, perfect for any occasion.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((product, idx) => (
            <ProductItem key={idx} 
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            />
          ))
        }
      </div>
      <div className="flex w-full justify-end my-5">
        <Button buttonText={'EXPLORE OUR COLLECTIONS >'} handleClick={()=>navigate('/collection')}/>
      </div>
    </div>
  )
}

export default LatestCollection
