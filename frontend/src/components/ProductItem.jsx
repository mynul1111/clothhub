import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link 
            className='block text-gray-700 cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition'
            to={`/product/${id}`}
        >

            {/* Image Container */}
            <div className="w-full h-48 sm:h-56 md:h-60 overflow-hidden rounded-t-lg">
                <img
                    src={image[0]}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300 ease-in-out"
                />
            </div>

            {/* Product Info */}
            <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 min-h-[40px]">
                    {name}
                </p>

                <p className="text-sm font-semibold mt-1">
                    {currency}{price}
                </p>
            </div>

        </Link>
    )
}

export default ProductItem
