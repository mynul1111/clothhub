import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { toast } from 'react-toastify'

const Product = () => {

const {productId} = useParams()
const navigate = useNavigate()

const {products, currency, addToCart, token} = useContext(ShopContext)

const [productData, setProductData] = useState(false)
const [image, setImage] = useState('')
const [size, setSize] = useState('')
const [showLoginPopup,setShowLoginPopup] = useState(false)

const scrollToTop = () => {
window.scrollTo({ top: 0, behavior: 'smooth' })
}

useEffect(() => {
window.scrollTo({ top: 0, behavior: 'smooth' })
}, [productId])

const fetchProductData = () => {

products.map((item)=>{
if(item._id === productId){
setProductData(item)
setImage(item.image[0])
}
})

}

useEffect(()=>{
fetchProductData()
},[productId,products])


// ✅ Add To Cart Login Check
const handleAddToCart = () => {

if(!token){
setShowLoginPopup(true)
return
}

if(!size){
toast.error("Please select size")
return
}

addToCart(productData._id,size)

toast.success("🛒 Product added to cart!",{
position:"top-center",
autoClose:1500
})

// 👉 Cart page এ নিয়ে যাবে
setTimeout(()=>{
navigate('/cart')
},1500)

scrollToTop()

}

return productData ? (

<div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

<div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

{/* Product Images */}

<div className='flex-1'>

{/* Main Image */}

<div className='w-full'>
<img className='w-full' src={image}/>
</div>

{/* Thumbnails (Below) */}

<div className='flex gap-3 mt-4 overflow-x-auto'>

{
productData.image.map((item,index)=>(
<img
onClick={()=>setImage(item)}
src={item}
key={index}
className={`w-20 h-20 object-cover cursor-pointer border 
${image === item ? 'border-black' : 'border-gray-200'}`}
/>
))
}

</div>

</div>


{/* Product Info */}

<div className='flex-1'>

<h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

<div className='flex items-center gap-1 mt-2'>
<img src={assets.star_icon} className="w-3"/>
<img src={assets.star_icon} className="w-3"/>
<img src={assets.star_icon} className="w-3"/>
<img src={assets.star_icon} className="w-3"/>
<img src={assets.star_dull_icon} className="w-3"/>
<p className='pl-2'>(122)</p>
</div>

<p className='mt-5 text-3xl font-medium'>
{currency}{productData.price}
</p>

<p className='mt-5 text-gray-500 md:w-4/5'>
{productData.description}
</p>


{/* Size */}

<div className='flex flex-col gap-4 my-8'>
<p>Select Size</p>

<div className='flex gap-2'>

{
productData.sizes.map((item,index)=>(

<button
onClick={()=>setSize(item)}
className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
key={index}
>

{item}

</button>

))
}

</div>

</div>


{/* Add To Cart */}

<button
onClick={handleAddToCart}
className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
>

ADD TO CART

</button>


<hr className='mt-8 sm:w-4/5'/>

<div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
<p>100% Original product.</p>
<p>Cash on delivery is available.</p>
<p>Easy return within 7 days.</p>
</div>

</div>

</div>


{/* Related Products */}

<RelatedProducts
scrollToTop={scrollToTop}
currentProductId={productId}
category={productData.category}
subCategory={productData.subCategory}
/>


{/* Login Popup */}

{
showLoginPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg text-center w-[300px]">

<h2 className="text-xl font-semibold mb-3">
Login Required
</h2>

<p className="text-gray-500 mb-4">
Please login to add product
</p>

<div className="flex gap-3 justify-center">

<button
onClick={()=>navigate('/login')}
className="bg-black text-white px-4 py-2 rounded"
>

Login

</button>

<button
onClick={()=>setShowLoginPopup(false)}
className="border px-4 py-2 rounded"
>

Cancel

</button>

</div>

</div>

</div>

)

}

</div>

) : <div className='opacity-0'></div>

}

export default Product
