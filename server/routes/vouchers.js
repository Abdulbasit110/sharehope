import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Voucher from '../models/Voucher.js';
import User from '../models/User.js';

const router = express.Router();

// Get all available vouchers
router.get('/', auth, async (req, res) => {
  try {
    const vouchers = await Voucher.find({ status: 'active' })
      .populate('brandId', 'name logo');
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create voucher (admin only)
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim voucher
router.post('/:id/claim', auth, async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher || voucher.status !== 'active') {
      return res.status(400).json({ message: 'Voucher not available' });
    }

    const user = await User.findById(req.user.id);
    if (user.points < voucher.pointsRequired) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Update voucher status and deduct points
    voucher.status = 'claimed';
    await voucher.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { points: -voucher.pointsRequired }
    });

    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;