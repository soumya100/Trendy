import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import Title from '../../common/Title';
import ProductItem from './ProductItem';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import text from "../../languages/en.json";
import { routes } from '../../Routes';

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
        <Title text1={text.latest} text2={text.navbarmenu.collections}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
        {text.latestcollectiondescription}
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
        <Button buttonText={`${text.explorecollectionbuttontext} >`} handleClick={()=>navigate(routes.collection)}/>
      </div>
    </div>
  )
}

export default LatestCollection
