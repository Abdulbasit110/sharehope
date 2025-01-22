import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true, // for enabling the searching field we use (index) .
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'ngo'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String, // Cloundinary URL
    // required: true,
  },
},{
  timestamps: true,
});


// HASHING PASSWORD
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// COMPARE PASSOWRD

userSchema.methods.isPasswordCorrect = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// GENERATE ACCESS TOKEN

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCEES_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCEES_TOKEN_EXPIRY,
    }
  );
};

export const User= mongoose.model('User', userSchema);