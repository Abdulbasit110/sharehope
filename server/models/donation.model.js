import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',  
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  items: [
    {
      name: { type: String, required: true },  
      condition: { type: String, enum: ['new', 'good', 'fair'], required: true },
      quantity: { type: Number, required: true, min: 1 }  
    }
  ],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'delivered', 'cancelled'],
    default: 'pending'  
  },
  deliveryResponsible: {
    type: String,
    enum: ['user', 'NGO'],
    default: 'NGO'
  },
  description: {
    type: String  
  }
},{timestamps: true});

export const Donation = mongoose.model('Donation', donationSchema);
