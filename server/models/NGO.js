import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'NGO name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    }
    ,
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      minlength: [10, 'Address must be at least 10 characters long'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      unique: true,
      match: [/^\d{10,15}$/, 'Phone number should contain 10 to 15 digits'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    location: {
      type: {
        latitude: {
          type: Number,
          required: [true, 'Latitude is required'],
          min: -90,
          max: 90,
        },
        longitude: {
          type: Number,
          required: [true, 'Longitude is required'],
          min: -180,
          max: 180,
        },
      },
      required: [true, 'Location is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'pending',
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        'Please enter a valid website URL',
      ],
    },
    establishedYear: {
      type: Number,
      min: [1800, 'Establishment year should be after 1800'],
      max: [new Date().getFullYear(), 'Establishment year cannot be in the future'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('NGO', ngoSchema);
