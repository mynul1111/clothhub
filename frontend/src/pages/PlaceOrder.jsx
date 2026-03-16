import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

const [method, setMethod] = useState('cod');

const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

const [formData, setFormData] = useState({
name: '',
phone: '',
division: '',
district: '',
upazila: '',
union: '',
village: '',
note: ''
})

const onChangeHandler = (event) => {
const name = event.target.name;
const value = event.target.value;
setFormData(data => ({ ...data, [name]: value }))
}

const onSubmitHandler = async (event) => {

event.preventDefault()

try {

let orderItems = []

for (const items in cartItems) {
for (const item in cartItems[items]) {

if (cartItems[items][item] > 0) {    

    const itemInfo = structuredClone(products.find(product => product._id === items))    

    if (itemInfo) {    
      itemInfo.size = item    
      itemInfo.quantity = cartItems[items][item]    
      orderItems.push(itemInfo)    
    }    

  }    

}

}

let orderData = {
address: formData,
items: orderItems,
amount: getCartAmount() + delivery_fee,
paymentMethod: method
}

switch (method) {

case 'cod':    
case 'bkash':    
case 'nagad':    

  const response = await axios.post(    
    backendUrl + '/api/order/place',    
    orderData,    
    { headers: { token } }    
  )    

  if (response.data.success) {    
    setCartItems({})    
    navigate('/orders')    
  } else {    
    toast.error(response.data.message)    
  }    

  break;    

default:    
  break;

}

} catch (error) {

console.log(error);
toast.error(error.message)

}

}

return (

<form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>    {/* Left Side */}

  <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>    <div className='text-xl sm:text-2xl my-3'>    
  <Title text1={'DELIVERY'} text2={'INFORMATION'} />    
</div>    

<input    
  required    
  name='name'    
  value={formData.name}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='Full Name'    
/>    

<input    
  required    
  name='phone'    
  value={formData.phone}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='Mobile Number (01XXXXXXXXX)'    
/>    

<input    
  required    
  name='division'    
  value={formData.division}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='Division (বিভাগ)'    
/>    

<input    
  required    
  name='district'    
  value={formData.district}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='District (জেলা)'    
/>    

<input    
  required    
  name='upazila'    
  value={formData.upazila}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='Upazila / Thana'    
/>    

<input    
  required    
  name='union'    
  value={formData.union}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='Union'    
/>    

<input    
  required    
  name='village'    
  value={formData.village}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  type="text"    
  placeholder='Village'    
/>    

<textarea    
  required    
  name='note'    
  value={formData.note}    
  onChange={onChangeHandler}    
  className='border border-gray-300 rounded py-2 px-3 w-full'    
  placeholder='Full Address | Road, House No, Area, Landmark'    
/>

  </div>    {/* Right Side */}

  <div className='mt-8'>    <div className='mt-8 min-w-80'>    
  <CartTotal />    
</div>    

<div className='mt-12'>    

  <Title text1={'PAYMENT'} text2={'METHOD'} />    

  <div className='flex gap-3 flex-col lg:flex-row'>    

        
    {/* COD */}    
    <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>    
      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>    
      <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>    
    </div>    

  </div>    

  <div className='w-full text-end mt-8'>    
    <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>    
      PLACE ORDER    
    </button>    
  </div>    

</div>

  </div>    </form>  )
}

export default PlaceOrder
