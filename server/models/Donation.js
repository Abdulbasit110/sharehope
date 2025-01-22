import mongoose from 'mongoose';

const donationItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ['new', 'good', 'fair'],
    required: true,
  },
  description: String,
});

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true,
  },
  items: [donationItemSchema],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'picked_up', 'delivered'],
    default: 'pending',
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Donation', donationSchema);