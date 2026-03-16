import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  items: { type: Array, required: true },

  amount: { type: Number, required: true },

  // নতুন Address Structure
  address: {
    type: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      division: { type: String, required: true },
      district: { type: String, required: true },
      upazila: { type: String, required: true },
      union: { type: String, required: true },
      village: { type: String, required: true },
      note: { type: String, required: true },
    },
    required: true
  },

  status: { type: String, required: true, default: 'Order Placed' },

  paymentMethod: { type: String, required: true },

  payment: { type: Boolean, required: true, default: false },

  date: { type: Number, required: true },
}, { timestamps: true })

// Model Export
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
export default orderModel
