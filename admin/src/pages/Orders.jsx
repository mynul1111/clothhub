import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  // Fetch all orders (Admin)
  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )

      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3 className='text-2xl font-semibold mb-5'>Admin Orders Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >
            {/* Parcel Icon */}
            <img className='w-12' src={assets.parcel_icon} alt="Parcel" />

            {/* Order Items & Address */}
            <div>
              {/* Items List */}
              <div>
                {order.items.map((item, idx) => (
                  <p className='py-0.5' key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                  </p>
                ))}
              </div>

              {/* Customer Name */}
              <p className='mt-3 mb-1 font-medium'>{order.address.name}</p>

              {/* Address */}
              <div className='text-gray-600 text-sm'>
                <p>{order.address.note}</p>
                <p>{order.address.village}, {order.address.union}, {order.address.upazila}</p>
                <p>{order.address.district}, {order.address.division}</p>
              </div>

              {/* Phone */}
              <p className='mt-1'>{order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-2'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className='text-sm sm:text-[15px]'>
              {currency} {order.amount}
            </p>

            {/* Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-2 font-semibold border border-gray-300 rounded'
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Order Cancel">Order Cancel</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
