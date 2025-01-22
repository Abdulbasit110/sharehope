import mongoose from 'mongoose';

const disposalItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reason: String,
});

const disposalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [disposalItemSchema],
  status: {
    type: String,
    enum: ['pending', 'picked_up', 'disposed'],
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

export default mongoose.model('Disposal', disposalSchema);