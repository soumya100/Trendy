import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom'
import { routes } from '../../Routes'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link to={`${routes.product}/${id}`} className="text-gray-700 cursor-pointer group duration-300">
      <div className="overflow-hidden rounded-lg">
        <img
          src={image[0]}
          alt="product-image"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="pt-3">
        <p className="pb-1 text-sm font-medium">{name}</p>
        <p className="text-sm font-semibold">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
